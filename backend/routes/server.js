import express from "express";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(express.json());

// Configuração da conexão com o banco PostgreSQL
const pool = new Pool({
  user: "postgres",       // teu usuário do banco
  host: "localhost",
  database: "livros_db",  // nome do banco
  password: "senha_aqui", // tua senha
  port: 5432,
//  Rotas CRUD

// GET todos os livros
app.get('/books', async (req, res) => {
  const books = await Book.getAll();
  res.json(books);
});

// --- ROTAS CRUD ---

// GET /books - listar todos os livros
app.get("/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /books/:id - obter um livro específico
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Livro não encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /books - criar novo livro
app.post("/books", async (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !author)
      return res.status(400).json({ message: "Campos obrigatórios" });

    const result = await pool.query(
      "INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *",
      [title, author]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /books/:id - atualizar livro
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;

    const result = await pool.query(
      "UPDATE books SET title = COALESCE($1, title), author = COALESCE($2, author) WHERE id = $3 RETURNING *",
      [title, author, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Livro não encontrado" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /books/:id - deletar livro
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Livro não encontrado" });

    res.json({ message: "Livro removido com sucesso", deleted: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servidor
app.listen(3000, () =>
  console.log("🚀 Servidor rodando em http://localhost:3000")
);
// 🔧 Só inicia o servidor fora do ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

// Exportar o app para o Jest
export default app;
