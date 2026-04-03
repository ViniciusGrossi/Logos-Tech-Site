"use client";

import { MessageSquare, ArrowRight, Mail } from "lucide-react";
import { WHATSAPP_DEFAULT_URL } from "@/lib/whatsapp";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { GradientText } from "@/components/ui/gradient-text";

export function Contato() {
  const handleWhatsAppClick = async () => {
    try {
      const formData = new FormData();
      formData.set("source", "site");
      formData.set("section", "contato");
      formData.set(
        "device",
        typeof window !== "undefined" && window.innerWidth < 768
          ? "mobile"
          : "desktop"
      );
      formData.set("utm_source", "site");
      formData.set("utm_medium", "cta_final");
      formData.set("utm_campaign", "institucional");

      const { logWhatsAppLead } = await import("@/app/actions/log-lead");
      logWhatsAppLead(formData);
    } catch {
      // Tracking failure must never block user
    }
  };

  return (
    <section id="contato" className="py-32 px-6 lg:px-12 relative z-20">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(249,115,22,0.06) 0%, transparent 70%)",
          animation: "gradient-shift 10s ease infinite",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Radial glow behind CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative">
        <ScrollReveal>
          <span className="text-xs font-mono text-[var(--lt-orange)] uppercase tracking-widest block mb-8">
            Contato
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white tracking-tight mb-6">
            Tem um problema para{" "}
            <GradientText shimmer>resolver</GradientText>?
          </h2>

          <p className="text-base md:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed font-light mb-12">
            Descreva seu desafio — nosso Agente de IA está treinado para analisar sua operação e entregar um diagnóstico de viabilidade técnica imediato.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex flex-col items-center gap-6">
            {/* Main CTA */}
            <a
              href={WHATSAPP_DEFAULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="group isolate inline-flex cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_10px_rgba(249,115,22,0.45)] bg-gradient-to-b from-white/20 via-white/0 to-white/5 rounded-full relative shadow-[0_0_25px_rgba(249,115,22,0.3)]"
            >
              {/* Spinning border */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div
                  className="absolute inset-[-100%] w-[300%] h-[300%]"
                  style={{
                    animation: "spin-slow 3s linear infinite",
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, transparent 80deg, rgba(253,186,116,0.8) 180deg, transparent 280deg, transparent 360deg)",
                  }}
                />
              </div>
              <div className="absolute inset-[1px] rounded-full backdrop-blur-xl z-0 bg-neutral-950/90" />
              <div className="z-10 flex gap-3 overflow-hidden text-sm font-medium text-white rounded-full py-4 px-8 relative items-center">
                <div className="relative z-20 w-8 h-8 rounded-full bg-gradient-to-b from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 ring-1 ring-white/20 group-hover:scale-110 transition-transform">
                  <MessageSquare
                    className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300"
                  />
                </div>
                <span className="whitespace-nowrap relative z-10 font-medium tracking-tight text-base text-white/95 group-hover:text-white transition-colors">
                  Solicitar Diagnóstico Gratuito
                </span>
                <span className="inline-flex items-center justify-center z-10 bg-white/10 w-6 h-6 rounded-full relative group-hover:translate-x-1 group-hover:bg-white/20 transition-all duration-300">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </a>

            {/* Pulsing indicators */}
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" style={{ animation: "pulse-ring 2s ease-in-out infinite" }} />
              <span className="text-xs text-neutral-500">
                Respondemos em até 2h em horário comercial
              </span>
            </div>

            {/* Secondary email */}
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <Mail className="w-4 h-4" />
              <span>
                Ou envie um e-mail:{" "}
                <a
                  href="mailto:contato@logostech.com.br"
                  className="text-neutral-400 hover:text-[var(--lt-orange)] transition-colors underline underline-offset-4"
                >
                  contato@logostech.com.br
                </a>
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
