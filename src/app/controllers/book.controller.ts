import { NextFunction, Request, Response } from 'express';
import Book from '../models/book.model';
import { IBook, GenreEnum } from '../interfaces/book.interface';
import * as z from 'zod/v4';

// zod book validator
const BookZod = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.enum(GenreEnum),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number(),
  available: z.boolean(),
});

// controllers
export async function createBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validationResult = BookZod.safeParse(req.body);
    if (!validationResult.success) {
      next(validationResult.error);
      return;
    }
    const body: IBook = validationResult.data;

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

    // logic for limit and page (pagination)
    let limit: number = 10;
    if (req.query?.limit) {
      const limitValue = req.query?.limit as string;
      if (parseInt(limitValue) > 0) {
        limit = parseInt(limitValue);
      }
    }

    let page: number = 1;
    if (req.query?.page) {
      const pageValue = req.query?.page as string;
      if (parseInt(pageValue) > 0) {
        page = parseInt(pageValue);
      }
    }

    const skip = (page - 1) * limit;

    // query for getting the books
    const books = await Book.find(filter).sort(sort).skip(skip).limit(limit);

    // get total count for pagination meta
    const total = await Book.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getBookById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: 'No book found with this Id',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { bookId } = req.params;

    // Validate only allowed fields, partial update
    const validationResult = BookZod.partial().safeParse(req.body);
    if (!validationResult.success) {
      next(validationResult.error);
      return;
    }
    const payload: Partial<IBook> = validationResult.data;

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $set: payload },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { bookId } = req.params;

    const book = await Book.findByIdAndDelete(bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (err) {
    next(err);
  }
}
