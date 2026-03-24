import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import { createOrder } from '../api/api';
import { useState } from 'react';

export default function Cart() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      setError("Please sign in to place an order.");
      return;
    }
    
    setPlacingOrder(true);
    setError('');
    
    try {
      const orderData = {
        user_id: user.id,
        items: items.map(i => ({ product_id: i.id, quantity: i.quantity }))
      };
      const res = await createOrder(orderData);
      clearCart();
      navigate('/success');
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  // Order success page is now handled via /success route

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-8xl mb-6 opacity-50">🛒</div>
        <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
        <p className="text-text-muted mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items List */}
        <div className="flex-1 space-y-4">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96">
          <div className="glass rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-text-muted">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="pt-4 border-t border-border flex justify-between text-lg font-bold text-white">
                <span>Total</span>
                <span className="text-accent">${total.toFixed(2)}</span>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm mb-6">
                {error}
              </div>
            )}

            {!user ? (
              <Link to="/login" className="block w-full py-3 text-center bg-surface-light hover:bg-border text-white rounded-xl font-medium transition-colors">
                Sign in to Checkout
              </Link>
            ) : (
              <button
                onClick={handleCheckout}
                disabled={placingOrder}
                className="w-full py-4 text-center bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {placingOrder ? "Processing..." : "Checkout"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
