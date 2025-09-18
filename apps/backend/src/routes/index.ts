import { Router } from 'express';
import { categoriesRouter } from './categories';

const router = Router();

router.use('/categories', categoriesRouter);

export default router;
