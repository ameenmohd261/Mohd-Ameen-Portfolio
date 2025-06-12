import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const SectionTitle = ({ 
  title, 
  highlight, 
  subtitle, 
  centered = true,
  className = '' 
}) => {
  const { theme } = useTheme();
  const { ref, controls } = useScrollAnimation();
  
  const alignmentClasses = centered ? 'text-center mx-auto' : '';
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
      }}
      className={`mb-16 ${alignmentClasses} ${className}`}
    >
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? '' : 'text-white'}`}>
        {title} {highlight && <span className="text-blue-500">{highlight}</span>}
      </h2>
      <div className="w-16 h-1 bg-blue-500 mb-6 rounded-full mx-auto"></div>
      {subtitle && (
        <p className={`max-w-2xl mx-auto text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;