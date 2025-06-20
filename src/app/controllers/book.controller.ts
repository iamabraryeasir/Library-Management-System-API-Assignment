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

export async function getAllBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // adding logic for filter by genre
    const filter: any = {};
    if (req.query?.filter) {
      const filterValue = req.query.filter as string;
      filter.genre = filterValue.toUpperCase();
    }

    // logic for sorting
    let sort: any = {};
    if (req.query?.sort) {
      const sortValue = req.query?.sort as string;

      if (sortValue?.toLowerCase() === 'asc') {
        sort.createdAt = 1;
      } else if (sortValue?.toLowerCase() === 'desc') {
        sort.createdAt = -1;
      }
    }

    // logic for limit
    let limit: number = 10;
    if (req.query?.limit) {
      const limitValue = req.query?.limit as string;

      if (parseInt(limitValue) > 0) {
        limit = parseInt(limitValue);
      } 
    }

    // query for getting the books
    const books = await Book.find(filter).sort(sort).limit(limit);

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (err) {
    next(err);
  }
}
