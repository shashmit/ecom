import { Product } from '../types/product';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

export const fetchProducts = async (offset: number = 0, limit: number = 10, title?: string): Promise<Product[]> => {
  try {
    let url = `${API_BASE_URL}/products?offset=${offset}&limit=${limit}`;
    if (title) {
      url += `&title=${encodeURIComponent(title)}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error; 
  }
};

export const fetchProductById = async (productId: number): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch product with id ${productId}:`, error);
    throw error;
  }
};