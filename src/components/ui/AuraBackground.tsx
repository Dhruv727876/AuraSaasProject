"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Points, PointMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

function Particles({ count = 2000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = (Math.random() - 0.5) * 15;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4f46e5"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
}

function FloatingCrystal({ scrollYProgress }: { scrollYProgress: any }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const distort = useTransform(scrollYProgress, [0, 1], [0.3, 0.8]);
  const speed = useTransform(scrollYProgress, [0, 1], [2, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 0.8]);

  useFrame((state) => {
    const { mouse, clock } = state;
    const time = clock.getElapsedTime();

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.4, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.4, 0.05);
    meshRef.current.position.y = Math.sin(time) * 0.2;
    
    // Smoothly apply scroll-based scale
    const s = scale.get();
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
      <Icosahedron ref={meshRef} args={[1, 15]}>
        <MeshDistortMaterial
          color="#4f46e5"
          speed={speed.get()}
          distort={distort.get()}
          radius={1}
          transparent
          opacity={0.15}
        />
        <MeshWobbleMaterial
          color="#4f46e5"
          factor={0.4}
          speed={1}
          transparent
          opacity={0.05}
          wireframe
        />
      </Icosahedron>
    </Float>
  );
}

function Scene() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f46e5" />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
      
      <FloatingCrystal scrollYProgress={scrollYProgress} />
      <Particles />
    </>
  );
}

export function AuraBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
