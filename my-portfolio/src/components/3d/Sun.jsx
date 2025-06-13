import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useTexture, useHelper } from '@react-three/drei';
import { PointLightHelper } from 'three';
import * as THREE from 'three';
// Custom sun shader material for more realistic effects
const SunMaterial = ({ map, glowIntensity = 1.5 }) => {
  // Create a purely shader-based sun without requiring external textures
  const [time, setTime] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 0.01);
    }, 16);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <shaderMaterial
      uniforms={{
        time: { value: time },
        glowIntensity: { value: glowIntensity }
      }}
      vertexShader={`
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float time;
        uniform float glowIntensity;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        // Noise functions for realistic sun surface
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          
          vec2 u = f * f * (3.0 - 2.0 * f);
          
          return mix(a, b, u.x) +
                 (c - a)* u.y * (1.0 - u.x) +
                 (d - b) * u.x * u.y;
        }
        
        float fbm(vec2 st) {
          float v = 0.0;
          float a = 0.5;
          vec2 shift = vec2(100.0);
          
          // Rotate to reduce axial bias
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          
          for (int i = 0; i < 5; ++i) {
            v += a * noise(st);
            st = rot * st * 2.0 + shift;
            a *= 0.5;
          }
          
          return v;
        }
        
        void main() {
          // Create dynamic sun surface
          vec2 uv = vUv * 4.0;
          
          // Animated noise for surface turbulence
          vec2 q = vec2(
            fbm(uv + vec2(0.0, time * 0.1)),
            fbm(uv + vec2(5.2, time * 0.1))
          );
          
          // More turbulence layers
          vec2 r = vec2(
            fbm(uv + 4.0 * q + vec2(1.7, 9.2) + time * 0.15),
            fbm(uv + 4.0 * q + vec2(8.3, 2.8) + time * 0.126)
          );
          
          // Combine noise layers
          float f = fbm(uv + r);
          
          // Create sun colors with hot spots
          vec3 baseColor = vec3(1.0, 0.5, 0.05); // Deep orange
          vec3 hotColor = vec3(1.0, 0.9, 0.6);   // Bright yellow-white
          vec3 sunColor = mix(baseColor, hotColor, f * 1.5);
          
          // Edge glow effect
          float intensity = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0) * glowIntensity;
          vec3 glow = vec3(1.0, 0.6, 0.2) * intensity;
          
          // Apply pulsating effect
          float pulse = 1.0 + 0.2 * sin(time * 0.5);
          
          vec3 finalColor = sunColor * pulse + glow;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `}
    />
  );
};
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

  // No need to load texture as we're using a custom shader
  const lightRef = useRef();
  
  // Uncomment to debug the light
  // useHelper(lightRef, PointLightHelper, 1, 'red');

  return (
    <group position={position}>
      {/* Main sun with custom shader material */}
      {/* Main sun with custom shader material */}
      <Sphere ref={sunRef} args={[2, 64, 64]} position={[0, 0, 0]}>
        <SunMaterial glowIntensity={1.8} />
      </Sphere>
      {/* Inner glow */}
      <Sphere args={[2.2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#FFA726" 
          transparent={true}
          opacity={0.4}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[2.7, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#FFCC80" 
          transparent={true}
          opacity={0.2}
        />
      </Sphere>

      {/* Point light to illuminate scene */}
      <pointLight
        ref={lightRef}
        color="#FFF5E0"
        intensity={2}
        distance={100}
        decay={2}
        power={80}
        castShadow
      />
    </group>
  );
};

export default Sun;