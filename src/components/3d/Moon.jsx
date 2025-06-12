import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Moon = ({ position = [0, 0, 0] }) => {
  const moonRef = useRef();
  const glowRef = useRef();
  
  // Create moon texture with craters
  const moonTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/2k_moon.jpg');
  const normalTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/2k_moon_normal.jpg');
  
  useFrame((state, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += delta * 0.05;
    }
    
    if (glowRef.current) {
      glowRef.current.scale.set(
        1 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.03,
        1 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.03,
        1 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.03
      );
    }
  });

  return (
    <group position={position}>
      {/* Main moon */}
      <Sphere ref={moonRef} args={[2, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          map={moonTexture}
          normalMap={normalTexture}
          roughness={0.8}
          metalness={0.1}
          emissive="#404050"
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Moon glow effect */}
      <Sphere ref={glowRef} args={[2.3, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#AAAAFF" 
          transparent={true}
          opacity={0.1}
        />
      </Sphere>
      
      {/* Dim light for night mode */}
      <pointLight
        color="#B0C4DE"
        intensity={0.8}
        distance={30}
        decay={2}
      />
    </group>
  );
};

export default Moon;