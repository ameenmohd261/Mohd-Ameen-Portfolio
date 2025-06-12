import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ 
  text,
  el = 'h1',
  className = '',
  once = true,
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.015,
  animation = 'slide-up', // options: 'slide-up', 'fade', 'bounce', 'scale', 'wave', 'typing'
  ...props
}) => {
  // Split text into an array of words, then into characters
  const words = text.split(' ').map(word => `${word} `);
  
  // Animation variants
  const animationVariants = {
    'slide-up': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    'fade': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    'bounce': {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: [0.8, 1.2, 1] }
    },
    'scale': {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 }
    },
    'wave': {
      hidden: { opacity: 0, y: 20 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.05 + delay,
          duration: 0.5
        }
      })
    },
    'typing': {
      hidden: { width: 0, opacity: 0 },
      visible: { width: "100%", opacity: 1 }
    }
  };
  
  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay * i,
      },
    }),
  };
  
  // Element variants based on animation type
  const elementVariants = animationVariants[animation] || animationVariants['slide-up'];
  
  // For typing animation, treat the whole text as one unit
  if (animation === 'typing') {
    const Tag = el;
    
    return (
      <Tag className={`overflow-hidden whitespace-nowrap inline-block ${className}`} {...props}>
        <motion.span
          variants={elementVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
          transition={{
            duration: text.length * 0.05,
            ease: "easeInOut",
            delay
          }}
        >
          {text}
        </motion.span>
      </Tag>
    );
  }
  
  // Regular character animation
  const Tag = el;
  
  return (
    <Tag className={`overflow-hidden ${className}`} {...props}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        className="inline-block"
      >
        {animation === 'wave' ? (
          // For wave animation, we animate letters directly
          text.split('').map((char, i) => (
            <motion.span
              key={`char-${i}`}
              variants={elementVariants}
              custom={i}
              className="inline-block"
              style={{
                display: char === ' ' ? 'inline' : 'inline-block'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))
        ) : (
          // For other animations, we animate words
          words.map((word, i) => (
            <motion.span
              key={`word-${i}`}
              className="inline-block"
              variants={containerVariants}
            >
              {word.split('').map((char, j) => (
                <motion.span
                  key={`char-${j}-${i}`}
                  variants={elementVariants}
                  className="inline-block"
                  style={{
                    display: char === ' ' ? 'inline' : 'inline-block'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.span>
          ))
        )}
      </motion.span>
    </Tag>
  );
};

export default AnimatedText;