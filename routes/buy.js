// Buy Product

import express from 'express';
import { conn } from '../db.js';
import { authenticateUser } from '../middleware/auth.js';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

// Place an order
router.post('/', authenticateUser, (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    if (!productId || !quantity) {
        return res.status(StatusCodes.BAD_REQUEST).send({ message: "All fields required" });
    }

    const qry = `INSERT INTO orders(user_id, product_id, quantity) VALUES (?, ?, ?)`;
    conn.query(qry, [userId, productId, quantity], (err, result) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Order failed" });
        }
        res.status(StatusCodes.OK).send({ message: "Order placed" });
    });
});

// Get all orders of the logged-in user
router.get('/', authenticateUser, (req, res) => {
    const userId = req.userId;

    const qry = `
        SELECT 
            o.id AS order_id,
            o.quantity,
            o.created_at,
            p.id AS product_id,
            p.name AS product_name,
            p.price AS product_price,
            p.category AS product_category
        FROM orders o
        JOIN products p ON o.product_id = p.id
        WHERE o.user_id = ?
        ORDER BY o.created_at DESC
    `;

    conn.query(qry, [userId], (err, results) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Failed to fetch orders" });
        }

        res.status(StatusCodes.OK).send({ orders: results });
    });
});

export default router;
