// models/Book.js
import { pool } from '../db.js';

export const Book = {
  async getAll() {
    const res = await pool.query('SELECT * FROM books');
    return res.rows;
  },

  async getById(id) {
    const res = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return res.rows[0];
  },

  async create(book) {
    const { title, author } = book;
    const res = await pool.query(
      'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *',
      [title, author]
    );
    return res.rows[0];
  },

  async update(id, book) {
    const { title, author } = book;
    const res = await pool.query(
      'UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *',
      [title, author, id]
    );
    return res.rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
  },
};
