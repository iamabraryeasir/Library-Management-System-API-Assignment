import { Request, Response, NextFunction } from 'express';

import Book from '../models/book.model';
import Borrow from '../models/borrow.model';

export async function borrowBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // getting data from req body
    const { book, quantity, dueDate } = req.body;

    // validate
    if (!book?.trim() || !quantity || !dueDate) {
      res.status(400).json({
        success: false,
        message: 'Book, quantity, and dueDate are required',
        data: null,
      });
      return;
    }

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
      foundBook.updateAvailability();
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
