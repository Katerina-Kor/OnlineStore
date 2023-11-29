import { FC, useEffect, useState } from 'react';
import { ProductData } from '../../types/apiTypes';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../api/productsRequest';

const DetailedProductCard: FC = () => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const { productId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getProductById(productId || '');
        setProduct(responce);
      } catch (e) {
        // TODO:
        // handle errors
      }
    };

    fetchData();
  }, [productId]);

  return (
    <div>
      <h3>detailed product</h3>
      {product ? (
        <>
          <p>{product.title}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailedProductCard;
