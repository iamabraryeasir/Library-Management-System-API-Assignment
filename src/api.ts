import { Request, Response, Router } from 'express';

import bookRouter from './app/routes/book.routes';

const router = Router();

// root router
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Library Management API by Abrar',
  });
});

// other routes
router.use('/books', bookRouter);

export default router;
