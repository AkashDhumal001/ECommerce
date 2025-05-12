//Signup And Login 

import express from 'express';
import { conn } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        // Validation
        if (!name || !phone || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).send({ message: "All fields required" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const qry = `INSERT INTO user(name, phone, email, password) VALUES (?, ?, ?, ?)`;

        conn.query(qry, [name, phone, email, encryptedPassword], (err, result) => {
            if (err)
            {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Registration failed" });
            }
            else{
            res.status(StatusCodes.CREATED).send({ message: "User registered" });
            }
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Server error" });
    }
});

// Login
router.post("/login", (req, res) => {
    try {
        const { phone, password } = req.body;
        const qry = `SELECT * FROM user WHERE phone = ?`;

        conn.query(qry, [phone], async (err, results) => {
            if (err || results.length === 0) return res.status(StatusCodes.BAD_REQUEST).send({ message: "Invalid credentials" });

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) return res.status(StatusCodes.BAD_REQUEST).send({ message: "Invalid credentials" });

            const token = jwt.sign({ userId: user.id }, "secret123");
            res.status(StatusCodes.OK).send({ message: "Login successful", token });
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Server error" });
    }
});

export default router;
