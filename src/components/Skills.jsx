import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skills = [
    { name: 'Python', level: 90 },
    { name: 'Flask', level: 85 },
    { name: 'FastAPI', level: 80 },
    { name: 'Firebase', level: 75 },
    { name: 'MongoDB', level: 70 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'JavaScript', level: 75 },
    { name: 'Automation', level: 90 },
  ];

  const interests = [
    'Web Development',
    'Backend Systems',
    'AI & Machine Learning',
    'Cloud Computing',
    'Open Source'
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <motion.div 
                        className="bg-indigo-600 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Education & Interests</h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-4">Education</h4>
                <div className="mb-6">
                  <p className="font-semibold">12th Grade (PCM)</p>
                  <p className="text-gray-700 dark:text-gray-300">2025 | JEE Aspirant</p>
                  <p className="mt-2">Planning for BCA/BTech in Computer Science</p>
                </div>
                
                <h4 className="font-bold text-lg mb-4">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;