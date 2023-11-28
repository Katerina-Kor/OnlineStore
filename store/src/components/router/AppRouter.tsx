import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ProductsListPage from '../pages/ProductsListPage/ProductsListPage';

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/products" element={<ProductsListPage />} />
      <Route path="*" element={<div>Sorry, something went wrong...</div>} />
    </Routes>
  );
};

export default AppRouter;
