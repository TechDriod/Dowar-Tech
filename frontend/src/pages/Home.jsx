import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiTruck, FiHeadphones, FiZap } from 'react-icons/fi';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const CATEGORIES = [
  { name: 'Budget', range: 'Under $999', icon: '🎯', color: 'from-lime-500/20 to-lime-500/5', border: 'border-lime-500/30', text: 'text-lime-400' },
  { name: 'Mid-Range', range: '$999 - $1,499', icon: '⚡', color: 'from-cyan-500/20 to-cyan-500/5', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  { name: 'High-End', range: '$1,499 - $2,000', icon: '🔥', color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30', text: 'text-purple-400' },
  { name: 'Ultra', range: '$2,000+', icon: '👑', color: 'from-yellow-500/20 to-yellow-500/5', border: 'border-yellow-500/30', text: 'text-yellow-400' },
];

const FEATURES = [
  { icon: FiTruck, title: 'Free Shipping', desc: 'Free on orders over $1,000', color: 'text-cyan-400' },
  { icon: FiShield, title: '3-Year Warranty', desc: 'Full parts & labor coverage', color: 'text-purple-400' },
  { icon: FiHeadphones, title: '24/7 Support', desc: 'Expert gaming PC support', color: 'text-lime-400' },
  { icon: FiZap, title: 'Fast Assembly', desc: 'Ships within 2 business days', color: 'text-yellow-400' },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await getProducts({ limit: 4, sort: 'rating' });
        setFeaturedProducts(res.data.products);
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-gaming hero-scanline">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/5 rounded-full blur-3xl" />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'linear-gradient(rgba(181,55,242,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(181,55,242,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-purple-300 text-sm font-medium">Premium Gaming PCs</span>
            </div>

            <h1 className="font-gaming text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="text-white">POWER YOUR</span>
              <br />
              <span className="text-gradient-cyber">GAMING</span>
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl mb-8 max-w-xl leading-relaxed">
              Unleash maximum performance with our hand-built gaming PCs. From budget warriors to ultra-high-end beasts — your perfect rig awaits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:shadow-neon-purple text-lg group">
                Shop All PCs
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/products?category=Ultra"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-bold py-4 px-8 rounded-xl transition-all duration-200 text-lg">
                View Ultra Builds
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              {[{ label: 'PCs Sold', value: '10K+' }, { label: 'Happy Gamers', value: '9.8K+' }, { label: 'Warranty', value: '3 Years' }].map(({ label, value }) => (
                <div key={label}>
                  <div className="font-gaming text-2xl font-bold text-gradient-cyber">{value}</div>
                  <div className="text-gray-400 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-gaming text-3xl font-bold text-white mb-3">Shop by Category</h2>
          <p className="text-gray-400">Find the perfect PC for your budget and needs</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.name} to={`/products?category=${cat.name}`}
              className={`bg-gradient-to-br ${cat.color} border ${cat.border} rounded-xl p-6 hover:scale-105 transition-all duration-300 group text-center`}>
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className={`font-gaming text-lg font-bold ${cat.text} mb-1`}>{cat.name}</h3>
              <p className="text-gray-400 text-sm">{cat.range}</p>
              <div className={`flex items-center justify-center gap-1 mt-3 ${cat.text} text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity`}>
                Shop Now <FiArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-gaming text-3xl font-bold text-white mb-1">Top Rated PCs</h2>
            <p className="text-gray-400">Highly rated by our community</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors group">
            View All <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/products" className="btn-secondary inline-flex items-center gap-2">
            View All Products <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-dark-800 border border-gray-700 rounded-xl p-6 text-center hover:border-gray-600 transition-colors">
              <Icon size={32} className={`${color} mx-auto mb-4`} />
              <h3 className="font-semibold text-white mb-1">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-r from-purple-900/40 to-cyan-900/20 border border-purple-500/20 rounded-2xl p-10 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500" />
          <h2 className="font-gaming text-3xl font-bold text-white mb-4">Ready to Level Up?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Browse our full lineup and find your perfect gaming PC today. Free shipping on orders over $1,000.
          </p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:shadow-neon-purple text-lg group">
            Build Your Setup <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
