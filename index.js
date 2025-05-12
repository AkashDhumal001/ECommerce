//Entered for Execution (Main Entry Point of application)

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import buyRoutes from './routes/buy.js';



const app = express();
const PORT = 7900;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/buy', buyRoutes);

app.get('/', (req, res) => res.send("Welcome to E-commerce Backend"));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
