"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

// ── SVG Thumbnails ──────────────────────────────────────────────

function ArchThumb() {
  return (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <pattern id="grid-arch" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(19,26,39,0.06)" strokeWidth="1" />
        </pattern>
        <linearGradient id="bg-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf3e8" />
          <stop offset="100%" stopColor="#f5e9d4" />
        </linearGradient>
        <filter id="shadow-arch" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#131a27" floodOpacity="0.14" />
        </filter>
      </defs>
      <rect width="320" height="180" fill="url(#bg-arch)" />
      <rect width="320" height="180" fill="url(#grid-arch)" />
      {(
        [
          [94, 39],
          [94, 89],
          [94, 139],
          [226, 39],
          [226, 89],
          [226, 139],
        ] as [number, number][]
      ).map(([x, y], i) => (
        <line
          key={i}
          x1={x}
          y1={y}
          x2={x < 160 ? 130 : 190}
          y2={90}
          stroke="#202837"
          strokeOpacity="0.22"
          strokeWidth="0.8"
          strokeDasharray="3 2.5"
        />
      ))}
      <g filter="url(#shadow-arch)">
        <rect x="124" y="74" width="72" height="34" rx="6" fill="#202837" />
        <rect x="128" y="78" width="64" height="1.6" rx="0.8" fill="#5fa37a" opacity="0.85" />
      </g>
      <text x="160" y="95" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fcfcf9" fontFamily="Geist,sans-serif" letterSpacing="1.2">KAFKA</text>
      <text x="160" y="104.5" textAnchor="middle" fontSize="6" fill="rgba(252,252,249,0.55)" fontFamily="Geist,sans-serif" letterSpacing="1.2">EVENT BUS</text>
      {[
        { x: 26, y: 28, label: "auth" },
        { x: 26, y: 78, label: "billing" },
        { x: 26, y: 128, label: "meter" },
        { x: 226, y: 28, label: "ws-gw" },
        { x: 226, y: 78, label: "queue" },
        { x: 226, y: 128, label: "monitor" },
      ].map((n, i) => (
        <g key={i} filter="url(#shadow-arch)">
          <rect x={n.x} y={n.y} width="68" height="22" rx="4" fill="#fcfcf9" stroke="rgba(19,26,39,0.16)" strokeWidth="0.7" />
          <circle cx={n.x + 8} cy={n.y + 11} r="2.4" fill="#5fa37a" />
          <text x={n.x + 16} y={n.y + 14.5} fontSize="8.5" fill="#131a27" fontFamily="Geist,sans-serif" fontWeight="500">{n.label}</text>
        </g>
      ))}
      <g transform="translate(12, 158)">
        <rect width="62" height="13" rx="6.5" fill="rgba(252,252,249,0.95)" stroke="rgba(19,26,39,0.12)" strokeWidth="0.6" />
        <circle cx="7" cy="6.5" r="2" fill="#5fa37a">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="13" y="9.5" fontSize="6.5" fontWeight="700" fill="#202837" fontFamily="Geist,sans-serif" letterSpacing="0.6">19 SERVICES</text>
      </g>
    </svg>
  );
}

