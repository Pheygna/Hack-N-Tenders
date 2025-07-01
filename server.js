const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const pty = require('node-pty');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// Connexion PostgreSQL
const pool = new Pool({
    user: 'postgres',          // À remplacer par ton user
    host: 'localhost',
    database: 'hackntenders',  // Ta base
    password: 'hackntenders',  // Mets ton vrai mot de passe
    port: 5432,
});

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'Front')));

// Routes simples
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Front', 'home.html'));
});

// Route inscription
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
            [username, email, hashedPassword]
        );
        res.send('Compte créé avec succès !');
    } catch (err) {
        console.error('Erreur lors de la création du compte :', err);
        res.status(400).send('Erreur lors de la création du compte');
    }
});

// Route connexion
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        if (result.rows.length === 0) {
            return res.status(400).send('Utilisateur non trouvé');
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Mot de passe incorrect');
        }

        res.send('Connexion réussie !');
    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        res.status(500).send('Erreur serveur');
    }
});

// WebSocket
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', (ws, req) => {
    console.log('Client connecté au WebSocket');

    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const lesson = urlParams.get('lesson') || 'default';
    console.log(`Leçon demandée : ${lesson}`);

    let imageName;
    if (lesson === 'SQL_Injection') {
        imageName = 'my_image_sql_injection';
    } else if (lesson === 'DDoS') {
        imageName = 'my_image_ddos';
    } else {
        imageName = 'my_image_phishing';
    }

    const containerId = `terminal_${lesson}_${uuidv4()}`;
    console.log(`Lancement du conteneur ${containerId} avec l'image ${imageName}`);

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

    shell.on('data', (data) => {
        ws.send(data);
    });

    ws.on('message', (msg) => {
        shell.write(msg);
    });

    ws.on('close', () => {
        console.log(`Client déconnecté, arrêt du conteneur ${containerId}`);
        shell.kill();
    });

    ws.on('error', (err) => {
        console.error(`Erreur WebSocket : ${err.message}`);
    });
});

// Démarrage HTTP
app.listen(PORT, () => {
    console.log(`Serveur HTTP lancé sur http://localhost:${PORT}`);
    console.log('Serveur WebSocket lancé sur ws://localhost:8080');
});
