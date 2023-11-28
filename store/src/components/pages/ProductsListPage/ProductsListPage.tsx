import { FC, useEffect, useState } from 'react';
import { getProductsList } from '../../../api/productsRequest';
import { ProductData } from '../../../types/apiTypes';

const ProductsListPage: FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
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

  return (
    <div>
      <h3>products list</h3>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <p>{product.title}</p>
            <p>{product.price}</p>
            <button>Add to card</button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductsListPage;
