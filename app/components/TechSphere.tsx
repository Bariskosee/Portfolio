"use client";

import { useEffect, useRef } from "react";
import {
  siPython, siTypescript, siReact, siNextdotjs, siApachekafka,
  siDocker, siFastapi, siRedis, siPytorch, siOpenjdk, siSpring,
  siPostgresql, siLinux, siGit, siNodedotjs,
} from "simple-icons";

type SimpleIcon = { path: string };

const TECHS: {
  name: string;
  icon: SimpleIcon;
  color: string;
  textColor: string;
  mark: string;
}[] = [
  { name: "Python",     mark: "Py", icon: siPython,      color: "#3776ab", textColor: "#ffffff" },
  { name: "TypeScript", mark: "TS", icon: siTypescript,   color: "#3178c6", textColor: "#ffffff" },
  { name: "React",      mark: "Re", icon: siReact,        color: "#61dafb", textColor: "#10212a" },
  { name: "Next.js",    mark: "N",  icon: siNextdotjs,    color: "#111111", textColor: "#ffffff" },
  { name: "Kafka",      mark: "Kf", icon: siApachekafka,  color: "#2f2f35", textColor: "#ffffff" },
  { name: "Docker",     mark: "Do", icon: siDocker,        color: "#2496ed", textColor: "#ffffff" },
  { name: "FastAPI",    mark: "Fa", icon: siFastapi,       color: "#009688", textColor: "#ffffff" },
  { name: "Redis",      mark: "Rd", icon: siRedis,         color: "#dc382d", textColor: "#ffffff" },
  { name: "PyTorch",    mark: "Pt", icon: siPytorch,       color: "#ee4c2c", textColor: "#ffffff" },
  { name: "Java",       mark: "Ja", icon: siOpenjdk,       color: "#e76f00", textColor: "#ffffff" },
  { name: "Spring",     mark: "Sp", icon: siSpring,        color: "#6db33f", textColor: "#10212a" },
  { name: "PostgreSQL", mark: "Pg", icon: siPostgresql,    color: "#336791", textColor: "#ffffff" },
  { name: "Linux",      mark: "Ln", icon: siLinux,         color: "#f4c542", textColor: "#1b1b1b" },
  { name: "Git",        mark: "Gt", icon: siGit,           color: "#f05032", textColor: "#ffffff" },
  { name: "Node.js",    mark: "Nd", icon: siNodedotjs,     color: "#5fa04e", textColor: "#10212a" },
];

type Language = "EN" | "TR";

const TECH_CATEGORIES = [
  {
    id: "backend",
    label: { EN: "Backend", TR: "Backend" },
    techIndexes: [6, 9, 10, 14],
  },
  {
    id: "data-ml",
    label: { EN: "Data & ML", TR: "Veri & ML" },
    techIndexes: [0, 8, 11],
  },
  {
    id: "frontend",
    label: { EN: "Frontend", TR: "Frontend" },
    techIndexes: [1, 2, 3],
  },
  {
    id: "infrastructure",
    label: { EN: "Infrastructure", TR: "Altyapı" },
    techIndexes: [4, 5, 7, 12, 13],
  },
] as const;

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

function makeSvgImage(tech: (typeof TECHS)[number]): HTMLImageElement {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${tech.textColor}" d="${tech.icon.path}"/></svg>`;
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  return img;
}

interface TechSphereProps {
  language?: Language;
}

