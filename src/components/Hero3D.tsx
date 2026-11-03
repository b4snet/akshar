"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const SUBJECTS = [
  { name: "Physics", color: "#2563eb", distance: 3.2 },
  { name: "Chemistry", color: "#059669", distance: 3.6 },
  { name: "Biology", color: "#d97706", distance: 4.0 },
  { name: "Mathematics", color: "#dc2626", distance: 4.4 },
];

function OrbitElement({ subject }: { subject: (typeof SUBJECTS)[number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = (state as unknown as { elapsedTime: number }).elapsedTime;
    const angle = time * 0.5;
    const radius = subject.distance;

    if (ref.current) {
      ref.current.position.x = Math.cos(angle) * radius;
      ref.current.position.z = Math.sin(angle) * radius;
      ref.current.position.y = Math.sin(time * 0.7) * 0.8;

      ref.current.rotation.y += 0.01;
      ref.current.rotation.z += 0.005;
    }
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial color={subject.color} emissiveIntensity={0.5} />
    </mesh>
  );
}

function CentralSculpture() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = (state as unknown as { elapsedTime: number }).elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = time * 0.15;
      ref.current.rotation.x = time * 0.08;
      ref.current.rotation.z = time * 0.1;
    }
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#2563eb"
        emissiveIntensity={0.15}
        roughness={0.4}
        metalness={0.3}
      />
      <mesh>
        <icosahedronGeometry args={[1.62, 1]} />
        <meshBasicMaterial color="#2563eb" transparent opacity={0.35} wireframe />
      </mesh>
    </mesh>
  );
}

export function Hero3D() {
  const [mounted] = useState(() => typeof window !== "undefined");

  if (!mounted) {
    return (
      <section className="hero-3d" aria-labelledby="hero-3d-title">
        <div className="hero-3d-fallback">
          <div className="hero-3d-symbol">अ</div>
          <h1 id="hero-3d-title">Beyond memorising, you build your future.</h1>
          <p className="hero-3d-sub">
            Structured lessons, revision resources, practice questions, and exam preparation
            for students ready to learn with purpose.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-3d" aria-labelledby="hero-3d-title">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight position={[5, 10, 7]} intensity={0.8} castShadow />
        <ambientLight intensity={0.2} color="#2563eb" />

        <CentralSculpture />
        {SUBJECTS.map((s) => (
          <OrbitElement key={s.name} subject={s} />
        ))}

        <ContactShadows />
        <Stars count={250} radius={60} factor={2} saturation={0} speed={0} />

        <ambientLight intensity={0.1} color="#2563eb" />
      </Canvas>

      <div className="subject-labels">
        {SUBJECTS.map((s) => (
          <div
            key={s.name}
            className="subject-label"
            style={{ color: s.color }}
          >
            {s.name}
          </div>
        ))}
      </div>
    </section>
  );
}