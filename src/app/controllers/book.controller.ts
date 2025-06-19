import { NextFunction, Request, Response } from 'express';
import Book from '../models/book.model';
import { IBook } from '../interfaces/book.interface';

export async function createBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // receiving data from req body
    const body: IBook = req.body;

    // saving data to db
    const newBook = await Book.create(body);

    // sending response
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: newBook,
    });
  } catch (err) {
    next(err);
  }
}
