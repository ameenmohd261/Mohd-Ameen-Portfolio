import React, { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sun from '../3d/Sun';
import Moon from '../3d/Moon';
import Stars from '../3d/Stars';
import Clouds from '../3d/Clouds';
import { useTheme } from '../../hooks/useTheme';

const Hero = () => {
  const { theme } = useTheme();
  const containerRef = useRef(null);

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
      transition: {
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section 
      id="home" 
      className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden ${
        theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-gradient-to-br from-gray-900 to-blue-900'
      }`}
      ref={containerRef}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={theme === 'light' ? 0.8 : 0.2} />
          <Suspense fallback={null}>
            {theme === 'light' ? (
              <>
                <Sun position={[4, 2, -5]} />
                <Clouds />
              </>
            ) : (
              <>
                <Moon position={[4, 2, -5]} />
                <Stars />
              </>
            )}
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 z-10 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className={`text-4xl md:text-6xl font-extrabold mb-4 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}
            >
              Hi, I'm <span className="text-blue-500">Ameen</span>
              <br />
              Creative Developer
            </motion.h1>
            <motion.p
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              className={`text-lg md:text-xl mb-8 max-w-lg ${
                theme === 'light' ? 'text-gray-700' : 'text-gray-300'
              }`}
            >
              Crafting beautiful digital experiences with clean code and innovative design solutions. Transforming ideas into reality.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.a
                href="#projects"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="btn-primary px-8 py-3 rounded-full bg-blue-600 text-white font-medium shadow-lg"
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`px-8 py-3 rounded-full font-medium shadow-lg ${
                  theme === 'light' 
                    ? 'bg-white text-blue-600 border border-blue-600' 
                    : 'bg-transparent text-white border border-white'
                }`}
              >
                Let's Connect
              </motion.a>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block relative h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 rounded-full bg-blue-500 animate-pulse opacity-30"></div>
                <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                  <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    A
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={theme === 'light' ? 'text-gray-700' : 'text-white'}
        >
          <path
            d="M12 5L12 19M12 19L5 12M12 19L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;