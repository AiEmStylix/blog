import { Router, Request, Response, NextFunction } from 'express';
import db from '../database/db';
import slugify from '@sindresorhus/slugify';

const router = Router();

interface Category {
  id: number;
  name: string;
  slug: string;
}

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body || typeof req.body.name !== 'string' || req.body.name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const { name } = req.body;
    console.log(typeof name);
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

// GET /categories
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const stmt = db.prepare('SELECT * FROM categories ORDER BY name');
    const categories = stmt.all() as Category[];
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const stmt = db.prepare('SELECT * FROM categories WHERE Id = ?');
    const result = stmt.get(id) as Category;
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid category id' });
    }

    //Check if category exists
    const checkStmt = db.prepare('SELECT * FROM categories WHERE id = ?');
    const existing = checkStmt.get(id) as Category;

    if (!existing) {
      return res.status(404).json({ error: 'Category not found' });
    }

    let name = existing.name;
    let slug = existing.slug;

    const body: { name?: string } = req.body;
    if (body.name && body.name.trim() !== '') {
      name = body.name.trim();
      slug = slugify(name);
    }

    //Update to the db
    const stmt = db.prepare('UPDATE categories SET name = ?, slug = ? WHERE id = ?');
    const result = stmt.run(name, slug, id);

    const updatedCategory = checkStmt.get(id);
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid category id' });
    }

    const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
export const categoriesRouter = router;
