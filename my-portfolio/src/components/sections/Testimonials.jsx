import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTheme } from '../../hooks/useTheme';

const testimonialsData = [
  {
    id: 1,
    name: "Alex Rodriguez",
    position: "Product Manager at TechCorp",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Working with Ameen was a game-changer for our project. His expertise in React and animation brought our vision to life with impressive attention to detail and performance optimization."
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "UI/UX Designer at DesignHub",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Ameen has an exceptional ability to translate designs into flawless code. His understanding of both design principles and technical implementation made our collaboration seamless and productive."
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "CTO at StartupX",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    text: "We hired Ameen to develop our company's interactive dashboard, and he exceeded all expectations. His work with Three.js and complex data visualization was particularly impressive."
  },
  {
    id: 4,
    name: "Emily Williams",
    position: "Marketing Director at CreativeAgency",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    text: "Ameen's portfolio website development for our agency received countless compliments from our clients. His day/night theme implementation and attention to animation details truly set our site apart."
  }
];

const achievementsData = [
  {
    id: 1,
    icon: "🏆",
    title: "Frontend Excellence Award",
    description: "Recognized for outstanding contributions to frontend development"
  },
  {
    id: 2,
    icon: "📊",
    title: "Top-Rated Developer",
    description: "Maintained 5-star client satisfaction rating for 3 consecutive years"
  },
  {
    id: 3,
    icon: "🎓",
    title: "Advanced Certification",
    description: "Certified in React Performance Optimization and Advanced Animation Techniques"
  },
  {
    id: 4,
    icon: "💻",
    title: "Open Source Contributor",
    description: "Active contributor to popular frontend libraries and frameworks"
  }
];

const Testimonials = () => {
  const { theme } = useTheme();
  const { ref, controls } = useScrollAnimation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveTestimonial(prev => (prev + 1) % testimonialsData.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Navigate to specific testimonial
  const goToTestimonial = (index) => {
    setDirection(index > activeTestimonial ? 1 : -1);
    setActiveTestimonial(index);
  };

  // Navigate to next/prev testimonial
  const navigate = (dir) => {
    setDirection(dir);
    
    if (dir === 1) {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
    } else {
      setActiveTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    }
  };

  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className={`py-20 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? '' : 'text-white'}`}>
            Testimonials & <span className="text-blue-500">Achievements</span>
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className={`max-w-2xl mx-auto text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            What clients say about my work and the recognition I've received throughout my career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Testimonials Carousel */}
          <div className={`p-6 rounded-xl ${theme === 'light' ? 'bg-white shadow-lg' : 'bg-gray-900 shadow-xl'}`}>
            <h3 className={`text-2xl font-bold mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Client Testimonials
            </h3>
            
            <div className="relative h-[320px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={activeTestimonial}
                  custom={direction}
                  variants={testimonialVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute w-full"
                >
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-blue-500">
                      <img 
                        src={testimonialsData[activeTestimonial].image} 
                        alt={testimonialsData[activeTestimonial].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                        {testimonialsData[activeTestimonial].name}
                      </h4>
                      <p className={`${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
                        {testimonialsData[activeTestimonial].position}
                      </p>
                    </div>
                  </div>
                  
                  <blockquote className="text-center mb-8">
                    <p className={`text-lg italic ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      "{testimonialsData[activeTestimonial].text}"
                    </p>
                  </blockquote>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation controls */}
              <div className="absolute -bottom-4 left-0 right-0 flex justify-center space-x-2">
                {testimonialsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${
                      activeTestimonial === index
                        ? 'bg-blue-500'
                        : theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Prev/Next buttons */}
              <button
                onClick={() => navigate(-1)}
                className={`absolute top-1/2 -left-4 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center ${
                  theme === 'light' 
                    ? 'bg-white text-gray-800 shadow-md' 
                    : 'bg-gray-700 text-white shadow-md'
                }`}
                aria-label="Previous testimonial"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => navigate(1)}
                className={`absolute top-1/2 -right-4 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center ${
                  theme === 'light' 
                    ? 'bg-white text-gray-800 shadow-md' 
                    : 'bg-gray-700 text-white shadow-md'
                }`}
                aria-label="Next testimonial"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Achievements */}
          <div>
            <h3 className={`text-2xl font-bold mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              Achievements & Certifications
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {achievementsData.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-lg ${
                    theme === 'light' 
                      ? 'bg-white shadow-md border border-gray-100' 
                      : 'bg-gray-700 shadow-md'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <span className="text-3xl">{achievement.icon}</span>
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;