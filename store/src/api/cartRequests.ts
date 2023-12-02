import { BASE_URL } from '../constants/apiConstants';
import { CartData, ErrorResponce, isError } from '../types/apiTypes';
import ValidationError from '../utils/customError/ValidationError';
import tokenStorageInstance from '../utils/tokenStorage/tokenStorage';

type SuccessCartResponce = {
  data: CartData;
  error: null;
};

type SuccessCartDeletionResponce = {
  data: { success: true };
  error: null;
};

const cartUrl = `${BASE_URL}/profile/cart`;

const getCart = async () => {
  try {
    const responce = await fetch(cartUrl, {
      headers: { Authorization: `Bearer ${tokenStorageInstance.getToken()}` },
    });

    const data: SuccessCartResponce | ErrorResponce = await responce.json();
    if (isError(data)) {
      throw new ValidationError(data.error.message, responce.status);
    }
    return data.data;
  } catch (error) {
    throw error;
  }
};

const updateCart = async (productId: string, count: number) => {
  const body = {
    productId,
    count,
  };
  try {
    const responce = await fetch(cartUrl, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${tokenStorageInstance.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    const data: SuccessCartResponce | ErrorResponce = await responce.json();
    if (isError(data)) {
      throw new ValidationError(data.error.message, responce.status);
    }
    return data.data;
  } catch (error) {
    throw error;
  }
};

const deleteCart = async () => {
  try {
    const responce = await fetch(cartUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${tokenStorageInstance.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    const data: SuccessCartDeletionResponce | ErrorResponce =
      await responce.json();
    if (isError(data)) {
      throw new ValidationError(data.error.message, responce.status);
    }
  } catch (error) {
    throw error;
  }
};

export { getCart, updateCart, deleteCart };
