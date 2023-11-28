import { BASE_URL } from '../constants/apiConstants';

type RegisterData = {
  data: {
    id: string;
    email: string;
    role: "admin" | "user";
  } | null;
  error: {
    message: string;
  } | null;
};

const register = async (email: string, password: string) => {
  const body = {
    email,
    password,
    role: "admin"
  }
  const url = `${BASE_URL}/register`
  try {
    const responce = await fetch(url, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });
    const data: RegisterData = await responce.json();
    if (data.error) {
      throw new Error(data.error.message)
    }

  } catch (error) {
    console.log('register error')
    throw error;
  }
}

export default register;
