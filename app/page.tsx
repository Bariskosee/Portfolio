"use client";

import { useState } from "react";
import Image from "next/image";
import AboutModal from "./components/AboutModal";

const projects = [
  {
    title: "ev-charging-simulation",
    description:
      "19-microservice event-driven EV charging platform. 10k+ events/sec with Kafka.",
    stack: ["Python", "FastAPI", "Kafka", "Docker", "Redis"],
    link: "https://github.com/Bariskosee/ev-charging-simulation",
  },
  {
    title: "MefapexChatBox",
    description:
      "Turkish NLP chatbot with BERT intent classification. 85%+ accuracy, production-ready.",
    stack: ["PyTorch", "BERT", "FastAPI", "Redis", "WebSocket"],
    link: "https://github.com/Bariskosee/MefapexChatBox",
  },
  {
    title: "DataFelix",
    description:
      "Full-stack movie catalog showcasing Spring Boot backend architecture.",
    stack: ["Java 17", "Spring Boot", "Spring Security"],
    link: "https://github.com/Bariskosee/DataFelix",
  },
];

const collaborations = [
  "Mefapex Technology",
  "Turkcell",
  "Google YZTA",
  "Istanbul Aydın University",
  "Universidad de Alicante",
  "BTK Akademi",
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [language, setLanguage] = useState<"EN" | "TR">("TR");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6">
        <button
          onClick={() => setModalOpen(true)}
          aria-haspopup="dialog"
          aria-controls="about-panel"
          className="flex items-center gap-1.5 rounded-full border border-[rgba(45,95,76,0.3)] bg-accent-soft px-4 py-2 font-sans text-xs font-medium tracking-widest text-[#1f4d3a] transition-colors duration-200 hover:bg-accent hover:text-bg-primary"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          whoami
        </button>
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
              className={`rounded-full px-3 py-1 font-sans text-xs font-semibold tracking-widest transition-colors ${
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
              className={`rounded-full px-3 py-1 font-sans text-xs font-semibold tracking-widest transition-colors ${
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
            className="font-sans text-sm text-text-secondary transition-colors hover:text-accent"
          >
            GitHub ↗
          </a>
        </div>
      </header>

      <main>
        <section className="relative min-h-screen flex items-center justify-center px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="flex flex-col">
              <h1 className="font-serif font-normal text-8xl md:text-9xl leading-[0.95] text-text-primary">
                Barış
              </h1>
              <h1 className="font-serif font-normal italic text-8xl md:text-9xl leading-[0.95] text-accent">
                Köse
              </h1>
            </div>
            <div className="w-[280px] h-[420px] md:w-[320px] md:h-[480px] relative flex-shrink-0 animate-character-float">
              <Image
                src="/baris-idle.png"
                alt="Barış Köse pixel art character"
                fill
                className="object-contain pixel-art"
                priority
              />
            </div>
          </div>

          <AboutModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </section>

        <section className="py-24 md:py-32 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif italic text-5xl md:text-6xl text-text-primary mb-16 text-center">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {projects.map((project) => (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-4 rounded-3xl bg-bg-modal p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
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
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-8 bg-bg-secondary">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="font-serif italic text-2xl text-text-muted mb-10">
              Collaborations I Have Done
            </h2>
            <p className="font-sans text-sm tracking-wide text-text-muted">
              {collaborations.join(" · ")}
            </p>
          </div>
        </section>

        <footer className="py-10 px-8 text-center bg-bg-primary">
          <p className="font-sans text-sm text-text-muted">
            © 2026 Barış Köse · Made with care in Istanbul
          </p>
        </footer>
      </main>
    </>
  );
}
