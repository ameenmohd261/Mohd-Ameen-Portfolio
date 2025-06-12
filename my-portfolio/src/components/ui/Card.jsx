import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  onClick,
  padding = 'normal',
  elevation = 'md',
  ...props 
}) => {
  const { theme } = useTheme();
  
  // Base classes
  const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300';
  
  // Padding variants
  const paddingClasses = {
    none: '',
    small: 'p-3',
    normal: 'p-6',
    large: 'p-8',
  };
  
  // Elevation variants
  const elevationClasses = {
    none: '',
    sm: theme === 'light' ? 'shadow-sm' : 'shadow-sm shadow-gray-800',
    md: theme === 'light' ? 'shadow-md' : 'shadow-md shadow-gray-800',
    lg: theme === 'light' ? 'shadow-lg' : 'shadow-lg shadow-gray-800',
    xl: theme === 'light' ? 'shadow-xl' : 'shadow-xl shadow-gray-800',
  };
  
  // Theme specific classes
  const themeClasses = theme === 'light' 
    ? 'bg-white border border-gray-100' 
    : 'bg-gray-800 border border-gray-700';
    
  // Hover effect
  const hoverClasses = hover ? 'card-hover' : '';
  
  // Clickable card
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  // Combined classes
  const cardClasses = `
    ${baseClasses} 
    ${paddingClasses[padding]} 
    ${elevationClasses[elevation]} 
    ${themeClasses} 
    ${hoverClasses} 
    ${clickableClasses}
    ${className}
  `;
  
  return (
    <motion.div 
      className={cardClasses}
      onClick={onClick}
      whileHover={hover && { y: -5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;