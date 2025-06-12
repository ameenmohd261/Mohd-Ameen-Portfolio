import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

const Sun = ({ position = [0, 0, 0] }) => {
  const sunRef = useRef();
  const glowRef = useRef();

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.1;
      sunRef.current.rotation.z += delta * 0.05;
    }
    
    if (glowRef.current) {
      glowRef.current.scale.set(
        1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05,
        1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05,
        1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05
      );
    }
  });

  return (
    <group position={position}>
      {/* Main sun */}
      <Sphere ref={sunRef} args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#FFD700" />
      </Sphere>
      
      {/* Inner glow */}
      <Sphere args={[2.2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#FFFF99" 
          transparent={true}
          opacity={0.3}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[2.5, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#FFFF99" 
          transparent={true}
          opacity={0.15}
        />
      </Sphere>

      {/* Point light to illuminate scene */}
      <pointLight
        color="#FFFFFF"
        intensity={1.5}
        distance={50}
        decay={2}
      />
    </group>
  );
};

export default Sun;