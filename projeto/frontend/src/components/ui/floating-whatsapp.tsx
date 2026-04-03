"use client";

import { useEffect, useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { WHATSAPP_DEFAULT_URL } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show after 3 seconds of browsing
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Auto show tooltip after 2 more seconds
      setTimeout(() => setShowTooltip(true), 2000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      {/* Tooltip / Prompt */}
      {showTooltip && (
        <div 
          className="bg-black/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl max-w-[200px] pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-500 relative"
          style={{ animationFillMode: 'both' }}
        >
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 w-5 h-5 bg-neutral-800 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors border border-white/5"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">IA Online Agora</span>
          </div>
          <p className="text-xs text-white leading-relaxed">
            Olá! Clique aqui para iniciar seu <span className="text-[var(--lt-orange)] font-bold italic">diagnóstico gratuito</span> de IA.
          </p>
        </div>
      )}

      {/* Main Multi-layer Button */}
      <a
        href={WHATSAPP_DEFAULT_URL + "&text=Olá! Gostaria de iniciar meu diagnóstico gratuito para entender se a IA serve para o meu negócio."}
        target="_blank"
        rel="noopener noreferrer"
        className="group pointer-events-auto relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95"
      >
        {/* Animated pulse rings */}
        <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping duration-[3s]" />
        <div className="absolute inset-0 rounded-full border border-orange-500/30 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
        
        {/* Glass container */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(249,115,22,0.6)]" />
        
        {/* Icon */}
        <MessageSquare className="w-8 h-8 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
        
        {/* Glow behind */}
        <div className="absolute inset-[-4px] bg-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    </div>
  );
}
