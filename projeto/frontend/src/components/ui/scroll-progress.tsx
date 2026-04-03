"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[200]">
      <div
        className="h-full bg-gradient-to-r from-orange-600 via-orange-400 to-amber-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      {/* Glow tip */}
      <div
        className="absolute top-0 h-[4px] w-[60px] bg-gradient-to-r from-transparent to-amber-300 blur-sm transition-[left] duration-150 ease-out"
        style={{ left: `calc(${progress}% - 60px)` }}
      />
    </div>
  );
}
