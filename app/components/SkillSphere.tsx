"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ── Icon definitions ─────────────────────────────────────────────────── */
const ICONS = [
  {
    label: "Git",
    paths: `<path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.604-.404-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" fill="#F05032"/>`,
  },
  {
    label: "GitHub",
    paths: `<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#1a1d2e"/>`,
  },
  {
    label: "Docker",
    paths: `<path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.186v1.887c0 .102.082.185.184.185m-2.964 0h2.12a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" fill="#2496ED"/>`,
  },
  {
    label: "Java",
    paths: `<path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.698 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.981.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639" fill="#007396"/>`,
  },
  {
    label: "Python",
    paths: `<path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.89S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.13V3.19S18.28 0 11.914 0zM8.708 1.843a1.052 1.052 0 1 1 0 2.104 1.052 1.052 0 0 1 0-2.104z" fill="#3776AB"/><path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.131S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.402-3.35 3.402H9.451s-3.24-.052-3.24 3.13v5.311S5.72 24 12.086 24zm3.206-1.843a1.052 1.052 0 1 1 0-2.104 1.052 1.052 0 0 1 0 2.104z" fill="#FFDC52"/>`,
  },
];

/* ── Types ────────────────────────────────────────────────────────────── */
interface Pos3D {
  x: number;
  y: number;
  z: number;
  id: number;
}

