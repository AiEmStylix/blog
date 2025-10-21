import type { Request, Response } from 'express';
import { Category } from '../types/Category.type';
import { CategoryModel } from '../models/Category.model';

export const createNewCategory = async (req: Request, res: Response) => {
  try {
    const categoryName = req.body.name as string;

    if (!categoryName || typeof categoryName !== 'string') {
      return res.status(400).json({ message: 'Invalid name' });
    }
    const category = await CategoryModel.create(categoryName);
    return res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    console.error('Error when calling createNewCategory', error);
    res.status(500).json({ message: 'System error' });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.findAll();

    // Handle empty categories list
    if (!categories || categories.length <= 0) {
      return res.status(200).json({
        message: 'No categories found',
        categories: [],
      });
    }

    return res.status(200).json({ message: 'Categories retrieved succesfully', categories });
  } catch (error) {
    console.error('Error when calling getAllCategory', error);
    res.status(500).json({ message: 'System error' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid category id' });
    }
    const category = await CategoryModel.findById(id);

    return res.status(200).json({ message: 'Category retrieved successfully', category });
  } catch (error) {
    console.error('Error when calling getCategoryById', error);
    res.status(500).json({ message: 'System error' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const name = req.body.name;
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid category id' });
    }

    const updatedCategory = await CategoryModel.update(id, name);
    console.log(updatedCategory);
    return res.status(200).json({ message: 'Category retrieved successfully', updatedCategory });
  } catch (error) {
    console.error('Error when calling getCategoryById', error);
    res.status(500).json({ message: 'System error' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid post id' });
    }

    const deleted = await CategoryModel.remove(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('Error when calling deleteCategory', error);
    res.status(500).json({ message: 'System error' });
  }
};
