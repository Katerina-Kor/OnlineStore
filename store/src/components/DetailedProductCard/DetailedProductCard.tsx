import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../store/services/cartService';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Cover from '../Cover/Cover';
import { Stack, Typography } from '@mui/material';

const DetailedProductCard: FC = () => {
  const { productId = '' } = useParams();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { data: productData } = useGetProductQuery(productId, {
    skip: !isLoggedIn,
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const responce = await getProductById(productId || '');
  //       setProduct(responce);
  //     } catch (e) {
  //       // TODO:
  //       // handle errors
  //     }
  //   };

  //   fetchData();
  // }, [productId]);

  if (!isLoggedIn) {
    return <Cover isOpen />;
  }

  return (
    <Stack spacing={2} justifyContent={'center'}>
      <Typography
        component="h2"
        variant="h3"
        padding="20px"
        textAlign={'center'}
      >
        Product details
      </Typography>
      <Stack></Stack>
    </Stack>
    // <div>
    //   <h3>detailed product</h3>
    //   {product ? (
    //     <>
    //       <p>{product.title}</p>
    //       <p>{product.description}</p>
    //       <p>{product.price}</p>
    //     </>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>
  );
};

export default DetailedProductCard;
