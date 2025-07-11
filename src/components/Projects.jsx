import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fetchPortfolioData } from '../config/apiService';
import { usePortfolioContext } from '../context/PortfolioContext';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const { portfolioData } = usePortfolioContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (portfolioData && portfolioData.projects) {
      setProjects(portfolioData.projects);
      setLoading(false);
    } else {
      // Fallback to static data
      const staticProjects = [
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
      ];
      setProjects(staticProjects);
      setLoading(false);
    }
  }, [portfolioData]);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;