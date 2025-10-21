import type { Post } from './Post.type';

export type Category = {
  post_id: number | string;
  category_id: string;
  category_name: string;
  slug: string;
};

export type PostWithCategories = Post & {
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
};
