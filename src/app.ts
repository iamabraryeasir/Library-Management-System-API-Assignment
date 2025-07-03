// node modules
import express from 'express';
import cors from 'cors';

// local modules
import appRouter from './api';
import { errorHandler } from './app/middlewares/errorHandler.middleware';

const app = express();

// middlewares
app.use(
  cors({
    origin: ['http://localhost:5173'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', appRouter);

// global error handler
app.use(errorHandler);

export default app;
