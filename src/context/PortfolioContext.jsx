import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchPortfolioData } from '../config/apiService';

const PortfolioContext = createContext();

export const usePortfolioContext = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // In a real app, you would fetch data from the backend
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setPortfolioData({
        name: "Anshuman Singh",
        title: "Python Backend Developer & Aspiring Software Engineer",
        sections: {
          hero: true,
          about: true,
          projects: true,
          skills: true,
          contact: true
        },
        projects: [
          {
            id: 1,
            title: "Telegram JSON DB Manager",
            description: "A Flask-based Telegram bot that manages a JSON database, allowing users to store and retrieve data via Telegram commands.",
            tags: ["Flask", "Telegram Bot", "JSON"]
          },
          {
            id: 2,
            title: "E-commerce Store",
            description: "A full-fledged e-commerce platform built with Flask and SQLite, hosted on Render. Features include product listings, cart, and user authentication.",
            tags: ["Flask", "SQLite", "Render"]
          },
          {
            id: 3,
            title: "AI-powered Exam Result Bot",
            description: "A bot that scrapes university websites and uses AI to detect result updates, then notifies students via Telegram.",
            tags: ["Python", "Web Scraping", "AI", "Telegram"]
          },
          {
            id: 4,
            title: "Dream & Soul Journal",
            description: "An audio-guided journaling tool that helps users reflect on their dreams and daily experiences with calming background sounds.",
            tags: ["Flask", "Audio Processing", "Journaling"]
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolioData, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};