"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Diagnóstico IA (Grátis)",
    description:
      "Conversa técnica para mapear gargalos e definir o PRD (Product Requirements Document) inicial do seu ecossistema modular.",
  },
  {
    number: "02",
    title: "Arquitetura & Design",
    description:
      "Definição da stack (Next.js, Supabase, n8n) e criação do Design System. Decidimos a base técnica antes de escrever a primeira linha de código.",
  },
  {
    number: "03",
    title: "Build Assistido por IA",
    description:
      "Uso de engenharia de prompts e agentes de codificação (Antigravity) para acelerar o desenvolvimento, garantindo testes rigorosos e clean code.",
  },
  {
    number: "04",
    title: "Deploy & RAG Native",
    description:
      "Lançamento em ambiente Edge com documentação técnica RAG-ready, permitindo que o sistema seja consultado e operado por IAs desde o dia 1.",
  },
];

export function Processo() {
  return (
    <section
      id="processo"
      className="py-24 px-6 lg:px-12 max-w-[90rem] mx-auto relative z-20"
    >
      <ScrollReveal>
        <div className="mb-16">
          <span className="text-xs font-mono text-[var(--lt-orange)] uppercase tracking-widest block mb-4">
            Processo
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white tracking-tight mb-4">
            Como trabalhamos
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed font-light">
            Um processo direto, sem surpresas, do primeiro contato à entrega.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {/* Connecting line (desktop only) */}
        <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[1px] z-0">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          {/* Animated beam on the connecting line */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--lt-orange)] to-transparent opacity-40"
            style={{ animation: "beam-slide 8s cubic-bezier(0.4,0,0.2,1) infinite" }}
          />
        </div>

        {steps.map((step, i) => (
          <ScrollReveal key={step.number} delay={i * 150}>
            <div className="group relative p-8 border border-white/5 bg-[var(--lt-surface)] hover:border-[var(--lt-border-hover)] transition-all duration-500 h-full overflow-hidden">
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/3 group-hover:to-transparent transition-all duration-700 pointer-events-none" />

              {/* Step number with enhanced animation */}
              <div className="relative z-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-sm font-bold text-neutral-500 group-hover:text-black group-hover:bg-[var(--lt-orange)] group-hover:border-[var(--lt-orange)] group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-all duration-500 mb-6">
                {step.number}
                {/* Pulse behind number on hover */}
                <div className="absolute inset-0 rounded-full border border-[var(--lt-orange)]/0 group-hover:border-[var(--lt-orange)]/30 scale-100 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700" />
              </div>

              <h3 className="text-white font-medium text-lg mb-3 relative z-10 group-hover:text-[var(--lt-orange)] transition-colors duration-300">
                {step.title}
              </h3>

              <p className="text-sm text-neutral-400 leading-relaxed relative z-10">
                {step.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Speed callout */}
      <ScrollReveal delay={600}>
        <div className="flex items-center justify-center gap-2 mt-12 text-sm text-neutral-500 group cursor-default">
          <Zap className="w-4 h-4 text-[var(--lt-amber)]" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
          <span>MVPs e automações entregues em 2 a 6 semanas.</span>
        </div>
      </ScrollReveal>

      {/* Section divider */}
      <div className="section-divider mt-24" />
    </section>
  );
}
