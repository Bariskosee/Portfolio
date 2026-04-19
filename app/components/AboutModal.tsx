"use client";

import { useEffect } from "react";
import Image from "next/image";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
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
      className="fixed inset-0 top-24 z-50 px-6 md:px-8 overflow-y-auto animate-backdrop-fade-in"
      onClick={onClose}
    >
      <div className="w-full lg:w-[64vw] max-w-[980px] min-w-[300px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_2.1fr] gap-4 items-start animate-modal-fade-in">
        <aside
          role="dialog"
          aria-label="Profile card"
          className="group border border-[#2a2420] bg-[#efe7d5] p-2.5 shadow-[5px_5px_0_#d6cfbe]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-end border border-[#2a2420] bg-[#e3d9c4] px-2 py-1.5 mb-2">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close about panel"
              className="h-7 w-7 border border-[#2a2420] bg-[#f7f1e2] inline-flex items-center justify-center font-sans text-xs text-[#2a2420] hover:bg-[#ede4cf]"
            >
              X
            </button>
          </div>

          <div className="relative aspect-[3/4] border border-[#2a2420] bg-[#f8f3e7] mb-2">
            <Image
              src="/baris-portrait.png"
              alt="Barış Köse portrait"
              fill
              className="object-cover"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full border border-[#2a2420] bg-[#1f4d3a] pl-4 pr-4 py-2 flex items-center justify-between"
          >
            <span className="font-sans text-sm font-bold tracking-[0.2em] text-text-primary">
              whoami
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
          aria-modal="false"
          aria-labelledby="about-title"
          className="border border-[#6d6963] bg-[#fbf6ea] p-4 md:p-5 shadow-[5px_5px_0_#d6cfbe]"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 id="about-title" className="font-serif text-xl md:text-2xl text-[#2a2420] mb-4">
            Hi, I&apos;m Barış.
          </h2>

          <div className="space-y-4">
            <p className="font-serif text-sm leading-relaxed text-[#2a2420]">
              I&apos;m a software engineering student based in Istanbul with a fascination for systems that scale and machines that learn. I&apos;m currently in my third year at Istanbul Aydın University, fresh off an Erasmus semester at Universidad de Alicante.
            </p>

            <p className="font-serif text-sm leading-relaxed text-[#2a2420]">
              My work lives at the intersection of distributed systems and AI/ML— I&apos;ve built event-driven microservices handling thousands of events per second, and NLP chatbots that actually understand Turkish. When I&apos;m not debugging production code, I&apos;m probably solving LeetCode problems, playing tennis, or rewatching Mindhunter for the fourth time.
            </p>

            <p className="font-serif text-sm leading-relaxed text-[#2a2420]">
              I&apos;ve spent two summers working in the US, one semester in Spain, and I&apos;m aiming for a master&apos;s in Germany next. I believe great engineering comes from curiosity, long walks, and occasional time zone changes.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-[#bcb3a0] flex flex-wrap items-center gap-3 font-sans text-sm tracking-wide uppercase">
            <a href="mailto:kosebaris279@gmail.com" className="text-[#1f4d3a] hover:underline">
              Email
            </a>
            <span className="text-[#7a7366]">·</span>
            <a
              href="https://linkedin.com/in/barisskose/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1f4d3a] hover:underline"
            >
              LinkedIn
            </a>
            <span className="text-[#7a7366]">·</span>
            <a
              href="https://github.com/Bariskosee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1f4d3a] hover:underline"
            >
              GitHub
            </a>
          </div>
        </article>

      </div>
    </div>
  );
}
