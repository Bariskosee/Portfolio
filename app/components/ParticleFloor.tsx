'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const COLOR_TOP    = new THREE.Color('#4a7a5e');
const COLOR_BOTTOM = new THREE.Color('#9A38E3');

function makeTexture() {
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
  return tex;
}

function ParticleCloud({ reduced, scrollProgress }: { reduced: boolean; scrollProgress: number }) {
  const { scene } = useThree();
  const smallRef = useRef<THREE.Points | null>(null);
  const largeRef = useRef<THREE.Points | null>(null);
  const smallOrigRef = useRef<Float32Array | null>(null);
  const largeOrigRef = useRef<Float32Array | null>(null);
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const smallCount = isMobile ? 1500 : 3000;
    const largeCount = isMobile ? 40 : 70;

    const tex = makeTexture();

    const smallPos = new Float32Array(smallCount * 3);
    const smallOrig = new Float32Array(smallCount * 3);
    for (let i = 0; i < smallCount; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 22;
      const z = Math.random() * 15 - 10;
      smallPos[i * 3] = x; smallPos[i * 3 + 1] = y; smallPos[i * 3 + 2] = z;
      smallOrig[i * 3] = x; smallOrig[i * 3 + 1] = y; smallOrig[i * 3 + 2] = z;
    }
    const smallGeo = new THREE.BufferGeometry();
    smallGeo.setAttribute('position', new THREE.BufferAttribute(smallPos, 3));
    const smallMat = new THREE.PointsMaterial({
      size: 0.03, sizeAttenuation: true, transparent: true,
      opacity: 0.6, color: COLOR_TOP.clone(), map: tex,
      alphaTest: 0.01, depthWrite: false, blending: THREE.NormalBlending,
    });
    const smallPoints = new THREE.Points(smallGeo, smallMat);
    scene.add(smallPoints);
    smallRef.current = smallPoints;
    smallOrigRef.current = smallOrig;

    const largePos = new Float32Array(largeCount * 3);
    const largeOrig = new Float32Array(largeCount * 3);
    for (let i = 0; i < largeCount; i++) {
      const x = (Math.random() - 0.5) * 28;
      const y = (Math.random() - 0.5) * 20;
      const z = Math.random() * 12 - 8;
      largePos[i * 3] = x; largePos[i * 3 + 1] = y; largePos[i * 3 + 2] = z;
      largeOrig[i * 3] = x; largeOrig[i * 3 + 1] = y; largeOrig[i * 3 + 2] = z;
    }
    const largeGeo = new THREE.BufferGeometry();
    largeGeo.setAttribute('position', new THREE.BufferAttribute(largePos, 3));
    const largeMat = new THREE.PointsMaterial({
      size: 0.18, sizeAttenuation: true, transparent: true,
      opacity: 0.45, color: COLOR_TOP.clone(), map: tex,
      alphaTest: 0.01, depthWrite: false, blending: THREE.NormalBlending,
    });
    const largePoints = new THREE.Points(largeGeo, largeMat);
    scene.add(largePoints);
    largeRef.current = largePoints;
    largeOrigRef.current = largeOrig;

    return () => {
      scene.remove(smallPoints); smallGeo.dispose(); smallMat.dispose();
      scene.remove(largePoints); largeGeo.dispose(); largeMat.dispose();
      tex.dispose();
    };
  }, [scene]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const progress = scrollRef.current;

    const blended = COLOR_TOP.clone().lerp(COLOR_BOTTOM, progress);

    if (smallRef.current) {
      (smallRef.current.material as THREE.PointsMaterial).color.copy(blended);
    }
    if (largeRef.current) {
      (largeRef.current.material as THREE.PointsMaterial).color.copy(blended);
    }

    if (reduced) return;

    const animatePoints = (pts: THREE.Points | null, orig: Float32Array | null, speed = 1) => {
      if (!pts || !orig) return;
      const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      const n = arr.length / 3;
      for (let i = 0; i < n; i++) {
        const ox = orig[i * 3], oy = orig[i * 3 + 1], oz = orig[i * 3 + 2];
        arr[i * 3]     = ox + Math.cos(oz * 0.2 + t * 0.2 * speed) * 0.1;
        arr[i * 3 + 1] = oy + Math.sin(ox * 0.2 + t * 0.3 * speed) * 0.15;
      }
      attr.needsUpdate = true;
      pts.rotation.y = t * 0.02;
    };

    animatePoints(smallRef.current, smallOrigRef.current, 1);
    animatePoints(largeRef.current, largeOrigRef.current, 0.7);
  });

  return null;
}

export default function ParticleFloor() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 0], fov: 75 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ParticleCloud reduced={reduced} scrollProgress={scrollProgress} />
    </Canvas>
  );
}
