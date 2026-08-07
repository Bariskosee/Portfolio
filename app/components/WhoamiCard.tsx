'use client';

import Image from 'next/image';
import { motion, useDragControls } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

type CardState = 'open' | 'closed';
type PanelTrigger = 'mobile' | 'desktop';

interface WhoamiCardProps {
  language?: 'EN' | 'TR';
}

const copy = {
  EN: {
    about: 'About me',
    aboutEyebrow: 'A little context',
    aboutTitle: "Hi, I'm Barış.",
    body: [
      "I love building things through code, exploring new technologies, and shipping something better with every project. I've spent two summers in the US through Work & Travel, and studied at Universidad de Alicante in Spain through the Erasmus program.",
      'I focus on performance, accessibility, and consistent design systems on the frontend. On the backend, I care about scalable architecture and clean code practices.',
      'My goal is to create digital experiences that are visually strong and technically sustainable, improving the user experience with every iteration.',
    ],
    closeAbout: 'Close about panel',
    closeProfile: 'Close profile card',
    openProfile: 'Open profile card',
    portraitAlt: 'Portrait of Barış Köse',
    portraitUnavailable: 'Portrait unavailable',
    profileCard: 'Barış Köse profile card',
  },
  TR: {
    about: 'Hakkımda',
    aboutEyebrow: 'Kısaca ben',
    aboutTitle: 'Merhaba, ben Barış.',
    body: [
      "Kod yazarak bir şeyler üretmeyi, yeni teknolojiler keşfetmeyi ve her projede bir öncekinden daha iyisini ortaya koymayı seviyorum. Work & Travel programıyla ABD'de iki yaz geçirdim; Erasmus programıyla da İspanya'daki Universidad de Alicante'de eğitim aldım.",
      'Frontend tarafında performans, erişilebilirlik ve tutarlı tasarım sistemlerine odaklanıyorum. Backend tarafında ise ölçeklenebilir mimarilere ve temiz kod pratiklerine önem veriyorum.',
      'Hedefim, estetik açıdan güçlü ve teknik olarak sürdürülebilir dijital deneyimler üretmek; her iterasyonda kullanıcı deneyimini somut biçimde iyileştirmek.',
    ],
    closeAbout: 'Hakkımda panelini kapat',
    closeProfile: 'Profil kartını kapat',
    openProfile: 'Profil kartını aç',
    portraitAlt: 'Barış Köse portresi',
    portraitUnavailable: 'Portre kullanılamıyor',
    profileCard: 'Barış Köse profil kartı',
  },
} as const;

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', onStoreChange);
  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

function getReducedMotionPreference() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerReducedMotionPreference() {
  return false;
}

