const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Middleware to parse JSON requests
app.use(express.json());

// Read all posts
app.get('/api/posts', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

// Read a specific post by ID
app.get('/api/posts/:id', async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching the post' });
    }
});

// Create a post
app.post('/api/posts', async (req, res) => {
    try {
        const response = await axios.post(API_URL, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error creating the post' });
    }
});

// Update a post by ID
app.put('/api/posts/:id', async (req, res) => {
    try {
        const response = await axios.put(`${API_URL}/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error updating the post' });
    }
});

// Delete a post by ID
app.delete('/api/posts/:id', async (req, res) => {
    try {
        await axios.delete(`${API_URL}/${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting the post' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
