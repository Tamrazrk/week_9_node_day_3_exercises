const express = require('express');
const app = express();
const PORT = 5000;

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925 },
    { id: 2, title: 'Moby-Dick', author: 'Herman Melville', publishedYear: 1851 },
    { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', publishedYear: 1813 }
];

// Middleware to parse JSON requests
app.use(express.json());

// Read all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// Read a specific book by id
app.get('/api/books/:bookId', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.bookId));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

// Create a new book
app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        publishedYear: req.body.publishedYear
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
