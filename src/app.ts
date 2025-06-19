// node modules
import express from 'express';

// local modules
import appRouter from './api';
import { errorHandler } from './app/middlewares/errorHandler.middleware';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', appRouter);

// global error handler
app.use(errorHandler);

export default app;
