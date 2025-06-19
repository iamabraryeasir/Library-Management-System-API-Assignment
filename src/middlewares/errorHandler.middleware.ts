import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: err,
    });
    return;
  }

  res.status(500).json({
    message: 'Something went wrong',
    success: false,
    error: err.message || err,
  });
}
