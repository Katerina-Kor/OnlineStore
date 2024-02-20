import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import DetailedProductPage from '../pages/DetailedProductPage/DetailedProductCard/DetailedProductPage';
import CartPage from '../pages/CartPage/CartPage';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="products">
        <Route index element={<CatalogPage />} />
        <Route path=":productId" element={<DetailedProductPage />} />
      </Route>
      <Route path="cart" element={<CartPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
