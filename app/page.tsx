"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import MatrixName from "./components/MatrixName";
import { TechSphere } from "./components/TechSphere";
import WhoamiCard from "./components/WhoamiCard";
import ProjectCard, { type ProjectCardData } from "./components/ProjectCard";

const ParticleFloor = dynamic(() => import("./components/ParticleFloor"), {
  ssr: false,
});

type Language = "EN" | "TR";

const LANGUAGE_STORAGE_KEY = "baris-portfolio-language-v1";
const LANGUAGE_CHANGE_EVENT = "baris:language-change";
const easePremium = [0.22, 1, 0.36, 1] as const;

const projects: Record<Language, ProjectCardData[]> = {
  EN: [
    {
      title: "ev-charging-simulation",
      description:
        "An event-driven EV charging network that coordinates charging points, drivers, monitoring, and registry flows.",
      contribution:
        "Built a 19-service autonomous topology with Kafka messaging, FastAPI services, health monitoring, and fault recovery.",
      outcome:
        "The Docker-based setup demonstrates concurrent charging, live telemetry, service registration, and recovery scenarios without manual interaction.",
      metricSource: "Repository documentation · 19-service autonomous topology",
      metricSourceUrl: "https://github.com/Bariskosee/ev-charging-simulation#readme",
      stack: ["Python", "FastAPI", "Kafka", "Docker", "Redis"],
      link: "https://github.com/Bariskosee/ev-charging-simulation",
      action: "View source",
      year: "2025",
      role: "Distributed Systems",
      tag: "19 SERVICES",
    },
    {
      title: "MefapexChatBox",
      description:
        "A Turkish factory-support chatbot with an intent pipeline, authenticated sessions, and real-time messaging.",
      contribution:
        "Combined TF-IDF and Logistic Regression intent classification with FastAPI, WebSocket, authentication, and session layers.",
      outcome:
        "The repository reports a typical 80–85% intent-accuracy range and sub-50 ms inference; these are project-reported figures, not an independent benchmark.",
      metricSource: "Repository-reported model range and inference time",
      metricSourceUrl: "https://github.com/Bariskosee/MefapexChatBox#readme",
      stack: ["Python", "FastAPI", "scikit-learn", "WebSocket", "Redis"],
      link: "https://github.com/Bariskosee/MefapexChatBox",
      action: "View source",
      year: "2024",
      role: "Turkish NLP",
      tag: "INTENT PIPELINE",
    },
    {
      title: "DataFelix",
      description:
        "A full-stack movie and TV catalog focused on secure accounts and clear content discovery.",
      contribution:
        "Implemented catalog browsing, search, detail pages, authentication, and favorites with Spring Boot and Thymeleaf.",
      outcome:
        "The application connects a responsive Bootstrap interface to JPA/Hibernate persistence and Spring Security flows.",
      metricSource: "Repository feature and architecture documentation",
      metricSourceUrl: "https://github.com/Bariskosee/DataFelix#readme",
      stack: ["Java 17", "Spring Boot", "Spring Security", "Thymeleaf"],
      link: "https://github.com/Bariskosee/DataFelix",
      action: "View source",
      year: "2024",
      role: "Full-stack",
      tag: "JAVA · SPRING",
    },
  ],
  TR: [
    {
      title: "ev-charging-simulation",
      description:
        "Şarj noktalarını, sürücüleri, izleme ve kayıt akışlarını koordine eden olay güdümlü EV charging ağı.",
      contribution:
        "Kafka mesajlaşması, FastAPI servisleri, sağlık izleme ve hata kurtarma içeren 19 servisli otonom topoloji geliştirdim.",
      outcome:
        "Docker tabanlı kurulum; eşzamanlı şarjı, canlı telemetriyi, servis kaydını ve kurtarma senaryolarını manuel müdahale olmadan gösteriyor.",
      metricSource: "Depo dokümantasyonu · 19 servisli otonom topoloji",
      metricSourceUrl: "https://github.com/Bariskosee/ev-charging-simulation#readme",
      stack: ["Python", "FastAPI", "Kafka", "Docker", "Redis"],
      link: "https://github.com/Bariskosee/ev-charging-simulation",
      action: "Kaynak kodu incele",
      year: "2025",
      role: "Dağıtık Sistemler",
      tag: "19 SERVICES",
    },
    {
      title: "MefapexChatBox",
      description:
        "Niyet hattı, kimlik doğrulamalı oturumlar ve gerçek zamanlı mesajlaşma içeren Türkçe fabrika destek chatbot'u.",
      contribution:
        "TF-IDF ve Logistic Regression niyet sınıflandırmasını FastAPI, WebSocket, kimlik doğrulama ve oturum katmanlarıyla birleştirdim.",
      outcome:
        "Depo, tipik %80–85 niyet doğruluğu aralığı ve 50 ms altı çıkarım süresi raporluyor; bunlar bağımsız benchmark değil, proje beyanıdır.",
      metricSource: "Depoda raporlanan model aralığı ve çıkarım süresi",
      metricSourceUrl: "https://github.com/Bariskosee/MefapexChatBox#readme",
      stack: ["Python", "FastAPI", "scikit-learn", "WebSocket", "Redis"],
      link: "https://github.com/Bariskosee/MefapexChatBox",
      action: "Kaynak kodu incele",
      year: "2024",
      role: "Türkçe NLP",
      tag: "INTENT PIPELINE",
    },
    {
      title: "DataFelix",
      description:
        "Güvenli hesap akışları ve anlaşılır içerik keşfine odaklanan full-stack film ve dizi kataloğu.",
      contribution:
        "Spring Boot ve Thymeleaf ile katalog, arama, detay sayfaları, kimlik doğrulama ve favori akışlarını geliştirdim.",
      outcome:
        "Uygulama, responsive Bootstrap arayüzünü JPA/Hibernate kalıcılığı ve Spring Security akışlarıyla birleştiriyor.",
      metricSource: "Depodaki özellik ve mimari dokümantasyonu",
      metricSourceUrl: "https://github.com/Bariskosee/DataFelix#readme",
      stack: ["Java 17", "Spring Boot", "Spring Security", "Thymeleaf"],
      link: "https://github.com/Bariskosee/DataFelix",
      action: "Kaynak kodu incele",
      year: "2024",
      role: "Full-stack",
      tag: "JAVA · SPRING",
    },
  ],
};

