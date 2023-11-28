import { BASE_URL } from '../constants/apiConstants';
import tokenStorageInstance from '../utils/tokenStorage/tokenStorage';

type LoginData = {
  data: { token: string } | null;
  error: { message: string } | null;
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

    const data: LoginData = await responce.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    data.data && tokenStorageInstance.setToken(data.data.token);
  } catch (error) {
    console.log('login error');
    throw error;
  }
};

export default login;
