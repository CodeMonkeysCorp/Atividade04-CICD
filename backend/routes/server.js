// server.js
import express from 'express';
import dotenv from 'dotenv';
import { Book } from './models/Book.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//  Rotas CRUD

// GET todos os livros
app.get('/books', async (req, res) => {
  const books = await Book.getAll();
  res.json(books);
});

// GET livro por id
app.get('/books/:id', async (req, res) => {
  const book = await Book.getById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
  res.json(book);
});

// POST criar livro
app.post('/books', async (req, res) => {
  const newBook = await Book.create(req.body);
  res.status(201).json(newBook);
});

// PUT atualizar livro
app.put('/books/:id', async (req, res) => {
  const updatedBook = await Book.update(req.params.id, req.body);
  if (!updatedBook) return res.status(404).json({ message: 'Livro não encontrado' });
  res.json(updatedBook);
});

// DELETE livro
app.delete('/books/:id', async (req, res) => {
  await Book.delete(req.params.id);
  res.status(204).send();
});

// 🔧 Só inicia o servidor fora do ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

// Exportar o app para o Jest
export default app;
