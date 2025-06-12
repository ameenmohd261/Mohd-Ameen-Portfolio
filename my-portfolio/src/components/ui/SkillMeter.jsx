import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const SkillMeter = ({ skill, index = 0 }) => {
  const { theme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className={`font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
          {skill.name}
        </span>
        <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          {skill.level}%
        </span>
      </div>
      <div className={`h-2 rounded-full ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 + index * 0.05 }}
          viewport={{ once: true }}
          className={`h-full rounded-full ${
            skill.level >= 90 
              ? 'bg-green-500' 
              : skill.level >= 70 
                ? 'bg-blue-500' 
                : skill.level >= 50 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
          }`}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default SkillMeter;