
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { RootState } from '../store';
import { useState } from 'react';

export default function Cart() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    dispatch(clearCart());
    setCheckoutSuccess(true);
    setTimeout(() => setCheckoutSuccess(false), 3000);
  };

  if (checkoutSuccess) {
    return (
      <div className="alert alert-success" role="alert">
        Thank you for your purchase! Your cart has been cleared.
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="text-center mt-4">Your cart is empty</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Shopping Cart</h2>
      {items.map((item) => (
        <div key={item.id} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-2">
              <img 
                src={item.image} 
                className="img-fluid rounded-start p-2" 
                alt={item.title}
                style={{ height: '150px', objectFit: 'contain' }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">
                  ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                </p>
                <div className="d-flex align-items-center gap-2">
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  >
                    +
                  </button>
                  <button 
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>Total: ${total.toFixed(2)}</h4>
        <button 
          className="btn btn-success"
          onClick={handleCheckout}
        >
          Checkout ({items.length} items)
        </button>
      </div>
    </div>
  );
}