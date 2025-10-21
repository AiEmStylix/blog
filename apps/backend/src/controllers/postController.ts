import { Request, Response } from 'express';
import type { Post } from '../types/Post.type';
import { PostModel } from '../models/Post.model';

export const createNewPost = async (req: Request, res: Response) => {
  try {
    const { title, content, category_ids } = req.body as Partial<Post>;
    if (!title || !content || !category_ids) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const newPost = await PostModel.create(title, content, category_ids.map(Number));
    return res.status(201).json({ message: 'Post created successfully', newPost });
  } catch (error) {
    console.error('Error when calling createNewPost', error);
    res.status(500).json({ message: 'System error' });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.findAll();

    //Handle empty lists
    if (!posts || posts.length === 0) {
      return res.status(200).json({
        message: 'No posts found',
        posts: [],
      });
    }
    return res.status(200).json({ message: 'Posts retrieved succesfully', posts });
  } catch (error) {
    console.error('Error when calling getAllPosts', error);
    res.status(500).json({ message: 'System error' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid post id' });
    }

    const post = await PostModel.findById(id);

    return res.status(200).json({ message: 'Post retrieved successfully', post });
  } catch (error) {
    console.error('Error when calling getAllPosts', error);
    res.status(500).json({ message: 'System error' });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid post id' });
    }

    const { title, content, category_ids } = req.body as Partial<Post>;

    if (
      (title !== undefined && typeof title !== 'string') ||
      (content !== undefined && typeof content !== 'string')
    ) {
      return res.status(400).json({ message: 'Invalid title or content' });
    }

    if (category_ids && !Array.isArray(category_ids)) {
      return res.status(400).json({ message: 'category_ids must be an array' });
    }

    const updatedPost = await PostModel.update(id, {
      title,
      content,
      category_ids,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error when calling updatePost', error);
    res.status(500).json({ message: 'System error' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid post id' });
    }

    const deleted = await PostModel.remove(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('Error when calling deletePost', error);
    res.status(500).json({ message: 'System error' });
  }
};