function ChatThumb() {
  return (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id="bg-chat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1d2433" />
          <stop offset="100%" stopColor="#0f1521" />
        </linearGradient>
        <filter id="shadow-chat" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      <rect width="320" height="180" fill="url(#bg-chat)" />
      <rect width="320" height="22" fill="rgba(252,252,249,0.04)" />
      <circle cx="13" cy="11" r="2.8" fill="#d97757" />
      <circle cx="24" cy="11" r="2.8" fill="#e0c068" />
      <circle cx="35" cy="11" r="2.8" fill="#5fa37a" />
      <text x="160" y="14.5" textAnchor="middle" fontSize="8" fontWeight="500" fill="rgba(252,252,249,0.5)" fontFamily="Geist,sans-serif" letterSpacing="0.5">mefapex · tr-NLP</text>
      <g filter="url(#shadow-chat)">
        <rect x="196" y="38" width="106" height="22" rx="11" fill="#3d4a60" />
      </g>
      <text x="249" y="52.5" textAnchor="middle" fontSize="9.5" fontWeight="500" fill="#fcfcf9" fontFamily="Geist,sans-serif">Sipariş nerede?</text>
      <circle cx="22" cy="82" r="10" fill="#5fa37a" />
      <text x="22" y="85.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fcfcf9" fontFamily="Geist,sans-serif">M</text>
      <g filter="url(#shadow-chat)">
        <rect x="38" y="71" width="176" height="44" rx="10" fill="#fcfcf9" />
      </g>
      <text x="48" y="87" fontSize="9.5" fontWeight="500" fill="#131a27" fontFamily="Geist,sans-serif">Siparişiniz yola çıktı.</text>
      <g transform="translate(48, 95)">
        <rect width="84" height="13" rx="3" fill="#e8ecf2" />
        <text x="6" y="9" fontSize="6.5" fontWeight="700" fill="#202837" fontFamily="Geist,sans-serif" letterSpacing="0.4">INTENT</text>
        <text x="36" y="9" fontSize="6.5" fontWeight="500" fill="#4f5a6d" fontFamily="Geist,sans-serif">order_status</text>
      </g>
      <g transform="translate(138, 95)">
        <rect width="46" height="13" rx="3" fill="rgba(95,163,122,0.18)" />
        <circle cx="7" cy="6.5" r="2" fill="#5fa37a" />
        <text x="14" y="9" fontSize="6.5" fontWeight="700" fill="#3a7a5a" fontFamily="Geist,sans-serif" letterSpacing="0.4">0.94</text>
      </g>
      <g filter="url(#shadow-chat)">
        <rect x="166" y="126" width="136" height="22" rx="11" fill="#3d4a60" />
      </g>
      <text x="234" y="140.5" textAnchor="middle" fontSize="9.5" fontWeight="500" fill="#fcfcf9" fontFamily="Geist,sans-serif">Teşekkürler!</text>
      <g filter="url(#shadow-chat)">
        <rect x="14" y="158" width="56" height="16" rx="8" fill="rgba(252,252,249,0.92)" />
      </g>
      <circle cx="28" cy="166" r="2.2" fill="#7f8898">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="42" cy="166" r="2.2" fill="#7f8898">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="56" cy="166" r="2.2" fill="#7f8898">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function FilmThumb() {
  const posters = [
    { x: 24, c: "#3a4d6b", tint: "#5a7090" },
    { x: 96, c: "#5a3a4d", tint: "#8a5570" },
    { x: 168, c: "#3a5a4d", tint: "#5a8a70" },
    { x: 240, c: "#5a4d3a", tint: "#8a7550" },
  ];
  return (
    <svg viewBox="0 0 320 180" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id="bg-film" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eef0f6" />
          <stop offset="100%" stopColor="#dfe3ec" />
        </linearGradient>
        <filter id="shadow-film" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#131a27" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect width="320" height="180" fill="url(#bg-film)" />
      <text x="24" y="22" fontSize="8.5" fontWeight="700" fill="#202837" fontFamily="Geist,sans-serif" letterSpacing="1.5">DATAFELIX</text>
      <text x="296" y="22" textAnchor="end" fontSize="7.5" fontWeight="500" fill="#7f8898" fontFamily="Geist,sans-serif" letterSpacing="0.6">CATALOG · 1.2K TITLES</text>
      <line x1="24" y1="30" x2="296" y2="30" stroke="rgba(19,26,39,0.08)" strokeWidth="0.6" />
      {posters.map((p, i) => (
        <g key={i} filter="url(#shadow-film)">
          <rect x={p.x} y={42} width="56" height="82" rx="4" fill={p.c} />
          <rect x={p.x + 4} y={46} width="48" height="50" rx="2" fill={p.tint} opacity="0.45" />
          <rect x={p.x + 4} y={46} width="14" height="4" rx="1" fill="rgba(252,252,249,0.4)" />
          <rect x={p.x} y={130} width="56" height="3.5" rx="1.75" fill="#202837" />
          <rect x={p.x} y={138} width="38" height="2.5" rx="1.25" fill="rgba(19,26,39,0.4)" />
          <g transform={`translate(${p.x + 38}, 138)`}>
            <text fontSize="5.5" fontWeight="700" fill="#d97757" fontFamily="Geist,sans-serif" letterSpacing="0.3">
              ★ {(7.2 + i * 0.4).toFixed(1)}
            </text>
          </g>
        </g>
      ))}
      <g transform="translate(24, 152)">
        <rect width="272" height="18" rx="9" fill="rgba(252,252,249,0.95)" stroke="rgba(19,26,39,0.1)" strokeWidth="0.6" />
        <circle cx="11" cy="9" r="3.2" fill="none" stroke="#7f8898" strokeWidth="1" />
        <line x1="13.6" y1="11.5" x2="16" y2="14" stroke="#7f8898" strokeWidth="1" strokeLinecap="round" />
        <text x="22" y="12" fontSize="7.5" fill="#7f8898" fontFamily="Geist,sans-serif" fontWeight="500">Search by title, genre, year…</text>
        <rect x="240" y="4" width="28" height="10" rx="5" fill="#202837" />
        <text x="254" y="11" textAnchor="middle" fontSize="6" fontWeight="700" fill="#fcfcf9" fontFamily="Geist,sans-serif" letterSpacing="0.5">⌘K</text>
      </g>
    </svg>
  );
}

const THUMBS = [ArchThumb, ChatThumb, FilmThumb] as const;

// ── Types ───────────────────────────────────────────────────────

export interface ProjectCardData {
  title: string;
  description: string;
  stack: readonly string[];
  link: string;
  action: string;
  year: string;
  role: string;
  tag: string;
  hasSprite?: boolean;
}

interface ProjectCardProps {
  project: ProjectCardData;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants: Record<string, any>;
  reducedMotion: boolean;
}

// ── Card ────────────────────────────────────────────────────────

export default function ProjectCard({ project, index, variants, reducedMotion }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const Thumb = THUMBS[index];
  const visibleStack = [...project.stack].slice(0, 3);
  const extra = project.stack.length - visibleStack.length;

  return (
    <motion.article
      variants={variants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -8, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } }
      }
      style={{
        position: "relative",
        background: "var(--bg-surface)",
        border: `1px solid ${hovered ? "rgba(19,26,39,0.22)" : "rgba(19,26,39,0.10)"}`,
        borderRadius: 20,
        boxShadow: hovered
          ? "0 24px 48px -12px rgba(17,24,39,0.18), 0 4px 12px rgba(17,24,39,0.06)"
          : "0 2px 4px rgba(17,24,39,0.04), 0 8px 20px -4px rgba(17,24,39,0.06)",
        transition:
          "box-shadow 360ms cubic-bezier(0.22,1,0.36,1), border-color 240ms cubic-bezier(0.22,1,0.36,1)",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        overflow: "visible",
      }}
    >
      {project.hasSprite && (
        <Image
          src="/baris-idle.png"
          alt=""
          aria-hidden="true"
          width={112}
          height={168}
          draggable={false}
          className="pixel-art pointer-events-none select-none"
          style={{
            position: "absolute",
            right: 22,
            bottom: "calc(100% - 10px)",
            width: "auto",
            height: 168,
            zIndex: 5,
            filter: "drop-shadow(0 10px 8px rgba(17,24,39,0.20))",
            transform: hovered && !reducedMotion ? "translateY(-6px)" : "translateY(0)",
            transition: "transform 360ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      )}

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} on GitHub`}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          borderRadius: 20,
          overflow: "hidden",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {/* 16:9 thumbnail */}
        <div
          style={{
            aspectRatio: "16/9",
            overflow: "hidden",
            borderBottom: "1px solid rgba(19,26,39,0.08)",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <motion.div
            style={{ width: "100%", height: "100%" }}
            animate={{ scale: hovered && !reducedMotion ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Thumb />
          </motion.div>
          {/* tag pill */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "rgba(252,252,249,0.92)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(19,26,39,0.1)",
              borderRadius: 9999,
              padding: "4px 10px",
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#202837",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#5fa37a",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {project.tag}
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "20px 22px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            flex: 1,
          }}
        >
          {/* eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            <span>{project.year}</span>
            <span
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "#c8ccd2",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span>{project.role}</span>
          </div>

          {/* title */}
          <h3
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: 22,
              fontWeight: 500,
              lineHeight: 1.15,
              color: "var(--text-primary)",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {project.title}
          </h3>

          {/* description */}
          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              margin: 0,
              flex: 1,
            }}
          >
            {project.description}
          </p>

          {/* tech chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              gap: 6,
              alignItems: "center",
              marginTop: 2,
            }}
          >
            {visibleStack.map((s) => (
              <span
                key={s}
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#202837",
                  background: "#eef1f6",
                  border: "1px solid rgba(19,26,39,0.06)",
                  borderRadius: 9999,
                  padding: "3.5px 10px",
                  whiteSpace: "nowrap",
                }}
              >
                {s}
              </span>
            ))}
            {extra > 0 && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  padding: "3.5px 4px",
                  whiteSpace: "nowrap",
                }}
              >
                +{extra}
              </span>
            )}
          </div>

          {/* CTA row */}
          <div
            style={{
              marginTop: 4,
              paddingTop: 14,
              borderTop: "1px dashed rgba(19,26,39,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                fontSize: 12,
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              {project.action}
            </span>
            <span
              aria-hidden="true"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: hovered ? "#202837" : "#f2f1ec",
                color: hovered ? "#fcfcf9" : "#202837",
                border: hovered ? "1px solid #202837" : "1px solid rgba(19,26,39,0.1)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 280ms cubic-bezier(0.22,1,0.36,1)",
                flexShrink: 0,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
