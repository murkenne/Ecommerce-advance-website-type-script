
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';

export default function ProductList() {
  const dispatch = useDispatch();
  const { category } = useParams();
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : 'https://fakestoreapi.com/products';
      const response = await fetch(url);
      return response.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navigation />
      <div className="products-grid">
        {products?.map((product: Product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="category">{product.category}</p>
            <p className="description">{product.description}</p>
            <div className="product-footer">
              <p className="price">${product.price}</p>
              <button onClick={() => dispatch(addToCart(product))}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
