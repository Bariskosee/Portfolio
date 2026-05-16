'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { motion, useDragControls } from 'framer-motion';

type CardState = 'open' | 'panel' | 'closed';
type DisplayMode = 'card' | 'panel' | 'pill' | 'sideTab';

interface WhoamiCardProps {
  language?: 'EN' | 'TR';
}

export default function WhoamiCard({ language = 'EN' }: WhoamiCardProps) {
  const [cardState, setCardState] = useState<CardState>('open');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragConstraints, setDragConstraints] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });
  const [portraitFailed, setPortraitFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const dragControls = useDragControls();
  const cardRef = useRef<HTMLDivElement>(null);
  const aboutButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Reduced-motion listener
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Scroll listener — RAF-throttled, passive
  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 200);
        rafId = null;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Panel position computation
  const computePanelPosition = useCallback(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth <= 640;
    const margin = isMobile ? 12 : 16;
    const headerClearance = isMobile ? 74 : 92;
    const panelWidth = Math.min(520, window.innerWidth - margin * 2);
    const panelMaxHeight = Math.min(380, window.innerHeight - headerClearance - margin);

    if (isMobile) {
      const top = Math.min(rect.bottom + 8, window.innerHeight - panelMaxHeight - margin);
      setPanelStyle({
        top: Math.max(headerClearance, top),
        left: margin,
        right: margin,
        maxHeight: panelMaxHeight,
      });
      return;
    }

    const top = Math.min(
      Math.max(rect.top, headerClearance),
      window.innerHeight - panelMaxHeight - margin,
    );

    if (window.innerWidth - rect.right - margin >= 300) {
      setPanelStyle({
        top,
        left: Math.min(rect.right + margin, window.innerWidth - panelWidth - margin),
        width: panelWidth,
        maxHeight: panelMaxHeight,
      });
    } else {
      setPanelStyle({
        top,
        right: Math.min(window.innerWidth - rect.left + margin, window.innerWidth - panelWidth - margin),
        width: panelWidth,
        maxHeight: panelMaxHeight,
      });
    }
  }, []);

  const updateDragConstraints = useCallback(() => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 640;
    const baseTop = isMobile ? 12 : 24;
    const baseLeft = isMobile ? 12 : 24;
    const safeMargin = 8;

    const left = -baseLeft + safeMargin;
    const top = -baseTop + safeMargin;
    const right = Math.max(
      left,
      window.innerWidth - baseLeft - rect.width - safeMargin,
    );
    const bottom = Math.max(
      top,
      window.innerHeight - baseTop - rect.height - safeMargin,
    );

    const boundedX = Math.min(Math.max(dragPosition.x, left), right);
    const boundedY = Math.min(Math.max(dragPosition.y, top), bottom);

    if (boundedX !== dragPosition.x || boundedY !== dragPosition.y) {
      setDragPosition({ x: boundedX, y: boundedY });
    }

    setDragConstraints({ left, right, top, bottom });
  }, [dragPosition.x, dragPosition.y]);

  // Compute panel position when it opens; re-compute on resize
  useEffect(() => {
    if (cardState !== 'panel') return;
    computePanelPosition();
    requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));
    window.addEventListener('resize', computePanelPosition);
    return () => window.removeEventListener('resize', computePanelPosition);
  }, [cardState, computePanelPosition]);

  const closePanel = useCallback(() => {
    setCardState('open');
    requestAnimationFrame(() => aboutButtonRef.current?.focus({ preventScroll: true }));
  }, []);

  useEffect(() => {
    updateDragConstraints();
    window.addEventListener('resize', updateDragConstraints);
    window.addEventListener('orientationchange', updateDragConstraints);

    return () => {
      window.removeEventListener('resize', updateDragConstraints);
      window.removeEventListener('orientationchange', updateDragConstraints);
    };
  }, [updateDragConstraints]);

  // ESC → close panel back to open
  useEffect(() => {
    if (cardState !== 'panel') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [cardState, closePanel]);

  // Outside-click → close panel back to open
  useEffect(() => {
    if (cardState !== 'panel') return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!cardRef.current?.contains(t) && !panelRef.current?.contains(t)) {
        closePanel();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [cardState, closePanel]);

  // Derived display mode — state machine unchanged
  const displayMode: DisplayMode =
    cardState === 'closed'
      ? 'pill'
      : isScrolled
        ? 'sideTab'
        : cardState === 'panel'
          ? 'panel'
          : 'card';

  useEffect(() => {
    if (displayMode === 'card' || displayMode === 'panel') {
      updateDragConstraints();
    }
  }, [displayMode, updateDragConstraints]);

  const fadeMotion = reducedMotion
    ? 'transition-none'
    : 'transition-opacity duration-200 ease-out';
  const hoverMotion = reducedMotion ? '' : 'transition-colors duration-200';

  const aboutLabel = language === 'TR' ? 'HAKKIMDA' : 'ABOUT';
  const aboutCopy =
    language === 'TR'
      ? [
          'Kodlama yoluyla bir şeyler üretmeyi, yeni teknolojiler keşfetmeyi ve her projede bir öncekinden daha iyi bir şey ortaya koymayı seviyorum. ABD\'de Work & Travel programıyla iki yaz geçirdim; Erasmus programıyla da İspanya\'da Universidad de Alicante\'de okudum.',
          'Frontend tarafında performans, erişilebilirlik ve tutarlı tasarım sistemleri üzerine çalışır; backend tarafında ise ölçeklenebilir mimariler ve temiz kod pratiklerini önemser.',
          'Hedefi, estetik olarak güçlü ve teknik olarak sürdürülebilir dijital deneyimler üretmek; her iterasyonda kullanıcı deneyimini somut olarak iyileştirmektir.',
        ]
      : [
          "I love building things through code, exploring new technologies, and shipping something better with every project. I've spent two summers in the US through Work & Travel, and studied abroad at Universidad de Alicante in Spain through the Erasmus program.",
          'He focuses on performance, accessibility, and consistent design systems on the frontend, while valuing scalable architecture and clean code practices on the backend.',
          'His goal is to build digital experiences that are visually strong and technically sustainable, improving user experience in every iteration.',
        ];

  const handleSideTabClick = () => {
    setCardState('open');
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <>
      {/* Card — States A + B */}
      {cardState !== 'closed' && (
        <motion.div
          ref={cardRef}
          drag={displayMode === 'card' && !isScrolled}
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={dragConstraints}
          dragElastic={reducedMotion ? 0 : 0.12}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            setDragPosition((prev) => ({
              x: prev.x + info.offset.x,
              y: prev.y + info.offset.y,
            }));
          }}
          style={{ x: dragPosition.x, y: dragPosition.y }}
          aria-label="Profile card"
          aria-hidden={displayMode === 'sideTab'}
          className={`fixed top-3 left-3 z-50 flex w-28 flex-col overflow-hidden rounded-2xl border border-accent/30 bg-bg-surface shadow-[0_8px_24px_rgba(26,29,46,0.12)] sm:top-6 sm:left-6 sm:w-[188px] ${fadeMotion} ${
            isDragging ? 'z-[60]' : ''
          } ${
            displayMode === 'sideTab'
              ? 'pointer-events-none opacity-0'
              : 'opacity-100'
          }`}
        >
          {/* Titlebar */}
          <div
            className={`flex items-center justify-end border-b border-accent/15 px-2 py-1.5 ${
              displayMode === 'card' ? 'cursor-grab active:cursor-grabbing' : ''
            }`}
            style={{ touchAction: 'none' }}
            onPointerDown={(e) => {
              if (displayMode !== 'card') return;
              if ((e.target as HTMLElement).closest('button')) return;
              dragControls.start(e);
            }}
          >
            <button
              type="button"
              onClick={() => setCardState('closed')}
              aria-label="Close profile card"
              className={`focus-ring flex h-5 w-5 items-center justify-center rounded-full text-text-muted hover:bg-accent-soft hover:text-accent ${hoverMotion}`}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1l8 8M9 1L1 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Portrait */}
          <div className="px-2 pt-2">
            {portraitFailed ? (
              <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-accent/20 bg-bg-secondary font-sans text-[11px] tracking-wide text-text-muted">
                portrait unavailable
              </div>
            ) : (
              <Image
                src="/baris-portrait.png"
                alt="Barış Köse"
                width={188}
                height={188}
                priority
                sizes="(min-width: 640px) 188px, 112px"
                onError={() => setPortraitFailed(true)}
                style={{ width: '100%', height: 'auto' }}
                className="rounded-lg pixel-art block"
              />
            )}
          </div>

          {/* About toggle */}
          <button
            ref={aboutButtonRef}
            type="button"
            onClick={() =>
              setCardState(cardState === 'panel' ? 'open' : 'panel')
            }
            aria-haspopup="dialog"
            aria-expanded={cardState === 'panel'}
            aria-controls="profile-about-panel"
            className={`focus-ring w-full border-t border-accent/15 bg-bg-surface px-3 py-2 font-sans text-[10px] font-semibold tracking-widest text-[#1f4d3a] hover:bg-accent-soft sm:text-xs ${hoverMotion}`}
          >
            {aboutLabel}
          </button>
        </motion.div>
      )}

      {/* About panel — State B */}
      {displayMode === 'panel' && (
        <div
          ref={panelRef}
          id="profile-about-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="profile-about-title"
          tabIndex={-1}
          style={panelStyle}
          className={`focus-ring fixed z-50 w-[calc(100vw-1.5rem)] max-w-[520px] overflow-y-auto rounded-2xl border-2 border-accent/40 bg-bg-surface p-5 shadow-[0_8px_24px_rgba(26,29,46,0.14)] ${fadeMotion} opacity-100`}
        >
          <h2 id="profile-about-title" className="sr-only">
            {language === 'TR' ? 'Barış Köse hakkında' : 'About Barış Köse'}
          </h2>
          <p className="mb-3 font-serif text-base leading-relaxed text-text-secondary">
            {aboutCopy[0]}
          </p>
          <p className="mb-3 font-serif text-base leading-relaxed text-text-secondary">
            {aboutCopy[1]}
          </p>
          <p className="font-serif text-base leading-relaxed text-text-secondary">
            {aboutCopy[2]}
          </p>
        </div>
      )}

      {/* Side tab — scroll-collapsed variant of States A/B */}
      {cardState !== 'closed' && (
        <button
          type="button"
          onClick={handleSideTabClick}
          aria-label="Open profile card"
          className={`focus-ring fixed left-0 top-[40%] z-50 flex h-12 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-l-none rounded-r-xl bg-accent-soft text-accent shadow-[4px_0_12px_rgba(45,95,76,0.18)] hover:translate-x-[2px] ${hoverMotion} ${fadeMotion} ${
            displayMode === 'sideTab'
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <span style={{ fontSize: '20px', lineHeight: 1 }} aria-hidden="true">
            👾
          </span>
        </button>
      )}

      {/* Pill — State C */}
      {cardState === 'closed' && (
        <button
          type="button"
          onClick={() => setCardState('open')}
          aria-label="Open profile card"
          className={`focus-ring fixed z-50 top-4 left-5 flex items-center gap-1.5 rounded-full border border-[rgba(45,95,76,0.3)] bg-accent-soft px-4 py-2 font-sans text-xs font-medium tracking-widest text-[#1f4d3a] hover:bg-accent hover:text-bg-primary md:top-6 md:left-8 ${hoverMotion}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {language === 'TR' ? 'hakkımda' : 'whoami'}
        </button>
      )}
    </>
  );
}
