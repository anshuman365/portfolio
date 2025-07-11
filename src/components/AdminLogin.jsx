import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { verifyAdmin } from '../config/apiService';

const AdminLogin = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!apiUrl || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const result = await verifyAdmin(apiUrl, password);
      if (result.success && result.token) {
        localStorage.setItem('adminToken', result.token);
        localStorage.setItem('backendUrl', apiUrl);
        navigate('/admin/dashboard');
      } else {
        setError(result.message || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the backend. Check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Access your portfolio dashboard
            </p>
          </div>
          
          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="apiUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Backend API URL
              </label>
              <input
                type="text"
                id="apiUrl"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://your-backend-url.com/api"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition flex justify-center items-center"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? 'Authenticating...' : 'Login'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;