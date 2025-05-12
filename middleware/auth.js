import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export function authenticateUser(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Token missing' });

    try {
        const decoded = jwt.verify(token, 'secret123');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Invalid Token' });
    }
}
