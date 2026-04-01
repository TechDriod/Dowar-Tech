import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiPackage, FiSettings } from 'react-icons/fi';
import { GiCircuitry } from 'react-icons/gi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark-800/95 backdrop-blur-md border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <GiCircuitry className="text-2xl text-purple-500 group-hover:text-cyan-400 transition-colors" />
            <span className="font-gaming text-xl font-bold">
              <span className="text-gradient-cyber">DOWAR</span>
              <span className="text-white"> TECH</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link to="/products" className="text-gray-300 hover:text-purple-400 font-medium transition-colors duration-200">
              Products
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-300 hover:text-cyan-400 transition-colors">
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-dark-700 border border-gray-600 hover:border-purple-500 rounded-lg px-3 py-1.5 transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm text-gray-300">{user?.name?.split(' ')[0]}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-gray-700 rounded-xl shadow-2xl py-1 animate-slide-in">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <Link to="/profile" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700 transition-colors">
                      <FiSettings size={16} /> Profile
                    </Link>
                    <Link to="/orders" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700 transition-colors">
                      <FiPackage size={16} /> My Orders
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-dark-700 transition-colors">
                      <FiLogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm py-1.5 px-4">Login</Link>
                <Link to="/signup" className="btn-primary text-sm py-1.5 px-4">Sign Up</Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-800 border-t border-gray-700 px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setMobileOpen(false)}
            className="block text-gray-300 hover:text-purple-400 font-medium py-2">Home</Link>
          <Link to="/products" onClick={() => setMobileOpen(false)}
            className="block text-gray-300 hover:text-purple-400 font-medium py-2">Products</Link>
          {!isAuthenticated && (
            <div className="flex gap-3 pt-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1 text-center text-sm py-2">Login</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 text-center text-sm py-2">Sign Up</Link>
            </div>
          )}
          {isAuthenticated && (
            <div className="space-y-2 pt-2 border-t border-gray-700">
              <Link to="/profile" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-gray-300 hover:text-white py-2">
                <FiUser size={16} /> Profile
              </Link>
              <Link to="/orders" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-gray-300 hover:text-white py-2">
                <FiPackage size={16} /> My Orders
              </Link>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="flex items-center gap-3 text-red-400 hover:text-red-300 py-2">
                <FiLogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
