"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import AboutModal from "./components/AboutModal";
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
  const t = copy[language];

  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <ParticleFloor />
      </div>
      <WhoamiCard language={language} />
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-end px-5 py-4 md:px-8 md:py-6 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div
            role="group"
            aria-label="Language switch"
            className="inline-flex items-center rounded-full border border-[rgba(26,29,46,0.18)] bg-[rgba(255,255,255,0.45)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
          >
            <button
              type="button"
              onClick={() => setLanguage("EN")}
              aria-pressed={language === "EN"}
              className={`focus-ring rounded-full px-3 py-1 font-sans text-xs font-semibold tracking-widest transition-colors ${
                language === "EN"
                  ? "bg-[#2a2420] text-[#f7f1e2]"
                  : "text-text-secondary hover:text-accent"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("TR")}
              aria-pressed={language === "TR"}
              className={`focus-ring rounded-full px-3 py-1 font-sans text-xs font-semibold tracking-widest transition-colors ${
                language === "TR"
                  ? "bg-[#2a2420] text-[#f7f1e2]"
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
            className="focus-ring rounded-md font-sans text-sm text-text-secondary transition-colors hover:text-accent"
          >
            GitHub ↗
          </a>
        </div>
      </header>

      <main>
        <section className="relative px-5 pt-24 pb-12 md:px-8 md:pt-28 md:pb-14">
          <div className="mx-auto flex min-h-[calc(100vh-7.5rem)] w-full max-w-6xl flex-col justify-center gap-8 md:min-h-[calc(100vh-8.75rem)] md:gap-10 lg:gap-12">
            <div className="flex flex-col items-center text-center">
              <h1 className="font-serif font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-text-primary">
                Barış
              </h1>
              <h1 className="font-serif font-normal italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-accent">
                Köse
              </h1>
            </div>

            <div className="flex flex-col items-center gap-4 md:gap-6">
              <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-text-primary text-center">
                {t.projectsTitle}
              </h2>

              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
                {projects[language].map((project, index) => {
                  const isDataFelix = index === 2;

                  return (
                    <a
                      key={project.title}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring relative flex flex-col gap-4 rounded-3xl bg-bg-surface p-6 md:p-7 lg:p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                    >
                      {isDataFelix && (
                        <Image
                          src="/baris-idle.png"
                          alt=""
                          aria-hidden="true"
                          width={128}
                          height={192}
                          priority
                          draggable={false}
                          className="pixel-art pointer-events-none absolute bottom-[calc(100%-6px)] right-2 z-10 h-auto w-20 select-none sm:w-24 md:w-28 lg:right-4 lg:w-32"
                        />
                      )}

                      <h3 className="font-serif text-2xl text-text-primary">
                        {project.title}
                      </h3>
                      <p className="flex-1 font-sans text-sm leading-relaxed text-text-secondary">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-accent-soft px-2 py-0.5 font-sans text-[11px] text-accent"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <AboutModal
            isOpen={modalOpen}
            language={language}
            onClose={() => setModalOpen(false)}
          />
        </section>

        <section className="py-16 md:py-24 lg:py-28 px-5 md:px-8 bg-bg-primary">
          <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
            <h2 className="font-serif italic text-2xl text-text-muted mb-1">
              {t.technologiesTitle}
            </h2>
            <p className="font-sans text-xs text-text-muted tracking-wide mb-5">
              {t.dragHint}
            </p>
            <div className="relative flex w-full items-center justify-center overflow-hidden">
              {/* Wireframe sphere — decorative background layer */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none text-accent"
                style={{ opacity: 0.15 }}
              >
                <WireframeSphere size={420} className="sphere-rotate" />
              </div>
              {/* Icon sphere — interactive foreground layer */}
              <div className="relative z-10">
                <SkillSphere />
              </div>
            </div>
          </div>
        </section>

        <footer className="py-10 px-5 md:px-8 text-center bg-bg-primary">
          <p className="font-sans text-sm text-text-muted">
            {t.footer}
          </p>
        </footer>
      </main>
    </>
  );
}
