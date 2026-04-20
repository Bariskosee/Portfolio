'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleCloud({ reduced }: { reduced: boolean }) {
  const { scene } = useThree();
  const pointsRef = useRef<THREE.Points | null>(null);
  const origRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 1500 : 3000;

    const positions = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 16;
      const z = Math.random() * 15 - 10;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const texCanvas = document.createElement('canvas');
    texCanvas.width = 64;
    texCanvas.height = 64;
    const ctx = texCanvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(texCanvas);
    tex.needsUpdate = true;

    const mat = new THREE.PointsMaterial({
      size: 0.03,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
      color: '#4a7a5e',
      map: tex,
      alphaTest: 0.01,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);
    pointsRef.current = points;
    origRef.current = orig;

    return () => {
      scene.remove(points);
      geo.dispose();
      tex.dispose();
      mat.dispose();
    };
  }, [scene]);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    const orig = origRef.current;
    if (reduced || !points || !orig) return;

    const t = clock.getElapsedTime();
    const attr = points.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const n = arr.length / 3;

    for (let i = 0; i < n; i++) {
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];
      const oz = orig[i * 3 + 2];
      arr[i * 3] = ox + Math.cos(oz * 0.2 + t * 0.2) * 0.1;
      arr[i * 3 + 1] = oy + Math.sin(ox * 0.2 + t * 0.3) * 0.15;
    }
    attr.needsUpdate = true;

    points.rotation.y = t * 0.02;
  });

  return null;
}

export default function ParticleFloor() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 0], fov: 75 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ParticleCloud reduced={reduced} />
    </Canvas>
  );
}
