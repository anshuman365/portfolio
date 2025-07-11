import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Contact', path: '/#contact' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <nav className={`fixed w-full z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">Anshuman Singh</Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.path || location.hash === link.path 
                    ? 'text-indigo-600' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-4 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path || location.hash === link.path 
                    ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;