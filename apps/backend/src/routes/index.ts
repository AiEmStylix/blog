import { Router } from 'express';
import { categoriesRouter } from './categories';
import { postsRouter } from './posts';

const router = Router();

router.use('/categories', categoriesRouter);
router.use('/posts', postsRouter);

export default router;
