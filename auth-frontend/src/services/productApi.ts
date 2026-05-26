import api from './api';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number | null;
  imageUrl: string | null;
  images: string[];
  sku: string | null;
  stock: number;
  status: string;
  isActive: boolean;
  category: string | null;
  tags: string[];
  weight: number | null;
  createdAt: string;
  updatedAt: string;
};

export interface CreateProductData {
  title: string;
  description: string;
  price?: number;
  imageUrl?: string;
  images?: string[];
  sku?: string;
  stock?: number;
  status?: string;
  isActive?: boolean;
  category?: string;
  tags?: string[];
  weight?: number;
}

// GET tous les produits (admin)
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

// GET produits actifs (public)
export const getActiveProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products/active');
  return response.data;
};

// GET un produit
export const getProduct = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// POST créer un produit
export const createProduct = async (data: CreateProductData): Promise<Product> => {
  const response = await api.post('/products', data);
  return response.data;
};

// PUT modifier un produit
export const updateProduct = async (id: number, data: Partial<CreateProductData>): Promise<Product> => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

// DELETE supprimer un produit
export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};