const copy = {
  EN: {
    languageLabel: "Language selection",
    navigationLabel: "Primary navigation",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    navWork: "Work",
    navAbout: "About",
    navSkills: "Skills",
    navContact: "Contact",
    skipToContent: "Skip to main content",
    eyebrow: "Software Engineering Student · Istanbul",
    focus: "Backend · Distributed Systems · AI/ML",
    intro:
      "I build reliable software at the intersection of distributed systems, backend engineering, and applied machine learning.",
    ctaProjects: "Explore selected work",
    ctaGitHub: "GitHub",
    ctaLinkedIn: "LinkedIn",
    ctaEmail: "Email",
    newTab: "opens in a new tab",
    projectsEyebrow: "01 — SELECTED WORK",
    projectsTitle: "Projects",
    projectsSubtitle:
      "Three projects presented through the problem solved, my contribution, and the evidence available in each repository.",
    viewAll: "View every repository on GitHub",
    aboutEyebrow: "02 — PROFILE",
    aboutTitle: "About & journey",
    aboutBody:
      "I enjoy turning complex technical ideas into understandable, maintainable products. I care about reliable backend systems, accessible interfaces, and improving the result with every iteration.",
    journeyTitle: "Education & international experience",
    journey: [
      {
        label: "Software engineering",
        meta: "Ongoing studies",
        body: "Coursework and independent projects spanning backend systems, frontend foundations, data, and machine learning.",
      },
      {
        label: "Universidad de Alicante",
        meta: "Erasmus exchange · Spain",
        body: "Studied in an international academic environment and developed experience working across cultures.",
      },
      {
        label: "United States",
        meta: "Work & Travel · two summers",
        body: "Built practical communication, adaptability, and cross-cultural experience across two summer seasons.",
      },
    ],
    technologiesEyebrow: "03 — CAPABILITIES",
    technologiesTitle: "Technologies",
    technologiesSubtitle:
      "Grouped by where I use them, with the animated canvas kept as a secondary visual layer.",
    contactEyebrow: "04 — CONTACT",
    contactTitle: "Let’s build something reliable.",
    contactBody:
      "For a CV, a deeper project walkthrough, or a junior opportunity, reach me by email or LinkedIn.",
    contactEmail: "Send an email",
    contactLinkedIn: "Open LinkedIn",
    footer: "© 2026 Barış Köse · Made with care in Istanbul",
  },
  TR: {
    languageLabel: "Dil seçimi",
    navigationLabel: "Ana navigasyon",
    openMenu: "Navigasyon menüsünü aç",
    closeMenu: "Navigasyon menüsünü kapat",
    navWork: "Projeler",
    navAbout: "Hakkımda",
    navSkills: "Yetkinlikler",
    navContact: "İletişim",
    skipToContent: "Ana içeriğe geç",
    eyebrow: "Yazılım Mühendisliği Öğrencisi · İstanbul",
    focus: "Backend · Dağıtık Sistemler · AI/ML",
    intro:
      "Dağıtık sistemler, backend mühendisliği ve uygulamalı makine öğrenmesinin kesişiminde güvenilir yazılımlar geliştiriyorum.",
    ctaProjects: "Seçilmiş projeleri incele",
    ctaGitHub: "GitHub",
    ctaLinkedIn: "LinkedIn",
    ctaEmail: "E-posta",
    newTab: "yeni sekmede açılır",
    projectsEyebrow: "01 — SEÇİLMİŞ ÇALIŞMALAR",
    projectsTitle: "Projeler",
    projectsSubtitle:
      "Üç projeyi çözülen problem, kişisel katkım ve her depoda bulunan doğrulanabilir kanıtlarla sunuyorum.",
    viewAll: "GitHub'daki tüm depoları gör",
    aboutEyebrow: "02 — PROFİL",
    aboutTitle: "Hakkımda ve yolculuğum",
    aboutBody:
      "Karmaşık teknik fikirleri anlaşılır ve sürdürülebilir ürünlere dönüştürmeyi seviyorum. Güvenilir backend sistemlerini, erişilebilir arayüzleri ve her iterasyonda sonucu iyileştirmeyi önemsiyorum.",
    journeyTitle: "Eğitim ve uluslararası deneyim",
    journey: [
      {
        label: "Yazılım mühendisliği",
        meta: "Devam eden eğitim",
        body: "Backend sistemleri, frontend temelleri, veri ve makine öğrenmesini kapsayan dersler ve bağımsız projeler.",
      },
      {
        label: "Universidad de Alicante",
        meta: "Erasmus değişimi · İspanya",
        body: "Uluslararası bir akademik ortamda eğitim aldım ve farklı kültürlerle çalışma deneyimi geliştirdim.",
      },
      {
        label: "Amerika Birleşik Devletleri",
        meta: "Work & Travel · iki yaz",
        body: "İki yaz dönemi boyunca iletişim, uyum ve kültürler arası çalışma deneyimi kazandım.",
      },
    ],
    technologiesEyebrow: "03 — YETKİNLİKLER",
    technologiesTitle: "Teknolojiler",
    technologiesSubtitle:
      "Kullandığım alana göre gruplandı; hareketli canvas ikincil bir görsel katman olarak tutuldu.",
    contactEyebrow: "04 — İLETİŞİM",
    contactTitle: "Birlikte güvenilir bir şey geliştirelim.",
    contactBody:
      "CV, detaylı proje anlatımı veya junior bir fırsat için e-posta ya da LinkedIn üzerinden ulaşabilirsiniz.",
    contactEmail: "E-posta gönder",
    contactLinkedIn: "LinkedIn'i aç",
    footer: "© 2026 Barış Köse · İstanbul'da özenle geliştirildi",
  },
} as const;

