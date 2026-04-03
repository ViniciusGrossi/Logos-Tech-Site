"use client";

import { useState, useEffect } from "react";
import { Menu, X, MessageSquare } from "lucide-react";
import { WHATSAPP_DEFAULT_URL } from "@/lib/whatsapp";

const NAV_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#processo", label: "Processo" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] px-6 py-4 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[90rem] mx-auto flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="text-white hover:text-[var(--lt-orange)] transition-colors flex items-center gap-3 group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-sm flex items-center justify-center group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-all duration-300">
            <span className="text-black font-bold text-sm">L</span>
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Logos Tech
          </span>
        </a>

        {/* Desktop links with active indicator */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-xs font-mono uppercase tracking-widest transition-colors duration-300 ${
                  isActive
                    ? "text-[var(--lt-orange)]"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                {link.label}
                {/* Active dot */}
                <span
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--lt-orange)] transition-all duration-300 ${
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Desktop CTA with hover glow */}
        <a
          href={WHATSAPP_DEFAULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 button-custom text-sm group"
        >
          <span className="inner">
            <MessageSquare className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            Solicitar Diagnóstico
          </span>
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2 relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          <div className="relative w-6 h-6">
            <Menu
              className={`w-6 h-6 absolute transition-all duration-300 ${
                isOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              className={`w-6 h-6 absolute transition-all duration-300 ${
                isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu with staggered animation */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 py-6 px-6 transition-all duration-500 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="space-y-4">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-base text-neutral-400 hover:text-white transition-all duration-300 py-4 px-2 border-b border-white/5 active:bg-white/5"
              style={{
                transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateX(0)" : "translateX(-10px)",
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href={WHATSAPP_DEFAULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center button-custom mt-4"
          onClick={() => setIsOpen(false)}
        >
          <span className="inner">
            <MessageSquare className="w-4 h-4" />
            Solicitar Diagnóstico
          </span>
        </a>
      </div>
    </nav>
  );
}
