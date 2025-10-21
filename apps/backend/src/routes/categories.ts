import { Router } from 'express';

import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/categoryController';

const router = Router();

router.post('/', createNewCategory);

// GET /categories
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
