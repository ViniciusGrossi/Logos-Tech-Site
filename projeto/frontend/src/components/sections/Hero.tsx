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
    words.forEach((word) => {
      const el = word as HTMLElement;
      const delay = parseInt(el.dataset.delay || "0", 10);
      setTimeout(() => {
        el.style.animation = "word-appear 0.8s ease-out forwards";
      }, delay);
    });
  }, []);

  // Click ripple effect
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement("div");
      Object.assign(ripple.style, {
        position: "fixed",
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        width: "4px",
        height: "4px",
        background: "rgba(249,115,22,0.6)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: "9999",
        animation: "pulse-glow 1s ease-out forwards",
      });
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // HUD Parallax effect
  useEffect(() => {
    const container = hudContainerRef.current;
    if (!container) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      targetX = x * 15; 
      targetY = y * 15;
    };

    const animate = () => {
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

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });
    rafId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="hero" className="pt-24 relative z-10">
      <main
        ref={wordsRef}
        className="grid grid-cols-1 lg:grid-cols-12 px-6 lg:px-12 my-12 lg:my-20 gap-12 relative min-h-[70vh] max-w-[90rem] mx-auto items-center"
      >
        {/* Left: Typographic Hero */}
        <div className="lg:col-span-7 flex flex-col justify-center z-20 relative pt-10 lg:pt-0">
          {/* Tagline */}
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-xs font-mono font-light uppercase tracking-[0.2em] text-neutral-400">
              <span className="word inline-block opacity-0 mr-[0.3em]" data-delay="0">
                Desenvolvimento
              </span>
              <span className="word inline-block opacity-0 mr-[0.3em]" data-delay="200">
                sob
              </span>
              <span className="word inline-block opacity-0 mr-[0.3em]" data-delay="400">
                medida
              </span>
            </h2>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] leading-[0.9] text-white font-medium tracking-tighter mb-8 text-center lg:text-left">
            <span className="word inline-block opacity-0 mr-[0.3em]" data-delay="600">
              <GradientText shimmer>Sistemas</GradientText>
            </span>
            <span className="word inline-block opacity-0 mr-[0.3em]" data-delay="800">
              com
            </span>
            <span className="word inline-block opacity-0 mr-[0.3em]" data-delay="1000">
              <GradientText shimmer>IA</GradientText>
            </span>
            <br className="hidden lg:block" />
            <span className="word inline-block opacity-0 mr-[0.3em] text-neutral-600" data-delay="1200">
              integrada,
            </span>
            <span className="word inline-block opacity-0 mr-[0.3em]" data-delay="1400">
              feitos
            </span>
            <br className="hidden lg:block" />
            <span className="word inline-block opacity-0 mr-[0.3em]" data-delay="1600">
              para
            </span>
            <span className="word inline-block opacity-0 mr-[0.3em]" data-delay="1800">
              o
            </span>
            <span className="word inline-block opacity-0 mr-[0.3em]" data-delay="2000">
              seu
            </span>
            <span className="word inline-block opacity-0" data-delay="2200">
              <GradientText shimmer>negócio.</GradientText>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base md:text-lg text-neutral-400 max-w-xl leading-relaxed mb-12 font-light text-center lg:text-left animate-on-scroll"
            style={{ animation: "fadeSlideIn 0.8s ease-out 2.6s both" }}
          >
            Não sabe se a IA serve para você? Nosso <span className="text-white font-medium">Agente Especialista</span> está pronto para analisar seu negócio e entregar um diagnóstico completo, do briefing ao deploy.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4 animate-on-scroll"
            style={{ animation: "fadeSlideIn 0.8s ease-out 2.8s both" }}
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
                Ver portfólio
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
                <Image src="/logo-1-transparente.png" alt="Logos Tech" width={56} height={56} className="object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] relative z-10" />
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

          {/* Left Card (Automation) - Cyan */}
          <div className="absolute top-[5%] left-[5%] md:left-[0%] lg:-left-[10%] w-40 md:w-48 aspect-square bg-black/80 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)] hud-card z-20 transform -rotate-6 rotate-y-[2deg] overflow-hidden rounded-sm backdrop-blur-sm hud-glitch-hover group/cyan">
            <div className="hud-scanline absolute inset-0" style={{animationDelay: '-1.5s'}} />
            <div className="w-full h-full bg-grid-cyan flex flex-col p-4 relative z-10">
              <span className="text-[9px] font-mono text-cyan-400 opacity-80 mb-auto">AUT.WORKFLOWS</span>
              
              <div className="flex justify-center items-center gap-2 md:gap-3 my-auto">
                <div className="p-2 bg-cyan-950/50 border border-cyan-500/40 rounded flex items-center justify-center group-hover/cyan:bg-cyan-900/50 transition-colors">
                  <Network className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                </div>
                <div className="h-[1px] w-4 bg-cyan-500/50 relative">
                  <div className="absolute top-0 left-0 h-full w-2 bg-cyan-400 animate-pulse-slow" />
                </div>
                <div className="p-2 bg-cyan-950/50 border border-cyan-500/40 rounded flex items-center justify-center group-hover/cyan:bg-cyan-900/50 transition-colors">
                  <span className="text-cyan-400 font-mono text-[10px] md:text-xs font-bold">n8n</span>
                </div>
              </div>

              <div className="flex justify-between items-end mt-auto">
                <span className="text-[9px] md:text-[10px] font-mono text-cyan-500 font-bold group-hover/cyan:text-cyan-300 transition-colors">
                  [SYNCING]
                </span>
                <span className="text-[8px] font-mono text-cyan-400 border border-cyan-500/30 px-1">PYTHON</span>
              </div>
            </div>
          </div>

          {/* Right Card (Data/AI) - Emerald */}
          <div className="absolute bottom-[2%] right-[5%] md:right-[0%] lg:-right-[5%] w-44 md:w-52 aspect-[4/3] bg-black/80 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)] hud-card z-10 transform rotate-3 rotate-y-[-2deg] overflow-hidden rounded-sm backdrop-blur-sm hud-glitch-hover group/em">
            <div className="hud-scanline absolute inset-0" style={{animationDelay: '-2s'}} />
            <div className="w-full h-full bg-grid-emerald flex flex-col p-4 relative z-10">
              <div className="flex justify-between mb-auto">
                <span className="text-[9px] font-mono text-emerald-400 opacity-80">DT.INTELLIGENCE</span>
                <div className="flex gap-1 items-end">
                  <div className="w-1 h-2 bg-emerald-500/30 animate-pulse" />
                  <div className="w-1 h-3 bg-emerald-500/60 animate-pulse" style={{animationDelay: '100ms'}} />
                  <div className="w-1 h-4 bg-emerald-500 animate-pulse" style={{animationDelay: '200ms'}} />
                </div>
              </div>
              
              <div className="text-center my-auto transform group-hover/em:scale-105 transition-transform duration-300">
                <div className="text-2xl md:text-3xl font-mono text-emerald-400 font-bold tracking-tighter text-emerald-glow">
                  3.5x
                </div>
                <div className="text-[8px] font-mono text-emerald-500/70 mt-1 uppercase tracking-widest">
                  ROI Tracker
                </div>
              </div>

              <div className="flex items-center gap-2 mt-auto pt-2 border-t border-emerald-500/20">
                <Bot className="w-3 h-3 text-emerald-500" />
                <span className="text-[7.5px] font-mono text-emerald-400">Claude · OpenAI</span>
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
