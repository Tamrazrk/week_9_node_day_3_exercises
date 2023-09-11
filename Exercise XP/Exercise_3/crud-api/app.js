const { fetchPosts } = require('./data/dataService');

const express = require('express');
const app = express();
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/api/posts', async (req, res) => {
    const posts = await fetchPosts();
    console.log("Successfully retrieved and sent posts data.");
    res.json(posts);
});
