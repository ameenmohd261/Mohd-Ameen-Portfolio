import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const TimelineItem = ({ 
  date, 
  title, 
  description, 
  icon,
  index = 0,
  isLast = false 
}) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex gap-4 md:gap-6"
    >
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900 text-blue-400'
        }`}>
          {icon || (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
          )}
        </div>
        {!isLast && (
          <div className={`w-0.5 h-full ${
            theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'
          }`}></div>
        )}
      </div>
      <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
        <p className={`text-sm font-bold mb-1 ${
          theme === 'light' ? 'text-blue-600' : 'text-blue-400'
        }`}>
          {date}
        </p>
        <h3 className={`text-xl font-bold mb-2 ${
          theme === 'light' ? 'text-gray-800' : 'text-white'
        }`}>
          {title}
        </h3>
        <p className={`${
          theme === 'light' ? 'text-gray-600' : 'text-gray-300'
        }`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Timeline = ({ items }) => {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          date={item.date}
          title={item.title}
          description={item.description}
          icon={item.icon}
          index={index}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};

export default Timeline;