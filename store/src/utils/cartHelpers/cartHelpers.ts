import { ProductsInfoInCart } from '../../types/apiTypes';

export const getTotalItems = (itemsArr: ProductsInfoInCart[]) => {
  return itemsArr.reduce((acc, item) => acc + item.count, 0);
};

export const getProductNumberInCart = (
  cartItems: ProductsInfoInCart[],
  productId: string
) => {
  const product = cartItems.find(
    (cartItem) => cartItem.product.id === productId
  );
  return product?.count || 0;
};

export const isCartEmpty = (cartItems: ProductsInfoInCart[]) => {
  const arr = cartItems.filter((item) => item.count > 0);
  return arr.length === 0;
};
