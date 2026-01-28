// src/components/LoadingSpinner.jsx
const LoadingSpinner = ({ size = 'md', text = 'Loading...', fullScreen = false }) => {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-16 w-16 border-4'
  };

  const containerClass = fullScreen 
    ? 'flex flex-col items-center justify-center min-h-screen' 
    : 'flex flex-col items-center justify-center py-12';

  return (
    <div className={containerClass}>
      <div 
        className={`${sizes[size]} animate-spin rounded-full border-blue-200 border-t-blue-600`}
        role="status"
        aria-label="loading"
      ></div>
      {text && (
        <p className="mt-4 text-gray-600 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;