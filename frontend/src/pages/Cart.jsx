import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiArrowRight } from 'react-icons/fi';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const TAX_RATE = 0.08;
  const subtotal = cartTotal;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const shipping = subtotal >= 1000 ? 0 : subtotal > 0 ? 9.99 : 0;
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="font-gaming text-2xl font-bold text-white mb-3">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't added any gaming PCs yet.</p>
        <Link to="/products" className="btn-primary inline-flex items-center gap-2">
          Browse Gaming PCs <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-gaming text-3xl font-bold text-white">Shopping Cart</h1>
        <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-400 transition-colors">
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-dark-800 border border-gray-700 rounded-2xl p-6 sticky top-24">
            <h2 className="font-gaming text-lg font-bold text-white mb-5">Order Summary</h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal ({cartItems.length} items)</span>
                <span className="text-white">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax (8%)</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span className={shipping === 0 ? 'text-green-400 font-medium' : 'text-white'}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {subtotal > 0 && subtotal < 1000 && (
                <p className="text-xs text-gray-500 bg-dark-700 rounded-lg p-2">
                  Add ${(1000 - subtotal).toLocaleString()} more for free shipping!
                </p>
              )}
              <div className="border-t border-gray-700 pt-3 flex justify-between">
                <span className="font-bold text-white">Total</span>
                <span className="font-bold text-xl text-white">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {isAuthenticated ? (
              <button
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-base"
              >
                Proceed to Checkout <FiArrowRight />
              </button>
            ) : (
              <div className="space-y-3">
                <Link to="/login" state={{ from: '/checkout' }}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-base">
                  Login to Checkout <FiArrowRight />
                </Link>
                <p className="text-center text-xs text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-purple-400 hover:text-purple-300">Sign up</Link>
                </p>
              </div>
            )}

            <Link to="/products" className="block text-center text-sm text-gray-400 hover:text-gray-300 mt-4 transition-colors">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
