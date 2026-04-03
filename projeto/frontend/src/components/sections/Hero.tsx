"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import { WHATSAPP_DEFAULT_URL } from "@/lib/whatsapp";
import { GradientText } from "@/components/ui/gradient-text";

export function Hero() {
  const wordsRef = useRef<HTMLDivElement>(null);

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

        {/* Right: Floating Cards with enhanced depth */}
        <div
          className="lg:col-span-5 relative h-[380px] md:h-[450px] lg:h-auto flex items-center justify-center animate-on-scroll order-first lg:order-last"
          style={{
            animation: "fadeSlideIn 0.8s ease-out 1s both",
            perspective: "1000px",
          }}
        >
          {/* Main card */}
          <div className="relative z-10 w-56 md:w-64 aspect-[4/5] bg-neutral-900 border border-white/10 shadow-2xl floating-card transform rotate-[-2deg] electric-glow">
            <div className="w-full h-full bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/5 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-sm flex items-center justify-center shadow-lg shadow-orange-500/20">
                <span className="text-black font-bold text-3xl">L</span>
              </div>
              <span className="text-xs font-mono uppercase text-neutral-500 tracking-widest">
                Logos Tech
              </span>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-white">
                v2.0
              </span>
            </div>
          </div>

          {/* Background card 1 */}
          <div className="absolute top-[10%] left-[5%] w-32 md:w-40 aspect-square bg-neutral-900 border border-white/10 shadow-xl floating-card z-0 transform -rotate-6">
            <div className="w-full h-full bg-gradient-to-t from-orange-900/20 to-transparent" />
          </div>

          {/* Background card 2 */}
          <div className="absolute bottom-[15%] right-[5%] w-36 md:w-48 aspect-square bg-neutral-900 border border-white/10 shadow-xl floating-card z-20 transform rotate-3">
            <div className="w-full h-full bg-gradient-to-bl from-amber-900/20 to-transparent" />
          </div>

          {/* New: Small floating accent */}
          <div
            className="absolute top-[5%] right-[20%] w-4 h-4 bg-orange-500/30 rounded-full z-30"
            style={{ animation: "float 6s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-[10%] left-[15%] w-2 h-2 bg-amber-400/40 rounded-full z-30"
            style={{ animation: "float 8s ease-in-out infinite 1s" }}
          />
        </div>
      </main>

      {/* Enhanced section separator */}
      <div className="section-divider" />
    </section>
  );
}
