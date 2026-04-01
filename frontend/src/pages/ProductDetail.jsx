import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiCpu, FiHardDrive, FiZap, FiBox, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { BsGpuCard } from 'react-icons/bs';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';
import ReviewSection from '../components/ReviewSection';
import LoadingSpinner from '../components/LoadingSpinner';

const SpecRow = ({ label, value, icon: Icon, iconColor }) => (
  <div className="flex items-center gap-3 py-3 border-b border-gray-700/50 last:border-0">
    {Icon && <Icon size={16} className={iconColor || 'text-purple-400'} />}
    <span className="text-gray-400 text-sm w-28 flex-shrink-0">{label}</span>
    <span className="text-white text-sm font-medium">{value}</span>
  </div>
);

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <FiStar key={star} size={16}
        className={star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-600'}
        fill={star <= Math.round(rating) ? 'currentColor' : 'none'}
      />
    ))}
    <span className="text-gray-400 text-sm ml-1">({rating})</span>
  </div>
);

const categoryColors = {
  Budget: 'bg-lime-500/10 text-lime-400 border-lime-500/30',
  'Mid-Range': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  'High-End': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  Ultra: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProduct(id);
        setProduct(res.data.product);
      } catch {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="xl" text="Loading product..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-red-400 text-xl mb-4">{error || 'Product not found'}</p>
        <button onClick={() => navigate('/products')} className="btn-primary">Back to Products</button>
      </div>
    );
  }

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      if (i === 0) addToCart(product, qty);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group">
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Image */}
        <div className="relative">
          <div className="bg-dark-800 border border-gray-700 rounded-2xl overflow-hidden">
            <img
              src={product.imageUrl || 'https://via.placeholder.com/600x450'}
              alt={product.name}
              className="w-full h-80 lg:h-[450px] object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/600x450'; }}
            />
          </div>
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white font-bold text-sm px-3 py-1 rounded-lg">
              -{discount}% OFF
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-md border ${categoryColors[product.category]}`}>
              {product.category}
            </span>
            {product.inStock ? (
              <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-md flex items-center gap-1">
                <FiCheck size={12} /> In Stock ({product.stockCount} left)
              </span>
            ) : (
              <span className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-md">Out of Stock</span>
            )}
          </div>

          <h1 className="font-gaming text-2xl lg:text-3xl font-bold text-white mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.rating} />
            <span className="text-gray-400 text-sm">{product.reviewCount} reviews</span>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6">{product.description}</p>

          {/* Price */}
          <div className="flex items-end gap-3 mb-6">
            <span className="text-4xl font-bold text-white">${product.price.toLocaleString()}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xl text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
            )}
            {discount > 0 && (
              <span className="text-lg text-green-400 font-semibold">Save ${(product.originalPrice - product.price).toLocaleString()}</span>
            )}
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: BsGpuCard, label: 'GPU', value: product.gpu, color: 'text-purple-400' },
              { icon: FiCpu, label: 'CPU', value: product.cpu, color: 'text-cyan-400' },
              { icon: FiHardDrive, label: 'RAM', value: product.ram, color: 'text-lime-400' },
              { icon: FiBox, label: 'Storage', value: product.storage, color: 'text-yellow-400' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-dark-700 border border-gray-700 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={14} className={color} />
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
                <span className="text-sm text-white font-medium">{value}</span>
              </div>
            ))}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex gap-3 mb-4">
            <div className="flex items-center bg-dark-700 border border-gray-700 rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-4 py-3 text-gray-400 hover:text-white hover:bg-dark-600 transition-colors text-lg font-bold">−</button>
              <span className="px-4 text-white font-semibold min-w-[3rem] text-center">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stockCount || 10, qty + 1))}
                className="px-4 py-3 text-gray-400 hover:text-white hover:bg-dark-600 transition-colors text-lg font-bold">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-grow flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-200 text-sm
                ${product.inStock
                  ? isInCart(product._id)
                    ? 'bg-green-600/20 border-2 border-green-500 text-green-400 hover:bg-green-600/30'
                    : 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-neon-purple'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
            >
              <FiShoppingCart size={18} />
              {!product.inStock ? 'Out of Stock' : isInCart(product._id) ? '✓ In Cart' : 'Add to Cart'}
            </button>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="bg-dark-700 border border-gray-700 rounded-xl p-4">
              <h3 className="font-gaming text-xs text-gray-400 uppercase tracking-wider mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <FiZap className="text-purple-400 flex-shrink-0" size={14} />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Full Specs Table */}
      <div className="bg-dark-800 border border-gray-700 rounded-2xl p-6 mb-8">
        <h2 className="font-gaming text-xl font-bold text-white mb-4">Full Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <SpecRow label="GPU" value={product.gpu} icon={BsGpuCard} iconColor="text-purple-400" />
          <SpecRow label="CPU" value={product.cpu} icon={FiCpu} iconColor="text-cyan-400" />
          <SpecRow label="RAM" value={product.ram} icon={FiHardDrive} iconColor="text-lime-400" />
          <SpecRow label="Storage" value={product.storage} icon={FiBox} iconColor="text-yellow-400" />
          {product.powerSupply && <SpecRow label="Power Supply" value={product.powerSupply} icon={FiZap} iconColor="text-orange-400" />}
          {product.cooling && <SpecRow label="Cooling" value={product.cooling} />}
          {product.motherboard && <SpecRow label="Motherboard" value={product.motherboard} />}
          {product.case && <SpecRow label="Case" value={product.case} />}
        </div>
      </div>

      {/* Reviews */}
      <ReviewSection productId={id} productRating={product.rating} reviewCount={product.reviewCount} />
    </div>
  );
};

export default ProductDetail;
