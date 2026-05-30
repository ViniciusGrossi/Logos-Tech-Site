"use client";

import { useEffect, useRef, useState } from "react";
import { SectionIgniteContext } from "./section-ignite-context";

interface GraphSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a content section. Registers it for the SiteGraphCanvas (via
 * `data-graph-section`), acts as a Lenis snap target (`.snap-section`), and
 * ignites — toggling `data-ignited` + context — the moment its top lands in the
 * upper half of the viewport (where the snap settles). Ignition is sticky.
 */
export function GraphSection({ id, children, className = "" }: GraphSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ignited, setIgnited] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: ignite immediately, skip observation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute("data-ignited", "true");
      setIgnited(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-ignited", "true");
          setIgnited(true);
          observer.unobserve(entry.target);
        }
      },
      // Trigger line at the viewport's vertical middle — fires as the snap lands.
      { threshold: 0, rootMargin: "0px 0px -50% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionIgniteContext.Provider value={ignited}>
      <div ref={ref} data-graph-section={id} className={`snap-section ${className}`}>
        {children}
      </div>
    </SectionIgniteContext.Provider>
  );
}
