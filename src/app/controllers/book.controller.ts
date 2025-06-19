import { NextFunction, Request, Response } from 'express';
import Book from '../models/book.model';

export async function createBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json({ message: 'create book' });
  } catch (err) {
    next(err);
  }
}
