const express = require('express');
const app = express();
const PORT = 3000;

// Use express.json() middleware to parse JSON data from requests
app.use(express.json());

// In-memory array to store todo objects
let todos = [];

// Routes and handlers for CRUD operations

// Create a new todo
app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: Date.now().toString(),
        title: req.body.title,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Get all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// Get a specific todo
app.get('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === req.params.id);
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === req.params.id);
    if (!todo) return res.status(404).send('Todo not found');
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    res.json(todo);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).send('Todo not found');
    todos.splice(index, 1);
    res.status(204).send();
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
