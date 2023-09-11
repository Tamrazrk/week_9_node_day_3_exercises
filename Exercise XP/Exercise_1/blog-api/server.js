const express = require('express');
const app = express();
const PORT = 3000;

// Sample data to simulate a database
let posts = [
    { id: 1, title: 'Sample Post 1', content: 'This is the content of post 1' },
    { id: 2, title: 'Sample Post 2', content: 'This is the content of post 2' }
];

// Middleware to parse JSON requests
app.use(express.json());

// GET all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// GET a specific post by id
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    res.json(post);
});

// POST a new post
app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// PUT to update a post
app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');

    post.title = req.body.title;
    post.content = req.body.content;

    res.json(post);
});

// DELETE a post
app.delete('/posts/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).send('Post not found');

    posts.splice(postIndex, 1);
    res.status(204).send();
});

// Error handling for invalid routes
app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
