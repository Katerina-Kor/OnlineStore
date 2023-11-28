import { BASE_URL } from '../constants/apiConstants';
import { ErrorResponce, isError } from '../types/apiTypes';
import tokenStorageInstance from '../utils/tokenStorage/tokenStorage';

type SuccessLoginResponce = {
  data: { token: string };
  error: null;
};

const login = async (email: string, password: string) => {
  const body = {
    email,
    password,
  };
  const url = `${BASE_URL}/login`;
  try {
    const responce = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const data: SuccessLoginResponce | ErrorResponce = await responce.json();
    if (isError(data)) {
      throw new Error(data.error.message);
    }
    data.data && tokenStorageInstance.setToken(data.data.token);
  } catch (error) {
    throw error;
  }
};

export default login;
