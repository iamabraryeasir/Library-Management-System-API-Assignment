import { Router } from 'express';
import {
  borrowBook,
  getBorrowBookDetails,
} from '../controllers/borrow.controller';

const router = Router();

router.get('/', getBorrowBookDetails);
router.post('/', borrowBook);

export default router;
