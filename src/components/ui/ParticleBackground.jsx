import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleBackground = ({ count = 1500, size = 0.05, color = '#ffffff', speed = 0.01 }) => {
  const particles = useRef();
  
  // Create the particle positions and speeds
  const [positions, speeds] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Distribute particles randomly in 3D space
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      // Random speed factors
      speeds[i] = Math.random() * 0.01 + speed;
    }
    
    return [positions, speeds];
  }, [count, speed]);
  
  // Animation loop
  useFrame(() => {
    if (!particles.current) return;
    
    const positions = particles.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Update y position to create falling effect
      positions[i3 + 1] -= speeds[i];
      
      // Reset particle when it goes too far down
      if (positions[i3 + 1] < -5) {
        positions[i3 + 1] = 5;
        positions[i3] = (Math.random() - 0.5) * 10;
        positions[i3 + 2] = (Math.random() - 0.5) * 10;
      }
    }
    
    particles.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default ParticleBackground;