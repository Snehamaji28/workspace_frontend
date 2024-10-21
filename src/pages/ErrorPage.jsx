import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      
      <main className={`transition-all duration-300 md:ml-20`}>
        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
              <div className="h-1 w-16 bg-blue-600 mx-auto mb-6"></div>
              <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
              <p className="text-gray-400 mb-8">
                Oops! It seems like you've wandered into unknown territory. 
                The page you're looking for doesn't exist or has been moved.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full"
                >
                  Return to Dashboard
                </button>
                
                <button
                  onClick={() => navigate(-1)}
                  className="bg-gray-800 text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors w-full"
                >
                  Go Back
                </button>
              </div>
            </div>

            <div className="mt-12">
              <div className="inline-flex items-center text-gray-400">
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  If you believe this is an error, please contact support
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;