export default function WhoamiCard({ language = 'EN' }: WhoamiCardProps) {
  const t = copy[language];
  const [cardState, setCardState] = useState<CardState>('open');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragConstraints, setDragConstraints] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });
  const [portraitFailed, setPortraitFailed] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );

  const dragControls = useDragControls();
  const cardRef = useRef<HTMLDivElement>(null);
  const mobileAboutButtonRef = useRef<HTMLButtonElement>(null);
  const desktopAboutButtonRef = useRef<HTMLButtonElement>(null);
  const sideTabButtonRef = useRef<HTMLButtonElement>(null);
  const closedCardButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelCloseButtonRef = useRef<HTMLButtonElement>(null);
  const panelTriggerRef = useRef<PanelTrigger>('mobile');
  const shouldRestoreFocusRef = useRef(false);
  const pendingDesktopFocusRef = useRef<'card' | 'side' | 'closed' | null>(null);

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateScrollState = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        const nextIsScrolled = window.scrollY > 200;

        if (nextIsScrolled && cardRef.current?.contains(document.activeElement)) {
          pendingDesktopFocusRef.current = 'side';
        } else if (!nextIsScrolled && sideTabButtonRef.current === document.activeElement) {
          pendingDesktopFocusRef.current = 'card';
        }

        setIsScrolled(nextIsScrolled);
        animationFrame = null;
      });
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    if (isPanelOpen || pendingDesktopFocusRef.current === null) return;

    const pendingTarget = pendingDesktopFocusRef.current;
    const target =
      pendingTarget === 'closed' && cardState === 'closed'
        ? closedCardButtonRef.current
        : pendingTarget === 'side' && cardState === 'open' && isScrolled
          ? sideTabButtonRef.current
          : pendingTarget === 'card' && cardState === 'open' && !isScrolled
            ? cardRef.current
            : null;

    if (!target) return;

    const animationFrame = window.requestAnimationFrame(() => {
      if (target.getClientRects().length === 0) return;
      target.focus({ preventScroll: true });
      pendingDesktopFocusRef.current = null;
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [cardState, isPanelOpen, isScrolled]);

  const updateDragConstraints = useCallback(() => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const safeMargin = 8;
    const baseTop = 24;
    const baseLeft = 24;
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
    const boundedPosition = {
      x: Math.min(Math.max(dragPosition.x, left), right),
      y: Math.min(Math.max(dragPosition.y, top), bottom),
    };

    if (
      boundedPosition.x !== dragPosition.x ||
      boundedPosition.y !== dragPosition.y
    ) {
      setDragPosition(boundedPosition);
    }

    setDragConstraints({ left, right, top, bottom });
  }, [dragPosition.x, dragPosition.y]);

  useEffect(() => {
    if (cardState === 'open' && !isScrolled && !isPanelOpen) {
      updateDragConstraints();
    }

    window.addEventListener('resize', updateDragConstraints);
    window.addEventListener('orientationchange', updateDragConstraints);

    return () => {
      window.removeEventListener('resize', updateDragConstraints);
      window.removeEventListener('orientationchange', updateDragConstraints);
    };
  }, [cardState, isPanelOpen, isScrolled, updateDragConstraints]);

  const openPanel = useCallback((trigger: PanelTrigger) => {
    panelTriggerRef.current = trigger;
    shouldRestoreFocusRef.current = false;
    setIsPanelOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    shouldRestoreFocusRef.current = true;
    setIsPanelOpen(false);
  }, []);

  useEffect(() => {
    if (isPanelOpen || !shouldRestoreFocusRef.current) return;

    shouldRestoreFocusRef.current = false;
    const animationFrame = window.requestAnimationFrame(() => {
      const preferredTrigger =
        panelTriggerRef.current === 'mobile'
          ? mobileAboutButtonRef.current
          : desktopAboutButtonRef.current;
      const fallbackTrigger =
        panelTriggerRef.current === 'mobile'
          ? desktopAboutButtonRef.current
          : mobileAboutButtonRef.current;
      const visibleTrigger =
        preferredTrigger && preferredTrigger.getClientRects().length > 0
          ? preferredTrigger
          : fallbackTrigger;

      visibleTrigger?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [isPanelOpen]);

  useEffect(() => {
    if (!isPanelOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      panelCloseButtonRef.current?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePanel();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current.focus({ preventScroll: true });
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (
        event.shiftKey &&
        (activeElement === firstElement || !panelRef.current.contains(activeElement))
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === lastElement || !panelRef.current.contains(activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [closePanel, isPanelOpen]);

  const closeProfileCard = () => {
    if (cardRef.current?.contains(document.activeElement)) {
      pendingDesktopFocusRef.current = 'closed';
    }
    setCardState('closed');
  };

  const openProfileCard = () => {
    if (closedCardButtonRef.current === document.activeElement) {
      pendingDesktopFocusRef.current = isScrolled ? 'side' : 'card';
    }
    setCardState('open');
  };

  const handleSideTabClick = () => {
    if (sideTabButtonRef.current === document.activeElement) {
      pendingDesktopFocusRef.current = 'card';
    }
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const transitionClass = reducedMotion
    ? 'transition-none'
    : 'transition-colors duration-200';

  return (
    <>
      {!isPanelOpen && (
        <button
          ref={mobileAboutButtonRef}
          type="button"
          onClick={() => openPanel('mobile')}
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="profile-about-panel"
          className={`focus-ring fixed left-4 top-4 z-50 inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/30 bg-bg-surface px-3.5 py-2 font-sans text-xs font-semibold tracking-[0.12em] text-accent-deep shadow-[0_6px_18px_rgba(26,29,46,0.12)] hover:bg-accent-soft sm:hidden ${transitionClass}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {t.about}
        </button>
      )}

      {!isPanelOpen && cardState === 'open' && !isScrolled && (
        <motion.div
          ref={cardRef}
          role="group"
          aria-label={t.profileCard}
          tabIndex={-1}
          drag
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={dragConstraints}
          dragElastic={reducedMotion ? 0 : 0.12}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            setDragPosition((position) => ({
              x: position.x + info.offset.x,
              y: position.y + info.offset.y,
            }));
          }}
          style={{ x: dragPosition.x, y: dragPosition.y }}
          className={`fixed left-6 top-6 z-50 hidden w-[188px] flex-col overflow-hidden rounded-2xl border border-accent/30 bg-bg-surface shadow-[0_8px_24px_rgba(26,29,46,0.12)] sm:flex ${
            isDragging ? 'z-[60]' : ''
          }`}
        >
          <div
            className="flex cursor-grab items-center justify-end border-b border-accent/15 px-2 py-1.5 active:cursor-grabbing"
            style={{ touchAction: 'none' }}
            onPointerDown={(event) => {
              if ((event.target as HTMLElement).closest('button')) return;
              dragControls.start(event);
            }}
          >
            <button
              type="button"
              onClick={closeProfileCard}
              aria-label={t.closeProfile}
              className={`focus-ring flex h-6 w-6 items-center justify-center rounded-full text-text-secondary hover:bg-accent-soft hover:text-accent ${transitionClass}`}
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

          <div className="px-2 pt-2">
            {portraitFailed ? (
              <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-accent/20 bg-bg-secondary px-3 text-center font-sans text-[11px] tracking-wide text-text-secondary">
                {t.portraitUnavailable}
              </div>
            ) : (
              <Image
                src="/baris-portrait.png"
                alt={t.portraitAlt}
                width={188}
                height={188}
                preload
                sizes="188px"
                onError={() => setPortraitFailed(true)}
                style={{ width: '100%', height: 'auto' }}
                className="pixel-art block rounded-lg"
              />
            )}
          </div>

          <button
            ref={desktopAboutButtonRef}
            type="button"
            onClick={() => openPanel('desktop')}
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="profile-about-panel"
            className={`focus-ring min-h-11 w-full border-t border-accent/15 bg-bg-surface px-3 py-2.5 font-sans text-xs font-semibold tracking-widest text-accent-deep hover:bg-accent-soft ${transitionClass}`}
          >
            {t.about.toUpperCase()}
          </button>
        </motion.div>
      )}

      {!isPanelOpen && cardState === 'open' && isScrolled && (
        <button
          ref={sideTabButtonRef}
          type="button"
          onClick={handleSideTabClick}
          aria-label={t.openProfile}
          className={`focus-ring fixed left-0 top-[40%] z-50 hidden h-12 w-11 -translate-y-1/2 items-center justify-center rounded-r-xl bg-accent-soft text-accent shadow-[4px_0_12px_rgba(45,95,76,0.18)] hover:translate-x-[2px] sm:flex ${transitionClass}`}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M3 15c0-3 2.7-5 6-5s6 2 6 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

      {!isPanelOpen && cardState === 'closed' && (
        <button
          ref={closedCardButtonRef}
          type="button"
          onClick={openProfileCard}
          aria-label={t.openProfile}
          className={`focus-ring fixed left-8 top-6 z-50 hidden min-h-11 items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-4 py-2 font-sans text-xs font-medium tracking-widest text-accent-deep hover:bg-accent hover:text-bg-primary sm:flex ${transitionClass}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {t.about}
        </button>
      )}

      {isPanelOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-end bg-[rgba(16,18,30,0.48)] sm:items-center sm:justify-center sm:p-6 animate-backdrop-fade-in"
          style={{ backdropFilter: 'blur(3px)' }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePanel();
          }}
        >
          <div
            ref={panelRef}
            id="profile-about-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-about-title"
            aria-describedby="profile-about-description"
            tabIndex={-1}
            className="relative max-h-[calc(100dvh-1rem)] w-full overflow-y-auto rounded-t-3xl border-2 border-b-0 border-accent/40 bg-bg-surface px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 shadow-[0_-10px_30px_rgba(26,29,46,0.18)] sm:max-h-[min(680px,calc(100dvh-3rem))] sm:max-w-[620px] sm:rounded-3xl sm:border-b-2 sm:p-7 sm:shadow-[0_16px_48px_rgba(26,29,46,0.2)] animate-modal-fade-in"
          >
            <div className="mb-5 flex items-start justify-between gap-4 border-b border-accent/15 pb-4">
              <div>
                <p className="mb-1 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {t.aboutEyebrow}
                </p>
                <h2
                  id="profile-about-title"
                  className="font-serif text-2xl leading-tight text-text-primary sm:text-3xl"
                >
                  {t.aboutTitle}
                </h2>
              </div>
              <button
                ref={panelCloseButtonRef}
                type="button"
                onClick={closePanel}
                aria-label={t.closeAbout}
                className={`focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/25 bg-bg-secondary px-3 py-2 font-sans text-xs font-semibold text-text-secondary hover:border-accent/50 hover:bg-accent-soft hover:text-accent ${transitionClass}`}
              >
                <span aria-hidden="true">×</span>
                <span>{language === 'TR' ? 'Kapat' : 'Close'}</span>
              </button>
            </div>

            <div id="profile-about-description" className="space-y-4">
              {t.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-serif text-base leading-relaxed text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
