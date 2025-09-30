import { Router, Request, Response, NextFunction } from 'express';
import db from '../database/db';

const router = Router();

interface Post {
  id?: number;
  title: string;
  content?: string | null;
  category_id: number;
}

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as Post;
    const stmt = db.prepare('INSERT INTO posts (title, content, category_id) VALUES (?, ?,?)');

    const result = stmt.run(body.title, body.content ?? null, body.category_id);

    const insertedPost: Post = {
      id: Number(result.lastInsertRowid),
      title: body.title,
      content: body.content ?? null,
      category_id: body.category_id,
    };

    res.status(201).json({
      insertedPost,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const stmt = db.prepare('SELECT * FROM posts ORDER BY title');
    const posts = stmt.all() as Post[];
    res.status(201).json(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const stmt = db.prepare('SELECT * FROM posts WHERE id = ?');
    const post = stmt.get(id) as Post;
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    //Check if posts exists

    const stmt = db.prepare('SELECT * FROM posts WHERE Id = ?');
    const post = stmt.get(id) as Post;

    if (!post) {
      return res.status(400).json({ error: 'Post not found' });
    }

    const { title, content, category_id } = req.body as Partial<Post>;

    //Building dynamic querry
    const fields: string[] = [];
    const values: any[] = [];

    if (title !== undefined) {
      fields.push('title = ?');
      values.push(title);
    }

    if (content !== undefined) {
      fields.push('content = ?');
      values.push(content);
    }

    if (category_id !== undefined) {
      fields.push('category_id = ?');
      values.push(category_id);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const updateStmt = db.prepare(`UPDATE posts SET ${fields.join(', ')} WHERE id = ?`);
    updateStmt.run(...values, id);

    const updatedPost = stmt.get(id) as Post;

    res.status(200).json({ updatedPost });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    const stmt = db.prepare('DELETE FROM posts WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export const postsRouter = router;
