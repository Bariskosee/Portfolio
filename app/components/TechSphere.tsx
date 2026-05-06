"use client";

import { useEffect, useRef, useState } from "react";

const TECHS = [
  { name: "Python", mark: "Py", color: "#3776ab", textColor: "#ffffff" },
  { name: "TypeScript", mark: "TS", color: "#3178c6", textColor: "#ffffff" },
  { name: "React", mark: "Re", color: "#61dafb", textColor: "#10212a" },
  { name: "Next.js", mark: "N", color: "#111111", textColor: "#ffffff" },
  { name: "Kafka", mark: "Kf", color: "#2f2f35", textColor: "#ffffff" },
  { name: "Docker", mark: "Do", color: "#2496ed", textColor: "#ffffff" },
  { name: "FastAPI", mark: "Fa", color: "#009688", textColor: "#ffffff" },
  { name: "Redis", mark: "Rd", color: "#dc382d", textColor: "#ffffff" },
  { name: "PyTorch", mark: "Pt", color: "#ee4c2c", textColor: "#ffffff" },
  { name: "Java", mark: "Ja", color: "#e76f00", textColor: "#ffffff" },
  { name: "Spring", mark: "Sp", color: "#6db33f", textColor: "#10212a" },
  { name: "PostgreSQL", mark: "Pg", color: "#336791", textColor: "#ffffff" },
  { name: "Linux", mark: "Ln", color: "#f4c542", textColor: "#1b1b1b" },
  { name: "Git", mark: "Git", color: "#f05032", textColor: "#ffffff" },
  { name: "Node.js", mark: "Nd", color: "#5fa04e", textColor: "#10212a" },
];

interface Orbit {
  cx: number;
  cy: number;
  ax: number;
  ay: number;
  fx: number;
  fy: number;
  phase: number;
  phaseY: number;
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
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    function resize() {
      const rect = container!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function drawBadge(
      x: number,
      y: number,
      size: number,
      tech: (typeof TECHS)[number],
      isHovered: boolean,
    ) {
      const radius = size * 0.24;
      const half = size / 2;

      ctx.save();
      ctx.translate(x, y);
      if (isHovered) {
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.9);
        grad.addColorStop(0, "rgba(138,162,198,0.24)");
        grad.addColorStop(1, "rgba(138,162,198,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = tech.color;
      ctx.beginPath();
      ctx.roundRect(-half, -half, size, size, radius);
      ctx.fill();

      ctx.strokeStyle = "rgba(252,252,249,0.72)";
      ctx.lineWidth = Math.max(1, size * 0.035);
      ctx.stroke();

      ctx.fillStyle = tech.textColor;
      ctx.font = `700 ${Math.max(11, size * 0.38)}px Geist, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(tech.mark, 0, 1);
      ctx.restore();
    }

    function draw(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) * 0.001;

      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const cx = width / 2;
      const cy = height / 2;
      const rx = width * 0.38;
      const ry = height * 0.42;

      const positions = ORBITS.map((o, i) => {
        const t = elapsed * 0.38;
        const x = cx + o.cx * width * 0.4 + Math.sin(t * o.fx + o.phase) * rx * o.ax * 3.2;
        const y = cy + o.cy * height * 0.4 + Math.cos(t * o.fy + o.phaseY) * ry * o.ay * 3.2;
        const depth = 0.55 + Math.sin(elapsed * 0.15 + o.phase) * 0.25 + o.z * 0.2;
        return { x, y, depth, i };
      });

      const sorted = [...positions].sort((a, b) => a.depth - b.depth);

      for (let a = 0; a < sorted.length; a++) {
        for (let b = a + 1; b < sorted.length; b++) {
          const pa = sorted[a];
          const pb = sorted[b];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = width * 0.22;
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

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      let newHovered: number | null = null;
      for (const pos of positions) {
        const dx = pos.x - mx;
        const dy = pos.y - my;
        const r = ICON_SIZE * 0.7 * pos.depth;
        if (Math.sqrt(dx * dx + dy * dy) < r + 10) {
          newHovered = pos.i;
          break;
        }
      }
      if (newHovered !== hoveredRef.current) {
        hoveredRef.current = newHovered;
        setHovered(newHovered);
      }

      for (const pos of sorted) {
        const { x, y, depth, i } = pos;
        const tech = TECHS[i];
        const isHovered = hoveredRef.current === i;
        const size = ICON_SIZE * depth * (isHovered ? 1.18 : 1);
        const opacity = isHovered ? 1 : 0.45 + depth * 0.55;

        ctx.globalAlpha = opacity;
        drawBadge(x, y, size, tech, isHovered);
        ctx.globalAlpha = 1;

        if (isHovered) {
          ctx.font = "500 12px Geist, system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          const labelY = y + size / 2 + 5;
          const tw = ctx.measureText(tech.name).width;
          ctx.fillStyle = "rgba(252,252,249,0.94)";
          ctx.beginPath();
          ctx.roundRect(x - tw / 2 - 6, labelY - 2, tw + 12, 18, 4);
          ctx.fill();
          ctx.fillStyle = "#131a27";
          ctx.fillText(tech.name, x, labelY);
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
      <ul className="sr-only">
        {TECHS.map((tech) => (
          <li key={tech.name}>{tech.name}</li>
        ))}
      </ul>
      <div ref={containerRef} className="relative h-[360px] w-full sm:h-[420px] md:h-[480px]">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            display: "block",
            cursor: hovered !== null ? "pointer" : "default",
          }}
        />
      </div>
    </div>
  );
}
