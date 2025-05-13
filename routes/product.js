// CRUD Ops

import express from 'express';
import { conn } from '../db.js';
import { StatusCodes } from 'http-status-codes';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// CREATE Product
router.post('/', authenticateUser, (req, res) => {
  const { name, price, category, image } = req.body;

  if (!name || !price || !category || !image) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: "All fields including image are required" });
  }

  const qry = `INSERT INTO products(name, price, category, image) VALUES (?, ?, ?, ?)`;
  conn.query(qry, [name, price, category, image], (err, result) => {
    if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Insert failed" });
    res.status(StatusCodes.CREATED).send({ message: "Product created" });
  });
});

// READ ALL with Search, Filter and Pagination
router.get('/', (req, res) => {
  let { search, category, page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 8;
  const offset = (page - 1) * limit;

  let baseQuery = "SELECT * FROM products";
  let countQuery = "SELECT COUNT(*) as total FROM products";
  let whereClauses = [];
  let queryParams = [];

  if (search) {
    whereClauses.push("(name LIKE ? OR category LIKE ?)");
    queryParams.push(`%${search}%`, `%${search}%`);
  }

  if (category) {
    whereClauses.push("category = ?");
    queryParams.push(category);
  }

  if (whereClauses.length > 0) {
    baseQuery += " WHERE " + whereClauses.join(" AND ");
    countQuery += " WHERE " + whereClauses.join(" AND ");
  }

  baseQuery += " LIMIT ? OFFSET ?";
  queryParams.push(limit, offset);

  conn.query(countQuery, queryParams.slice(0, queryParams.length - 2), (countErr, countResult) => {
    if (countErr) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Failed to count products" });
    }

    conn.query(baseQuery, queryParams, (err, result) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Failed to fetch products" });
      }

      const total = countResult[0].total;
      res.status(StatusCodes.OK).send({
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        products: result
      });
    });
  });
});

// GET Categories
router.get('/categories', (req, res) => {
  const qry = "SELECT DISTINCT category FROM products";
  conn.query(qry, (err, results) => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Failed to fetch categories" });
    }
    const categories = results.map(row => row.category);
    res.status(StatusCodes.OK).send(categories);
  });
});

// GET Product by ID
router.get('/:id', (req, res) => {
  const qry = 'SELECT * FROM products WHERE id = ?';
  conn.query(qry, [req.params.id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: 'Product not found' });
    }
    res.status(StatusCodes.OK).send(result[0]);
  });
});

// UPDATE Product
router.put('/:id', authenticateUser, (req, res) => {
  const { name, price, category, image } = req.body;
  const id = req.params.id;

  if (!name || !price || !category || !image) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: "All fields including image are required for update" });
  }

  const qry = `UPDATE products SET name=?, price=?, category=?, image=? WHERE id=?`;
  conn.query(qry, [name, price, category, image, id], (err, result) => {
    if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Update failed" });
    res.status(StatusCodes.OK).send({ message: "Product updated" });
  });
});

// DELETE Product
router.delete('/:id', authenticateUser, (req, res) => {
  const qry = "DELETE FROM products WHERE id=?";
  conn.query(qry, [req.params.id], (err, result) => {
    if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Delete failed" });
    res.status(StatusCodes.OK).send({ message: "Product deleted" });
  });
});

export default router;
