import { Schema, model } from 'mongoose';
import { IBorrow } from '../interfaces/borrow.interface';

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Book Id is required'],
    },
    quantity: {
      type: Number,
      min: [1, 'Quantity should be minimum 1'],
      required: [true, 'Quantity is required'],
    },
    dueDate: {
      type: Date,
      default: Date.now,
      required: [true, 'Due date is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Borrow = model<IBorrow>('Borrow', borrowSchema);
export default Borrow;
