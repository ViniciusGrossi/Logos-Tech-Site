"use client";

import { useEffect, useRef } from "react";
import { useSectionIgnite } from "@/components/graph/section-ignite-context";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ignite = useSectionIgnite(); // boolean inside a GraphSection, else null

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No GraphSection ancestor → original standalone behavior.
    if (ignite === null) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => entry.target.classList.add("animate"), delay);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    // Inside a GraphSection: fire all reveals together when the section ignites.
    // Compress the passed delay (×0.25) so a per-item stagger becomes a quick
    // "switch on" cascade rather than a gradual reveal.
    if (ignite) {
      const id = window.setTimeout(() => el.classList.add("animate"), delay * 0.25);
      return () => window.clearTimeout(id);
    }
  }, [ignite, delay]);

  return (
    <div ref={ref} className={`animate-on-scroll ${className}`}>
      {children}
    </div>
  );
}
