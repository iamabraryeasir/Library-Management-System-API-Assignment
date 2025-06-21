import { Request, Response, NextFunction } from 'express';
import * as z from 'zod/v4';

import Book from '../models/book.model';
import Borrow from '../models/borrow.model';

//zod book validator
const BorrowBookZod = z.object({
  book: z.string().trim().min(1, 'Book is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  dueDate: z.string().min(1, 'Due date is required'),
});

export async function borrowBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // validate using zod
    const zodParseResult = BorrowBookZod.safeParse(req.body);
    if (!zodParseResult.success) {
      next(zodParseResult.error);
      return;
    }

    const { book, quantity, dueDate } = zodParseResult.data;

    // getting book data for business logic
    const foundBook = await Book.findById(book).select('_id available copies');

    // checking if the book is enough available
    if (!foundBook?.available && !((foundBook?.copies ?? 0) >= quantity)) {
      res.status(400).json({
        success: false,
        message: "There isn't enough copies available",
        data: null,
      });
      return;
    }

    // creating a new borrow
    const newBorrow = await Borrow.create({
      book,
      quantity,
      dueDate,
    });

    // deduct the quantity from book and update available
    if (foundBook) {
      foundBook.copies -= quantity;
      if (typeof foundBook.updateAvailability === 'function') {
        foundBook.updateAvailability();
      }
      await foundBook.save();
    }

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: newBorrow,
    });
  } catch (err) {
    next(err);
  }
}

export async function getBorrowBookDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const borrowBookData = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: {
            $sum: '$quantity',
          },
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookInfo',
        },
      },
      {
        $unwind: '$bookInfo',
      },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookInfo.title',
            isbn: '$bookInfo.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: borrowBookData,
    });
  } catch (err) {
    next(err);
  }
}
