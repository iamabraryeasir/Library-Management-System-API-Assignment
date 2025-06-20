import { Router } from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook
} from '../controllers/book.controller';

const router = Router();

router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:bookId', getBookById);
router.put('/:bookId', updateBook)

export default router;
