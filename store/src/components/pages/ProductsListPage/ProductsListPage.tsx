import { FC, useEffect, useState } from 'react';
import { getProductsList } from '../../../api/productsRequest';
import { ProductData } from '../../../types/apiTypes';
import { useNavigate } from 'react-router-dom';
import { updateCart } from '../../../api/cartRequests';

const ProductsListPage: FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await getProductsList();
        setProducts(responce);
      } catch (e) {
        // TODO:
        // handle errors
      }
    };

    fetchData();
  }, []);

  const addToCart = async (productId: string) => {
    try {
      await updateCart(productId, 1);
    } catch (error) {}
  };

  return (
    <div>
      <h3>products list</h3>
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            onClick={(event) => {
              if (event.target instanceof HTMLButtonElement) return;
              navigate(`/products/${product.id}`);
            }}
          >
            <p>{product.title}</p>
            <p>{product.price}</p>
            <button onClick={() => addToCart(product.id)}>Add to card</button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductsListPage;
