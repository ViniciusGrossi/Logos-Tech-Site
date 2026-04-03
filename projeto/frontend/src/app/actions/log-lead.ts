"use server";

import { z } from "zod";

const LeadSchema = z.object({
  source: z.string().default("site"),
  section: z.string().default("unknown"),
  device: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

export async function logWhatsAppLead(formData: FormData) {
  const raw = {
    source: formData.get("source") as string,
    section: formData.get("section") as string,
    device: formData.get("device") as string,
    utm_source: formData.get("utm_source") as string,
    utm_medium: formData.get("utm_medium") as string,
    utm_campaign: formData.get("utm_campaign") as string,
  };

  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) return;

  try {
    const { supabase } = await import("@/lib/supabase");
    await supabase.from("whatsapp_leads").insert({
      source: parsed.data.source,
      section_clicked: parsed.data.section,
      device_type: parsed.data.device,
      utm_source: parsed.data.utm_source,
      utm_medium: parsed.data.utm_medium,
      utm_campaign: parsed.data.utm_campaign,
    });
  } catch {
    // Fail silently — lead tracking must not block UX
  }
}
