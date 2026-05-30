"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { GraphSection } from "@/components/graph/graph-section";

// Dynamic imports for ambient layers (non-blocking)
const BackgroundGrid = dynamic(() => import("@/components/ui/background-grid").then(m => m.BackgroundGrid), { ssr: false });
const MouseFollower = dynamic(() => import("@/components/ui/mouse-follower").then(m => m.MouseFollower), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ui/scroll-progress").then(m => m.ScrollProgress), { ssr: false });
const SiteGraphCanvas = dynamic(() => import("@/components/graph/site-graph-canvas").then(m => m.SiteGraphCanvas), { ssr: false });
const NoiseOverlay = dynamic(() => import("@/components/ui/noise-overlay").then(m => m.NoiseOverlay), { ssr: false });

// Sections below the fold - dynamic to reduce initial bundle with skeletal placeholders
const Stats = dynamic(() => import("@/components/sections/Stats").then(m => m.Stats), {
  loading: () => <div className="h-48 w-full bg-neutral-900/20" />
});
const SimpleSolutions = dynamic(() => import("@/components/sections/SimpleSolutions").then(m => m.SimpleSolutions), {
  loading: () => <div className="h-96 w-full bg-neutral-900/10" />
});
const Servicos = dynamic(() => import("@/components/sections/Servicos").then(m => m.Servicos), {
  loading: () => <div className="h-[600px] w-full bg-neutral-900/10" />
});
const UseCases = dynamic(() => import("@/components/sections/UseCases").then(m => m.UseCases), {
  loading: () => <div className="h-[500px] w-full bg-neutral-900/10" />
});
const Portfolio = dynamic(() => import("@/components/sections/Portfolio").then(m => m.Portfolio), {
  loading: () => <div className="h-[800px] w-full bg-neutral-900/10" />
});
const Processo = dynamic(() => import("@/components/sections/Processo").then(m => m.Processo), {
  loading: () => <div className="h-96 w-full bg-neutral-900/10" />
});
const StackTech = dynamic(() => import("@/components/sections/StackTech").then(m => m.StackTech), {
  loading: () => <div className="h-64 w-full bg-neutral-900/10" />
});
const Contato = dynamic(() => import("@/components/sections/Contato").then(m => m.Contato), {
  loading: () => <div className="h-96 w-full bg-neutral-900/10" />
});
const Footer = dynamic(() => import("@/components/sections/Footer").then(m => m.Footer), {
  loading: () => <div className="h-32 w-full bg-neutral-900/20" />
});
const FloatingWhatsApp = dynamic(() => import("@/components/ui/floating-whatsapp").then(m => m.FloatingWhatsApp), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Ambient layers */}
      <BackgroundGrid />
      <SiteGraphCanvas />
      <MouseFollower />
      <ScrollProgress />
      <NoiseOverlay />

      {/* Content — each section is a node in the site-wide graph */}
      <Navbar />
      <GraphSection id="hero"><Hero /></GraphSection>
      <GraphSection id="stats"><Stats /></GraphSection>
      <GraphSection id="simple-solutions"><SimpleSolutions /></GraphSection>
      <GraphSection id="servicos"><Servicos /></GraphSection>
      <GraphSection id="use-cases"><UseCases /></GraphSection>
      <GraphSection id="portfolio"><Portfolio /></GraphSection>
      <GraphSection id="processo"><Processo /></GraphSection>
      <GraphSection id="stack"><StackTech /></GraphSection>
      <GraphSection id="contato"><Contato /></GraphSection>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
