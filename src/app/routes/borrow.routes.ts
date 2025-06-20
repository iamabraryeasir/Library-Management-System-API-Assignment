import { Router } from 'express';
import { borrowBook } from '../controllers/borrow.controller';

const router = Router();

router.post("/", borrowBook)

export default router;
