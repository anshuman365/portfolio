import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchPortfolioData, updatePortfolioData, uploadFile } from '../config/apiService';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [apiUrl, setApiUrl] = useState(localStorage.getItem('backendUrl') || '');
  const [portfolioData, setPortfolioData] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) navigate('/admin');
  }, [token, navigate]);

  const connectToBackend = async () => {
    setStatus('Connecting...');
    setError('');
    setLoading(true);
    
    try {
      const data = await fetchPortfolioData(apiUrl, token);
      if (data.error) throw new Error(data.error);
      
      setPortfolioData(data);
      setStatus('Connected successfully!');
      localStorage.setItem('backendUrl', apiUrl);
    } catch (err) {
      setError(err.message || 'Failed to connect');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setStatus('Saving...');
    setError('');
    setLoading(true);
    
    try {
      const result = await updatePortfolioData(apiUrl, token, portfolioData);
      if (!result.success) throw new Error(result.message);
      
      setStatus('Saved successfully!');
    } catch (err) {
      setError(err.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file, type, index = null) => {
    setStatus('Uploading image...');
    
    try {
      const result = await uploadFile(apiUrl, token, file);
      if (!result.success) throw new Error(result.error);
      
      const newData = { ...portfolioData };
      
      if (type === 'profile') {
        newData.profile_image = result.filename;
      } else if (type === 'project' && index !== null) {
        newData.projects[index].image = result.filename;
      }
      
      setPortfolioData(newData);
      setStatus('Image uploaded!');
    } catch (err) {
      setError(err.message || 'Upload failed');
    }
  };

  const handleChange = (e, section, field, index = null) => {
    const newData = { ...portfolioData };
    
    if (index !== null) {
      newData[section][index][field] = e.target.value;
    } else if (section && field) {
      newData[section][field] = e.target.value;
    } else {
      newData[field] = e.target.value;
    }
    
    setPortfolioData(newData);
  };

  const addProject = () => {
    const newData = { ...portfolioData };
    newData.projects.push({
      id: Date.now(),
      title: "New Project",
      description: "Project description",
      tags: [],
      image: ""
    });
    setPortfolioData(newData);
  };

  const removeProject = (index) => {
    const newData = { ...portfolioData };
    newData.projects.splice(index, 1);
    setPortfolioData(newData);
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <button 
              onClick={() => {
                localStorage.removeItem('adminToken');
                navigate('/admin');
              }}
              className="text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Backend URL
              </label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                placeholder="https://your-backend-url.com"
              />
            </div>
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={connectToBackend}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition flex justify-center items-center"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? 'Connecting...' : 'Connect'}
              </motion.button>
            </div>
          </div>
          
          {(status || error) && (
            <div className={`p-3 rounded-md mb-4 ${error ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'}`}>
              {error || status}
            </div>
          )}
        </motion.div>

        {portfolioData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Portfolio</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Save All Changes
              </motion.button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Profile Info</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={portfolioData.name}
                      onChange={(e) => handleChange(e, null, 'name')}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={portfolioData.title}
                      onChange={(e) => handleChange(e, null, 'title')}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0], 'profile')}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                    {portfolioData.profile_image && (
                      <div className="mt-2">
                        <img 
                          src={`${apiUrl}/uploads/${portfolioData.profile_image}`} 
                          alt="Profile" 
                          className="w-32 h-32 rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Sections</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(portfolioData.sections).map(([key, value]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleChange(e, 'sections', key)}
                        className="mr-2 h-4 w-4 text-indigo-600 rounded"
                      />
                      <span className="text-gray-700 dark:text-gray-300 capitalize">{key}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Projects</h3>
                <button 
                  onClick={addProject}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  + Add Project
                </button>
              </div>
              
              <div className="space-y-6">
                {portfolioData.projects.map((project, index) => (
                  <div key={project.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Project #{index + 1}</h4>
                      <button 
                        onClick={() => removeProject(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => handleChange(e, 'projects', 'title', index)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Project Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files[0], 'project', index)}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md"
                        />
                        {project.image && (
                          <div className="mt-2">
                            <img 
                              src={`${apiUrl}/uploads/${project.image}`} 
                              alt={project.title} 
                              className="w-full h-32 object-cover rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) => handleChange(e, 'projects', 'description', index)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                        rows="3"
                      ></textarea>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={project.tags.join(', ')}
                        onChange={(e) => {
                          const tags = e.target.value.split(',').map(tag => tag.trim());
                          const newData = { ...portfolioData };
                          newData.projects[index].tags = tags;
                          setPortfolioData(newData);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;