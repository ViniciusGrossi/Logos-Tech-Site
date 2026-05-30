"use client";

import { createContext, useContext } from "react";

/**
 * Per-section ignite state. A GraphSection provides `true` once the section
 * crosses the landing threshold; descendants (e.g. ScrollReveal) consume it to
 * fire their reveal all at once — the "switch on" effect.
 *
 * Default `null` means "no GraphSection ancestor" — consumers should fall back
 * to their own behavior in that case.
 */
export const SectionIgniteContext = createContext<boolean | null>(null);

export function useSectionIgnite(): boolean | null {
  return useContext(SectionIgniteContext);
}
