import React from 'react';

const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-16 h-16 border-3',
    xl: 'w-24 h-24 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizeClasses[size]} border-dark-700 border-t-purple-500 border-r-cyan-400 rounded-full animate-spin`}
        style={{ boxShadow: '0 0 15px rgba(181, 55, 242, 0.4)' }}
      />
      {text && <p className="text-gray-400 text-sm font-gaming animate-pulse">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
