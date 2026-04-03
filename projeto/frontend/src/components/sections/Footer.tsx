"use client";

import { Separator } from "@/components/ui/separator";
import { ArrowUp } from "lucide-react";

const FOOTER_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#processo", label: "Processo" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 border-t border-white/5 bg-black/40 backdrop-blur-sm">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          {/* Logo + tagline */}
          <div className="space-y-6 col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-sm flex items-center justify-center group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-all duration-500">
                <span className="text-black font-bold text-lg">L</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-tight uppercase">
                  Logos Tech
                </span>
                <span className="text-[10px] font-mono text-neutral-600 tracking-[0.2em] uppercase">
                  Polis Ecosystem
                </span>
              </div>
            </div>
            <p className="text-sm text-neutral-500 max-w-xs leading-relaxed font-light">
              Sistemas inteligentes e automações de elite feitos sob medida para escalar seu lucro e operação.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-6">
            <span className="text-xs font-mono text-[var(--lt-orange)] uppercase tracking-widest block">
              Navegação
            </span>
            <div className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-500 hover:text-white transition-all duration-300 w-fit group flex items-center gap-2"
                >
                  <span className="w-0 h-[1px] bg-[var(--lt-orange)] group-hover:w-3 transition-all duration-300" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-6">
            <span className="text-xs font-mono text-[var(--lt-amber)] uppercase tracking-widest block">
              Conectar
            </span>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/logostech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com/company/logostech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white transition-colors text-sm"
              >
                LinkedIn
              </a>
              <div className="pt-4 space-y-2">
                <span className="text-[10px] font-mono text-neutral-700 uppercase tracking-widest block">
                  Presença
                </span>
                <span className="text-xs text-neutral-500">Global / Remote</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mt-16 mb-12 bg-white/5" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] text-neutral-600 font-mono tracking-wider text-center md:text-left">
              © {new Date().getFullYear()} LOGOS TECH LANDING_V1.0
            </p>
            <p className="text-[9px] text-neutral-800 font-mono uppercase tracking-[0.3em] text-center md:text-left">
              Codificado para performance extrema
            </p>
          </div>

          {/* Back to top with hover animation */}
          <button
            onClick={scrollToTop}
            className="group w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] bg-black/20"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-5 h-5 text-white group-hover:text-black group-hover:translate-y-[-2px] transition-all duration-500 ease-out" />
          </button>
        </div>
      </div>
    </footer>
  );
}
