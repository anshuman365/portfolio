import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="mb-4">
                I'm a passionate Python backend developer with experience in building web applications and automation tools. My journey in programming started with Python and I have since explored various frameworks and technologies.
              </p>
              <p className="mb-4">
                Currently, I'm in 12th grade (PCM) and preparing for JEE. I plan to pursue a degree in Computer Science (BCA/BTech) to further enhance my skills and knowledge.
              </p>
              <p className="mb-4">
                My interests include:
              </p>
              <ul className="grid grid-cols-2 gap-3 mb-6">
                {['Web Development (Backend)', 'Python Programming', 'Backend Automation', 'AI Tools and Applications'].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <span className="text-indigo-600 mr-2">✓</span> {item}
                  </motion.li>
                ))}
              </ul>
              <p>
                When I'm not coding, I enjoy building personal projects that solve real-world problems, experimenting with new technologies, and contributing to open source.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;