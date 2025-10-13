import type { Post } from '@/types/Post';
import api from './axios';

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await api.get<Post[]>('/posts');
  return res.data;
};

export const getPostsById = async (id: string) => {
  const res = await api.get<Post>(`/posts/${id}`);
  return res.data;
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const res = await api.post<Post>('/posts', post);
  return res.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

export const updatePost = async (id: number, post: Partial<Post>): Promise<Post> => {
  const res = await api.patch(`/posts/${id}`, post);
  return res.data;
};
