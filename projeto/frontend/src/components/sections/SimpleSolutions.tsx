"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MessageSquare, ScanSearch, UserCheck, LayoutGrid } from "lucide-react";

const simpleSolutions = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "IA no WhatsApp",
    subtitle: "O Atendente que Nunca Dorme",
    description: "Sabe quando um cliente te chama de madrugada e só recebe resposta no dia seguinte? Nossa IA responde na hora, tira dúvidas sobre preços, horários e até faz agendamentos sozinha. É como ter um funcionário nota 10 disponível 24h por dia.",
    badge: "Solução Popular"
  },
  {
    icon: <ScanSearch className="w-6 h-6" />,
    title: "Assistente de Dúvidas (RAG)",
    subtitle: "O Funcionário que Leu Tudo",
    description: " Imagine um robô que leu todos os manuais, planilhas e documentos da sua empresa. Quando você ou seu cliente tem uma dúvida, ele responde em segundos com a informação exata. Sem você precisar procurar nada.",
    badge: "Mais Inteligência"
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: "Agente de Vendas (SDR)",
    subtitle: "O Vendedor que Nunca Esquece",
    description: "A IA entra em contato com quem deixou o nome no seu site, faz as primeiras perguntas e descobre se ele está pronto para comprar. Se estiver, ele já agenda uma reunião direto na sua agenda. Você só fala com quem realmente quer fechar.",
    badge: "Foco em Lucro"
  },
  {
    icon: <LayoutGrid className="w-6 h-6" />,
    title: "Sistemas Simples",
    subtitle: "Organização Sem Complicação",
    description: "Chega de planilhas bagunçadas. Criamos telas simples e diretas para você controlar seu estoque, seus clientes ou suas vendas. Tudo limpo, rápido e que funciona direto no celular.",
    badge: "Essencial"
  }
];

export function SimpleSolutions() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-[90rem] mx-auto relative z-20 overflow-hidden">
      <ScrollReveal>
        <div className="mb-16">
          <span className="text-xs font-mono text-[var(--lt-orange)] uppercase tracking-widest block mb-4">
            Simplicidade no centro
          </span>
          <h2 className="text-3xl md:text-5xl font-normal text-white tracking-tight mb-4">
            Soluções que qualquer um entende
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl font-light leading-relaxed">
            IA não precisa ser complicada. Nós pegamos a tecnologia mais avançada do mundo e entregamos algo <span className="text-white">prático</span> para o seu dia a dia.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {simpleSolutions.map((solution, i) => (
          <ScrollReveal key={i} delay={i * 100}>
            <div className="p-8 border border-white/5 bg-neutral-900/30 backdrop-blur-md hover:border-[var(--lt-orange)]/20 hover:bg-neutral-900/50 transition-all duration-500 group flex flex-col md:flex-row gap-6 items-start">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center text-neutral-500 group-hover:text-[var(--lt-orange)] group-hover:bg-[var(--lt-orange)]/10 group-hover:scale-110 transition-all duration-500">
                {solution.icon}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl text-white font-medium italic">
                    {solution.title}
                  </h3>
                  <span className="text-[10px] bg-white/5 text-neutral-500 px-2 py-0.5 uppercase tracking-widest border border-white/10 group-hover:border-[var(--lt-orange)]/20 group-hover:text-[var(--lt-orange)]/80 transition-colors">
                    {solution.badge}
                  </span>
                </div>
                
                <h4 className="text-sm font-semibold text-[var(--lt-orange)]/80 uppercase tracking-wider">
                  {solution.subtitle}
                </h4>

                <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                  {solution.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
