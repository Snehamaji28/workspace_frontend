import React, { useState } from 'react';
import { ArrowRight, HelpCircle, X } from 'lucide-react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { doLogin } from '../services/ApiServices';

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);

  const isAuthenticated = Cookies.get('token');

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors
    try {
      const res = await doLogin({ employeeId, password });

      if (res.status === 200) {
        <Navigate to="/" />
        Cookies.set('token', res.data.token, { expires: 15 });
        console.log("Success!");

      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Something went wrong! Please try again.');
      console.log("Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHelpClick = () => {
    setShowHelpPopup(true);
  };

  const closeHelpPopup = () => {
    setShowHelpPopup(false);
  };

  return (
    <div className="min-h-screen p-3 bg-gray-900 text-gray-200 flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Rezime Workspace</h1>
        <div className="bg-gray-800 rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="employeeId" className="block text-sm font-medium mb-2">
                Employee ID
              </label>
              <input
                type="text"
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && (
              <div className="mb-4 text-red-500 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center mb-4"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : (
                <>
                  <span>Go to Workspace</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>
          <button
            onClick={handleHelpClick}
            className="w-full bg-gray-700 text-gray-300 py-2 px-4 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Need Help?</span>
          </button>
        </div>
      </div>
      {showHelpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-8 rounded-lg relative w-full max-w-md">
            <button
              onClick={closeHelpPopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold mb-4">Need Assistance?</h2>
            <p className="text-gray-200 text-lg mb-4">
              Please contact your HR department or IT department for help with your account or any other workplace-related issues.
            </p>
            <p className="text-gray-300">
              HR Contact: <a href="mailto:rezime.it@gmail.com" className="text-blue-400 hover:underline">rezime.it@gmail.com</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;