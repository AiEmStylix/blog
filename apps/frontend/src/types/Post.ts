export interface Post {
  id: number;
  title: string;
  content: string;
  category_id: number;
  image?: string;
  created_at: string;
  category_name?: string;
  category_slug?: string;
}
