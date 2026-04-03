"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { Badge } from "@/components/ui/badge";
import { projects, PortfolioProject } from "@/data/portfolio";
import { ExternalLink, Play, X, ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const handleOpenWhatsApp = (project: PortfolioProject) => {
    const text = `Olá! Vi o projeto ${project.title} no site da Logos Tech e gostaria de um diagnóstico gratuito para minha empresa sobre soluções similares.`;
    window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section
      id="portfolio"
      className="py-24 px-6 lg:px-12 max-w-[90rem] mx-auto relative z-20"
    >
      <ScrollReveal>
        <div className="mb-16">
          <span className="text-xs font-mono text-[var(--lt-orange)] uppercase tracking-widest block mb-4">
            Portfólio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white tracking-tight mb-4">
            Projetos
          </h2>
          <p className="text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed font-light">
            Sistemas desenvolvidos e soluções aplicadas a problemas reais de
            negócio.
          </p>
        </div>
      </ScrollReveal>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 150}>
              <div 
                className="cursor-pointer h-full"
                onClick={() => setSelectedProject(project)}
              >
                <TiltCard intensity={8}>
                  <div className="group border border-white/5 bg-[var(--lt-surface)] hover:border-[var(--lt-border-hover)] transition-all duration-500 flex flex-col h-full overflow-hidden relative">
                    {/* Visual Media Container */}
                    <div className="aspect-video bg-neutral-900 relative overflow-hidden">
                      {/* Actual Project Image */}
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />

                      {/* Animated scan line */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div
                          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--lt-orange)]/40 to-transparent opacity-0 group-hover:opacity-100"
                          style={{
                            animation: "beam-drop 3s cubic-bezier(0.4,0,0.2,1) infinite",
                          }}
                        />
                      </div>

                      {/* Interaction Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                          {project.videoUrl ? (
                            <div className="w-12 h-12 rounded-full bg-[var(--lt-orange)] flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                              <Play className="w-5 h-5 text-black fill-current ml-1" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                              <ExternalLink className="w-5 h-5 text-white" />
                            </div>
                          )}
                          <span className="text-[10px] text-white font-mono uppercase tracking-[0.2em] font-bold">
                            {project.videoUrl ? "Ver Demonstração" : "Ver Case Study"}
                          </span>
                        </div>
                      </div>

                      {/* Sector Badge Floating */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="px-2 py-0.5 rounded-sm bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-[var(--lt-orange)] shadow-[0_0_5px_var(--lt-orange)]" />
                          <span className="text-[9px] font-mono text-neutral-300 uppercase tracking-wider">{project.sector}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1 relative">
                      <h3 className="text-lg text-white font-medium mb-3 group-hover:text-[var(--lt-orange)] transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-1">
                        {project.description}
                      </p>

                      {/* Tags chips with staggered hover */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tech, j) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-[10px] text-neutral-500 border-white/10 bg-white/5 hover:text-[var(--lt-orange)] hover:border-[var(--lt-orange)]/20 hover:bg-[var(--lt-orange)]/5 transition-all duration-300 cursor-default"
                            style={{ transitionDelay: `${j * 30}ms` }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Plan A Immersive Case Study Modal */}
        {selectedProject && (
          <DialogContent className="w-[95vw] sm:max-w-4xl bg-[#0F0F0F] border-white/10 p-0 overflow-hidden max-h-[92vh] flex flex-col rounded-none md:rounded-sm">
            <div className="relative overflow-y-auto custom-scrollbar flex-1">
              {/* Header with Visual */}
              <div className="relative h-56 md:h-80 w-full overflow-hidden shrink-0">
                <Image 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 95vw, 850px"
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/60 to-transparent" />
                
                <div className="absolute bottom-6 md:bottom-10 left-6 md:left-12 right-6 md:right-12">
                   <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[var(--lt-orange)]">
                      <span className="px-1.5 py-0.5 border border-[var(--lt-orange)]/30 rounded-sm bg-[var(--lt-orange)]/5">{selectedProject.sector}</span>
                      <span className="hidden md:inline w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-neutral-400">{selectedProject.category}</span>
                   </div>
                   <h2 className="text-2xl md:text-5xl text-white font-medium tracking-tight">
                     {selectedProject.title}
                   </h2>
                </div>

                <DialogClose className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[var(--lt-orange)]/50 transition-all z-20">
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </DialogClose>
              </div>

              <div className="p-6 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-12">
                  {/* Left Column: Story */}
                  <div className="space-y-8 md:space-y-10">
                    <section>
                      <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                        O Desafio
                      </h4>
                      <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-light">
                        {selectedProject.challenge}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--lt-orange)] mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--lt-orange)] shadow-[0_0_8px_var(--lt-orange)]" />
                        A Solução Logos Tech
                      </h4>
                      <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-light">
                        {selectedProject.solution}
                      </p>
                    </section>
                  </div>

                  {/* Right Column: KPIs & Stack */}
                  <div className="space-y-8">
                    <div className="bg-white/[0.03] border border-white/5 p-6 md:p-8 rounded-sm relative overflow-hidden group/box">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--lt-orange)]/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
                      
                      <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white mb-6 border-l-2 border-[var(--lt-orange)] pl-4">
                        Impacto & Resultados
                      </h4>

                      <div className="space-y-5 mb-8">
                        {selectedProject.results?.map((res, i) => (
                          <div key={i} className="flex items-start gap-3 group/item">
                            <CheckCircle2 className="w-4 h-4 text-[var(--lt-orange)] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                            <span className="text-[13px] md:text-sm text-neutral-400 group-hover/item:text-neutral-200 transition-colors leading-relaxed">{res}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-white/5">
                        <h4 className="text-[9px] font-mono uppercase tracking-widest text-neutral-600 mb-4">
                          Arquitetura Técnica
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-black/40 border-white/5 text-[9px] md:text-[10px] py-0 text-neutral-500 font-mono">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Additional conversion info */}
                    <div className="hidden lg:block p-6 border border-[var(--lt-orange)]/10 rounded-sm bg-[var(--lt-orange)]/[0.02]">
                       <p className="text-[11px] text-neutral-500 leading-relaxed italic">
                         Este projeto utilizou nosso ecossistema de **Modular AI Agents** para garantir escalabilidade imediata após o deploy.
                       </p>
                    </div>
                  </div>
                </div>

                {/* Conversion Footer in Modal */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/10 mt-4 pb-2">
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-neutral-300 mb-1 font-medium">
                      Interessado em resultados similares?
                    </p>
                    <p className="text-xs text-neutral-600 font-mono">
                       {selectedProject.sector} • Diagnóstico sob demanda
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    {selectedProject.link && selectedProject.link.startsWith('http') && (
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto bg-transparent border-white/10 text-white hover:bg-white/5 hover:border-white/30 transition-all text-xs h-11 px-6 rounded-none backdrop-blur-sm"
                        onClick={() => window.open(selectedProject.link, '_blank')}
                      >
                         Live Demo <ArrowRight className="ml-2 w-4 h-4 opacity-70" />
                      </Button>
                    )}
                    
                    <Button 
                      className="w-full sm:w-auto bg-[var(--lt-orange)] text-black hover:bg-[var(--lt-orange-hover)] shadow-[0_0_20px_rgba(249,115,22,0.2)] group h-11 px-8 rounded-none font-semibold uppercase tracking-wider text-xs"
                      onClick={() => handleOpenWhatsApp(selectedProject)}
                    >
                      Solicitar Diagnóstico <MessageSquare className="ml-2 w-4 h-4 fill-current transition-transform group-hover:scale-110" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Section divider */}
      <div className="section-divider mt-24" />
    </section>
  );
}
