import { Router } from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
} from '../controllers/book.controller';

const router = Router();

router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:bookId', getBookById);

export default router;
