import type { Category } from './Category.type';

export type Post = {
  id: number;
  title: string;
  content: string;
  updated_at: string;
  created_at: string;
  categories: Category[];
};
