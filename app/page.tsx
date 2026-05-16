"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, type Variants } from "framer-motion";
import MatrixName from "./components/MatrixName";
import { TechSphere } from "./components/TechSphere";
import WhoamiCard from "./components/WhoamiCard";
import ProjectCard, { type ProjectCardData } from "./components/ProjectCard";

const ParticleFloor = dynamic(() => import("./components/ParticleFloor"), {
  ssr: false,
});

const easePremium = [0.22, 1, 0.36, 1] as const;

const projects: Record<"EN" | "TR", ProjectCardData[]> = {
  EN: [
    {
      title: "ev-charging-simulation",
      description:
        "Multi-service EV charging simulation with Kafka-backed messaging, monitoring, and fault-tolerance exercises.",
      stack: ["Python", "FastAPI", "Kafka", "Docker", "Redis"],
      link: "https://github.com/Bariskosee/ev-charging-simulation",
      action: "View on GitHub",
      year: "2025",
      role: "Distributed Systems",
      tag: "19 SERVICES",
    },
    {
      title: "MefapexChatBox",
      description:
        "Turkish NLP chatbot prototype using BERT-based intent classification and a FastAPI service layer.",
      stack: ["PyTorch", "BERT", "FastAPI", "Redis", "WebSocket"],
      link: "https://github.com/Bariskosee/MefapexChatBox",
      action: "View on GitHub",
      year: "2024",
      role: "NLP · ML",
      tag: "BERT · 85% ACC",
    },
    {
      title: "DataFelix",
      description:
        "Full-stack movie catalog that highlights clean Spring Boot backend architecture.",
      stack: ["Java 17", "Spring Boot", "Spring Security"],
      link: "https://github.com/Bariskosee/DataFelix",
      action: "View on GitHub",
      year: "2024",
      role: "Full-stack",
      tag: "JAVA · SPRING",
      hasSprite: true,
    },
  ],
  TR: [
    {
      title: "ev-charging-simulation",
      description:
        "Kafka mesajlaşması, izleme ve hata toleransı senaryoları içeren çok servisli EV charging simülasyonu.",
      stack: ["Python", "FastAPI", "Kafka", "Docker", "Redis"],
      link: "https://github.com/Bariskosee/ev-charging-simulation",
      action: "GitHub'da incele",
      year: "2025",
      role: "Distributed Systems",
      tag: "19 SERVICES",
    },
    {
      title: "MefapexChatBox",
      description:
        "BERT tabanlı intent sınıflandırma ve FastAPI servis katmanı kullanan Türkçe NLP chatbot prototipi.",
      stack: ["PyTorch", "BERT", "FastAPI", "Redis", "WebSocket"],
      link: "https://github.com/Bariskosee/MefapexChatBox",
      action: "GitHub'da incele",
      year: "2024",
      role: "NLP · ML",
      tag: "BERT · 85% ACC",
    },
    {
      title: "DataFelix",
      description:
        "Spring Boot backend mimarisini öne çıkaran full-stack film kataloğu projesi.",
      stack: ["Java 17", "Spring Boot", "Spring Security"],
      link: "https://github.com/Bariskosee/DataFelix",
      action: "GitHub'da incele",
      year: "2024",
      role: "Full-stack",
      tag: "JAVA · SPRING",
      hasSprite: true,
    },
  ],
};

