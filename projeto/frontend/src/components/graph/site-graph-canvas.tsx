"use client";

import { useEffect, useRef } from "react";

/* ---------- deterministic PRNG (seeded per section id) ---------- */
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type NodeType = "source" | "agent" | "output";

interface GNode {
  xFrac: number; // 0-1 of viewport width
  yFrac: number; // 0-1 within the section band
  type: NodeType;
}
interface GEdge {
  from: number;
  to: number;
  seed: number; // packet phase offset
}
interface Section {
  id: string;
  el: HTMLElement;
  top: number; // document-space px
  height: number;
  nodes: GNode[];
  edges: GEdge[];
  entry: number;
  exit: number;
  t0: number | null; // ms timestamp when ignition began
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const ORANGE = "249, 115, 22";
const AMBER = "251, 191, 36";

export function SiteGraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setSize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let sections: Section[] = [];

    /* ---------- build node graph for one section ---------- */
    const buildSection = (el: HTMLElement): Section => {
      const id = el.dataset.graphSection || "s";
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const height = rect.height;

      const rng = mulberry32(hashStr(id));
      const count = clamp(Math.round(height / 160), 6, 11);

      // Zone-based placement: divide viewport into 3 equal columns and spread
      // nodes evenly across them — prevents clustering on one side.
      const zones = [
        { xMin: 0.04, xMax: 0.30 },  // left
        { xMin: 0.36, xMax: 0.64 },  // centre
        { xMin: 0.70, xMax: 0.96 },  // right
      ];
      const nodes: GNode[] = [];
      for (let i = 0; i < count; i++) {
        const zone = zones[i % 3];
        const xFrac = zone.xMin + rng() * (zone.xMax - zone.xMin);
        const yFrac = clamp((i + 0.5) / count + (rng() - 0.5) * 0.22, 0.04, 0.96);
        nodes.push({ xFrac, yFrac, type: "source" });
      }

      // agent = node nearest vertical center; entry = topmost; exit = bottommost
      let agent = 0, entry = 0, exit = 0;
      nodes.forEach((n, i) => {
        if (Math.abs(n.yFrac - 0.5) < Math.abs(nodes[agent].yFrac - 0.5)) agent = i;
        if (n.yFrac < nodes[entry].yFrac) entry = i;
        if (n.yFrac > nodes[exit].yFrac) exit = i;
      });
      nodes[agent].type = "agent";
      const ay = nodes[agent].yFrac;
      nodes.forEach((n, i) => {
        if (i === agent) return;
        n.type = n.yFrac <= ay ? "source" : "output";
      });

      // Star topology
      const edges: GEdge[] = [];
      nodes.forEach((n, i) => {
        if (i === agent) return;
        if (n.type === "source") edges.push({ from: i, to: agent, seed: rng() });
        else edges.push({ from: agent, to: i, seed: rng() });
      });

      // Sparse mesh: cross-zone connections only (avoids local tangles), max 2 per node
      const meshDeg = new Map<number, number>();
      for (let i = 0; i < nodes.length - 1; i++) {
        if (i === agent || (meshDeg.get(i) ?? 0) >= 2) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          if (j === agent || (meshDeg.get(j) ?? 0) >= 2) continue;
          // Only connect nodes in different zones
          const zi = i % 3;
          const zj = j % 3;
          if (zi === zj) continue;
          const dx = nodes[i].xFrac - nodes[j].xFrac;
          const dy = nodes[i].yFrac - nodes[j].yFrac;
          if (Math.sqrt(dx * dx + dy * dy) < 0.55 && rng() > 0.68) {
            edges.push({ from: i, to: j, seed: rng() });
            meshDeg.set(i, (meshDeg.get(i) ?? 0) + 1);
            meshDeg.set(j, (meshDeg.get(j) ?? 0) + 1);
          }
        }
      }

