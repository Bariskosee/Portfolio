"use client";

import { useEffect, useRef, useState } from "react";

const TECHS = [
  { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Kafka",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg" },
  { name: "Docker",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "FastAPI",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Redis",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "PyTorch",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
  { name: "Java",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "Spring",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Linux",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "Git",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
];

interface Orbit {
  cx: number; cy: number;
  ax: number; ay: number;
  fx: number; fy: number;
  phase: number; phaseY: number;
  z: number;
}

function genOrbits(count: number): Orbit[] {
  const phi = (1 + Math.sqrt(5)) / 2;
  return Array.from({ length: count }, (_, i) => {
    const angle = i * phi * 2 * Math.PI;
    const r = 0.1 + (i % 3) * 0.22;
    return {
      cx: Math.cos(angle) * r * 0.6,
      cy: Math.sin(angle) * r * 0.55,
      ax: 0.08 + (i % 4) * 0.03,
      ay: 0.06 + (i % 3) * 0.03,
      fx: 1 + (i % 3) * 0.17,
      fy: 1 + ((i + 1) % 5) * 0.13,
      phase: (i / count) * Math.PI * 2,
      phaseY: (i / count) * Math.PI * 3.1,
      z: 0.3 + (i % 5) * 0.14,
    };
  });
}

const ORBITS = genOrbits(TECHS.length);
const ICON_SIZE = 46;

export function TechSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const hoveredRef = useRef<number | null>(null);
  const imgCacheRef = useRef<Record<string, HTMLImageElement>>({});
  const [hovered, setHovered] = useState<number | null>(null);

  // Preload images
  useEffect(() => {
    TECHS.forEach((t) => {
      if (!imgCacheRef.current[t.name]) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = t.icon;
        imgCacheRef.current[t.name] = img;
      }
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    let W = 0;
    let H = 0;

    function resize() {
      const rect = container!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const ctx = canvas.getContext("2d")!;

    function draw(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) * 0.001;

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const cx = W / 2;
      const cy = H / 2;
      const rx = W * 0.38;
      const ry = H * 0.42;

      const positions = ORBITS.map((o, i) => {
        const t = elapsed * 0.38;
        const x = cx + o.cx * W * 0.4 + Math.sin(t * o.fx + o.phase) * rx * o.ax * 3.2;
        const y = cy + o.cy * H * 0.4 + Math.cos(t * o.fy + o.phaseY) * ry * o.ay * 3.2;
        const depth = 0.55 + Math.sin(elapsed * 0.15 + o.phase) * 0.25 + o.z * 0.2;
        return { x, y, depth, i };
      });

      const sorted = [...positions].sort((a, b) => a.depth - b.depth);

      // Connecting lines
      for (let a = 0; a < sorted.length; a++) {
        for (let b = a + 1; b < sorted.length; b++) {
          const pa = sorted[a];
          const pb = sorted[b];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = W * 0.22;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.09;
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.strokeStyle = `rgba(19,26,39,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Hit detection
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      let newHov: number | null = null;
      for (const pos of positions) {
        const dx = pos.x - mx;
        const dy = pos.y - my;
        const r = ICON_SIZE * 0.7 * pos.depth;
        if (Math.sqrt(dx * dx + dy * dy) < r + 10) {
          newHov = pos.i;
          break;
        }
      }
      if (newHov !== hoveredRef.current) {
        hoveredRef.current = newHov;
        setHovered(newHov);
      }

      // Draw icons
      for (const pos of sorted) {
        const { x, y, depth, i } = pos;
        const tech = TECHS[i];
        const img = imgCacheRef.current[tech.name];
        const isHov = hoveredRef.current === i;
        const scale = isHov ? 1.18 : 1;
        const finalSz = ICON_SIZE * depth * scale;
        const opacity = 0.45 + depth * 0.55;

        ctx.globalAlpha = isHov ? 1 : opacity;

        if (isHov) {
          const grad = ctx.createRadialGradient(x, y, 0, x, y, finalSz * 1.1);
          grad.addColorStop(0, "rgba(138,162,198,0.18)");
          grad.addColorStop(1, "rgba(138,162,198,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, finalSz * 1.1, 0, Math.PI * 2);
          ctx.fill();
        }

        if (img && img.complete && img.naturalWidth > 0) {
          try {
            ctx.drawImage(img, x - finalSz / 2, y - finalSz / 2, finalSz, finalSz);
          } catch { /* cross-origin fallback */ }
        } else {
          ctx.fillStyle = `rgba(32,40,55,${opacity})`;
          ctx.font = `${Math.round(finalSz * 0.45)}px 'Geist', sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(tech.name.slice(0, 2), x, y);
        }

        ctx.globalAlpha = 1;

        if (isHov) {
          ctx.globalAlpha = 1;
          ctx.font = "500 12px 'Geist', system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          const labelY = y + finalSz / 2 + 5;
          const tw = ctx.measureText(tech.name).width;
          ctx.fillStyle = "rgba(252,252,249,0.92)";
          ctx.beginPath();
          ctx.roundRect(x - tw / 2 - 6, labelY - 2, tw + 12, 18, 4);
          ctx.fill();
          ctx.fillStyle = "#131a27";
          ctx.fillText(tech.name, x, labelY);
          ctx.globalAlpha = 1;
        }
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: 480 }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            cursor: hovered !== null ? "pointer" : "default",
          }}
        />
      </div>

    </div>
  );
}
