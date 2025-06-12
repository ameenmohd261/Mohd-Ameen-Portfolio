import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Text, Box, Sphere, useTexture } from '@react-three/drei';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTheme } from '../../hooks/useTheme';

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 85 },
      { name: "TypeScript", level: 80 }
    ]
  },
  {
    category: "Animation & 3D",
    skills: [
      { name: "Framer Motion", level: 90 },
      { name: "Three.js", level: 75 },
      { name: "GSAP", level: 80 },
      { name: "WebGL", level: 65 },
      { name: "CSS Animations", level: 85 }
    ]
  },
  {
    category: "Backend & Tools",
    skills: [
      { name: "Node.js", level: 70 },
      { name: "MongoDB", level: 75 },
      { name: "Git", level: 85 },
      { name: "Firebase", level: 80 },
      { name: "RESTful APIs", level: 85 }
    ]
  }
];

// 3D Skill Sphere component
const SkillSphere = ({ skill, index, total, active }) => {
  const radius = 5;
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  
  const position = [
    radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(phi)
  ];
  
  return (
    <group position={position}>
      <Sphere args={[0.4 + (skill.level / 100) * 0.3, 16, 16]}>
        <meshStandardMaterial 
          color={active ? "#3B82F6" : "#94A3B8"} 
          emissive={active ? "#3B82F6" : "#475569"}
          emissiveIntensity={active ? 0.5 : 0.2}
          roughness={0.5}
          metalness={0.8}
        />
      </Sphere>
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.4}
        color={active ? "#FFFFFF" : "#CBD5E1"}
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
    </group>
  );
};

// 3D Skills Visualization
const SkillsVisualization = ({ activeCategory }) => {
  const filteredSkills = skillsData.find(category => category.category === activeCategory).skills;
  
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <group rotation={[0, 0, 0]}>
        {filteredSkills.map((skill, index) => (
          <SkillSphere 
            key={skill.name} 
            skill={skill} 
            index={index} 
            total={filteredSkills.length} 
            active={true}
          />
        ))}
      </group>
      <Box args={[15, 15, 15]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#000000" opacity={0} transparent />
      </Box>
    </Canvas>
  );
};

// Skill Meter component
const SkillMeter = ({ skill, theme }) => {
  const { ref, controls, inView } = useScrollAnimation(0.1);

  return (
    <div ref={ref} className="mb-6">
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
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { width: '0%' },
            visible: { 
              width: `${skill.level}%`,
              transition: { duration: 1, ease: "easeOut" }
            }
          }}
          className="h-full rounded-full bg-blue-500"
        ></motion.div>
      </div>
    </div>
  );
};

const Skills = () => {
  const { theme } = useTheme();
  const { ref, controls } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState("Frontend");

  return (
    <section 
      id="skills" 
      className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
    >
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
            My <span className="text-blue-500">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className={`max-w-2xl mx-auto text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            I've spent years refining my skills across various technologies and domains. Here's an overview of my technical expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* 3D Visualization */}
          <motion.div 
            className="h-[500px] lg:h-auto rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-blue-900 relative">
              <SkillsVisualization activeCategory={activeCategory} />
              
              {/* Overlay for better text visibility */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-xl font-bold mb-2">Interactive Skills Visualization</h3>
                <p className="text-gray-300">Rotate and interact with the 3D representation of my skills.</p>
              </div>
            </div>
          </motion.div>

          {/* Skills List with Meters */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex flex-wrap gap-4 mb-8">
              {skillsData.map(category => (
                <motion.button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.category
                      ? theme === 'light' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-blue-600 text-white'
                      : theme === 'light'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category.category}
                </motion.button>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className={`text-2xl font-bold mb-6 ${theme === 'light' ? '' : 'text-white'}`}>
                {activeCategory}
              </h3>
              
              {skillsData
                .find(category => category.category === activeCategory)
                .skills.map(skill => (
                  <SkillMeter key={skill.name} skill={skill} theme={theme} />
                ))
              }
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;