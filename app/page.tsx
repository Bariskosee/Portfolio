"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import MatrixName from "./components/MatrixName";
import { TechSphere } from "./components/TechSphere";
import WhoamiCard from "./components/WhoamiCard";

const ParticleFloor = dynamic(() => import("./components/ParticleFloor"), {
  ssr: false,
});

const projects = {
  EN: [
    {
      title: "ev-charging-simulation",
      description:
        "Multi-service EV charging simulation with Kafka-backed messaging, monitoring, and fault-tolerance exercises.",
      stack: ["Python", "FastAPI", "Kafka", "Docker", "Redis"],
      link: "https://github.com/Bariskosee/ev-charging-simulation",
      action: "View GitHub repo",
    },
    {
      title: "MefapexChatBox",
      description:
        "Turkish NLP chatbot prototype using BERT-based intent classification and a FastAPI service layer.",
      stack: ["PyTorch", "BERT", "FastAPI", "Redis", "WebSocket"],
      link: "https://github.com/Bariskosee/MefapexChatBox",
      action: "View GitHub repo",
    },
    {
      title: "DataFelix",
      description:
        "Full-stack movie catalog that highlights clean Spring Boot backend architecture.",
      stack: ["Java 17", "Spring Boot", "Spring Security"],
      link: "https://github.com/Bariskosee/DataFelix",
      action: "View GitHub repo",
    },
  ],
  TR: [
    {
      title: "ev-charging-simulation",
      description:
        "Kafka mesajlaşması, izleme ve hata toleransı senaryoları içeren çok servisli EV charging simülasyonu.",
      stack: ["Python", "FastAPI", "Kafka", "Docker", "Redis"],
      link: "https://github.com/Bariskosee/ev-charging-simulation",
      action: "GitHub reposunu aç",
    },
    {
      title: "MefapexChatBox",
      description:
        "BERT tabanlı intent sınıflandırma ve FastAPI servis katmanı kullanan Türkçe NLP chatbot prototipi.",
      stack: ["PyTorch", "BERT", "FastAPI", "Redis", "WebSocket"],
      link: "https://github.com/Bariskosee/MefapexChatBox",
      action: "GitHub reposunu aç",
    },
    {
      title: "DataFelix",
      description:
        "Spring Boot backend mimarisini öne çıkaran full-stack film kataloğu projesi.",
      stack: ["Java 17", "Spring Boot", "Spring Security"],
      link: "https://github.com/Bariskosee/DataFelix",
      action: "GitHub reposunu aç",
    },
  ],
} as const;

