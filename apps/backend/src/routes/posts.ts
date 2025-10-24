import { Router } from 'express';
import {
  createNewPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from '../controllers/postController';

const router = Router();

router.post('/', createNewPost);

router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;
