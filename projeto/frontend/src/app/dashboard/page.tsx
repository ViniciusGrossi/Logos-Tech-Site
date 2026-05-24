"use client";

import { useState } from "react";
import { Menu, AlertCircle, TrendingUp, TrendingDown, Clock, MessageSquare, Briefcase } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";

// Mock data for the feed
const feedEvents = [
  {
    id: 1,
    time: "14:30",
    date: "22 Mai",
    type: "RUMOR",
    title: "Visto em Londres",
    content: "Rumores indicam que um de nossos diretores foi visto jantando com o agente do atacante estrela do rival. Especulação sobre transferência na próxima janela.",
    icon: <MessageSquare className="w-4 h-4" />
  },
  {
    id: 2,
    time: "10:15",
    date: "22 Mai",
    type: "OPERACIONAL",
    title: "Intensidade do Treino Aumentada",
    content: "A comissão técnica decidiu aumentar a intensidade dos treinos táticos em 15% após a última performance abaixo da média. Risco de lesões elevado.",
    icon: <TrendingUp className="w-4 h-4 text-green-500" />
  },
  {
    id: 3,
    time: "09:00",
    date: "22 Mai",
    type: "DIRETORIA",
    title: "Reunião de Emergência Agendada",
    content: "O conselho administrativo marcou uma reunião extraordinária para amanhã às 08:00. O principal ponto da pauta é a revisão do orçamento (FFP).",
    icon: <Briefcase className="w-4 h-4 text-red-400" />
  },
  {
    id: 4,
    time: "18:45",
    date: "21 Mai",
    type: "FINANÇAS",
    title: "Alerta de Limite FFP",
    content: "O departamento financeiro emitiu um memorando alertando que estamos a 5% de quebrar as regras de Fair Play Financeiro. Contratações estão suspensas.",
    icon: <AlertCircle className="w-4 h-4 text-[var(--lt-orange)]" />
  },
  {
    id: 5,
    time: "16:20",
    date: "21 Mai",
    type: "ELENCO",
    title: "Queda de Moral no Vestiário",
    content: "Relatórios do assistente técnico indicam frustração crescente entre os titulares devido a promessas não cumpridas sobre bônus de performance.",
    icon: <TrendingDown className="w-4 h-4 text-orange-400" />
  }
];

function StatusSidebar() {
  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-4">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
          Inteligência Estratégica
        </h3>
        <p className="text-sm text-neutral-400 font-light leading-relaxed">
          Monitoramento contínuo dos pilares operacionais do clube. Decisões em tempo real baseadas em métricas críticas.
        </p>
      </div>

      <div className="space-y-8 mt-4">
        {/* Board Tension */}
        <div className="space-y-3 group">
          <div className="flex justify-between items-end">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">Tensão da Diretoria</span>
            <span className="text-xs font-mono text-red-400">85%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-red-400 w-[85%]" />
          </div>
          <p className="text-[10px] text-neutral-500 italic">Estado Crítico: Intervenção iminente</p>
        </div>

        {/* Squad Morale */}
        <div className="space-y-3 group">
          <div className="flex justify-between items-end">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">Moral do Elenco</span>
            <span className="text-xs font-mono text-orange-400">42%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-600 to-orange-400 w-[42%]" />
          </div>
          <p className="text-[10px] text-neutral-500 italic">Estado Alerta: Foco em gestão de pessoas</p>
        </div>

        {/* FFP Limit */}
        <div className="space-y-3 group">
          <div className="flex justify-between items-end">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">Limite FFP</span>
            <span className="text-xs font-mono text-red-500 font-bold">95%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-800 to-red-500 w-[95%]" />
             {/* Threshold marker */}
             <div className="absolute top-0 left-[90%] w-[1px] h-full bg-white" />
          </div>
          <p className="text-[10px] text-neutral-500 italic">Violação de regulamento se aproximando</p>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-white/10">
        <button className="w-full h-10 border border-white/10 bg-transparent text-xs font-mono uppercase tracking-widest text-white hover:bg-white/5 hover:border-white/30 transition-all duration-300">
          Acessar Relatório Completo
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-neutral-200 font-sans selection:bg-white/20">
      
      {/* Top Header - Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/10 bg-[#09090B]/80 backdrop-blur-md z-50 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden p-2 -ml-2 text-neutral-400 hover:text-white transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#09090B] border-r border-white/10 p-6 w-[300px]">
              <div className="mt-8">
                <StatusSidebar />
              </div>
            </SheetContent>
          </Sheet>
          
          <h1 className="text-lg font-serif font-bold tracking-tight text-white flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-[var(--lt-orange)]" />
             Logos Legacy
          </h1>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
           <span>Dia 42</span>
           <span className="hidden sm:inline">| Temporada 25/26</span>
        </div>
      </header>

      {/* Main Layout Grid */}
      <main className="pt-16 min-h-screen flex flex-col lg:flex-row max-w-[1400px] mx-auto">
        
        {/* Center/Left: The Feed */}
        <div className="flex-1 px-6 lg:px-16 py-12 lg:border-r border-white/10">
          <div className="max-w-2xl">
            
            <header className="mb-16">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] block mb-4 border-l border-[var(--lt-orange)] pl-3">
                Live Intelligence
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tighter mb-4">
                The Legacy Feed.
              </h2>
              <p className="text-neutral-400 font-light leading-relaxed max-w-lg">
                Atualizações operacionais em tempo real. Cada evento pode impactar a narrativa e os recursos do clube.
              </p>
            </header>

            {/* Event Stream */}
            <div className="space-y-12 relative">
              {/* Central vertical line for the timeline effect */}
              <div className="absolute top-2 bottom-0 left-[15px] md:left-[23px] w-[1px] bg-white/[0.05] z-0" />
              
              {feedEvents.map((event) => (
                <div key={event.id} className="relative z-10 flex gap-6 md:gap-8 group">
                   
                   {/* Timestamp / Node */}
                   <div className="flex flex-col items-center mt-1 shrink-0">
                     <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/10 bg-[#09090B] flex items-center justify-center text-neutral-500 group-hover:border-white/30 group-hover:text-white transition-colors duration-300">
                       {event.icon}
                     </div>
                   </div>

                   {/* Content */}
                   <div className="pb-6 w-full">
                     <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-[10px] font-mono text-neutral-500">{event.time}</span>
                        <span className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 border border-white/10 text-neutral-400 bg-white/[0.02]">
                          {event.type}
                        </span>
                     </div>
                     
                     <h3 className="text-xl md:text-2xl font-serif font-semibold text-neutral-200 mb-3 group-hover:text-white transition-colors">
                       {event.title}
                     </h3>
                     
                     <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
                       {event.content}
                     </p>
                     
                     {/* Action area (optional) */}
                     <div className="mt-4 pt-4 border-t border-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="text-xs font-mono uppercase tracking-widest text-[var(--lt-orange)] hover:text-[var(--lt-orange-hover)] flex items-center gap-2">
                           Investigar <span className="text-[10px]">→</span>
                        </button>
                     </div>
                   </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Sidebar: Status Bars (Desktop) */}
        <aside className="hidden lg:block w-[380px] shrink-0 p-12 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar">
          <StatusSidebar />
        </aside>

      </main>
    </div>
  );
}
