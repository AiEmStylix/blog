import slugify from '@sindresorhus/slugify';
import sql from '../libs/db';
import { Category } from '../types/Category.type';

export const CategoryModel = {
  table: 'categories',

  async create(name: string) {
    const newcategory = {
      name,
      slug: slugify(name),
    };
    const [category] = await sql<Category[]>`INSERT INTO ${sql(this.table)} ${sql(newcategory)}`;

    return category;
  },

  async findAll() {
    const categories = await sql<Category[]>`SELECT * FROM ${sql(this.table)}`;
    console.log(categories);
    return categories;
  },

  async findById(id: number) {
    const [post] = await sql<Category[]>`SELECT * FROM ${sql(this.table)} WHERE id = ${id}`;
    return post;
  },

  async update(id: number, name: string) {
    const updatedCategory = {
      name,
      slug: slugify(name),
    };
    const category = await sql<Category[]>`
    UPDATE ${sql(this.table)} SET ${sql(updatedCategory)} WHERE id = ${id}
    RETURNING *;
    `;
    return category;
  },

  async remove(id: number) {
    const result = await sql`DELETE FROM ${sql(this.table)} WHERE id = ${id}`;
    return result.count > 0;
  },
};
