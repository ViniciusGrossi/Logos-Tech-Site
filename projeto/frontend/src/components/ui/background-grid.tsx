"use client";

import { useEffect, useState } from "react";

export function BackgroundGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* CSS Grid pattern with mask */}
      <div className="grid-bg absolute inset-0 opacity-50" />

      {/* Dynamic Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 blur-[150px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-900/15 blur-[180px] rounded-full animate-pulse-slow delay-700" />
      <div className="absolute top-[40%] right-[10%] w-[30%] h-[40%] bg-orange-600/5 blur-[120px] rounded-full animate-pulse-slow delay-1000" />

      {/* SVG Grid with Moving Beams */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern-svg"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="rgba(249,115,22,0.04)"
              strokeWidth="0.5"
            />
          </pattern>

          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(249,115,22,0.4)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid-pattern-svg)" />

        {/* Vertical Beams */}
        <rect width="1" height="100%" x="20%" fill="url(#beam-grad)" className="opacity-0 lg:opacity-100">
          <animate attributeName="y" from="-100%" to="100%" dur="15s" repeatCount="indefinite" />
        </rect>
        <rect width="1" height="100%" x="60%" fill="url(#beam-grad)" className="opacity-0 lg:opacity-100">
          <animate attributeName="y" from="-100%" to="100%" dur="25s" repeatCount="indefinite" begin="5s" />
        </rect>
        <rect width="1" height="100%" x="85%" fill="url(#beam-grad)" className="opacity-0 lg:opacity-100">
          <animate attributeName="y" from="-100%" to="100%" dur="20s" repeatCount="indefinite" begin="2s" />
        </rect>

        {/* Horizontal Beams */}
        <rect width="100%" height="1" y="30%" fill="url(#beam-grad)" className="opacity-0 lg:opacity-100">
          <animate attributeName="x" from="-100%" to="100%" dur="18s" repeatCount="indefinite" begin="7s" />
        </rect>
        <rect width="100%" height="1" y="70%" fill="url(#beam-grad)" className="opacity-0 lg:opacity-100">
          <animate attributeName="x" from="-100%" to="100%" dur="22s" repeatCount="indefinite" begin="1s" />
        </rect>
      </svg>

      {/* Peripheral dark fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </div>
  );
}
