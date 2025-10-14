import { Router, Request, Response, NextFunction } from 'express';
import sql from '../database/db';

const router = Router();

interface Post {
  id?: number;
  title: string;
  content?: string | null;
  category_id: number;
}

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as Post;

    const [post] = await sql`
      INSERT INTO posts ${sql(body, ['title', 'content', 'category_id'])} 
      RETURNING *
    `;
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await sql`SELECT * FROM posts_with_category ORDER BY id`;
    res.status(201).json(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const post = await sql`SELECT * FROM posts_with_category WHERE id = ${id}`;
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    //Check if posts exists
    const [post] = await sql`SELECT * FROM posts WHERE Id = ${id}`;

    if (!post) {
      return res.status(400).json({ error: 'Post not found' });
    }

    const body = req.body as Partial<Post>;
    type UpdatableField = 'title' | 'content' | 'category_id';
    const allowedFields: UpdatableField[] = ['title', 'content', 'category_id'];

    const fieldsToUpdate = allowedFields.filter((field) => field in body);

    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const updated = sql(`UPDATE posts SET ${sql(body, fieldsToUpdate)} WHERE id = ?`);

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    const deleted = await sql`DELETE FROM posts WHERE id = ${id}`;

    if (deleted.count === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export const postsRouter = router;
