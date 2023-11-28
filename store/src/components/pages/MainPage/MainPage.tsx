import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>online shop</h1>
      <p>Welcome to our online shop!</p>
      <p>Please, login to see products</p>
      <button onClick={() => navigate('/login')}>login</button>
      <button onClick={() => navigate('/register')}>register</button>
    </div>
  );
};

export default MainPage;
