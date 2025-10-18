import type { Category } from '@/types/Category';
import api from './axios';

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>('/categories');
  return res.data;
};

export const createCategory = async (
  category: Omit<Category, 'id' | 'slug'>,
): Promise<Category> => {
  const res = await api.post<Category>('/categories', category);
  return res.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
