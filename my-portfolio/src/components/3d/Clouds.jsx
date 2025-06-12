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
      <Sphere args={[1, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#FFFFFF"
          transparent={true}
          opacity={0.7}
          roughness={1}
        />
      </Sphere>
      <Sphere args={[0.8, 16, 16]} position={[1, 0, 0]}>
        <meshStandardMaterial
          color="#FFFFFF"
          transparent={true}
          opacity={0.7}
          roughness={1}
        />
      </Sphere>
      <Sphere args={[0.7, 16, 16]} position={[-1, 0.2, 0]}>
        <meshStandardMaterial
          color="#FFFFFF"
          transparent={true}
          opacity={0.7}
          roughness={1}
        />
      </Sphere>
      <Sphere args={[0.6, 16, 16]} position={[0, 0.5, 0.5]}>
        <meshStandardMaterial
          color="#FFFFFF"
          transparent={true}
          opacity={0.7}
          roughness={1}
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
      
      {/* Add ambient light for better cloud visibility */}
      <ambientLight intensity={0.8} />
    </group>
  );
};

export default Clouds;