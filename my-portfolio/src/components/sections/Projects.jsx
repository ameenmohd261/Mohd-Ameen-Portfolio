import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTheme } from '../../hooks/useTheme';

const projectsData = [

  {
    id: 1,
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive dashboard for online stores with sales analytics, inventory management, and customer insights.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRhc2hib2FyZHxlbnwwfHwwfHx8MA%3D%3D',
    tags: ['React', 'Redux', 'Chart.js', 'Tailwind CSS'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web'
  },
  {
    id: 2,
    title: 'Social Media App',
    description: 'Real-time social networking platform with messaging, profile customization, and content sharing features.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c29jaWFsJTIwbWVkaWF8ZW58MHx8MHx8fDA%3D',
    tags: ['Next.js', 'Firebase', 'Socket.io', 'Framer Motion'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web'
  },
  {
    id: 3,
    title: '3D Product Configurator',
    description: 'Interactive 3D product visualization tool allowing customers to customize and preview products in real-time.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8M2QlMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D',
    tags: ['Three.js', 'React', 'GLSL', 'WebGL'],
    demoUrl: '#',
    codeUrl: '#',
    category: '3d'
  },
  {
    id: 4,
    title: 'Weather Forecast App',
    description: 'Elegant weather application with detailed forecasts, interactive maps, and location-based recommendations.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D',
    tags: ['React Native', 'Redux', 'Weather API', 'Geolocation'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'mobile'
  },
  {
    id: 5,
    title: 'Portfolio Website',
    description: 'Creative developer portfolio with interactive elements, animations, and day/night mode themes.',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydGZvbGlvfGVufDB8fDB8fHww',
    tags: ['React', 'Framer Motion', 'Three.js', 'Tailwind CSS'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web'
  },
  {
    id: 6,
    title: 'Music Streaming App',
    description: 'Feature-rich music platform with playlist creation, artist discovery, and audio visualization.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D',
    tags: ['React', 'Node.js', 'Web Audio API', 'MongoDB'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web'
  },
  {
    id: 7,
    title: 'Code-Quest',
    description: 'Code Quest is a MERN stack-based web application designed as a college coding competition platform. It features role-based access for admins, faculty, and students, allowing seamless contest creation, participation, and result tracking. Built to simulate real-world competitive programming environments.',
    image: 'https://plus.unsplash.com/premium_photo-1663100722417-6e36673fe0ed?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['React', 'Node.js', 'competition web', 'MongoDB'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web'
  },
  {
    id: 8,
    title: 'TravAura',
    description: 'Tavaura is a React-based travel discovery app that helps users explore famous tourist destinations. With an interactive UI and intuitive search features, Tavaura offers recommendations based on location, popularity, and interest, making trip planning smarter and easier.',
    image: 'https://images.unsplash.com/photo-1583452924150-c86772c4fab6?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['React', 'Node.js', 'Traveling web', 'MongoDB'],
    demoUrl: '#',
    codeUrl: '#',
    category: 'web'
  },

];

const ProjectCard = ({ project, theme }) => {
  const { ref, controls } = useScrollAnimation(0.1);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className={`rounded-xl overflow-hidden shadow-lg ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-56">
        <motion.img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full"
          animate={{ 
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            <motion.div 
              className="flex gap-2 flex-wrap"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {project.tags.map(tag => (
                <span 
                  key={tag} 
                  className="text-xs px-2 py-1 bg-blue-500/80 text-white rounded"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
            
            <motion.div
              className="flex gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <a 
                href={project.demoUrl} 
                className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Live Demo
              </a>
              <a 
                href={project.codeUrl} 
                className="text-white bg-gray-700/80 hover:bg-gray-700 px-3 py-1 rounded text-sm font-medium transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Code
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <div className="p-6">
        <h3 className={`font-bold text-xl mb-2 ${
          theme === 'light' ? 'text-gray-800' : 'text-white'
        }`}>
          {project.title}
        </h3>
        <p className={`${
          theme === 'light' ? 'text-gray-600' : 'text-gray-300'
        } mb-4`}>
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { theme } = useTheme();
  const { ref, controls } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Apps' },
    { id: '3d', name: '3D Projects' },
    { id: 'mobile', name: 'Mobile Apps' }
  ];

  return (
    <section id="projects" className={`py-20 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}`}>
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
            My <span className="text-blue-500">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className={`max-w-2xl mx-auto text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Here are some of my recent projects that showcase my skills and expertise in web development, 
            interactive design, and 3D visualization.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? theme === 'light' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-600 text-white'
                  : theme === 'light'
                    ? 'bg-white text-gray-700 hover:bg-gray-100'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.1
              } 
            }
          }}
        >
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} theme={theme} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/ameenmohd261"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center px-6 py-3 rounded-full font-medium ${
              theme === 'light'
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="mr-2">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View More Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;