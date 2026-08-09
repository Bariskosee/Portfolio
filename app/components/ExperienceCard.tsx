import { motion, type Variants } from "framer-motion";

export interface ExperienceCardData {
  role: string;
  organization: string;
  organizationType?: string;
  period: string;
  duration: string;
  location: string;
  workMode: string;
  summary: string;
  highlights: readonly string[];
  technologies: readonly string[];
  year: string;
}

interface ExperienceCardProps {
  experience: ExperienceCardData;
  index: number;
  variants: Variants;
  reducedMotion: boolean;
}

export default function ExperienceCard({
  experience,
  index,
  variants,
  reducedMotion,
}: ExperienceCardProps) {
  const titleId = `experience-${experience.year}-${index}-title`;

  return (
    <motion.li
      variants={variants}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[1.75rem]"
    >
      <article
        aria-labelledby={titleId}
        className="grid gap-7 rounded-[1.75rem] border border-border-soft bg-surface-raised p-5 shadow-card transition-premium hover:shadow-card-hover sm:p-7 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:gap-10 md:p-8"
      >
        <header className="flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="rounded-full border border-border-soft bg-bg-panel px-3 py-1 font-sans text-[11px] font-semibold tracking-[0.14em] text-text-muted">
              {experience.year}
            </span>
          </div>

          <h3
            id={titleId}
            className="mt-5 font-serif text-[clamp(1.75rem,3vw,2.35rem)] font-medium leading-[1.08] text-text-primary"
          >
            {experience.role}
          </h3>
          <p className="mt-3 font-sans text-sm font-semibold leading-relaxed text-accent">
            {experience.organization}
            {experience.organizationType ? (
              <>
                <span aria-hidden="true"> · </span>
                {experience.organizationType}
              </>
            ) : null}
          </p>
        </header>

        <div className="flex min-w-0 flex-col">
          <div className="space-y-1.5 border-b border-border-soft pb-5 font-sans text-sm leading-relaxed text-text-muted">
            <p>
              {experience.period}
              <span aria-hidden="true"> · </span>
              {experience.duration}
            </p>
            <p>
              {experience.location}
              <span aria-hidden="true"> · </span>
              {experience.workMode}
            </p>
          </div>

          <p className="mt-5 font-serif text-lg leading-relaxed text-text-primary md:text-xl">
            {experience.summary}
          </p>

          {experience.highlights.length > 0 ? (
            <ul className="mt-4 space-y-2 pl-5 font-sans text-sm leading-relaxed text-text-secondary marker:text-text-muted">
              {experience.highlights.map((highlight) => (
                <li key={highlight} className="list-disc pl-1">
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}

          <ul className="mt-6 flex flex-wrap gap-2">
            {experience.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-border-soft bg-accent-soft px-3 py-1.5 font-sans text-[11px] font-semibold tracking-wide text-accent"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </motion.li>
  );
}
