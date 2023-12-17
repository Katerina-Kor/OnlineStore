import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import DetailedProductCard from '../DetailedProductCard/DetailedProductCard';
import CartPage from '../pages/CartPage/CartPage';
import CatalogPage from '../pages/CatalogPage/CatalogPage';

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="products">
        <Route index element={<CatalogPage />} />
        <Route path=":productId" element={<DetailedProductCard />} />
      </Route>
      <Route path="cart" element={<CartPage />} />
      <Route path="*" element={<div>Sorry, something went wrong...</div>} />
    </Routes>
  );
};

export default AppRouter;
