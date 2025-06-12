import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTheme } from '../../hooks/useTheme';

const TimelineItem = ({ year, title, description, index }) => {
  const { theme } = useTheme();
  const { ref, controls } = useScrollAnimation(0.1);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5,
            delay: index * 0.2
          } 
        }
      }}
      className="flex gap-4 md:gap-6"
    >
      <div className="flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full ${theme === 'light' ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
        <div className={`w-0.5 h-full ${theme === 'light' ? 'bg-blue-200' : 'bg-blue-900'}`}></div>
      </div>
      <div className="pb-10">
        <p className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}>{year}</p>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{description}</p>
      </div>
    </motion.div>
  );
};

const About = () => {
  const { theme } = useTheme();
  const { ref, controls } = useScrollAnimation();

  const timelineData = [
    {
      year: '2023 - Present',
      title: 'Senior Frontend Developer',
      description: 'Leading frontend development on React-based web applications with a focus on performance optimization and user experience improvement.'
    },
    {
      year: '2021 - 2023',
      title: 'Frontend Developer',
      description: 'Developed responsive and interactive user interfaces using modern JavaScript frameworks like React and Vue.js.'
    },
    {
      year: '2019 - 2021',
      title: 'Web Designer & Developer',
      description: 'Created visually appealing and functional websites with a focus on UI/UX design and frontend development.'
    },
    {
      year: '2017 - 2019',
      title: 'Freelance Web Developer',
      description: 'Worked with various clients to build custom websites and web applications, honing skills in both design and development.'
    },
  ];

  const skillsData = [
    'JavaScript (ES6+)', 'React.js', 'Next.js', 'TypeScript', 
    'HTML5/CSS3', 'Tailwind CSS', 'Framer Motion', 'Three.js',
    'UI/UX Design', 'Responsive Design', 'Git', 'Node.js'
  ];

  return (
    <section id="about" className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
          }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? '' : 'text-white'}`}>
            About <span className="text-blue-500">Me</span>
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className={`max-w-2xl mx-auto text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            I'm a passionate frontend developer with a keen eye for design and a love for creating smooth, interactive user experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className={`text-2xl font-bold mb-4 ${theme === 'light' ? '' : 'text-white'}`}>
              My Story
            </h3>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              I'm Ameen, a creative developer with a passion for building beautiful, functional digital experiences. 
              With over 5 years of experience in web development, I specialize in creating interactive and responsive 
              user interfaces that combine aesthetic appeal with technical excellence.
            </p>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              My approach combines clean code with creative problem-solving. I believe that great design and development 
              go hand in hand, and I strive to create work that is both visually stunning and technically sound.
            </p>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, 
              or experimenting with new technologies to expand my skill set.
            </p>

            {/* Skills list */}
            <div className="mt-8">
              <h3 className={`text-2xl font-bold mb-4 ${theme === 'light' ? '' : 'text-white'}`}>
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsData.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: 'easeOut'
                    }}
                    viewport={{ once: true }}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      theme === 'light' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'bg-blue-900/30 text-blue-300'
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-bold mb-8 ${theme === 'light' ? '' : 'text-white'}`}>
              Experience
            </h3>
            <div className="ml-2">
              {timelineData.map((item, index) => (
                <TimelineItem
                  key={index}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;