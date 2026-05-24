import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import { TooltipProvider } from "@/components/ui/tooltip";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Logos Tech — Sistemas com IA integrada, feitos sob medida",
  description:
    "Desenvolvemos sistemas completos com inteligência artificial, automações n8n, engenharia de dados e BI — sob demanda para PMEs e startups.",
  keywords: [
    "desenvolvimento de sistemas com IA",
    "software sob demanda para PMEs",
    "automação n8n para empresas",
    "engenharia de dados para pequenas empresas",
    "agente de IA para negócios",
  ],
  openGraph: {
    title: "Logos Tech — Sistemas com IA integrada, feitos sob medida",
    description:
      "Desenvolvemos sistemas completos com inteligência artificial, automações n8n, engenharia de dados e BI — sob demanda para PMEs e startups.",
    url: "https://logostech.com.br",
    siteName: "Logos Tech",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://logostech.com.br"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505] text-[#E6E1D7] overflow-x-hidden selection:bg-orange-500/30">
        <TooltipProvider>
          <SmoothScrolling>
            <div className="overflow-x-hidden w-full relative flex flex-col min-h-screen">
              {children}
            </div>
          </SmoothScrolling>
        </TooltipProvider>
      </body>
    </html>
  );
}
