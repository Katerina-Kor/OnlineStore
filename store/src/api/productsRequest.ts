import { BASE_URL } from '../constants/apiConstants';
import { ErrorResponce, ProductData, isError } from '../types/apiTypes';
import tokenStorageInstance from '../utils/tokenStorage/tokenStorage';

type SuccessProductsListResponce = {
  data: ProductData[];
  error: null;
};

type SuccessProductResponce = {
  data: ProductData;
  error: null;
};

const getProductsList = async () => {
  const url = `${BASE_URL}/products`;
  try {
    const responce = await fetch(url, {
      headers: { Authorization: `Bearer ${tokenStorageInstance.getToken()}` },
    });

    const data: SuccessProductsListResponce | ErrorResponce =
      await responce.json();
    if (isError(data)) {
      throw new Error(data.error.message);
    }
    return data.data;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (productId: string) => {
  const url = `${BASE_URL}/products/${productId}`;
  try {
    const responce = await fetch(url, {
      headers: { Authorization: `Bearer ${tokenStorageInstance.getToken()}` },
    });

    const data: SuccessProductResponce | ErrorResponce = await responce.json();
    if (isError(data)) {
      throw new Error(data.error.message);
    }
    return data.data;
  } catch (error) {
    throw error;
  }
};

export { getProductsList, getProductById };
