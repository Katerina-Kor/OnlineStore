import { FC, useContext, useEffect, useState } from 'react';
import { getProductsList } from '../../../api/productsRequest';
import { ProductData } from '../../../types/apiTypes';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { updateCart } from '../../../api/cartRequests';
import { Button, Link, Stack, Typography } from '@mui/material';
import { AuthContext, ChangeAuthContext } from '../../context/AuthContext';
import ValidationError from '../../../utils/customError/ValidationError';
import { CartContext, ReceiveNewCartDataContext } from '../../context/CartContext';

const ProductsListPage: FC = () => {
  const [products, setProducts] = useState<ProductData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isLogged = useContext(AuthContext);
  const changeLoginStatus = useContext(ChangeAuthContext);
  // const {cartItems, totalItems, isError} = useContext(CartContext);
  // const receiveNewData = useContext(ReceiveNewCartDataContext)
  // console.log(cartItems, totalItems, isError)

  useEffect(() => {
    if (!isLogged) return;
    const fetchData = async () => {
      try {
        const responce = await getProductsList();
        setProducts(responce);
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

  const addToCart = async (productId: string) => {
    try {
      await updateCart(productId, 1);
      // receiveNewData();
    } catch (error) {}
  };

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
    <Stack spacing={2} justifyContent={'center'}>
      <Typography
        component="h2"
        variant="h3"
        padding="20px"
        textAlign={'center'}
      >
        Products list
      </Typography>
      {products ? (
        products.map((product) => (
          <Stack
            padding={1}
            spacing={1}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{ border: '1px solid gray', borderRadius: '5px' }}
            key={product.id}
            onClick={(event) => {
              if (event.target instanceof HTMLButtonElement) return;
              navigate(`/products/${product.id}`);
            }}
          >
            <Typography variant="body1" textAlign={'center'}>
              {product.title}
            </Typography>
            <Typography variant="body1" textAlign={'center'}>
              {product.price}
            </Typography>
            <Button
              onClick={() => addToCart(product.id)}
              variant="outlined"
              type="button"
              sx={{ width: 'fit-content' }}
            >
              Add to card
            </Button>
          </Stack>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Stack>
  );
};

export default ProductsListPage;