const copy = {
  EN: {
    eyebrow: "Software Engineer · Istanbul",
    intro:
      "I build thoughtful web interfaces and backend systems with React, TypeScript, Next.js, Python, and Java.",
    projectsTitle: "Projects",
    technologiesTitle: "Technologies",
    ctaGitHub: "GitHub",
    ctaLinkedIn: "LinkedIn",
    ctaEmail: "Email",
    footer: "© 2026 Barış Köse · Made with care in Istanbul",
  },
  TR: {
    eyebrow: "Yazılım Mühendisi · Istanbul",
    intro:
      "React, TypeScript, Next.js, Python ve Java ile düşünülmüş web arayüzleri ve backend sistemleri geliştiriyorum.",
    projectsTitle: "Projeler",
    technologiesTitle: "Teknolojiler",
    ctaGitHub: "GitHub",
    ctaLinkedIn: "LinkedIn",
    ctaEmail: "E-posta",
    footer: "© 2026 Barış Köse · Istanbul'da özenle geliştirildi",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<"EN" | "TR">("TR");
  const reduceMotion = useReducedMotion();
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language === "TR" ? "tr" : "en";
  }, [language]);

  const heroVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.62,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const gridVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.14,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.52,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <>
      <div className="fixed left-0 right-0 bottom-0 z-0 pointer-events-none" style={{ top: "-80px" }}>
        <ParticleFloor />
      </div>
      <div className="relative z-10">
        <WhoamiCard language={language} />
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-end px-5 py-4 md:px-8 md:py-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div
              role="group"
              aria-label="Language switch"
              className="inline-flex items-center rounded-full border border-border-soft bg-surface-raised p-1 shadow-card"
            >
              <button
                type="button"
                onClick={() => setLanguage("EN")}
                aria-pressed={language === "EN"}
                className={`focus-ring transition-premium-fast rounded-full px-3 py-1.5 font-sans text-xs font-semibold tracking-[0.16em] ${
                  language === "EN"
                    ? "bg-accent text-bg-surface"
                    : "text-text-secondary hover:text-accent"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("TR")}
                aria-pressed={language === "TR"}
                className={`focus-ring transition-premium-fast rounded-full px-3 py-1.5 font-sans text-xs font-semibold tracking-[0.16em] ${
                  language === "TR"
                    ? "bg-accent text-bg-surface"
                    : "text-text-secondary hover:text-accent"
                }`}
              >
                TR
              </button>
            </div>

            <a
              href="https://github.com/Bariskosee"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring transition-premium-fast rounded-md px-1 font-sans text-sm text-text-secondary hover:text-accent"
            >
              GitHub ↗
            </a>
          </div>
        </header>

        <main>
          <section className="relative px-5 pt-24 pb-10 md:px-8 md:pt-28 md:pb-12">
            <div className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-6xl flex-col justify-center gap-8 md:min-h-[calc(100vh-8rem)] md:gap-10 lg:gap-12">
              <motion.div
                className="flex flex-col items-center text-center"
                variants={heroVariants}
                initial="hidden"
                animate="show"
              >
                <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">
                  {t.eyebrow}
                </p>
                <h1 className="font-serif text-[3.1rem] leading-[0.92] font-normal tracking-tight text-text-primary sm:text-[4rem] md:text-[5.1rem] lg:text-[6.2rem]">
                  <span className="block">
                    <MatrixName
                      text="Barış"
                      durationMs={1100}
                      reducedMotion={!!reduceMotion}
                      once
                    />
                  </span>
                  <span className="block italic text-accent">
                    <MatrixName
                      text="Köse"
                      durationMs={900}
                      startDelayMs={1200}
                      reducedMotion={!!reduceMotion}
                      once
                    />
                  </span>
                </h1>
                <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-text-secondary md:text-lg">
                  {t.intro}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href="https://github.com/Bariskosee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring transition-premium-fast rounded-full bg-accent px-4 py-2 font-sans text-sm font-semibold text-bg-surface hover:bg-accent-hover"
                  >
                    {t.ctaGitHub}
                  </a>
                  <a
                    href="https://linkedin.com/in/barisskose/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring transition-premium-fast rounded-full border border-border-soft bg-surface-raised px-4 py-2 font-sans text-sm font-semibold text-text-secondary hover:border-border-strong hover:text-accent"
                  >
                    {t.ctaLinkedIn}
                  </a>
                  <a
                    href="mailto:kosebaris279@gmail.com"
                    className="focus-ring transition-premium-fast rounded-full border border-border-soft bg-surface-raised px-4 py-2 font-sans text-sm font-semibold text-text-secondary hover:border-border-strong hover:text-accent"
                  >
                    {t.ctaEmail}
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col items-center gap-4 md:gap-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={heroVariants}
              >
                <h2 className="font-serif text-[2.35rem] font-medium italic leading-tight text-text-primary md:text-[3rem] lg:text-[3.45rem] text-center">
                  {t.projectsTitle}
                </h2>

                <motion.div
                  className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6"
                  variants={gridVariants}
                >
                {projects[language].map((project, index) => {
                  const isDataFelix = index === 2;

                  return (
                    <motion.article
                      key={project.title}
                      variants={cardVariants}
                      className="focus-ring transition-premium relative flex h-full flex-col gap-4 rounded-2xl border border-border-soft bg-bg-surface p-6 shadow-card hover:-translate-y-1 hover:border-border-strong hover:shadow-card-hover md:p-7 lg:p-8"
                    >
                      {isDataFelix && (
                        <Image
                          src="/baris-idle.png"
                          alt=""
                          aria-hidden="true"
                          width={128}
                          height={192}
                          draggable={false}
                          className="pixel-art pointer-events-none absolute bottom-[calc(100%-6px)] right-2 z-10 h-auto w-20 select-none sm:w-24 md:w-28 lg:right-4 lg:w-32"
                        />
                      )}

                      <h3 className="font-serif text-[1.95rem] leading-tight text-text-primary">
                        {project.title}
                      </h3>
                      <p className="flex-1 font-sans text-sm leading-relaxed text-text-secondary md:text-[0.95rem]">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border-soft bg-accent-soft px-2.5 py-1 font-sans text-[11px] font-medium tracking-wide text-accent"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.action}: ${project.title}`}
                        className="focus-ring transition-premium-fast mt-1 inline-flex w-fit rounded-full border border-border-soft px-3 py-1.5 font-sans text-xs font-semibold text-accent hover:border-border-strong hover:bg-accent-soft"
                      >
                        {project.action} ↗
                      </a>
                    </motion.article>
                  );
                })}
                </motion.div>
              </motion.div>
            </div>

          </section>

          <section className="relative scroll-mt-28 px-5 pb-14 pt-28 md:px-8 md:pb-18 md:pt-32">
            <div className="mx-auto flex w-full max-w-[880px] flex-col items-center gap-2">

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-medium italic leading-[1.2] text-text-secondary">
                  {t.technologiesTitle}
                </h2>
                <motion.p
                  className="mt-1.5 font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                >
                  tools &amp; stack
                </motion.p>
              </motion.div>

              <motion.div
                className="mt-7 w-full"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 56 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: reduceMotion ? 0 : 0.88, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <TechSphere />
              </motion.div>

            </div>
          </section>

          <footer className="px-5 pb-12 pt-8 text-center md:px-8 md:pt-10 bg-bg-primary">
            <p className="font-sans text-sm tracking-wide text-text-muted">
              {t.footer}
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
