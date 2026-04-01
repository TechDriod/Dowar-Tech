import React from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-400 text-lg">{error}</p>
        <p className="text-gray-500 mt-2">Please try again later</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎮</div>
        <p className="text-gray-300 text-xl font-gaming mb-2">No Products Found</p>
        <p className="text-gray-500">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