export function TechSphere({ language = "TR" }: TechSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const canvasElement: HTMLCanvasElement = canvas;
    const containerElement: HTMLDivElement = container;

    const ctxNullable = canvasElement.getContext("2d");
    if (!ctxNullable) return;
    const ctx = ctxNullable;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const initialRect = containerElement.getBoundingClientRect();

    let dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let animationFrame: number | null = null;
    let previousTimestamp: number | null = null;
    let elapsed = 0;
    let prefersReducedMotion = motionQuery.matches;
    let isDocumentVisible = !document.hidden;
    let isInViewport =
      initialRect.bottom > 0 &&
      initialRect.right > 0 &&
      initialRect.top < window.innerHeight &&
      initialRect.left < window.innerWidth;

    const iconImgs = TECHS.map(makeSvgImage);

    function drawBadge(
      x: number,
      y: number,
      size: number,
      techIndex: number,
    ) {
      const tech = TECHS[techIndex];
      const radius = size * 0.24;
      const half = size / 2;

      ctx.save();
      ctx.translate(x, y);

      ctx.fillStyle = tech.color;
      ctx.beginPath();
      ctx.roundRect(-half, -half, size, size, radius);
      ctx.fill();

      ctx.strokeStyle = "rgba(252,252,249,0.72)";
      ctx.lineWidth = Math.max(1, size * 0.035);
      ctx.stroke();

      const img = iconImgs[techIndex];
      const iconSize = size * 0.62;
      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, -iconSize / 2, -iconSize / 2, iconSize, iconSize);
      } else {
        ctx.fillStyle = tech.textColor;
        ctx.font = `700 ${Math.max(11, size * 0.38)}px Geist, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(tech.mark, 0, 1);
      }

      ctx.restore();
    }

    function drawFrame(elapsedSeconds: number) {
      if (width <= 0 || height <= 0) return;

      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const cx = width / 2;
      const cy = height / 2;
      const rx = width * 0.38;
      const ry = height * 0.42;

      const positions = ORBITS.map((o, i) => {
        const t = elapsedSeconds * 0.38;
        const x = cx + o.cx * width * 0.4 + Math.sin(t * o.fx + o.phase) * rx * o.ax * 3.2;
        const y = cy + o.cy * height * 0.4 + Math.cos(t * o.fy + o.phaseY) * ry * o.ay * 3.2;
        const depth = 0.55 + Math.sin(elapsedSeconds * 0.15 + o.phase) * 0.25 + o.z * 0.2;
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

      for (const pos of sorted) {
        const { x, y, depth, i } = pos;
        const size = ICON_SIZE * depth;
        const opacity = 0.45 + depth * 0.55;

        ctx.globalAlpha = opacity;
        drawBadge(x, y, size, i);
        ctx.globalAlpha = 1;
      }

      ctx.restore();
    }

    function canAnimate() {
      return !prefersReducedMotion && isInViewport && isDocumentVisible;
    }

    function stopAnimation() {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      previousTimestamp = null;
    }

    function animate(timestamp: number) {
      animationFrame = null;
      if (!canAnimate()) {
        previousTimestamp = null;
        return;
      }

      if (previousTimestamp !== null) {
        elapsed += Math.min((timestamp - previousTimestamp) * 0.001, 0.1);
      }
      previousTimestamp = timestamp;
      drawFrame(elapsed);
      animationFrame = requestAnimationFrame(animate);
    }

    function syncAnimation() {
      if (!canAnimate()) {
        stopAnimation();
        if (prefersReducedMotion) {
          elapsed = 0;
          drawFrame(0);
        }
        return;
      }

      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    function resize() {
      const rect = containerElement.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvasElement.width = Math.max(1, Math.round(width * dpr));
      canvasElement.height = Math.max(1, Math.round(height * dpr));
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      drawFrame(prefersReducedMotion ? 0 : elapsed);
    }

    function onVisibilityChange() {
      isDocumentVisible = !document.hidden;
      syncAnimation();
    }

    function onMotionPreferenceChange(event: MediaQueryListEvent) {
      prefersReducedMotion = event.matches;
      elapsed = 0;
      previousTimestamp = null;
      syncAnimation();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(containerElement);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isInViewport = entry.isIntersecting;
      syncAnimation();
    });
    intersectionObserver.observe(containerElement);

    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener("change", onMotionPreferenceChange);

    const onIconLoad = () => {
      if (!canAnimate()) {
        drawFrame(prefersReducedMotion ? 0 : elapsed);
      }
    };
    iconImgs.forEach((image) => image.addEventListener("load", onIconLoad));

    resize();
    syncAnimation();

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener("change", onMotionPreferenceChange);
      iconImgs.forEach((image) => image.removeEventListener("load", onIconLoad));
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <div
        ref={containerRef}
        className="relative order-2 h-[300px] w-full sm:h-[380px] md:order-1 md:h-[480px]"
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none block"
        />
      </div>

      <div
        className="order-1 grid grid-cols-1 gap-3 sm:grid-cols-2 md:order-2 lg:grid-cols-4"
        role="group"
        aria-label={language === "TR" ? "Teknoloji yetkinlikleri" : "Technology skills"}
      >
        {TECH_CATEGORIES.map((category) => (
          <section
            key={category.id}
            className="rounded-2xl border border-border-soft bg-surface-raised p-4 shadow-soft"
          >
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary">
              {category.label[language]}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {category.techIndexes.map((techIndex) => {
                const tech = TECHS[techIndex];

                return (
                  <li
                    key={tech.name}
                    className="inline-flex min-h-8 items-center gap-2 rounded-full border border-border-soft bg-bg-surface px-3 py-1.5 font-sans text-sm font-medium leading-none text-text-primary"
                  >
                    <span
                      aria-hidden="true"
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: tech.color }}
                    />
                    {tech.name}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