const copy = {
  EN: {
    eyebrow: "Software Engineer · Istanbul",
    intro:
      "Software engineering student building at the intersection of distributed systems, AI/ML, and data science.",
    projectsEyebrow: "01 — SELECTED WORK",
    projectsTitle: "Projects",
    projectsSubtitle:
      "Three recent projects across distributed systems, NLP, and full-stack architecture.",
    viewAll: "View all on GitHub",
    technologiesTitle: "Technologies",
    ctaGitHub: "GitHub",
    ctaLinkedIn: "LinkedIn",
    ctaEmail: "Email",
    footer: "© 2026 Barış Köse · Made with care in Istanbul",
  },
  TR: {
    eyebrow: "Yazılım Mühendisi · Istanbul",
    intro:
      "Dağıtık sistemler, yapay zeka ve veri bilimi kesişiminde ürünler geliştiren bir yazılım mühendisliği öğrencisiyim.",
    projectsEyebrow: "01 — SEÇİLMİŞ ÇALIŞMALAR",
    projectsTitle: "Projeler",
    projectsSubtitle:
      "Dağıtık sistemler, NLP ve full-stack mimari üzerine son dönemde üzerinde çalıştığım üç proje.",
    viewAll: "Tümünü GitHub'da gör",
    technologiesTitle: "Teknolojiler",
    ctaGitHub: "GitHub",
    ctaLinkedIn: "LinkedIn",
    ctaEmail: "E-posta",
    footer: "© 2026 Barış Köse · Istanbul'da özenle geliştirildi",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<"EN" | "TR">("TR");
  const reduceMotion = !!useReducedMotion();
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language === "TR" ? "tr" : "en";
  }, [language]);

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.56,
        ease: easePremium,
      },
    },
  };

  const swapVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.24,
        ease: easePremium,
      },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : -4,
      transition: {
        duration: reduceMotion ? 0 : 0.16,
        ease: easePremium,
      },
    },
  };

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.14,
      },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : 8,
      transition: {
        duration: reduceMotion ? 0 : 0.16,
        ease: easePremium,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.48,
        ease: easePremium,
      },
    },
  };

  const softRevealVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.48, ease: easePremium },
    },
  };

  const microHover = reduceMotion ? undefined : { y: -1 };
  const microTap = reduceMotion ? undefined : { scale: 0.98 };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {!reduceMotion && (
        <motion.div
          style={{ scaleX, transformOrigin: "left" }}
          className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-accent pointer-events-none"
          aria-hidden="true"
        />
      )}
      <div className="fixed left-0 right-0 bottom-0 z-0 pointer-events-none" style={{ top: "-80px" }}>
        <ParticleFloor />
      </div>
      <div className="relative z-10">
        <WhoamiCard language={language} />
        <header className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-end px-5 py-4 md:px-8 md:py-6 backdrop-blur-md transition-all duration-300 ${scrolled ? "border-b border-border-soft shadow-soft" : ""}`}>
          <div className="flex items-center gap-3">
            <div
              role="group"
              aria-label="Language switch"
              className="inline-flex items-center rounded-full border border-border-soft bg-surface-raised p-1 shadow-card"
            >
              <motion.button
                type="button"
                onClick={() => setLanguage("EN")}
                aria-pressed={language === "EN"}
                whileHover={microHover}
                whileTap={microTap}
                className={`focus-ring transition-premium-fast rounded-full px-3 py-1.5 font-sans text-xs font-semibold tracking-[0.16em] ${
                  language === "EN"
                    ? "bg-accent text-bg-surface"
                    : "text-text-secondary hover:text-accent"
                }`}
              >
                EN
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setLanguage("TR")}
                aria-pressed={language === "TR"}
                whileHover={microHover}
                whileTap={microTap}
                className={`focus-ring transition-premium-fast rounded-full px-3 py-1.5 font-sans text-xs font-semibold tracking-[0.16em] ${
                  language === "TR"
                    ? "bg-accent text-bg-surface"
                    : "text-text-secondary hover:text-accent"
                }`}
              >
                TR
              </motion.button>
            </div>

            <motion.a
              href="https://github.com/Bariskosee"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={microHover}
              whileTap={microTap}
              className="focus-ring transition-premium-fast rounded-md px-1 font-sans text-sm text-text-secondary hover:text-accent"
            >
              GitHub ↗
            </motion.a>
          </div>
        </header>

        <main>
          <section className="relative px-5 pt-24 pb-10 md:px-8 md:pt-28 md:pb-12">
            <div className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-6xl flex-col justify-center gap-8 md:min-h-[calc(100vh-8rem)] md:gap-10 lg:gap-12">
              <motion.div
                className="flex flex-col items-center text-center"
                variants={revealVariants}
                initial="hidden"
                animate="show"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={`hero-eyebrow-${language}`}
                    className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted"
                    variants={swapVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    {t.eyebrow}
                  </motion.p>
                </AnimatePresence>
                <h1 className="font-serif text-[3.1rem] leading-[0.92] font-normal tracking-tight text-text-primary sm:text-[4rem] md:text-[5.1rem] lg:text-[6.2rem]">
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
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={`hero-intro-${language}`}
                    className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-text-secondary md:text-lg"
                    variants={swapVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    {t.intro}
                  </motion.p>
                </AnimatePresence>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`hero-actions-${language}`}
                    className="mt-6 flex flex-wrap justify-center gap-3"
                    variants={swapVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <motion.a
                      href="https://github.com/Bariskosee"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={microHover}
                      whileTap={microTap}
                      className="focus-ring transition-premium-fast rounded-full bg-accent px-4 py-2 font-sans text-sm font-semibold text-bg-surface hover:bg-accent-hover"
                    >
                      {t.ctaGitHub}
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/barisskose/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={microHover}
                      whileTap={microTap}
                      className="focus-ring transition-premium-fast rounded-full border border-border-soft bg-surface-raised px-4 py-2 font-sans text-sm font-semibold text-text-secondary hover:border-border-strong hover:text-accent"
                    >
                      {t.ctaLinkedIn}
                    </motion.a>
                    <motion.a
                      href="mailto:kosebaris279@gmail.com"
                      whileHover={microHover}
                      whileTap={microTap}
                      className="focus-ring transition-premium-fast rounded-full border border-border-soft bg-surface-raised px-4 py-2 font-sans text-sm font-semibold text-text-secondary hover:border-border-strong hover:text-accent"
                    >
                      {t.ctaEmail}
                    </motion.a>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.div
                className="flex flex-col gap-8 md:gap-10"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={revealVariants}
              >
                {/* Section header */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`projects-copy-${language}`}
                    className="flex flex-col gap-3"
                    variants={swapVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <div className="flex items-center gap-2.5 font-sans text-[10.5px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                      <motion.span
                        className="inline-block h-px bg-text-muted"
                        style={{ width: 0 }}
                        whileInView={{ width: 24 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: reduceMotion ? 0 : 0.4, ease: easePremium, delay: 0.15 }}
                      />
                      {t.projectsEyebrow}
                    </div>
                    <h2 className="m-0 font-serif text-[clamp(2.2rem,5vw,3.6rem)] font-medium italic leading-tight text-text-primary">
                      {t.projectsTitle}
                    </h2>
                    <p className="m-0 max-w-md font-sans text-sm leading-relaxed text-text-secondary">
                      {t.projectsSubtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Cards grid — extra top padding so DataFelix sprite has room above */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`project-grid-${language}`}
                    className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    style={{ paddingTop: 56 }}
                    variants={gridVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    {projects[language].map((project, index) => (
                      <ProjectCard
                        key={project.title}
                        project={project}
                        index={index}
                        variants={cardVariants}
                        reducedMotion={reduceMotion}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

          </section>

          <section className="relative scroll-mt-28 px-5 pb-14 pt-28 md:px-8 md:pb-18 md:pt-32">
            <div className="mx-auto flex w-full max-w-[880px] flex-col items-center gap-2">

              <motion.div
                className="text-center"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                variants={revealVariants}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`tech-copy-${language}`}
                    variants={swapVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <h2 className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-medium italic leading-[1.2] text-text-secondary">
                      {t.technologiesTitle}
                    </h2>
                    <p className="mt-1.5 font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted">
                      tools &amp; stack
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.div
                className="mt-7 w-full"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                variants={revealVariants}
              >
                <TechSphere />
              </motion.div>

            </div>
          </section>

          <motion.footer
            className="bg-bg-primary px-5 pb-12 pt-8 text-center md:px-8 md:pt-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.8 }}
            variants={revealVariants}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={`footer-${language}`}
                className="font-sans text-sm tracking-wide text-text-muted"
                variants={swapVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {t.footer}
              </motion.p>
            </AnimatePresence>
          </motion.footer>
        </main>
      </div>
    </>
  );
}
