import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const springTransition = {
    type: 'spring',
    stiffness: 700,
    damping: 30
  };
  // Define background variants for animation
  const backgroundVariants = {
    light: { 
      backgroundColor: '#f8f9fa',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
    },
    dark: { 
      backgroundColor: '#2d3748',
      boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)'
    }
  };

  // State for tracking mouse position
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  // Function to handle mouse move
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    
    setMousePosition({ 
      x: (x / width) * 100, 
      y: (y / height) * 100 
    });
  };

  // Hover effect for the button
  const hoverVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 }
  };

  return (
    <div className="theme-toggle">
      <motion.button
        onClick={toggleTheme}
        className={`toggle-button ${theme}`}
        whileTap={{ scale: 0.9 }}
        transition={springTransition}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: theme === 'light' ? 0 : 180 }}
          transition={{ duration: 0.7 }}
          className="toggle-icon"
        >
          {theme === 'light' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
              <path
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ThemeToggle;