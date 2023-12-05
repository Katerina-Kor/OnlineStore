import { FC, useContext, useEffect, useState } from 'react';
import { getCart } from '../../../api/cartRequests';
import { CartData } from '../../../types/apiTypes';
import { AuthContext, ChangeAuthContext } from '../../context/AuthContext';
import ValidationError from '../../../utils/customError/ValidationError';
import { Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CartPage: FC = () => {
  const [cart, setCart] = useState<CartData>();
  const [error, setError] = useState<string | null>(null);
  const isLogged = useContext(AuthContext);
  const changeLoginStatus = useContext(ChangeAuthContext);

  useEffect(() => {
    if (!isLogged) return;
    const fetchData = async () => {
      try {
        const responce = await getCart();
        setCart(responce);
      } catch (e) {
        if (e instanceof ValidationError) {
          if (e.statusCode === 401) {
            changeLoginStatus(false);
          } else {
            setError(e.message);
          }
        } else if (e instanceof Error) {
          setError(e.message);
        } else {
          throw error;
        }
      }
    };

    fetchData();
  }, []);

  if (!isLogged) {
    return (
      <Stack spacing={2} justifyContent={'center'}>
        <Link component={RouterLink} to="/login" variant="h5">
          Please, login to continue
        </Link>
      </Stack>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

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
