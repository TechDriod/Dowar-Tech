import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiCpu, FiHardDrive } from 'react-icons/fi';
import { BsGpuCard } from 'react-icons/bs';
import { useCart } from '../context/CartContext';

const categoryColors = {
  Budget: 'bg-lime-500/10 text-lime-400 border-lime-500/30',
  'Mid-Range': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  'High-End': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  Ultra: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
};

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          size={12}
          className={star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
          fill={star <= Math.round(rating) ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product._id);

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="card-gaming group overflow-hidden flex flex-col h-full">
      {/* Image */}
      <Link to={`/products/${product._id}`} className="relative overflow-hidden block">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/400x300'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300'; }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-md border ${categoryColors[product.category] || 'bg-gray-700 text-gray-300'}`}>
            {product.category}
          </span>
          {discount > 0 && (
            <span className="text-xs font-bold px-2 py-1 rounded-md bg-red-500/90 text-white">
              -{discount}%
            </span>
          )}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-gaming text-sm font-bold border border-red-500 px-3 py-1 rounded">OUT OF STOCK</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/products/${product._id}`}>
          <h3 className="font-gaming text-sm font-bold text-white hover:text-purple-400 transition-colors mb-2 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Specs */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <BsGpuCard className="text-purple-400 flex-shrink-0" size={13} />
            <span className="truncate">{product.gpu}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FiCpu className="text-cyan-400 flex-shrink-0" size={13} />
            <span className="truncate">{product.cpu}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <FiHardDrive className="text-lime-400 flex-shrink-0" size={13} />
            <span className="truncate">{product.ram} · {product.storage}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 mb-4 mt-auto">
          <span className="text-xl font-bold text-white">${product.price.toLocaleString()}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => product.inStock && addToCart(product)}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200
            ${product.inStock
              ? inCart
                ? 'bg-green-600/20 border border-green-500 text-green-400 hover:bg-green-600/30'
                : 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-neon-purple'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
        >
          <FiShoppingCart size={15} />
          {!product.inStock ? 'Out of Stock' : inCart ? 'In Cart ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
