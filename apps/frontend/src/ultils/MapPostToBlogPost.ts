import type { Post } from '@/types/Post.type';
import type { BlogPostProps } from '@nuxt/ui';

export function mapPostToBlogPost(post: Post): BlogPostProps {
  return {
    title: post.title,
    description: post.content.slice(0, 150) + '...', // short preview
    date: new Date(post.updated_at).toLocaleDateString(),
    to: `/posts/${post.id}`,
  };
}
