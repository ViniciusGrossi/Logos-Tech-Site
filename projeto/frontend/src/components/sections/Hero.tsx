"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, MessageSquare, Network, Cpu, Bot } from "lucide-react";
import Image from "next/image";
import { WHATSAPP_DEFAULT_URL } from "@/lib/whatsapp";
import { GradientText } from "@/components/ui/gradient-text";

export function Hero() {
  const wordsRef = useRef<HTMLDivElement>(null);
  const hudContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wordsRef.current) return;
    const words = wordsRef.current.querySelectorAll(".word");
    words.forEach((word, index) => {
      const el = word as HTMLElement;
      // Compress stagger: 70ms per word, full reveal in ~900ms
      const delay = index * 70;
      setTimeout(() => {
        el.style.animation = "word-appear 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards";
      }, delay);
    });
  }, []);


  // HUD Parallax effect — pauses when off-screen (performance win)
  useEffect(() => {
    const container = hudContainerRef.current;
    if (!container) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isVisible = true;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      targetX = x * 15; 
      targetY = y * 15;
    };

    const animate = () => {
      if (!isVisible) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      const cards = container.querySelectorAll('.hud-card');
      cards.forEach((card, index) => {
        const el = card as HTMLElement;
        const depth = index === 0 ? 1 : index === 1 ? 0.6 : 0.4;
        
        const baseRotateX = index === 0 ? -2 : index === 1 ? -6 : 3;
        const baseRotateY = index === 0 ? 0 : index === 1 ? 2 : -2;
        
        el.style.transform = `rotateY(${baseRotateY + currentX * depth}deg) rotateX(${baseRotateX - currentY * depth}deg) translateZ(${depth * 30}px)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    // Pause RAF when hero scrolls off screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(container);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });
    rafId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="hero" className="pt-24 relative z-10 overflow-hidden">
      <main
        ref={wordsRef}
        className="grid grid-cols-1 lg:grid-cols-12 px-6 lg:px-12 my-12 lg:my-20 gap-12 relative min-h-[70vh] max-w-[90rem] mx-auto items-center"
      >
        {/* Left: Typographic Hero */}
        <div className="lg:col-span-7 flex flex-col justify-center z-20 relative pt-10 lg:pt-0">
          {/* Tagline */}
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-xs font-mono font-light uppercase tracking-[0.2em] text-neutral-500">
              <span className="word inline-block opacity-0 mr-[0.3em]">
                Desenvolvimento
              </span>
              <span className="word inline-block opacity-0 mr-[0.3em]">
                sob
              </span>
              <span className="word inline-block opacity-0 mr-[0.3em]">
                medida
              </span>
            </h2>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] leading-[0.92] text-white font-serif font-bold tracking-[-0.03em] mb-8 text-center lg:text-left">
            <span className="word inline-block opacity-0 mr-[0.3em]">
              Seu
            </span>
            <span className="word inline-block opacity-0 mr-[0.3em]">
              negócio
            </span>
            <span className="word inline-block opacity-0 mr-[0.3em]">
              perde
            </span>
            <br className="hidden lg:block" />
            <span className="word inline-block opacity-0 mr-[0.3em]">
              dinheiro
            </span>
            <span className="word inline-block opacity-0 mr-[0.3em]">
              em
            </span>
            <span className="word inline-block opacity-0 mr-[0.3em]">
              <GradientText shimmer>trabalho</GradientText>
            </span>
            <br className="hidden lg:block" />
            <span className="word inline-block opacity-0 mr-[0.3em]">
              <GradientText shimmer>manual.</GradientText>
            </span>
            <span className="word inline-block opacity-0">
              A gente resolve.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base md:text-lg text-neutral-400 max-w-xl leading-relaxed mb-12 font-light text-center lg:text-left font-sans"
            style={{ animation: "fadeSlideIn 0.65s cubic-bezier(0.16,1,0.3,1) 1.1s both" }}
          >
            Você descreve o problema. A gente entrega o sistema que resolve — em até 6 semanas. Comece com um <span className="text-white font-medium">diagnóstico gratuito</span>.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
            style={{ animation: "fadeSlideIn 0.65s cubic-bezier(0.16,1,0.3,1) 1.3s both" }}
          >
            {/* Primary: Ver portfólio — Corner Accent */}
            <a
              href="#portfolio"
              className="btn-wrapper group relative inline-flex justify-center items-center p-4 border border-neutral-800 hover:border-orange-500 transition-colors duration-300"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(249,115,22,0.08) 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                }}
              />
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
              <span className="btn flex items-center gap-3 bg-transparent text-white font-medium uppercase tracking-wider text-sm relative z-10">
                Ver resultados
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            {/* Secondary: WhatsApp — Particle Button with pulse ring */}
            <div className="relative">
              {/* Pulse ring behind button */}
              <div
                className="absolute inset-0 rounded-full border border-orange-500/30"
                style={{ animation: "pulse-ring 2s ease-in-out infinite" }}
              />
              <a
                href={WHATSAPP_DEFAULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button-custom relative"
              >
                <div className="points_wrapper">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <i key={i} className="point" />
                  ))}
                </div>
                <span className="inner">
                  <MessageSquare className="w-4 h-4" />
                  Solicitar Diagnóstico Gratuito
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Holographic HUD */}
        <div
          ref={hudContainerRef}
          className="lg:col-span-5 relative h-[400px] md:h-[500px] lg:h-auto flex items-center justify-center animate-on-scroll order-first lg:order-last hud-container group cursor-crosshair pb-12 lg:pb-0"
          style={{
            animation: "fadeSlideIn 0.8s ease-out 1s both",
          }}
        >
          {/* HUD Target Crosshairs */}
          <div className="absolute top-10 left-10 w-4 h-4 border-t-2 border-l-2 border-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-10 right-10 w-4 h-4 border-t-2 border-r-2 border-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Central Card (IA) */}
          <div className="relative z-30 w-56 md:w-64 aspect-[4/5] bg-black/80 border border-orange-500/30 shadow-[0_0_50px_rgba(249,115,22,0.15)] hud-card transform rotate-[-2deg] hud-glitch-hover overflow-hidden rounded-sm backdrop-blur-md">
            <div className="hud-scanline absolute inset-0" />
            <div className="w-full h-full bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/5 flex flex-col items-center justify-center gap-4 relative z-10">
              <div className="absolute top-4 left-4 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500/40" />
              </div>
              <div className="absolute top-4 right-4 text-[9px] font-mono text-orange-400 opacity-70">
                SYS.AI.01
              </div>
              
              <div className="w-20 h-20 border border-orange-500/40 rounded-sm flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.3)] relative group-hover:border-orange-500 transition-colors bg-gradient-to-br from-orange-500/10 to-amber-500/20">
                <div className="absolute inset-0 bg-orange-500/10 animate-ping opacity-20" />
                <Image src="/logo-1-transparente.png" alt="Logos Tech" width={56} height={56} className="object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] relative z-10" priority />
              </div>
              
              <span className="text-[10px] font-mono font-bold text-orange-500 tracking-[0.3em] group-hover:text-white transition-colors uppercase">
                [SYSTEM_READY]
              </span>
              
              <div className="absolute bottom-6 w-full px-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-neutral-500 font-mono">CORE_NET</span>
                  <div className="flex gap-1">
                    <span className="inline-block w-6 h-1 bg-orange-500 shadow-[0_0_8px_#F97316]" />
                    <span className="inline-block w-2 h-1 bg-orange-500/50" />
                  </div>
                </div>
                <Cpu className="w-4 h-4 text-orange-500" />
              </div>
            </div>
            {/* Corner accents */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-orange-500/50 -translate-x-1 translate-y-1" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-orange-500/50 translate-x-1 -translate-y-1" />
          </div>

          {/* Left Card (Automation) - Orange dim */}
          <div className="absolute top-[5%] left-[5%] md:left-[0%] lg:-left-[10%] w-40 md:w-48 aspect-square bg-black/80 border border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.08)] hud-card z-20 transform -rotate-6 overflow-hidden rounded-sm backdrop-blur-sm hud-glitch-hover group/left">
            <div className="hud-scanline absolute inset-0" style={{animationDelay: '-1.5s'}} />
            <div className="w-full h-full bg-grid-orange flex flex-col p-4 relative z-10">
              <span className="text-[9px] font-mono text-orange-400/70 opacity-80 mb-auto">AUT.WORKFLOWS</span>

              <div className="flex justify-center items-center gap-2 md:gap-3 my-auto">
                <div className="p-2 bg-orange-950/30 border border-orange-500/30 rounded flex items-center justify-center group-hover/left:bg-orange-900/30 transition-colors">
                  <Network className="w-4 h-4 md:w-5 md:h-5 text-orange-400/70" />
                </div>
                <div className="h-[1px] w-4 bg-orange-500/40 relative">
                  <div className="absolute top-0 left-0 h-full w-2 bg-orange-400/80 animate-pulse-slow" />
                </div>
                <div className="p-2 bg-orange-950/30 border border-orange-500/30 rounded flex items-center justify-center group-hover/left:bg-orange-900/30 transition-colors">
                  <span className="text-orange-400/70 font-mono text-[10px] md:text-xs font-bold">n8n</span>
                </div>
              </div>

              <div className="flex justify-between items-end mt-auto">
                <span className="text-[9px] md:text-[10px] font-mono text-orange-500/70 font-bold group-hover/left:text-orange-400 transition-colors">
                  [SYNCING]
                </span>
                <span className="text-[8px] font-mono text-orange-400/60 border border-orange-500/20 px-1">PYTHON</span>
              </div>
            </div>
          </div>

          {/* Right Card (Data/AI) - Amber */}
          <div className="absolute bottom-[2%] right-[5%] md:right-[0%] lg:-right-[5%] w-44 md:w-52 aspect-[4/3] bg-black/80 border border-amber-500/20 shadow-[0_0_30px_rgba(251,191,36,0.08)] hud-card z-10 transform rotate-3 overflow-hidden rounded-sm backdrop-blur-sm hud-glitch-hover group/right">
            <div className="hud-scanline absolute inset-0" style={{animationDelay: '-2s'}} />
            <div className="w-full h-full bg-grid-amber flex flex-col p-4 relative z-10">
              <div className="flex justify-between mb-auto">
                <span className="text-[9px] font-mono text-amber-400/70 opacity-80">DT.INTELLIGENCE</span>
                <div className="flex gap-1 items-end">
                  <div className="w-1 h-2 bg-amber-500/30 animate-pulse" />
                  <div className="w-1 h-3 bg-amber-500/60 animate-pulse" style={{animationDelay: '100ms'}} />
                  <div className="w-1 h-4 bg-amber-400/80 animate-pulse" style={{animationDelay: '200ms'}} />
                </div>
              </div>

              <div className="text-center my-auto transform group-hover/right:scale-105 transition-transform duration-300">
                <div className="text-2xl md:text-3xl font-mono text-amber-400 font-bold tracking-[-0.04em] stat-number" style={{textShadow: '0 0 10px rgba(251,191,36,0.4)'}}>
                  3.5x
                </div>
                <div className="text-[8px] font-mono text-amber-500/60 mt-1 uppercase tracking-widest">
                  ROI Médio
                </div>
              </div>

              <div className="flex items-center gap-2 mt-auto pt-2 border-t border-amber-500/15">
                <Bot className="w-3 h-3 text-amber-500/70" />
                <span className="text-[7.5px] font-mono text-amber-400/60">Claude · OpenAI</span>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      {/* Enhanced section separator */}
      <div className="section-divider" />
    </section>
  );
}
