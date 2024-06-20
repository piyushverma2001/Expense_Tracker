import Router from 'express';
const router = Router();
import { getTransactions, addTransaction, deleteTransaction } from '../controllers/transactions.js';

router
  .route('/')
  .get(getTransactions)
  .post(addTransaction);

router
  .route('/:id')
  .delete(deleteTransaction);

export default router;