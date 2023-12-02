import { BASE_URL } from '../constants/apiConstants';
import { ErrorResponce, isError } from '../types/apiTypes';
import ValidationError from '../utils/customError/ValidationError';

type SuccessRegisterResponce = {
  data: {
    id: string;
    email: string;
    role: 'admin' | 'user';
  };
  error: null;
};

const register = async (email: string, password: string) => {
  const body = {
    email,
    password,
    role: 'admin',
  };
  const url = `${BASE_URL}/register`;
  try {
    const responce = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data: SuccessRegisterResponce | ErrorResponce = await responce.json();
    if (isError(data)) {
      throw new ValidationError(data.error.message, responce.status);
    }
  } catch (error) {
    throw error;
  }
};

export default register;
