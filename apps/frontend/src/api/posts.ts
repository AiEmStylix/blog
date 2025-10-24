import type { Post } from '@/types/Post.type';
import api from './axios';

type PostsResponse = {
  message: string;
  posts: Post[];
};

type PostResponse = {
  message: string;
  post: Post; // Single post, not array
};

export const PostApi = {
  getAll() {
    return api.get<PostsResponse>('/posts');
  },

  getById(id: number) {
    return api.get<PostResponse>(`/posts/${id}`);
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
