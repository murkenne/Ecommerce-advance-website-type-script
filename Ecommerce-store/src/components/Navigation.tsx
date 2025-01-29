
import { useQuery } from '@tanstack/react-query';

// Suppress sandbox attribute warning
console.warn = () => {};
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function Navigation() {
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      return response.json();
    }
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    if (category === 'all') {
      navigate('/');
    } else {
      navigate(`/category/${category}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">E-commerce Store</Link>
        <select 
          className="form-select mx-3" 
          style={{width: '200px'}}
          onChange={handleCategoryChange}
        >
          <option value="all">All Categories</option>
          {categories?.map((category: string) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <Link to="/cart" className="btn btn-outline-primary">
          Cart ({items.length})
        </Link>
      </div>
    </nav>
  );
}
