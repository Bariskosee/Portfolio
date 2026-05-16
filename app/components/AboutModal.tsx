"use client";

import { useEffect } from "react";
import Image from "next/image";

interface AboutModalProps {
  isOpen: boolean;
  language: "EN" | "TR";
  onClose: () => void;
}

const modalCopy = {
  EN: {
    title: "Hi, I'm Barış.",
    whoami: "whoami",
    body: [
      "I'm a software engineering student based in Istanbul with a fascination for systems that scale and machines that learn. I'm currently in my third year at Istanbul Aydın University, fresh off an Erasmus semester at Universidad de Alicante.",
      "My work lives at the intersection of distributed systems and AI/ML. I've built event-driven microservices handling thousands of events per second, and NLP chatbots that actually understand Turkish. When I'm not debugging production code, I'm probably solving LeetCode problems, playing tennis, or rewatching Mindhunter for the fourth time.",
      "I've spent two summers working in the US, one semester in Spain, and I'm aiming for a master's in Germany next. I believe great engineering comes from curiosity, long walks, and occasional time zone changes.",
    ],
    meta: [
      { label: "Location", value: "Istanbul" },
      { label: "School", value: "Aydın Uni." },
      { label: "Year", value: "3rd" },
    ],
    email: "Email",
    closeLabel: "Close about panel",
  },
  TR: {
    title: "Merhaba, ben Barış.",
    whoami: "hakkımda",
    body: [
      "Istanbul'da yaşayan, ölçeklenebilir sistemler ve öğrenen makineler üzerine odaklanan bir yazılım mühendisliği öğrencisiyim. Istanbul Aydın Üniversitesi'nde 3. sınıftayım ve Erasmus dönemimi Universidad de Alicante'de tamamladım.",
      "Çalışmalarım distributed systems ile AI/ML kesişiminde ilerliyor. Saniyede binlerce event işleyen event-driven mikroservisler ve Türkçeyi gerçekten anlayan NLP chatbot'lar geliştirdim. Kod dışında genelde LeetCode çözüyor, tenis oynuyor ya da Mindhunter'ı tekrar izliyorum.",
      "ABD'de iki yaz dönemi çalıştım, İspanya'da bir dönem eğitim aldım ve sıradaki hedefim Almanya'da yüksek lisans. İyi mühendisliğin merak, uzun yürüyüşler ve bazen zaman dilimi değişiminden beslendiğine inanıyorum.",
    ],
    meta: [
      { label: "Konum", value: "Istanbul" },
      { label: "Okul", value: "Aydın Üni." },
      { label: "Sınıf", value: "3." },
    ],
    email: "E-posta",
    closeLabel: "Hakkımda panelini kapat",
  },
} as const;

export default function AboutModal({ isOpen, language, onClose }: AboutModalProps) {
  const t = modalCopy[language];

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 top-[5.5rem] z-50 overflow-y-auto bg-[rgba(16,18,30,0.45)] px-5 pb-8 pt-6 md:top-24 md:px-8 animate-backdrop-fade-in"
      style={{ backdropFilter: "blur(3px)" }}
      onClick={onClose}
    >
      <div className="mx-auto grid w-full max-w-[980px] min-w-[300px] grid-cols-1 items-start gap-4 md:gap-5 lg:w-[64vw] lg:grid-cols-[0.9fr_2.1fr] animate-modal-fade-in">
        <aside
          role="group"
          aria-label="Profile card"
          className="group border border-text-primary/85 bg-bg-panel p-2.5 shadow-retro"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-2 flex items-center justify-end border border-text-primary/85 bg-bg-secondary px-2 py-1.5">
            <button
              type="button"
              onClick={onClose}
              aria-label={t.closeLabel}
              className="focus-ring inline-flex h-7 w-7 items-center justify-center border border-text-primary/85 bg-bg-surface font-sans text-xs text-text-primary transition-colors hover:bg-bg-secondary"
            >
              X
            </button>
          </div>

          <div className="relative mb-2 aspect-[3/4] border border-text-primary/85 bg-bg-surface">
            <Image
              src="/baris-portrait.png"
              alt="Barış Köse portrait"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            {t.meta.map((row) => (
              <div key={row.label} className="flex items-center justify-between border-b border-text-primary/10 pb-1.5 last:border-b-0 last:pb-0">
                <span className="font-sans text-[11px] text-text-secondary">{row.label}</span>
                <span className="font-sans text-[11px] font-medium text-text-primary">{row.value}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="focus-ring flex w-full items-center justify-between border border-text-primary/85 bg-accent px-4 py-2"
          >
            <span className="font-sans text-sm font-bold tracking-[0.2em] text-bg-primary">
              {t.whoami}
            </span>
            <span
              className="alien-wiggle text-base leading-none select-none transition-transform duration-200 group-hover:rotate-12"
              aria-hidden="true"
            >
              👾
            </span>
          </button>
        </aside>

        <article
          id="about-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-title"
          className="border border-text-primary/50 bg-bg-surface p-4 md:p-5 shadow-retro"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 id="about-title" className="mb-4 font-serif text-xl text-text-primary md:text-2xl">
            {t.title}
          </h2>

          <div className="space-y-4">
            {t.body.map((paragraph) => (
              <p key={paragraph} className="font-serif text-sm leading-relaxed text-text-primary">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t-2 border-text-muted/35 pt-4 font-sans text-sm tracking-wide uppercase">
            <a href="mailto:kosebaris279@gmail.com" className="focus-ring rounded-sm text-accent hover:underline">
              {t.email}
            </a>
            <span className="text-text-muted">·</span>
            <a
              href="https://linkedin.com/in/barisskose/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-sm text-accent hover:underline"
            >
              LinkedIn
            </a>
            <span className="text-text-muted">·</span>
            <a
              href="https://github.com/Bariskosee"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-sm text-accent hover:underline"
            >
              GitHub
            </a>
          </div>
        </article>

      </div>
    </div>
  );
}
