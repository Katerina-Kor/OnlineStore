import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import { ProductsInfoInCart } from '../../types/apiTypes';
import { useCartData } from '../../hooks/useCartData';
import { getCart } from '../../api/cartRequests';

type CartContextProviderProps = {
  children: ReactNode;
};

type CartContextType = {
  cartItems: ProductsInfoInCart[] | null;
  totalPrice: number | null;
  totalItems: number | null;
  error: Error | null;
  isError: boolean;
  isLoading: boolean;
}

export const CartContext = createContext<CartContextType>({
  cartItems: null,
  totalPrice: null,
  totalItems: null,
  error: null,
  isError: false,
  isLoading: false,
});
export const ReceiveNewCartDataContext = createContext<() => void>(
  () => {}
);

const getTotalItems = (itemsArr: ProductsInfoInCart[] | null) => {
  return itemsArr ? itemsArr.reduce((acc, item) => acc + item.count, 0) : null;
}

const CartContextProvider: FC<CartContextProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductsInfoInCart[] | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    try {
      const responce = await getCart();
      setCartItems(responce.cart.items);
      setTotalPrice(responce.total);
      setTotalItems(getTotalItems(responce.cart.items));
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
        setIsError(true);
      } else {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const receiveNewData = () => {
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <CartContext.Provider value={{
      cartItems,
      totalPrice,
      totalItems,
      error,
      isError,
      isLoading,
    }}>
      <ReceiveNewCartDataContext.Provider value={receiveNewData}>
        {children}
      </ReceiveNewCartDataContext.Provider>
    </CartContext.Provider>
  );
};



export default CartContextProvider;