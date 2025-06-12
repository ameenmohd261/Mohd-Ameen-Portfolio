import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const ProgressBar = ({ 
  progress, 
  height = "h-2",
  color = "blue", 
  animated = true,
  showPercentage = true,
  label
}) => {
  const { theme } = useTheme();
  
  const bgColor = theme === 'light' ? 'bg-gray-200' : 'bg-gray-700';
  
  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500', 
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500',
  };
  
  const progressColor = colorMap[color] || colorMap.blue;
  
  return (
    <div className="w-full mb-3">
      {label && (
        <div className="flex justify-between mb-1">
          <span className={`font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            {label}
          </span>
          {showPercentage && (
            <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
              {progress}%
            </span>
          )}
        </div>
      )}
      
      <div className={`${height} w-full rounded-full overflow-hidden ${bgColor}`}>
        {animated ? (
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${progressColor}`}
          />
        ) : (
          <div 
            className={`h-full rounded-full ${progressColor}`}
            style={{ width: `${progress}%` }}
          />
        )}
      </div>
    </div>
  );
};

export default ProgressBar;