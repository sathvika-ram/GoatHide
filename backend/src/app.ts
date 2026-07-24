import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/error';

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // In production, replace with specific frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve public static folder (for local uploads fallback)
app.use('/public', express.static('public'));

// Routes
app.use('/api', routes);

// Global Error Handler
app.use(errorHandler);

export default app;
