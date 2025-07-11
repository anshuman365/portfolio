import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="hero" className="min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-indigo-600">Anshuman Singh</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
              Python Backend Developer & Aspiring Software Engineer
            </h2>
            <p className="text-lg mb-8 max-w-lg">
              I build robust backend systems and automation tools. Currently, I'm a JEE aspirant planning to pursue BCA/BTech in Computer Science.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition shadow-lg"
              >
                Get in Touch
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-6 py-3 rounded-md font-medium transition"
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="bg-indigo-600 rounded-full w-64 h-64 md:w-80 md:h-80 overflow-hidden shadow-xl">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-full h-full" />
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-4 -right-4 bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-bold shadow-lg"
              >
                Open to Work
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;