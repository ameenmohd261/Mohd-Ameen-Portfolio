import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  animated = false 
}) => {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'px-3 py-1',
  };
  
  const variantClasses = {
    default: theme === 'light' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-blue-900/30 text-blue-300',
    success: theme === 'light'
      ? 'bg-green-100 text-green-800'
      : 'bg-green-900/30 text-green-300',
    warning: theme === 'light'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-yellow-900/30 text-yellow-300',
    danger: theme === 'light'
      ? 'bg-red-100 text-red-800'
      : 'bg-red-900/30 text-red-300',
    info: theme === 'light'
      ? 'bg-purple-100 text-purple-800'
      : 'bg-purple-900/30 text-purple-300',
  };
  
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const badgeClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
  
  return animated ? (
    <motion.span
      className={badgeClasses}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.span>
  ) : (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default Badge;