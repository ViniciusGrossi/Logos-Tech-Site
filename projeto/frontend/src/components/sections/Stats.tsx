"use client";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const stats = [
  { value: 80, suffix: "%", label: "menos trabalho manual para os times" },
  { value: 3, suffix: ".5x", label: "de retorno médio por projeto" },
  { value: 6, suffix: " sem", label: "do briefing ao sistema no ar" },
  { value: 24, suffix: "/7", label: "seus agentes funcionando" },
];

export function Stats() {
  return (
    <section className="py-16 px-6 lg:px-12 relative z-20 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(135deg, rgba(249,115,22,0.05) 0%, transparent 50%, rgba(251,191,36,0.05) 100%)",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 8s ease infinite",
        }}
      />

      <div className="max-w-[90rem] mx-auto">
        <p className="text-center text-xs font-mono text-neutral-600 uppercase tracking-widest mb-8">
          Médias dos projetos entregues nos últimos 12 meses
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="stat-item flex flex-col group cursor-default pb-4 px-6 py-5 bg-neutral-950/70 backdrop-blur-sm border border-white/5 rounded-lg">
                <div className="flex items-baseline gap-1 mb-3">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={1800 + i * 200}
                    className="text-4xl md:text-5xl font-light text-white tracking-[-0.04em] group-hover:text-[var(--lt-orange)] transition-colors duration-300 stat-number"
                  />
                </div>
                <span className="text-xs font-semibold text-neutral-600 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider mt-16" />
    </section>
  );
}
