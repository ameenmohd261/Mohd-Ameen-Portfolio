import React from 'react';
import { Html, useProgress } from '@react-three/drei';
import { useTheme } from '../../hooks/useTheme';

const ModelLoader = () => {
  const { progress } = useProgress();
  const { theme } = useTheme();
  
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mb-2"
          style={{ 
            borderColor: theme === 'light' 
              ? '#3B82F6 transparent transparent transparent' 
              : '#93C5FD transparent transparent transparent'  
          }}
        ></div>
        <p className={`${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
          {Math.round(progress)}% loaded
        </p>
      </div>
    </Html>
  );
};

export default ModelLoader;