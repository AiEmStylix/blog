import sql from '../libs/db';
import type { Category } from '../types/Category.type';
import type { Post } from '../types/Post.type';

export const PostModel = {
  table: 'posts',

  async create(title: string, content: string, categoryIds: number[]) {
    const [post] = await sql`
    INSERT INTO ${sql(this.table)}
    (title, content) VALUES
    (${title}, ${content})
    RETURNING *`;

    //Insert into join table
    if (categoryIds.length > 0) {
      await sql`INSERT INTO post_categories (post_id, category_id)
      VALUES ${sql(categoryIds.map((id) => [post.id, id]))}`;
    }

    return post;
  },

  async findById(id: number) {
    const [post] = await sql`SELECT * FROM ${sql(this.table)} WHERE Id = ${id}`;

    const categoriesRow = await sql<Category[]>`
    SELECT pc.post_id, c.id AS category_id, c.name AS category_name, c.slug 
    FROM post_categories pc 
    JOIN categories c ON pc.category_id = c.id 
    WHERE pc.post_id = ${id}`;

    const postWithCategories = {
      ...post,
      categories: categoriesRow.map((c) => ({
        id: c.category_id,
        name: c.category_name,
        slug: c.slug,
      })),
    };
    return postWithCategories;
  },

  async findAll() {
    const posts = await sql<
      Post[]
    >`SELECT p.*, COALESCE(json_agg(json_build_object('id', c.id, 'name', c.name)) FILTER (WHERE c.id IS NOT NULL), '[]') AS categories 
    FROM posts p 
    LEFT JOIN post_categories pc ON pc.post_id = p.id 
    LEFT JOIN categories c ON c.id = pc.category_id GROUP BY p.id;`;
    return posts;
  },

  async update(id: number, data: Partial<Post>) {
    const { category_ids, ...fields } = data;

    //Filter the id and created_at fields
    const filteredFields = (Object.keys(fields) as (keyof typeof fields)[])
      .filter((key) => key !== 'id' && key !== 'created_at')
      .reduce((obj, key) => {
        obj[key] = fields[key];
        return obj;
      }, {} as Partial<Post>);

    const columns = Object.keys(filteredFields) as readonly (keyof typeof filteredFields)[];

    // Use a transaction to prevent failing
    await sql.begin(async (sql) => {
      // Update the fields in post table
      if (columns.length > 0) {
        await sql`UPDATE ${sql(this.table)} 
        SET ${sql(filteredFields, columns)} 
        WHERE id = ${id}`;
      }

      // Clear old categories
      await sql`DELETE FROM post_categories WHERE post_id = ${id}`;

      // Update the categories
      if (category_ids?.length) {
        await sql` INSERT INTO post_categories (post_id, category_id)
        VALUES ${sql(category_ids.map((c) => [id, c]))}`;
      }
    });

    const result = this.findById(id);
    return result;
  },

  async remove(id: number) {
    const result = await sql`DELETE FROM ${sql(this.table)} WHERE id = ${id}`;
    return result.count > 0;
  },
};
