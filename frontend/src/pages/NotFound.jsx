import React from 'react';
import { Link } from 'react-router-dom';
import { GiCircuitry } from 'react-icons/gi';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Glitch effect 404 */}
        <div className="relative mb-8">
          <h1 className="font-gaming text-[8rem] sm:text-[12rem] font-black leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, #b537f2, #00f5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 30px rgba(181, 55, 242, 0.4))',
            }}>
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-10 -z-10 blur-2xl">
            <h1 className="font-gaming text-[12rem] font-black text-purple-500">404</h1>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <GiCircuitry className="text-3xl text-purple-500" />
          <span className="font-gaming text-xl text-gradient-cyber">SIGNAL LOST</span>
        </div>

        <h2 className="font-gaming text-2xl text-white mb-3">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
          The page you're looking for has been disconnected from the grid. Let's get you back to the action.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2 py-3 px-8">
            Back to Home Base
          </Link>
          <Link to="/products" className="btn-secondary flex items-center justify-center gap-2 py-3 px-8">
            Browse Gaming PCs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
