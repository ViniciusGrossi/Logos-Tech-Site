"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Em menos de um mês o agente já atendia no WhatsApp por conta própria. Reduzimos em mais de 70% as mensagens fora do horário que chegavam para a equipe.",
    role: "Rafael M.",
    company: "Brasília, DF",
  },
  {
    quote:
      "Nunca imaginei que automatizar triagem de clientes fosse tão direto. O agente qualifica, agenda e registra tudo — sem eu precisar tocar em nada.",
    role: "Camila T.",
    company: "Brasília, DF",
  },
  {
    quote:
      "Saímos de planilhas bagunçadas para um dashboard que qualquer pessoa da equipe usa no dia a dia. O impacto na velocidade de decisão foi imediato.",
    role: "André L.",
    company: "Brasília, DF",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-[90rem] mx-auto relative z-20">
      <ScrollReveal>
        <div className="mb-16">
          <span className="text-xs font-mono text-[var(--lt-orange)] uppercase tracking-widest block mb-4">
            Quem já passou por isso
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            O que dizem os primeiros clientes
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl font-light leading-relaxed">
            Resultados de quem apostou cedo na automação inteligente.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <ScrollReveal key={i} delay={i * 120}>
            <div className="h-full p-8 border border-white/8 bg-neutral-900/90 backdrop-blur-sm hover:border-[var(--lt-orange)]/20 transition-all duration-500 group flex flex-col gap-6">
              {/* Quote icon */}
              <Quote className="w-6 h-6 text-[var(--lt-orange)]/40 group-hover:text-[var(--lt-orange)]/70 transition-colors shrink-0" />

              {/* Text */}
              <p className="text-neutral-300 leading-relaxed text-sm md:text-base flex-1 italic">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-1">
                <span className="text-sm text-white font-medium">{t.role}</span>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                  {t.company}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
}
