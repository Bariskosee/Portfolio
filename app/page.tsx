"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import AboutModal from "./components/AboutModal";
import MatrixName from "./components/MatrixName";
import { SkillSphere } from "./components/SkillSphere";
import WireframeSphere from "./components/WireframeSphere";
import WhoamiCard from "./components/WhoamiCard";

const ParticleFloor = dynamic(() => import("./components/ParticleFloor"), {
  ssr: false,
});

const projects = {
  EN: [
    {
      title: "ev-charging-simulation",
      description:
        "19-microservice, event-driven EV charging platform. Handles 10k+ events/sec with Kafka.",
      stack: ["Python", "FastAPI", "Kafka", "Docker", "Redis"],
      link: "https://github.com/Bariskosee/ev-charging-simulation",
    },
    {
      title: "MefapexChatBox",
      description:
        "Turkish NLP chatbot with BERT-based intent classification. 85%+ accuracy, production-ready.",
      stack: ["PyTorch", "BERT", "FastAPI", "Redis", "WebSocket"],
      link: "https://github.com/Bariskosee/MefapexChatBox",
    },
    {
      title: "DataFelix",
      description:
        "Full-stack movie catalog that highlights clean Spring Boot backend architecture.",
      stack: ["Java 17", "Spring Boot", "Spring Security"],
      link: "https://github.com/Bariskosee/DataFelix",
    },
  ],
  TR: [
    {
      title: "ev-charging-simulation",
      description:
        "19 mikroservisli, event-driven EV charging platformu. Kafka ile 10k+ event/sn işleyebiliyor.",
      stack: ["Python", "FastAPI", "Kafka", "Docker", "Redis"],
      link: "https://github.com/Bariskosee/ev-charging-simulation",
    },
    {
      title: "MefapexChatBox",
      description:
        "BERT tabanlı intent sınıflandırma kullanan Türkçe NLP chatbot. %85+ doğruluk, production-ready.",
      stack: ["PyTorch", "BERT", "FastAPI", "Redis", "WebSocket"],
      link: "https://github.com/Bariskosee/MefapexChatBox",
    },
    {
      title: "DataFelix",
      description:
        "Spring Boot backend mimarisini öne çıkaran full-stack film kataloğu projesi.",
      stack: ["Java 17", "Spring Boot", "Spring Security"],
      link: "https://github.com/Bariskosee/DataFelix",
    },
  ],
} as const;

const copy = {
  EN: {
    aboutCta: "whoami",
    projectsTitle: "Projects",
    technologiesTitle: "Technologies",
    dragHint: "drag to spin",
    footer: "© 2026 Barış Köse · Made with care in Istanbul",
  },
  TR: {
    aboutCta: "hakkımda",
    projectsTitle: "Projeler",
    technologiesTitle: "Teknolojiler",
    dragHint: "döndürmek için sürükle",
    footer: "© 2026 Barış Köse · Istanbul'da özenle geliştirildi",
  },
} as const;

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [language, setLanguage] = useState<"EN" | "TR">("TR");
  const reduceMotion = useReducedMotion();
  const t = copy[language];

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
      <div className="fixed inset-0 z-0 pointer-events-none">
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
                <h1 className="font-serif text-[3.1rem] leading-[0.92] font-normal tracking-tight text-text-primary sm:text-[4rem] md:text-[5.1rem] lg:text-[6.2rem]">
                  <MatrixName
                    text="Barış"
                    durationMs={1100}
                    reducedMotion={!!reduceMotion}
                    once
                  />
                </h1>
                <h1 className="font-serif text-[3.1rem] leading-[0.92] font-normal italic tracking-tight text-accent sm:text-[4rem] md:text-[5.1rem] lg:text-[6.2rem]">
                  <MatrixName
                    text="Köse"
                    durationMs={900}
                    startDelayMs={1200}
                    reducedMotion={!!reduceMotion}
                    once
                  />
                </h1>
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
                    <motion.a
                      key={project.title}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
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
                    </motion.a>
                  );
                })}
                </motion.div>
              </motion.div>
            </div>

            <AboutModal
              isOpen={modalOpen}
              language={language}
              onClose={() => setModalOpen(false)}
            />
          </section>

          <motion.section
            className="section-shell bg-bg-primary"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: reduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4">
              <h2 className="mb-1 text-center font-serif text-[2.1rem] font-medium italic leading-tight text-text-secondary md:text-[2.55rem]">
                {t.technologiesTitle}
              </h2>
              <p className="mb-5 font-sans text-xs tracking-[0.15em] text-text-muted md:text-sm">
                {t.dragHint}
              </p>
              <div className="relative flex w-full items-center justify-center overflow-hidden rounded-3xl border border-border-soft bg-bg-panel/45 py-8 shadow-soft md:py-10">
                <div
                  className="pointer-events-none absolute inset-0 flex items-center justify-center text-accent"
                  style={{ opacity: 0.13 }}
                >
                  <WireframeSphere size={420} className="sphere-rotate" />
                </div>
                <div className="relative z-10">
                  <SkillSphere />
                </div>
              </div>
            </div>
          </motion.section>

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
