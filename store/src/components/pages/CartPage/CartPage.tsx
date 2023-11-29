import { FC, useEffect, useState } from 'react';
import { getCart } from '../../../api/cartRequests';
import { CartData } from '../../../types/apiTypes';

const CartPage: FC = () => {
  const [cart, setCart] = useState<CartData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getCart();
        setCart(responce);
      } catch (e) {
        // TODO:
        // handle errors
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>cart</h3>
      {cart ? (
        <>
          {cart.cart.items.map((item) => (
            <div key={item.product.id}>
              <p>{item.product.title}</p>
              <p>{`Count: ${item.count}`}</p>
              <p>{`Price: ${item.product.price * item.count}`}</p>
            </div>
          ))}
          <p>{`Total: ${cart.total}`}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CartPage;
