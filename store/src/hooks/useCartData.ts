import { useEffect, useState } from "react";
import { ProductsInfoInCart } from "../types/apiTypes";
import { getCart } from "../api/cartRequests";

const getTotalItems = (itemsArr: ProductsInfoInCart[] | null) => {
  return itemsArr ? itemsArr.reduce((acc, item) => acc + item.count, 0) : null;
}

export const useCartData = () => {
  const [cartItems, setCartItems] = useState<ProductsInfoInCart[] | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (signal?: AbortSignal) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      const responce = await getCart(signal);
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
    const controller = new AbortController();
    setIsError(false);
    setError(null);
    fetchData(controller.signal);

    return () => {
      controller.abort();
    }
  }, [])

  return { cartItems, totalPrice, totalItems, error, isError, isLoading, receiveNewData };

}