function isLanguage(value: string | null): value is Lowercase<Language> {
  return value === "en" || value === "tr";
}

function getLanguageSnapshot(): Language {
  const urlLanguage = new URLSearchParams(window.location.search).get("lang");
  if (isLanguage(urlLanguage)) {
    return urlLanguage.toUpperCase() as Language;
  }

  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage === "EN" || storedLanguage === "TR") {
      return storedLanguage;
    }
  } catch {
    // Fall back to the browser language when storage is unavailable.
  }

  return window.navigator.language.toLowerCase().startsWith("tr") ? "TR" : "EN";
}

function getServerLanguageSnapshot(): Language {
  return "TR";
}

function subscribeToLanguage(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (!event.key || event.key === LANGUAGE_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener("popstate", onStoreChange);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("popstate", onStoreChange);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
  };
}

export default function Home() {
  const language = useSyncExternalStore<Language>(
    subscribeToLanguage,
    getLanguageSnapshot,
    getServerLanguageSnapshot,
  );
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = !!useReducedMotion();
  const t = copy[language];

  useLayoutEffect(() => {
    if (language !== getLanguageSnapshot()) return;
    document.documentElement.lang = language === "TR" ? "tr" : "en";
    delete document.documentElement.dataset.languagePending;
  }, [language]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileNavOpen]);

  const selectLanguage = (nextLanguage: Language) => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // Language still changes for the current session when storage is unavailable.
    }

    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage.toLowerCase());
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  };

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.52, ease: easePremium },
    },
  };

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.46, ease: easePremium },
    },
  };

  const microHover = reduceMotion ? undefined : { y: -1 };
  const microTap = reduceMotion ? undefined : { scale: 0.98 };

  const navigation = [
    { href: "#projects", label: t.navWork },
    { href: "#about", label: t.navAbout },
    { href: "#skills", label: t.navSkills },
    { href: "#contact", label: t.navContact },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="focus-ring fixed left-4 top-3 z-[100] -translate-y-20 rounded-full bg-accent px-4 py-2 font-sans text-sm font-semibold text-bg-primary transition-transform focus:translate-y-0"
      >
        {t.skipToContent}
      </a>

      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-0"
        style={{ top: "-80px" }}
        aria-hidden="true"
      >
        <ParticleFloor />
      </div>

      <div className="relative z-10">
        <WhoamiCard language={language} />

        <header
          className={`fixed inset-x-0 top-0 z-40 flex items-center justify-end px-4 py-4 transition-all duration-300 sm:px-6 md:px-8 ${
            scrolled
              ? "border-b border-border-soft bg-bg-primary/[0.88] shadow-soft backdrop-blur-xl"
              : "bg-gradient-to-b from-bg-primary/80 to-transparent"
          }`}
        >
          <div className="flex items-center gap-4 lg:gap-7">
            <nav
              aria-label={t.navigationLabel}
              className="hidden items-center gap-5 lg:flex"
            >
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="focus-ring rounded-sm font-sans text-xs font-semibold tracking-wide text-text-secondary transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileNavOpen ? t.closeMenu : t.openMenu}
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-surface-raised text-text-secondary shadow-card transition-colors hover:text-accent lg:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                {mobileNavOpen ? (
                  <path
                    d="M4.5 4.5l9 9M13.5 4.5l-9 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M3 5.5h12M3 9h12M3 12.5h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>

            <div
              role="group"
              aria-label={t.languageLabel}
              className="inline-flex items-center rounded-full border border-border-soft bg-surface-raised p-1 shadow-card"
            >
              {(["EN", "TR"] as const).map((option) => (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => selectLanguage(option)}
                  aria-pressed={language === option}
                  whileHover={microHover}
                  whileTap={microTap}
                  className={`focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 py-1.5 font-sans text-xs font-semibold tracking-[0.16em] transition-colors ${
                    language === option
                      ? "bg-accent text-bg-surface"
                      : "text-text-secondary hover:text-accent"
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {mobileNavOpen && (
              <>
                <motion.div
                  key="mobile-nav-overlay"
                  className="fixed inset-0 lg:hidden"
                  aria-hidden="true"
                  onClick={() => setMobileNavOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                />
                <motion.nav
                  key="mobile-nav-panel"
                  id="mobile-nav-panel"
                  aria-label={t.navigationLabel}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18, ease: easePremium }}
                  className="absolute right-4 top-full mt-2 flex w-56 flex-col gap-1 rounded-2xl border border-border-soft bg-surface-raised p-2 shadow-soft sm:right-6 md:right-8 lg:hidden"
                >
                  {navigation.map((item) => (
                    <a
                      key={`mobile-menu-${item.href}`}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className="focus-ring flex min-h-11 items-center rounded-lg px-3 font-sans text-sm font-semibold text-text-secondary transition-colors hover:bg-accent-soft hover:text-accent"
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.nav>
              </>
            )}
          </AnimatePresence>
        </header>

        <main id="main-content">
          <section
            id="home"
            className="relative flex items-start px-5 pb-16 pt-28 sm:px-6 md:px-8 md:pb-20 md:pt-32 lg:min-h-[100svh] lg:items-center"
          >
            <motion.div
              className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
              variants={revealVariants}
              initial="hidden"
              animate="show"
            >
              <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted sm:tracking-[0.22em]">
                {t.eyebrow}
              </p>

              <h1
                aria-label="Barış Köse"
                className="font-serif text-[3.15rem] font-normal leading-[0.92] tracking-tight text-text-primary sm:text-[4rem] md:text-[5.2rem] lg:text-[6.4rem]"
              >
                <span className="block">
                  <MatrixName
                    text="Barış"
                    durationMs={1100}
                    reducedMotion={reduceMotion}
                    once
                  />
                </span>
                <span className="block italic text-accent">
                  <MatrixName
                    text="Köse"
                    durationMs={900}
                    startDelayMs={1200}
                    reducedMotion={reduceMotion}
                    once
                  />
                </span>
              </h1>

              <p className="mt-5 rounded-full border border-border-soft bg-surface-raised px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-accent shadow-soft sm:text-xs">
                {t.focus}
              </p>

              <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-text-secondary md:text-lg">
                {t.intro}
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <motion.a
                  href="#projects"
                  whileHover={microHover}
                  whileTap={microTap}
                  className="focus-ring rounded-full border border-accent bg-accent px-5 py-3 font-sans text-sm font-semibold text-bg-primary transition-colors hover:bg-accent-hover"
                >
                  {t.ctaProjects}
                </motion.a>
                <motion.a
                  href="https://github.com/Bariskosee"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.ctaGitHub} (${t.newTab})`}
                  whileHover={microHover}
                  whileTap={microTap}
                  className="focus-ring rounded-full border border-border-strong bg-surface-raised px-4 py-3 font-sans text-sm font-semibold text-text-secondary transition-colors hover:border-accent hover:bg-accent hover:text-bg-surface"
                >
                  {t.ctaGitHub}
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/barisskose/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.ctaLinkedIn} (${t.newTab})`}
                  whileHover={microHover}
                  whileTap={microTap}
                  className="focus-ring rounded-full border border-border-strong bg-surface-raised px-4 py-3 font-sans text-sm font-semibold text-text-secondary transition-colors hover:border-accent hover:bg-accent hover:text-bg-surface"
                >
                  {t.ctaLinkedIn}
                </motion.a>
                <motion.a
                  href="mailto:kosebaris279@gmail.com"
                  whileHover={microHover}
                  whileTap={microTap}
                  className="focus-ring rounded-full border border-border-strong bg-surface-raised px-4 py-3 font-sans text-sm font-semibold text-text-secondary transition-colors hover:border-accent hover:bg-accent hover:text-bg-surface"
                >
                  {t.ctaEmail}
                </motion.a>
              </div>
            </motion.div>
          </section>

          <section
            id="projects"
            className="relative scroll-mt-24 px-5 py-20 sm:px-6 md:px-8 md:py-28"
          >
            <div className="mx-auto w-full max-w-6xl">
              <motion.div
                className="flex flex-col gap-3"
                variants={revealVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                  {t.projectsEyebrow}
                </p>
                <h2 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-medium italic leading-tight text-text-primary">
                  {t.projectsTitle}
                </h2>
                <p className="max-w-2xl font-sans text-sm leading-relaxed text-text-secondary md:text-base">
                  {t.projectsSubtitle}
                </p>
              </motion.div>

              <motion.div
                key={`project-grid-${language}`}
                className="mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={gridVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.08 }}
              >
                {projects[language].map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    variants={cardVariants}
                    reducedMotion={reduceMotion}
                    language={language}
                  />
                ))}
              </motion.div>

              <div className="mt-10 flex justify-center">
                <a
                  href="https://github.com/Bariskosee?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.viewAll} (${t.newTab})`}
                  className="focus-ring rounded-full border border-border-strong bg-surface-raised px-5 py-3 font-sans text-sm font-semibold text-accent shadow-soft transition-colors hover:border-accent hover:bg-accent hover:text-bg-primary"
                >
                  {t.viewAll} ↗
                </a>
              </div>
            </div>
          </section>

          <section
            id="about"
            className="relative scroll-mt-24 border-y border-border-soft bg-bg-secondary/55 px-5 py-20 sm:px-6 md:px-8 md:py-28"
          >
            <motion.div
              className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
              variants={revealVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
            >
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                  {t.aboutEyebrow}
                </p>
                <h2 className="mt-3 font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-medium italic leading-tight text-text-primary">
                  {t.aboutTitle}
                </h2>
                <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-text-secondary md:text-xl">
                  {t.aboutBody}
                </p>
              </div>

              <div>
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                  {t.journeyTitle}
                </h3>
                <ol className="mt-5 space-y-4">
                  {t.journey.map((item, index) => (
                    <li
                      key={item.label}
                      className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl border border-border-soft bg-surface-raised p-4 shadow-soft sm:grid-cols-[2.5rem_1fr] sm:p-5"
                    >
                      <span className="font-serif text-lg italic text-text-muted" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-serif text-xl font-medium text-text-primary">
                          {item.label}
                        </p>
                        <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                          {item.meta}
                        </p>
                        <p className="mt-3 font-sans text-sm leading-relaxed text-text-secondary">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </section>

          <section
            id="skills"
            className="relative scroll-mt-24 px-5 py-20 sm:px-6 md:px-8 md:py-28"
          >
            <div className="mx-auto w-full max-w-5xl">
              <motion.div
                className="text-center"
                variants={revealVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
              >
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                  {t.technologiesEyebrow}
                </p>
                <h2 className="mt-3 font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-medium italic leading-tight text-text-primary">
                  {t.technologiesTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-text-secondary md:text-base">
                  {t.technologiesSubtitle}
                </p>
              </motion.div>

              <motion.div
                className="mt-8 w-full"
                variants={revealVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
              >
                <TechSphere language={language} />
              </motion.div>
            </div>
          </section>

          <section
            id="contact"
            className="relative scroll-mt-24 px-5 pb-10 pt-16 sm:px-6 md:px-8 md:pb-14"
          >
            <motion.div
              className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-accent/20 bg-accent px-6 py-12 text-center shadow-lift sm:px-10 md:py-16"
              variants={revealVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-bg-primary/[0.78]">
                {t.contactEyebrow}
              </p>
              <h2 className="mx-auto mt-4 max-w-3xl font-serif text-[clamp(2.3rem,5vw,4.2rem)] font-medium italic leading-tight text-bg-primary">
                {t.contactTitle}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-relaxed text-bg-primary/[0.82] md:text-base">
                {t.contactBody}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:kosebaris279@gmail.com"
                  className="focus-ring rounded-full border border-bg-primary bg-bg-primary px-5 py-3 font-sans text-sm font-semibold text-accent transition-colors hover:bg-transparent hover:text-bg-primary"
                >
                  {t.contactEmail}
                </a>
                <a
                  href="https://linkedin.com/in/barisskose/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.contactLinkedIn} (${t.newTab})`}
                  className="focus-ring rounded-full border border-bg-primary/[0.45] px-5 py-3 font-sans text-sm font-semibold text-bg-primary transition-colors hover:border-bg-primary hover:bg-bg-primary hover:text-accent"
                >
                  {t.contactLinkedIn} ↗
                </a>
              </div>
            </motion.div>
          </section>

          <footer className="bg-bg-primary px-5 pb-10 pt-6 text-center md:px-8">
            <p className="font-sans text-sm tracking-wide text-text-muted">
              {t.footer}
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
