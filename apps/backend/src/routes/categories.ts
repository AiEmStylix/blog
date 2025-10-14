import { Router, Request, Response, NextFunction } from 'express';
import db from '../database/db';
import slugify from '@sindresorhus/slugify';
import sql from '../database/db';

const router = Router();

interface Category {
  id: number;
  name: string;
  slug: string;
}

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body || typeof req.body.name !== 'string' || req.body.name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' });
    }
    const { name } = req.body;
    console.log(typeof name);
    const slug = slugify(name);

    const [category] = await sql<Category[]>` INSERT INTO categories (name, slug)
      VALUES (${name}, ${slug})
      RETURNING id, name, slug`;

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

// GET /categories
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await sql<Category[]>`
    SELECT * FROM categories ORDER BY name`;

    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const [category] = await sql<Category[]>`SELECT * FROM categories WHERE id = ${id}
    `;
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.json(category);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid category id' });
    }

    //Check if category exists
    const [existing] = await sql<Category[]>`SELECT * FROM categories WHERE id = ${id}`;

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
    const [updated] = await sql<
      Category[]
    >`UPDATE categories SET name = ${name}, slug = ${slug} WHERE id = ${id}`;

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid category id' });
    }

    const result = await sql`DELETE FROM categories WHERE id = ${id}`;

    if (result.count === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
export const categoriesRouter = router;
