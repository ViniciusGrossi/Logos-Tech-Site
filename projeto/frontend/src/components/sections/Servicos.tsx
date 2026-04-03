"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { services } from "@/data/services";

export function Servicos() {
  return (
    <section
      id="servicos"
      className="py-24 px-6 lg:px-12 max-w-[90rem] mx-auto relative z-20"
    >
      <ScrollReveal>
        <div className="mb-16">
          <span className="text-xs font-mono text-[var(--lt-orange)] uppercase tracking-widest block mb-4">
            Serviços
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white tracking-tight mb-4">
            O que entregamos
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed font-light">
            Quatro frentes de tecnologia combinadas conforme a necessidade real
            do seu negócio.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <ScrollReveal key={service.title} delay={i * 100}>
              <TiltCard intensity={6}>
                <div className="group relative p-8 border border-white/5 bg-[var(--lt-surface)] hover:border-[var(--lt-border-hover)] transition-all duration-500 h-full overflow-hidden">
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-amber-500/0 group-hover:from-orange-500/5 group-hover:to-amber-500/3 transition-all duration-700 pointer-events-none" />

                  {/* Beam on left */}
                  <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--lt-orange)] to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[2s] opacity-70" />
                  </div>

                  {/* Beam on bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--lt-amber)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2.5s] opacity-50" />
                  </div>

                  <div className="flex items-start gap-4 mb-6 relative z-10">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-neutral-500 group-hover:text-[var(--lt-orange)] group-hover:border-[var(--lt-orange)]/30 group-hover:bg-[var(--lt-orange)]/5 transition-all duration-300 relative">
                      <Icon className="w-5 h-5" />
                      {/* Icon glow */}
                      <div className="absolute inset-0 bg-[var(--lt-orange)]/0 group-hover:bg-[var(--lt-orange)]/5 blur-xl transition-all duration-500" />
                    </div>
                    <div>
                      <h3 className="text-lg text-white font-medium group-hover:text-[var(--lt-orange)] transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-400 leading-relaxed mb-6 relative z-10">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 relative z-10">
                    {service.examples.map((ex, j) => (
                      <li
                        key={ex}
                        className="text-xs text-neutral-500 group-hover:text-neutral-400 flex items-center gap-2 transition-colors duration-300"
                        style={{ transitionDelay: `${j * 50}ms` }}
                      >
                        <span className="w-1.5 h-1.5 bg-[var(--lt-orange)]/30 group-hover:bg-[var(--lt-orange)]/60 rounded-full shrink-0 transition-colors duration-300" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Section divider */}
      <div className="section-divider mt-24" />
    </section>
  );
}
