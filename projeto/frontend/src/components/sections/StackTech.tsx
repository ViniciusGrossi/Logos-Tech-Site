"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Marquee } from "@/components/ui/marquee";

const allTechs = [
  "Next.js", "React", "Tailwind v4", "TypeScript", "Supabase", "PostgreSQL",
  "pgvector", "FastAPI", "Python", "Claude 3.5", "GPT-4o", "Groq LPU", "n8n",
  "dbt", "Evolution API", "Typebot", "Vercel Edge", "Edge Functions", "Antigravity",
];

interface TechCategory {
  label: string;
  techs: string[];
}

const categories: TechCategory[] = [
  {
    label: "Frontend",
    techs: ["Next.js (App Router)", "React 18", "Tailwind v4", "TypeScript"],
  },
  {
    label: "Backend & Engine",
    techs: ["Supabase", "PostgreSQL (pgvector)", "FastAPI (Python)", "Deno Edge"],
  },
  {
    label: "Inteligência Artificial",
    techs: ["Claude 3.5 Sonnet", "GPT-4o Vision", "Groq LPU", "Antigravity (Coding)"],
  },
  {
    label: "Data Intelligence",
    techs: ["dbt", "Postgres RLS", "Vector DB", "Custom Analytics"],
  },
  {
    label: "Workflow & WhatsApp",
    techs: ["n8n Engine", "Evolution API", "Z-API", "Typebot Builder"],
  },
  {
    label: "Infraestrutura",
    techs: ["Vercel Edge", "Supabase Auth", "S3 Storage", "CI/CD Auto"],
  },
];

export function StackTech() {
  return (
    <section
      id="stack"
      className="py-24 px-6 lg:px-12 max-w-[90rem] mx-auto relative z-20"
    >
      <ScrollReveal>
        <div className="mb-16">
          <span className="text-xs font-mono text-[var(--lt-orange)] uppercase tracking-widest block mb-4">
            Tecnologia
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white tracking-tight mb-4">
            Stack
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed font-light">
            Tecnologias modernas, escolhidas por performance, escalabilidade e
            custo-benefício real.
          </p>
        </div>
      </ScrollReveal>

      {/* Marquee ticker — fast visual impression */}
      <ScrollReveal>
        <Marquee speed={40} className="mb-16 py-4">
          <div className="flex gap-8 items-center px-4">
            {allTechs.map((tech) => (
              <span
                key={tech}
                className="text-2xl md:text-3xl font-light text-neutral-800 hover:text-[var(--lt-orange)] transition-colors duration-300 whitespace-nowrap cursor-default select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </Marquee>
      </ScrollReveal>

      {/* Category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <ScrollReveal key={cat.label} delay={i * 100}>
            <div className="space-y-4 group">
              <span className="text-xs font-mono text-[var(--lt-orange)] uppercase tracking-widest flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[var(--lt-orange)]/50 group-hover:w-8 transition-all duration-300" />
                {cat.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech, j) => (
                  <div
                    key={tech}
                    className="group/chip px-3 py-2 border border-white/5 bg-[var(--lt-surface)] hover:border-[var(--lt-border-hover)] hover:bg-[var(--lt-orange)]/5 transition-all duration-300 cursor-default relative overflow-hidden"
                    style={{ transitionDelay: `${j * 40}ms` }}
                  >
                    {/* Bottom beam on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--lt-orange)] to-transparent scale-x-0 group-hover/chip:scale-x-100 transition-transform duration-500" />
                    <span className="text-sm text-neutral-500 group-hover/chip:text-white transition-colors relative z-10">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24" />
    </section>
  );
}
