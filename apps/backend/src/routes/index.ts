import { Router } from 'express';
import { categoriesRouter } from './categories';
import { postsRouter } from './posts';
import { authRouter } from './auth';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use('/categories', authMiddleware, categoriesRouter);
router.use('/posts', postsRouter);
router.use('/auth', authRouter);

export default router;
