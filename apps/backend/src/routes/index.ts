import { Router } from 'express';
import { categoriesRouter } from './categories';
import { postsRouter } from './posts';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/posts', postsRouter);

export default router;
