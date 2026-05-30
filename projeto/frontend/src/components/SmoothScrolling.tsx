"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import { registerLenis, isSnapDisabled } from "@/lib/lenis-singleton";

interface SmoothScrollingProps {
  children: ReactNode;
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Register lenis after a tick so ReactLenis has time to initialize
    const regTimer = setTimeout(() => {
      const l = lenisRef.current?.lenis;
      if (l) registerLenis(l);
    }, 50);

    const noSnap =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noSnap) return () => clearTimeout(regTimer);

    let snapping = false;

    const onWheel = (e: WheelEvent) => {
      if (snapping || e.deltaY <= 0 || isSnapDisabled()) return; // only downward scroll, skip when modal open

      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Find the first .snap-section whose top is below the current viewport center
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(".snap-section")
      );
      const next = sections.find((s) => {
        const top = s.getBoundingClientRect().top + scrollY;
        return top > scrollY + vh * 0.15;
      });

      if (!next) return;
      const targetTop = next.getBoundingClientRect().top + scrollY;

      // Only trigger when the section boundary is within 80% of viewport height
      if (targetTop - scrollY > vh * 0.82) return;

      snapping = true;
      lenis.scrollTo(targetTop, {
        duration: 0.4,
        easing: (t: number) => 1 - Math.pow(1 - t, 4), // quartic drop
      });

      // Cooldown prevents re-triggering mid-animation
      setTimeout(() => { snapping = false; }, 600);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      clearTimeout(regTimer);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.15,
        duration: 0.8,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
