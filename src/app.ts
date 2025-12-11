import express from 'express';
import morgan from 'morgan';

import dotenv from 'dotenv';
dotenv.config()

import authRouter from './routes/auth.route.js';
import { errorController } from './middlewares/error.middlware.js';

export const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API is running'
    })
});

// Routes
app.use('/auth', authRouter)

// Middleware to handle errors
app.use(errorController);