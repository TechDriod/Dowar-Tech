import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 bg-dark-800 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors">
      {/* Image */}
      <Link to={`/products/${item._id}`} className="flex-shrink-0">
        <img
          src={item.imageUrl || 'https://via.placeholder.com/80x60'}
          alt={item.name}
          className="w-20 h-16 object-cover rounded-lg"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/80x60'; }}
        />
      </Link>

      {/* Info */}
      <div className="flex-grow min-w-0">
        <Link to={`/products/${item._id}`}>
          <h3 className="font-gaming text-sm font-bold text-white hover:text-purple-400 transition-colors truncate">
            {item.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-400 mt-0.5">{item.gpu} · {item.cpu}</p>
        <p className="text-sm font-bold text-purple-400 mt-1">${item.price.toLocaleString()}</p>
      </div>

      {/* Qty controls */}
      <div className="flex flex-col items-end gap-3">
        <button
          onClick={() => removeFromCart(item._id)}
          className="text-gray-500 hover:text-red-400 transition-colors"
          title="Remove item"
        >
          <FiTrash2 size={16} />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item._id, item.qty - 1)}
            className="w-7 h-7 rounded-lg bg-dark-700 border border-gray-600 hover:border-purple-500 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <FiMinus size={12} />
          </button>
          <span className="w-8 text-center text-white font-semibold text-sm">{item.qty}</span>
          <button
            onClick={() => updateQuantity(item._id, item.qty + 1)}
            className="w-7 h-7 rounded-lg bg-dark-700 border border-gray-600 hover:border-purple-500 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <FiPlus size={12} />
          </button>
        </div>

        <p className="text-sm font-bold text-white">
          ${(item.price * item.qty).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