/* ── Component ────────────────────────────────────────────────────────── */
export function SkillSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const rotRef = useRef({ x: 0.3, y: 0 });
  const animRef = useRef(0);
  const entranceStartedAtRef = useRef<number | null>(null);
  const projectedRef = useRef<Array<{ id: number; x: number; y: number; z: number; radius: number }>>([]);
  const pointerIdRef = useRef<number | null>(null);
  const hoveredIconIdRef = useRef<number | null>(null);

  const [canvasSize, setCanvasSize] = useState(420);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredIconId, setHoveredIconId] = useState<number | null>(null);

  useEffect(() => {
    hoveredIconIdRef.current = hoveredIconId;
  }, [hoveredIconId]);

  const positions: Pos3D[] = useMemo(() => {
    const n = ICONS.length;
    const R = canvasSize * 0.31;
    const offset = 2 / n;
    const step = Math.PI * (3 - Math.sqrt(5));

    return ICONS.map((_, i) => {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * step;
      return { x: Math.cos(phi) * r * R, y: y * R, z: Math.sin(phi) * r * R, id: i };
    });
  }, [canvasSize]);

  useEffect(() => {
    const updateSize = () => {
      const next = Math.max(260, Math.min(window.innerWidth - 40, 420));
      setCanvasSize(next);
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateSize();
    updateMotionPreference();

    window.addEventListener("resize", updateSize);
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      window.removeEventListener("resize", updateSize);
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (entranceStartedAtRef.current === null) {
      entranceStartedAtRef.current = performance.now();
    }
  }, []);

  /* pre-render each icon onto an offscreen canvas */
  useEffect(() => {
    loadedRef.current = ICONS.map(() => false);

    iconCanvasesRef.current = ICONS.map(({ paths }, i) => {
      const off = document.createElement("canvas");
      off.width = 80;
      off.height = 80;
      const ctx = off.getContext("2d");
      if (ctx) {
        const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80" height="80">${paths}</svg>`;
        const url = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgStr)))}`;
        const img = new Image();
        img.src = url;
        img.onload = () => {
          ctx.clearRect(0, 0, 80, 80);
          ctx.drawImage(img, 0, 0, 80, 80);
          loadedRef.current[i] = true;
        };
      }
      return off;
    });
  }, []);

  /* animation loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || positions.length === 0) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startedAt = entranceStartedAtRef.current ?? performance.now();
      const entranceDuration = reduceMotion ? 0 : 1000;
      const rawProgress = entranceDuration === 0
        ? 1
        : Math.min((performance.now() - startedAt) / entranceDuration, 1);
      const entranceProgress = 1 - Math.pow(1 - rawProgress, 3);

      const mdx = mousePos.x - cx;
      const mdy = mousePos.y - cy;
      const maxD = Math.sqrt(cx * cx + cy * cy);
      const speed = 0.002 + (Math.sqrt(mdx * mdx + mdy * mdy) / maxD) * 0.007;

      if (!isDragging && !reduceMotion) {
        rotRef.current = {
          x: rotRef.current.x + (mdy / canvas.height) * speed,
          y: rotRef.current.y + (mdx / canvas.width) * speed,
        };
      }

      const cosX = Math.cos(rotRef.current.x);
      const sinX = Math.sin(rotRef.current.x);
      const cosY = Math.cos(rotRef.current.y);
      const sinY = Math.sin(rotRef.current.y);

      const projected = positions.map(({ x, y, z, id }) => {
        const introFactor = 1.75 + (id % 3) * 0.07;
        const ix = x * introFactor;
        const iy = y * introFactor;
        const iz = z * introFactor;

        const sx = ix + (x - ix) * entranceProgress;
        const sy = iy + (y - iy) * entranceProgress;
        const sz = iz + (z - iz) * entranceProgress;

        const rx = sx * cosY - sz * sinY;
        const rz = sx * sinY + sz * cosY;
        const ry = sy * cosX + rz * sinX;
        return { rx, ry, rz, id };
      });

      projectedRef.current = projected.map(({ rx, ry, rz, id }) => {
        const baseScale = (rz + 260) / 360;
        const hitScale = hoveredIconIdRef.current === id ? baseScale * 1.08 : baseScale;
        return {
          id,
          x: cx + rx,
          y: cy + ry,
          z: rz,
          radius: Math.max(14, 25 * Math.max(0.25, hitScale) * 1.18),
        };
      });

      /* back-to-front for correct overlap */
      projected.sort((a, b) => a.rz - b.rz);

      projected.forEach(({ rx, ry, rz, id }) => {
        const scale = (rz + 260) / 360;
        const isHovered = hoveredIconIdRef.current === id;
        const drawScale = scale * (isHovered ? 1.08 : 1);
        const opacity = Math.max(0.12, Math.min(1, (rz + 170) / 230));
        const drawOpacity = isHovered ? Math.min(1, opacity + 0.2) : opacity;
        const liftY = isHovered ? -5 : 0;

        ctx.save();
        ctx.translate(cx + rx, cy + ry + liftY);
        ctx.scale(drawScale, drawScale);
        ctx.globalAlpha = drawOpacity;

        if (iconCanvasesRef.current[id] && loadedRef.current[id]) {
          ctx.drawImage(iconCanvasesRef.current[id], -25, -28, 50, 50);
        }

        /* label */
        ctx.font = "600 11px 'Geist', system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = isHovered ? "#0f172a" : "#1a1d2e";
        ctx.fillText(ICONS[id].label, 0, 26);

        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [positions, isDragging, mousePos, reduceMotion]);

  const pickHoveredIcon = (x: number, y: number) => {
    let candidate: { id: number; z: number } | null = null;

    for (const icon of projectedRef.current) {
      const dx = x - icon.x;
      const dy = y - icon.y;
      const hit = dx * dx + dy * dy <= icon.radius * icon.radius;
      if (!hit) continue;
      if (!candidate || icon.z > candidate.z) {
        candidate = { id: icon.id, z: icon.z };
      }
    }

    setHoveredIconId(candidate?.id ?? null);
  };

  /* ── event handlers ── */
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      setMousePos({ x: px, y: py });
      pickHoveredIcon(px, py);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      setMousePos({ x: px, y: py });
      pickHoveredIcon(px, py);
    }

    if (isDragging) {
      rotRef.current = {
        x: rotRef.current.x + (e.clientY - lastMouse.y) * 0.005,
        y: rotRef.current.y + (e.clientX - lastMouse.x) * 0.005,
      };
      setLastMouse({ x: e.clientX, y: e.clientY });
    }
  };

  const endPointerInteraction = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(false);
    if (pointerIdRef.current !== null && e.currentTarget.hasPointerCapture(pointerIdRef.current)) {
      e.currentTarget.releasePointerCapture(pointerIdRef.current);
    }
    pointerIdRef.current = null;
    setHoveredIconId(null);
  };

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointerInteraction}
        onPointerCancel={endPointerInteraction}
        onPointerLeave={() => {
          if (!isDragging) {
            setHoveredIconId(null);
          }
        }}
        className={`h-auto w-full ${isDragging ? "cursor-grabbing opacity-90" : "cursor-grab"}`}
        style={{ touchAction: "none" }}
        aria-label="3D rotating skill sphere: Git, GitHub, Docker, Java, Python"
        role="img"
      />
    </div>
  );
}
