import { Router, Request, Response, NextFunction } from 'express';
import sql from '../libs/db';
import {
  createNewPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from '../controllers/postController';

const router = Router();

interface Post {
  id?: number;
  title: string;
  content?: string | null;
  category_id: number;
}

router.post('/', createNewPost);

router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;
