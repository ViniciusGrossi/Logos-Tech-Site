import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#050505] text-[#E6E1D7] overflow-x-hidden selection:bg-orange-500/30">
        {children}
      </body>
    </html>
  );
}
