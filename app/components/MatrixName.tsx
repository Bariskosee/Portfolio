"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MatrixNameProps = {
  text: string;
  className?: string;
  durationMs?: number;
  startDelayMs?: number;
  reducedMotion?: boolean;
  once?: boolean;
};

// Only letters — keeps it elegant on a serif font
const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const rand = () => POOL[Math.floor(Math.random() * POOL.length)];

type CharState = "pending" | "scrambling" | "resolved";
type DisplayChar = { char: string; state: CharState };

export default function MatrixName({
  text,
  className,
  durationMs = 1800,
  startDelayMs = 0,
  reducedMotion = false,
  once = true,
}: MatrixNameProps) {
  const hasAnimatedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const [display, setDisplay] = useState<DisplayChar[]>(() =>
    Array.from(text).map((c) => ({ char: c, state: reducedMotion ? "resolved" : "pending" }))
  );
  const [isComplete, setIsComplete] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion || (once && hasAnimatedRef.current)) {
      setDisplay(Array.from(text).map((c) => ({ char: c, state: "resolved" })));
      setIsComplete(true);
      return;
    }

    hasAnimatedRef.current = true;
    setIsComplete(false);

    const chars = Array.from(text);
    const nonSpaceIdx = chars.map((c, i) => (c !== " " ? i : -1)).filter((i) => i !== -1);
    const N = nonSpaceIdx.length;

    // Each non-space char gets an equal slice of the total duration
    const totalFrames = Math.ceil(durationMs / 16);
    const framesPerChar = Math.max(5, Math.floor(totalFrames / Math.max(N, 1)));

    let frame = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      frame++;

      setDisplay(
        chars.map((char, i): DisplayChar => {
          if (char === " ") return { char: " ", state: "resolved" };

          const order = nonSpaceIdx.indexOf(i);
          const start = order * framesPerChar;
          const end = (order + 1) * framesPerChar;

          if (frame < start) return { char, state: "pending" };
          if (frame >= end) return { char, state: "resolved" };
          return { char: rand(), state: "scrambling" };
        })
      );

      if (frame >= N * framesPerChar) {
        setDisplay(chars.map((c) => ({ char: c, state: "resolved" })));
        setIsComplete(true);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    setDisplay(chars.map((c) => ({ char: c, state: "pending" })));
    timeoutRef.current = window.setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, startDelayMs);

    return () => {
      cancelled = true;
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [text, durationMs, startDelayMs, once, reducedMotion]);

  if (isComplete) {
    return (
      <span aria-label={text} className={cn("whitespace-pre", className)}>
        {text}
      </span>
    );
  }

  return (
    <span aria-label={text} className={cn("relative inline-block align-baseline", className)}>
      {/* invisible spacer — reserves layout width */}
      <span className="whitespace-pre invisible" aria-hidden>
        {text}
      </span>
      <span aria-hidden className="pointer-events-none absolute inset-0 whitespace-pre">
        {display.map(({ char, state }, i) => (
          <span
            key={i}
            style={{
              opacity: state === "pending" ? 0.18 : 1,
              transition: state === "resolved" ? "opacity 80ms ease-out" : "none",
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
