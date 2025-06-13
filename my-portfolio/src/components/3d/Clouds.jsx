import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Cloud = ({ position, scale, speed, rotationSpeed }) => {
  const cloudRef = useRef();
  
  useFrame((state, delta) => {
    if (cloudRef.current) {
      // Move clouds horizontally
      cloudRef.current.position.x += delta * speed;
      
      // Add slight rotation for more natural movement
      cloudRef.current.rotation.y += delta * rotationSpeed;
      
      // Reset position when cloud moves out of view
      if (cloudRef.current.position.x > 30) {
        cloudRef.current.position.x = -30;
      }
    }
  });
  
  return (
    <group
      ref={cloudRef}
      position={position}
      scale={scale}
    >
      {/* Main cloud parts with improved materials */}
      <Sphere args={[1, 24, 24]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#f0f0f0"
          transparent={true}
          opacity={0.85}
          roughness={0.8}
          metalness={0.1}
          envMapIntensity={1.5}
        />
      </Sphere>
      <Sphere args={[0.8, 24, 24]} position={[1, 0, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.8}
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>
      <Sphere args={[0.7, 24, 24]} position={[-1, 0.2, 0]}>
        <meshStandardMaterial
          color="#f8f8f8"
          transparent={true}
          opacity={0.8}
          roughness={0.75}
          metalness={0.1}
        />
      </Sphere>
      <Sphere args={[0.6, 24, 24]} position={[0, 0.5, 0.5]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.75}
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>
      {/* Additional cloud puffs for more complex shape */}
      <Sphere args={[0.65, 20, 20]} position={[0.5, -0.3, 0.4]}>
        <meshStandardMaterial
          color="#f0f0f0"
          transparent={true}
          opacity={0.7}
          roughness={0.8}
        />
      </Sphere>
      <Sphere args={[0.55, 20, 20]} position={[-0.7, -0.2, -0.3]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.7}
          roughness={0.85}
        />
      </Sphere>
    </group>
  );
};

const Clouds = ({ count = 15 }) => {
  // Generate random clouds
  const clouds = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 60, // x: spread across width
        (Math.random() - 0.3) * 10 + 5, // y: mostly above horizon
        (Math.random() - 0.5) * 15 - 10 // z: varying depth
      ],
      scale: [
        Math.random() * 0.5 + 0.7,
        Math.random() * 0.5 + 0.7,
        Math.random() * 0.5 + 0.7
      ],
      speed: Math.random() * 0.5 + 0.2,
      rotationSpeed: (Math.random() - 0.5) * 0.2
    }));
  }, [count]);

  return (
    <group>
      {clouds.map((cloud, index) => (
        <Cloud
          key={index}
          position={cloud.position}
          scale={cloud.scale}
          speed={cloud.speed}
          rotationSpeed={cloud.rotationSpeed}
        />
      ))}
      
      {/* Enhanced lighting with sun */}
      <ambientLight intensity={0.4} color="#e0f2ff" />
      <directionalLight 
        position={[15, 10, 5]} 
        intensity={1.2} 
        color="#fffaed" 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Sun model */}
      <mesh position={[15, 10, 5]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#fff9c4" />
        <pointLight color="#ffb74d" intensity={2} distance={100} decay={2} />
        <group>
          {/* Sun glow effect */}
          <Sphere args={[3, 24, 24]} position={[0, 0, 0]}>
            <meshBasicMaterial color="#ffecb3" transparent={true} opacity={0.3} />
          </Sphere>
          <Sphere args={[4, 20, 20]} position={[0, 0, 0]}>
            <meshBasicMaterial color="#ffecb3" transparent={true} opacity={0.15} />
          </Sphere>
        </group>
      </mesh>
    </group>
  );
};

export default Clouds;