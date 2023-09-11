const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// Mock database
const users = [];

// Middleware to parse JSON requests
app.use(express.json());

// Register a new user
app.post('/api/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            id: Date.now().toString(),
            name: req.body.name,
            password: hashedPassword,
        };
        users.push(user);
        res.status(201).json({ userId: user.id });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// User login
app.post('/api/login', async (req, res) => {
    const user = users.find(u => u.name === req.body.name);
    if (!user) {
        return res.status(400).send('Cannot find user');
    }

    try {
        const token = jwt.sign(payload, secret, options);

        if (await bcrypt.compare(req.body.password, user.password)) {
            // Create a JWT token
            const accessToken = jwt.sign({ name: user.name, id: user.id }, token);
            res.json({ accessToken });
        } else {
            res.status(403).send('Incorrect password');
        }
    } catch {
        res.status(500).send('Server error');
    }
});

app.get('/api/profile', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // if no token is provided

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // if token is invalid
        const userProfile = users.find(u => u.id === user.id);
        if (!userProfile) return res.status(404).send('User not found');
        res.json({ id: userProfile.id, name: userProfile.name }); // send user details excluding password
    });
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
