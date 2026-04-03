const WHATSAPP_NUMBER = "5500000000000"; // TODO: replace with real number

interface WhatsAppOptions {
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export function buildWhatsAppUrl(options: WhatsAppOptions = {}): string {
  const message = encodeURIComponent(
    "Olá! Gostaria de um diagnóstico gratuito para entender como a IA pode ajudar meu negócio."
  );

  const params = new URLSearchParams();
  if (options.utm_source) params.set("utm_source", options.utm_source);
  if (options.utm_medium) params.set("utm_medium", options.utm_medium);
  if (options.utm_campaign) params.set("utm_campaign", options.utm_campaign);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export const WHATSAPP_DEFAULT_URL = buildWhatsAppUrl({
  source: "site",
  utm_source: "site",
  utm_medium: "cta",
  utm_campaign: "institucional",
});
