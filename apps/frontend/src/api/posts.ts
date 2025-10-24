import type { Post } from '@/types/Post.type';
import api from './axios';

type PostResponse = {
  message: string;
  posts: Post[];
};

export const PostApi = {
  getAll() {
    return api.get<PostResponse>('/posts');
  },

  create(payload: { title: string; content: string; category_ids: number[] }) {
    return api.post('/posts', payload);
  },

  upload(id: number, payload: any) {
    return api.patch(`/posts/${id}`, payload);
  },

  delete(id: number) {
    return api.delete(`/posts/${id}`);
  },
};
