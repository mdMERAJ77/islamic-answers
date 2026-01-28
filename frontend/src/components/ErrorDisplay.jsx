// src/components/ErrorDisplay.jsx
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorDisplay = ({ error, onRetry }) => {
  const errorMessage = error?.response?.data?.error || 
                      error?.message || 
                      'Something went wrong. Please try again.';

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Unable to load content
        </h3>
        
        <p className="text-gray-700 mb-6 max-w-md mx-auto">
          {errorMessage}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
          
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-medium transition-colors"
          >
            Reload Page
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-red-100">
          <p className="text-sm text-gray-600">
            If problem persists, please check your connection
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;