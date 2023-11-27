import { BASE_URL } from '../constants/apiConstants';
import tokenStorageInstance from '../utils/tokenStorage/tokenStorage';

type LoginData = {
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

    const data: LoginData = await responce.json();
    tokenStorageInstance.setToken(data.data.token);
  } catch (error) {
    console.log('error');
    throw error;
  }
};

export default login;
