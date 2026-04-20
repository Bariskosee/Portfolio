'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { CSSProperties } from 'react';

type CardState = 'open' | 'panel' | 'closed';
type DisplayMode = 'card' | 'panel' | 'pill' | 'sideTab';

interface WhoamiCardProps {
  language?: 'EN' | 'TR';
}

export default function WhoamiCard({ language = 'EN' }: WhoamiCardProps) {
  const [cardState, setCardState] = useState<CardState>('open');
  const [isScrolled, setIsScrolled] = useState(false);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
  const [portraitFailed, setPortraitFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const cardRef = useRef<HTMLDivElement>(null);
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

    if (isMobile) {
      setPanelStyle({ top: rect.bottom + 8, left: 12, right: 12 });
    } else if (window.innerWidth - rect.right - 16 >= 300) {
      setPanelStyle({ top: rect.top, left: rect.right + 16 });
    } else {
      setPanelStyle({ top: rect.top, right: window.innerWidth - rect.left + 16 });
    }
  }, []);

  // Compute panel position when it opens; re-compute on resize
  useEffect(() => {
    if (cardState !== 'panel') return;
    computePanelPosition();
    window.addEventListener('resize', computePanelPosition);
    return () => window.removeEventListener('resize', computePanelPosition);
  }, [cardState, computePanelPosition]);

  // ESC → close panel back to open
  useEffect(() => {
    if (cardState !== 'panel') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCardState('open');
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [cardState]);

  // Outside-click → close panel back to open
  useEffect(() => {
    if (cardState !== 'panel') return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!cardRef.current?.contains(t) && !panelRef.current?.contains(t)) {
        setCardState('open');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [cardState]);

  // Derived display mode — state machine unchanged
  const displayMode: DisplayMode =
    cardState === 'closed'
      ? 'pill'
      : isScrolled
        ? 'sideTab'
        : cardState === 'panel'
          ? 'panel'
          : 'card';

  const fadeMotion = reducedMotion
    ? 'transition-none'
    : 'transition-opacity duration-200 ease-out';
  const hoverMotion = reducedMotion ? '' : 'transition-colors duration-200';

  const aboutLabel = language === 'TR' ? 'HAKKIMDA' : 'ABOUT';
  const aboutCopy =
    language === 'TR'
      ? [
          'Barış Köse, Istanbul merkezli bir yazılım mühendisidir; React, TypeScript ve Next.js ile düşünülmüş ürünler geliştirmeye odaklanır.',
          'Frontend tarafında performans, erişilebilirlik ve tutarlı tasarım sistemleri üzerine çalışır; backend tarafında ise ölçeklenebilir mimariler ve temiz kod pratiklerini önemser.',
          'Hedefi, estetik olarak güçlü ve teknik olarak sürdürülebilir dijital deneyimler üretmek; her iterasyonda kullanıcı deneyimini somut olarak iyileştirmektir.',
        ]
      : [
          'Barış Köse is a software engineer based in Istanbul, focused on building thoughtful tools with React, TypeScript, and Next.js.',
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
        <div
          ref={cardRef}
          aria-label="Profile card"
          aria-hidden={displayMode === 'sideTab'}
          className={`fixed z-50 top-3 left-3 sm:top-6 sm:left-6 flex w-28 sm:w-[188px] flex-col overflow-hidden rounded-2xl border border-accent/30 bg-bg-surface shadow-[0_8px_24px_rgba(26,29,46,0.12)] ${fadeMotion} ${
            displayMode === 'sideTab'
              ? 'pointer-events-none opacity-0'
              : 'opacity-100'
          }`}
        >
          {/* Titlebar */}
          <div className="flex items-center justify-end border-b border-accent/15 px-2 py-1.5">
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
                unoptimized
                onError={() => setPortraitFailed(true)}
                style={{ width: '100%', height: 'auto' }}
                className="rounded-lg pixel-art block"
              />
            )}
          </div>

          {/* About toggle */}
          <button
            type="button"
            onClick={() =>
              setCardState(cardState === 'panel' ? 'open' : 'panel')
            }
            aria-expanded={cardState === 'panel'}
            aria-controls="profile-about-panel"
            className={`focus-ring w-full border-t border-accent/15 bg-bg-surface px-3 py-2 font-sans text-[10px] font-semibold tracking-widest text-[#1f4d3a] hover:bg-accent-soft sm:text-xs ${hoverMotion}`}
          >
            {aboutLabel}
          </button>
        </div>
      )}

      {/* About panel — State B */}
      {displayMode === 'panel' && (
        <div
          ref={panelRef}
          id="profile-about-panel"
          role="region"
          aria-label="About Barış"
          style={panelStyle}
          className={`fixed z-50 max-h-[380px] max-w-[520px] overflow-y-auto rounded-2xl border-2 border-accent/40 bg-bg-surface p-5 shadow-[0_8px_24px_rgba(26,29,46,0.14)] ${fadeMotion} opacity-100`}
        >
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
