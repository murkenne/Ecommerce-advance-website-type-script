import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import ProductList from './components/ProductList';
import Cart from './components/Cart'; 
import { Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <main className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/category/:category" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} /> {/* Added Cart route */}
          </Routes>
        </main>
      </QueryClientProvider>
    </Provider>
  );
}