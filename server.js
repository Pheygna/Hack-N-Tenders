const express = require('express');
const session = require('express-session');
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
    user: 'postgres',
    host: 'localhost',
    database: 'hackntenders',
    password: 'hackntenders',
    port: 5432,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'hackntenders_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Accès à la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'home.html'));
});

// Accès sécurisé à la page profil
app.get('/profile.html', (req, res) => {
    if (!req.session.user) return res.redirect('/login.html');
    res.sendFile(path.join(__dirname, 'front', 'profile.html'));
});

// Enregistrement utilisateur
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
            [username, email, hashedPassword]
        );
        req.session.user = { username, email };
        res.redirect('/home.html');
    } catch (err) {
        console.error('Erreur lors de la création du compte :', err);
        res.status(400).send('Erreur lors de la création du compte');
    }
});

// Connexion utilisateur
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        if (result.rows.length === 0) {
            return res.status(400).send('Utilisateur non trouvé');
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Mot de passe incorrect');
        }

        req.session.user = {
            username: user.username,
            email: user.email
        };

        res.redirect('/home.html');
    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        res.status(500).send('Erreur serveur');
    }
});

// Déconnexion
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Session info pour affichage du profil (auth)
app.get('/session-info', (req, res) => {
    console.log("Session user :", req.session.user);
    if (req.session.user) {
        res.json({
            loggedIn: true,
            username: req.session.user.username,
            email: req.session.user.email
        });
    } else {
        res.json({ loggedIn: false });
    }
});

// Progression utilisateur
app.get('/user-progress', async (req, res) => {
    if (!req.session.user) return res.status(401).json({ error: "Non autorisé" });

    const { email, username } = req.session.user;

    try {
        const userData = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        const userId = userData.rows[0].id;

        const progress = await pool.query(`
            SELECT lesson_name, completed, score FROM user_progress
            WHERE user_id = $1
        `, [userId]);

        const totalScore = progress.rows.reduce((sum, row) => sum + row.score, 0);

        res.json({
            username,
            email,
            totalScore,
            progress: progress.rows
        });
    } catch (err) {
        console.error("Erreur user-progress :", err);
        res.sendStatus(500);
    }
});

app.use(express.static(path.join(__dirname, 'front')));


// Mise à jour score scénario
app.post('/update-score', async (req, res) => {
    const { lesson, score } = req.body;
    const user = req.session.user;

    if (!user) return res.status(401).send("Non autorisé");

    try {
        const userData = await pool.query('SELECT id FROM users WHERE email = $1', [user.email]);
        const userId = userData.rows[0].id;

        await pool.query(`
            INSERT INTO user_progress (user_id, lesson_name, completed, score)
            VALUES ($1, $2, true, $3)
            ON CONFLICT (user_id, lesson_name)
            DO UPDATE SET completed = true, score = $3, completed_at = CURRENT_TIMESTAMP
        `, [userId, lesson, score]);

        res.sendStatus(200);
    } catch (err) {
        console.error("Erreur update-score :", err);
        res.sendStatus(500);
    }
});

// WebSocket Terminal Docker
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
    console.log('Client connecté au WebSocket');

    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const lessonRaw = urlParams.get('lesson') || 'default';

    const lesson = lessonRaw.toLowerCase().replace(/[^a-z0-9_-]/g, '');
    console.log(`Leçon demandée (nettoyée) : ${lesson}`);

    let imageName;
    if (lesson === 'sql_injection') {
        imageName = 'my_image_sql_injection';
    } else if (lesson === 'mitm') {
        imageName = 'my_image_mitm';
    } else if (lesson === 'phishing') {
        imageName = 'my_image_phishing';
    } else if (lesson === 'malware') {
        imageName = 'my_image_malware';
    } else if (lesson === 'brute_force') {
        imageName = 'my_image_brute_force';
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

// Serveur HTTP
app.listen(PORT, () => {
    console.log(`Serveur HTTP lancé sur http://localhost:${PORT}`);
    console.log('Serveur WebSocket lancé sur ws://localhost:8080');
});
