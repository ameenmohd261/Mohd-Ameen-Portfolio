import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Stars = ({ count = 1000 }) => {
  const starsGroup = useRef();
  const shootingStarRef = useRef();
  const shootingStarPositionRef = useRef({ x: 0, y: 0, z: 0 });
  const shootingStarActiveRef = useRef(false);
  const timeToNextShootingStarRef = useRef(Math.random() * 5 + 3);

  // Generate random star positions
  const starPositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Position stars in a sphere around the camera
      const radius = 50;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Random sizes for stars
      sizes[i] = Math.random() * 1.5 + 0.5;
      
      // Slight color variations for stars
      const starColor = new THREE.Color();
      const hue = 0.6 + Math.random() * 0.1; // Blue-ish
      const saturation = 0.2 + Math.random() * 0.3;
      const lightness = 0.7 + Math.random() * 0.3;
      starColor.setHSL(hue, saturation, lightness);
      
      colors[i3] = starColor.r;
      colors[i3 + 1] = starColor.g;
      colors[i3 + 2] = starColor.b;
    }
    
    return { positions, sizes, colors };
  }, [count]);

  // Randomly trigger shooting stars
  useFrame((state, delta) => {
    // Twinkle regular stars
    if (starsGroup.current) {
      starsGroup.current.rotation.x += delta * 0.01;
      starsGroup.current.rotation.y += delta * 0.005;
    }
    
    // Manage shooting star
    if (!shootingStarActiveRef.current) {
      timeToNextShootingStarRef.current -= delta;
      
      if (timeToNextShootingStarRef.current <= 0) {
        // Start a new shooting star
        shootingStarActiveRef.current = true;
        timeToNextShootingStarRef.current = Math.random() * 10 + 5; // Time until next shooting star
        
        // Set starting position (from edge of view)
        shootingStarPositionRef.current = {
          x: (Math.random() - 0.5) * 40,
          y: 20 + Math.random() * 10,
          z: -30
        };
      }
    } else {
      // Update shooting star position
      if (shootingStarRef.current) {
        shootingStarPositionRef.current.x -= delta * 20;
        shootingStarPositionRef.current.y -= delta * 25;
        shootingStarPositionRef.current.z += delta * 5;
        
        shootingStarRef.current.position.set(
          shootingStarPositionRef.current.x,
          shootingStarPositionRef.current.y,
          shootingStarPositionRef.current.z
        );
        
        // End shooting star when it's off screen
        if (shootingStarPositionRef.current.y < -20) {
          shootingStarActiveRef.current = false;
        }
      }
    }
  });
  
  return (
    <>
      {/* Background stars */}
      <points ref={starsGroup}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.positions.length / 3}
            array={starPositions.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={starPositions.sizes.length}
            array={starPositions.sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starPositions.colors.length / 3}
            array={starPositions.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
        />
      </points>
      
      {/* Shooting star */}
      {shootingStarActiveRef.current && (
        <mesh
          ref={shootingStarRef}
          position={[
            shootingStarPositionRef.current.x,
            shootingStarPositionRef.current.y,
            shootingStarPositionRef.current.z
          ]}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
          <pointLight color="#FFFFFF" intensity={1} distance={3} decay={2} />
        </mesh>
      )}
    </>
  );
};

export default Stars;