import { Router, Request, Response, NextFunction } from 'express';
import db from '../database';
import slugify from '@sindresorhus/slugify';

const router = Router();

// GET /categories
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const stmt = db.prepare('SELECT * FROM categories ORDER BY name');
    const categories = stmt.all();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const slug = slugify(name);
    const stmt = db.prepare('INSERT INTO categories (name, slug) VALUES (?, ?)');
    const result = stmt.run(name, slug);

    res.status(201).json({
      id: result.lastInsertRowid,
      name,
      slug,
    });
  } catch (error) {
    next(error);
  }
});
export const categoriesRouter = router;
