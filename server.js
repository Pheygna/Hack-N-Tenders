const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const pty = require('node-pty');
const { v4: uuidv4 } = require('uuid'); // Pour générer des identifiants uniques

const app = express();
const PORT = 3000;

// Initialisation du serveur WebSocket
const wss = new WebSocket.Server({ port: 8080 });

// Servir les fichiers statiques dans le dossier Front
app.use(express.static(path.join(__dirname, 'Front')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Front', 'home.html'));
});

// Gestion des connexions WebSocket
wss.on('connection', (ws, req) => {
    console.log('Client connecté au WebSocket');

    // Récupération du paramètre "lesson" dans l'URL
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const lesson = urlParams.get('lesson') || 'default';

    console.log(`Leçon demandée : ${lesson}`);

    // Sélectionner l'image Docker correspondante
    let imageName;
    if (lesson === 'SQL_Injection') {
        imageName = 'my_image_sql_injection';
    } else if (lesson === 'DDoS') {
        imageName = 'my_image_ddos';
    } else {
        imageName = 'my_image_phishing'; // Par défaut, Phishing
    }

    // Générer un ID unique pour le conteneur
    const containerId = `terminal_${lesson}_${uuidv4()}`;
    console.log(`Lancement du conteneur ${containerId} avec l'image ${imageName}`);

    // Lancer le conteneur Docker
    const shell = pty.spawn(
        'docker',
        ['run', '--rm', '--name', containerId, '-it', imageName],
        {
            name: 'xterm-color',
            cols: 80,
            rows: 24,
            cwd: process.env.HOME,
            env: process.env,
        }
    );

    // Transmettre les données Docker -> Client
    shell.on('data', (data) => {
        ws.send(data);
    });

    // Transmettre les données Client -> Docker
    ws.on('message', (msg) => {
        shell.write(msg);
    });

    // Nettoyage lors de la déconnexion
    ws.on('close', () => {
        console.log(`Client déconnecté, arrêt du conteneur ${containerId}`);
        shell.kill();
    });

    ws.on('error', (err) => {
        console.error(`Erreur WebSocket : ${err.message}`);
    });
});

// Démarrage du serveur HTTP
app.listen(PORT, () => {
    console.log(`Serveur HTTP lancé sur http://localhost:${PORT}`);
    console.log('Serveur WebSocket lancé sur ws://localhost:8080');
});
