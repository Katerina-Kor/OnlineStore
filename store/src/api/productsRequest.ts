import { BASE_URL } from '../constants/apiConstants';
import tokenStorageInstance from '../utils/tokenStorage/tokenStorage';

type ProductsListResponce = {
  data: ProductData[] | null;
  error: { message: string } | null;
};

type ProductResponce = {
  data: ProductData | null;
  error: { message: string } | null;
};

type ProductData = {
  id: string;
  title: string;
  description: string;
  price: number;
};

const getProductsList = async () => {
  const url = `${BASE_URL}/products`;
  try {
    const responce = await fetch(url, {
      headers: { Authorization: `Bearer ${tokenStorageInstance.getToken()}` },
    });

    const data: ProductsListResponce = await responce.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.data || [];
  } catch (error) {
    console.log('products list error');
    throw error;
  }
};

const getProductById = async (productId: string) => {
  const url = `${BASE_URL}/products/${productId}`;
  try {
    const responce = await fetch(url, {
      headers: { Authorization: `Bearer ${tokenStorageInstance.getToken()}` },
    });

    const data: ProductResponce = await responce.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.data || {};
  } catch (error) {
    console.log('product by id error');
    throw error;
  }
};

export { getProductsList, getProductById };
