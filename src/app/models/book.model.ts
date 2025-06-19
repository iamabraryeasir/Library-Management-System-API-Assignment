import { Schema, model } from 'mongoose';
import { IBook } from '../interfaces/book.interface';

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      unique: [true, 'A Book already exist with this name'],
      required: [true, 'Book title is required'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
    },
    genre: {
      type: String,
      uppercase: true,
      enum: {
        values: [
          'FICTION',
          'NON_FICTION',
          'SCIENCE',
          'HISTORY',
          'BIOGRAPHY',
          'FANTASY',
        ],
        message: '{VALUE} is not supported as a genre',
      },
      required: [true, 'Genre is required'],
    },
    isbn: {
      type: String,
      unique: [true, 'ISBN number must be unique'],
      required: [true, 'ISBN number is required'],
    },
    description: {
      type: String,
      default: '',
    },
    copies: {
      type: Number,
      required: [true, 'Number of copies must be provided'],
      min: [0, "Copies can't be negative"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Book = model<IBook>('Book', bookSchema);
export default Book;
