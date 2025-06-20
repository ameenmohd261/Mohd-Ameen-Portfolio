import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, useTexture, OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTheme } from '../../hooks/useTheme';

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", level: 95, icon: "/icons/react.png" },
      { name: "JavaScript", level: 90, icon: "/icons/javascript.png" },
      { name: "HTML/CSS", level: 95, icon: "/icons/html-css.png" },
      { name: "Tailwind CSS", level: 85, icon: "/icons/tailwind.png" },
      { name: "TypeScript", level: 80, icon: "/icons/typescript.png" }
    ]
  },
  {
    category: "Animation & 3D",
    skills: [
      { name: "Framer Motion", level: 90, icon: "/icons/framer.png" },
      { name: "Three.js", level: 75, icon: "/icons/threejs.png" },
      { name: "GSAP", level: 80, icon: "/icons/gsap.png" },
      { name: "WebGL", level: 65, icon: "/icons/webgl.png" },
      { name: "CSS Animations", level: 85, icon: "/icons/css-animation.png" }
    ]
  },
  {
    category: "Backend & Tools",
    skills: [
      { name: "Node.js", level: 70, icon: "/icons/nodejs.png" },
      { name: "MongoDB", level: 75, icon: "/icons/mongodb.png" },
      { name: "Git", level: 85, icon: "/icons/git.png" },
      { name: "Firebase", level: 80, icon: "/icons/firebase.png" },
      { name: "RESTful APIs", level: 85, icon: "/icons/api.png" }
    ]
  }
];

