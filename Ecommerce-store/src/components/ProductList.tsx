
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../store/cartSlice';
import { Product } from '../types';
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
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products?.map((product: Product) => (
          <div key={product.id} className="col">
            <div className="card h-100">
              <img 
                src={product.image} 
                className="card-img-top p-3" 
                alt={product.title}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-muted">{product.category}</p>
                <p className="card-text">{product.description}</p>
                <div className="mt-auto">
                  <p className="fs-4">${product.price}</p>
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