      return { id, el, top, height, nodes, edges, entry, exit, t0: null };
    };

    const layout = () => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>("[data-graph-section]")
      );
      // preserve t0 across relayout (dynamic sections shift offsets as they load)
      const prev = new Map(sections.map((s) => [s.id, s.t0]));
      sections = els.map((el) => {
        const s = buildSection(el);
        s.t0 = prev.get(s.id) ?? null;
        return s;
      });
    };

    setSize();
    layout();

    // node screen coords
    const nx = (s: Section, n: GNode) => n.xFrac * vw;
    const nyWorld = (s: Section, n: GNode) => s.top + n.yFrac * s.height;

    /* ---------- drawing ---------- */
    const drawDot = (
      x: number,
      y: number,
      r: number,
      rgb: string,
      alpha: number,
      glow = 0
    ) => {
      if (glow > 0) {
        ctx.shadowColor = `rgba(${rgb}, 0.9)`;
        ctx.shadowBlur = glow;
      }
      ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      if (glow > 0) {
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
      }
    };

    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      rgb: string,
      alpha: number,
      width: number
    ) => {
      ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const render = (now: number) => {
      const scrollY = window.scrollY;
      ctx.clearRect(0, 0, vw, vh);

      const viewTop = scrollY - vh * 0.5;
      const viewBot = scrollY + vh * 1.5;

      // ----- trunk lines between consecutive sections -----
      for (let i = 0; i < sections.length - 1; i++) {
        const a = sections[i];
        const b = sections[i + 1];
        const an = a.nodes[a.exit];
        const bn = b.nodes[b.entry];
        const y1 = nyWorld(a, an) - scrollY;
        const y2 = nyWorld(b, bn) - scrollY;
        if (Math.max(y1, y2) < -vh || Math.min(y1, y2) > vh * 2) continue;

        const lowerIgnited = b.el.dataset.ignited === "true";
        const baseAlpha = 0.14;
        drawLine(an.xFrac * vw, y1, bn.xFrac * vw, y2, ORANGE, baseAlpha, 1.2);

        if (lowerIgnited) {
          if (b.t0 == null) b.t0 = now;
          const t = (now - (b.t0 ?? now)) / 1000;
          const p = reduced ? 1 : clamp(t / 0.6, 0, 1);
          const ex = lerp(an.xFrac * vw, bn.xFrac * vw, p);
          const ey = lerp(y1, y2, p);
          drawLine(an.xFrac * vw, y1, ex, ey, ORANGE, 0.35 * easeOut(p), 1.2);
        }
      }

      // ----- per-section graphs -----
      for (const s of sections) {
        if (s.top + s.height < viewTop || s.top > viewBot) continue;

        const ignited = s.el.dataset.ignited === "true";
        if (ignited && s.t0 == null) s.t0 = now;
        const t = ignited ? (now - (s.t0 ?? now)) / 1000 : 0;
        const drawP = reduced ? 1 : clamp(t / 0.5, 0, 1);
        const lit = reduced ? 1 : easeOut(clamp(t / 0.45, 0, 1));

        // edges
        for (const e of s.edges) {
          const fn = s.nodes[e.from];
          const tn = s.nodes[e.to];
          const x1 = nx(s, fn), y1 = nyWorld(s, fn) - scrollY;
          const x2 = nx(s, tn), y2 = nyWorld(s, tn) - scrollY;

          // ghost base line always visible
          drawLine(x1, y1, x2, y2, ORANGE, 0.16, 1);

          if (ignited) {
            const ex = lerp(x1, x2, drawP);
            const ey = lerp(y1, y2, drawP);
            drawLine(x1, y1, ex, ey, ORANGE, 0.55 * lit, 1.4);

            // packet once fully drawn
            if (drawP >= 1 && !reduced) {
              const pt = ((now / 1000) * 0.55 + e.seed) % 1;
              drawDot(lerp(x1, x2, pt), lerp(y1, y2, pt), 2.5, ORANGE, 0.95, 8);
            }
          }
        }

        // nodes
        for (const n of s.nodes) {
          const x = nx(s, n);
          const y = nyWorld(s, n) - scrollY;

          if (n.type === "agent") {
            const a = 0.18 + 0.62 * lit;
            drawDot(x, y, 9, ORANGE, a, ignited ? 16 * lit : 0);
            if (ignited && lit > 0.5 && !reduced) {
              const ring = Math.abs(Math.sin(now / 1000 * 1.8)) * 0.4 * lit;
              ctx.strokeStyle = `rgba(${ORANGE}, ${ring})`;
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.arc(x, y, 15 + Math.sin(now / 1000 * 1.8) * 2, 0, Math.PI * 2);
              ctx.stroke();
            }
          } else if (n.type === "output") {
            drawDot(x, y, 5, AMBER, 0.28 + 0.52 * lit);
          } else {
            drawDot(x, y, 4, ORANGE, 0.28 + 0.52 * lit);
          }
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    // ----- listeners -----
    const onResize = () => {
      setSize();
      layout();
    };
    window.addEventListener("resize", onResize);

    // dynamic sections load lazily → recompute offsets when document height changes
    const ro = new ResizeObserver(() => layout());
    ro.observe(document.body);

    // a couple of delayed relayouts to catch late-mounting dynamic sections
    const t1 = window.setTimeout(layout, 600);
    const t2 = window.setTimeout(layout, 1500);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