// 3D Skill Sphere component with image texture
const SkillSphere = ({ skill, index, total, active }) => {
  const radius = 5;
  // Calculate positions in a better spherical distribution
  const phi = Math.acos(-1 + (2 * index + 1) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  
  const position = [
    radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(phi)
  ];
  
  // Add animation and interactivity
  const [hovered, setHovered] = useState(false);
  const sphereRef = useRef();
  const textRef = useRef();
  
  // Load texture for the skill icon
  const texture = useTexture(skill.icon);
  
  useFrame((state) => {
    if (sphereRef.current) {
      // Gentle floating animation
      sphereRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.005;
      
      // Subtle rotation for the sphere
      sphereRef.current.rotation.y += 0.003;
      sphereRef.current.rotation.x += 0.001;
    }
  });
  
  return (
    <group position={position}>
      <Sphere 
        ref={sphereRef}
        args={[0.4 + (skill.level / 100) * 0.3, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshPhysicalMaterial 
          map={texture}
          color={hovered || active ? "#3B82F6" : "#94A3B8"} 
          emissive={hovered || active ? "#3B82F6" : "#475569"}
          emissiveIntensity={hovered ? 0.8 : active ? 0.5 : 0.2}
          roughness={0.3}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={0.8}
        />
      </Sphere>
      <Text
        ref={textRef}
        position={[0, 0, 0.7]}
        fontSize={0.4}
        color={hovered ? "#FFFFFF" : active ? "#F0F9FF" : "#CBD5E1"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#00000080"
        maxWidth={2}
      >
        {skill.name}
      </Text>
      <Text
        position={[0, -0.5, 0.7]}
        fontSize={0.25}
        color={hovered ? "#FFFFFF" : "#94A3B8"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#00000080"
      >
        {skill.level}%
      </Text>
    </group>
  );
};

// FloatingBubbles component for decoration
/* This component was defined twice - removing this first instance */

const FloatingBubbles = ({ count = 15 }) => {
  const bubbleRefs = useRef([]);
  const texturePaths = [
    "/icons/code.png",
    "/icons/atom.png",
    "/icons/web.png",
    "/icons/design.png",
    "/icons/data.png",
  ];
  
  // Load all textures at component level
  const loadedTextures = useTexture(texturePaths);
  
  useFrame((state) => {
    bubbleRefs.current.forEach((bubble, i) => {
      if (bubble) {
        // Create different floating patterns for each bubble
        const t = state.clock.elapsedTime;
        bubble.position.y += Math.sin(t * 0.8 + i) * 0.01;
        bubble.position.x += Math.cos(t * 1.0 + i * 0.5) * 0.005;
        bubble.position.z += Math.sin(t * 0.6 + i * 0.3) * 0.008;
        
        // Subtle rotation
        bubble.rotation.x += 0.001;
        bubble.rotation.y += 0.002;
        bubble.rotation.z += 0.0005;
      }
    });
  });

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        // Random positions across the scene
        const posX = (Math.random() - 0.5) * 12;
        const posY = (Math.random() - 0.5) * 12;
        const posZ = (Math.random() - 0.5) * 8;
        const size = 0.3 + Math.random() * 0.8;
        const textureIndex = i % texturePaths.length;
        const texture = loadedTextures[textureIndex];
        
        return (
          <group key={i} position={[posX, posY, posZ]} ref={el => bubbleRefs.current[i] = el}>
            <Sphere args={[size, 32, 32]}>
              <meshPhysicalMaterial
                map={texture}
                color={`hsl(${(i * 30) % 360}, 70%, 60%)`}
                transparent
                opacity={0.9}
                roughness={0.1}
                metalness={0.8}
                clearcoat={1}
                clearcoatRoughness={0.1}
                transmission={0.5}
                reflectivity={0.6}
              />
            </Sphere>
          </group>
        );
      })}
      
      {/* Light beams */}
      {[1, 2, 3].map((_, i) => (
        <spotLight 
          key={i}
          position={[Math.sin(i * Math.PI * 2 / 3) * 15, 5, Math.cos(i * Math.PI * 2 / 3) * 15]}
          angle={0.3}
          penumbra={0.2}
          intensity={2}
          color={`hsl(${(i * 120) % 360}, 70%, 60%)`}
          castShadow
        />
      ))}
    </>
  );
};

const SkillsScene = ({ children }) => {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const groupRef = useRef();
  
  // Handle mouse interaction
  const handlePointerMove = (event) => {
    const { clientX, clientY } = event;
    const moveX = (clientX / window.innerWidth - 0.5) * 2;
    const moveY = (clientY / window.innerHeight - 0.5) * 2;
    setRotation([moveY * 0.5, rotation[1], -moveX * 0.5]);
  };

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth auto-rotation
      groupRef.current.rotation.y += 0.001;
      
      // Apply interaction-based rotation with damping
      groupRef.current.rotation.x += (rotation[0] - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.z += (rotation[2] - groupRef.current.rotation.z) * 0.05;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setRotation([0, rotation[1], 0])}
    >
      {children}
      
      {/* Central glowing core */}
      <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#1E40AF"
          emissive="#3B82F6"
          emissiveIntensity={0.6}
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Connecting lines between skills with small animated nodes */}
      <group>
        {Array(30).fill().map((_, i) => {
          const position = [
            Math.sin(i * 0.5) * 3,
            Math.cos(i * 0.7) * 3,
            Math.sin(i * 0.3) * 3
          ];
          
          return (
            <mesh 
              key={i} 
              position={position}
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color="#60A5FA" transparent opacity={0.7} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

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
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
    </Canvas>
  );
};

// Skill Meter component with icon
const SkillMeter = ({ skill, theme }) => {
  const { ref, controls, inView } = useScrollAnimation(0.1);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <img 
            src={skill.icon} 
            alt={skill.name}
            className="w-8 h-8 object-contain"
          />
          <span className={`font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            {skill.name}
          </span>
        </div>
        <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          {skill.level}%
        </span>
      </div>
      <div className={`h-3 rounded-full ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'} overflow-hidden`}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { width: '0%' },
            visible: { 
              width: `${skill.level}%`,
              transition: { duration: 1.2, ease: "easeOut" }
            }
          }}
          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 relative"
        >
          <motion.div 
            className="absolute inset-0 opacity-50"
            animate={{
              background: [
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                'linear-gradient(90deg, transparent 100%, rgba(255,255,255,0.5) 150%, transparent 200%)',
              ],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        </motion.div>
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
            className="h-[500px] lg:h-auto rounded-xl overflow-hidden shadow-xl"
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
              
              <div className="space-y-6">
                {skillsData
                  .find(category => category.category === activeCategory)
                  .skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <SkillMeter skill={skill} theme={theme} />
                    </motion.div>
                  ))
                }
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
