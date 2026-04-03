"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CheckCircle2, TrendingUp, Users, Clock } from "lucide-react";

const scenarios = [
  {
    icon: <Users className="w-6 h-6" />,
    problem: "Minha equipe gasta horas em tarefas repetitivas ou respondendo chat.",
    solution: "Agentes de IA que operam 24/7, resolvem 80% das dúvidas e liberam seu time para o que é estratégico.",
    impact: "Redução de até 60% no custo operacional."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    problem: "Tenho muitos dados, mas não consigo usá-los para decidir.",
    solution: "Dashboards inteligentes e sistemas de RAG que 'leem' seus documentos e respondem perguntas de negócio.",
    impact: "Decisões baseadas em dados reais em segundos."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    problem: "Meus processos são lentos e dependem de planilhas manuais.",
    solution: "Automações de ponta a ponta que integram suas ferramentas e eliminam o erro humano.",
    impact: "Aumento de 3x na velocidade de entrega."
  }
];

export function UseCases() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-[90rem] mx-auto relative z-20">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-[var(--lt-orange)] uppercase tracking-widest block mb-4">
            Cenários de Uso
          </span>
          <h2 className="text-3xl md:text-5xl font-normal text-white tracking-tight mb-4">
            A IA serve para o seu negócio?
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            Se você se identifica com algum desses problemas, <span className="text-white">a resposta é sim.</span>
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {scenarios.map((scenario, i) => (
          <ScrollReveal key={i} delay={i * 200}>
            <div className="p-8 border border-white/5 bg-neutral-950/50 backdrop-blur-sm group hover:border-[var(--lt-orange)]/20 transition-all duration-500 relative overflow-hidden">
               {/* Background highlight icon */}
               <div className="absolute top-4 right-4 text-white/5 group-hover:text-[var(--lt-orange)]/10 transition-colors duration-500 scale-150 rotate-12">
                {scenario.icon}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-500 group-hover:text-[var(--lt-orange)] group-hover:border-[var(--lt-orange)]/30 transition-all duration-500">
                  {scenario.icon}
                </div>
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Cenário {i + 1}</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg text-neutral-200 font-medium leading-snug group-hover:text-white transition-colors">
                  {scenario.problem}
                </h3>
                
                <p className="text-sm text-neutral-500 leading-relaxed italic">
                  Solução Logos Tech: {scenario.solution}
                </p>

                <div className="pt-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500/60" />
                  <span className="text-xs font-semibold text-green-400/80 uppercase tracking-wider">{scenario.impact}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
