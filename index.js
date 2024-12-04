const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Data dummy
let books = [
  { id: 1, title: 'Belajar Express.js', author: 'Reyvi Rahman' },
  { id: 2, title: 'REST API dengan Node.js', author: 'John Doe' },
];

// Endpoint GET - Ambil semua buku
app.get('/books', (req, res) => {
  res.json(books);
});

// Endpoint GET - Ambil buku berdasarkan ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Buku tidak ditemukan');
  res.json(book);
});

// Endpoint POST - Tambah buku baru
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Endpoint PUT - Update buku berdasarkan ID
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Buku tidak ditemukan');

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json(book);
});

// Endpoint DELETE - Hapus buku berdasarkan ID
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Buku tidak ditemukan');

  books.splice(bookIndex, 1);
  res.send('Buku berhasil dihapus');
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
