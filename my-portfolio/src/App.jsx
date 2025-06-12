import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import ScrollToTopButton from './components/ui/ScrollToTopButton';
import useWindowSize from './hooks/useWindowSize';

function App() {
  const { theme } = useTheme();
  const { width } = useWindowSize();
  
  // Apply theme class to body for global styling
  useEffect(() => {
    document.body.className = theme;
    
    // Smooth scroll polyfill for safari
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, [theme]);
  
  // For page transition
  const pageVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={theme} // This forces re-render when theme changes
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Testimonials />
          <Contact />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ScrollToTopButton 
        threshold={300} 
        size={width < 640 ? "sm" : "md"} 
      />
    </div>
  );
}

export default App;