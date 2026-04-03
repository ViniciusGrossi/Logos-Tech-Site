import { Monitor, Zap, BarChart3, Sparkles } from "lucide-react";
import type { ComponentType } from "react";

export interface Service {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  examples: string[];
}

export const services: Service[] = [
  {
    icon: Monitor,
    title: "Systems",
    description:
      "Core Operacional: Desenvolvemos o sistema exato que sua empresa precisa para rodar sem atritos, de ERPs enxutos a CRMs territoriais.",
    examples: [
      "Plataformas SaaS White-label",
      "Sistemas de Gestão (ERP)",
      "CRMs Customizados",
      "Portais de Atendimento",
    ],
  },
  {
    icon: Zap,
    title: "Automations",
    description:
      "IA & Workflows: Eliminamos o trabalho manual repetitivo integrando ferramentas e injetando inteligência artificial em cada etapa do processo.",
    examples: [
      "Agentes de IA 24/7 (WhatsApp)",
      "Workflows n8n Complexos",
      "Extração de Dados via Vision AI",
      "Processamento de Documentos",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Dados & Inteligência: Transformamos dados em decisões. Criamos a infraestrutura para você enxergar o motor do seu negócio em tempo real.",
    examples: [
      "Data Warehouses (Supabase/Postgres)",
      "Dashboards Executivos",
      "Análise de Sentimento em Massa",
      "Alertas de KPIs Críticos",
    ],
  },
  {
    icon: Sparkles,
    title: "Growth",
    description:
      "Marketing & Expansão: Tecnologia aplicada à aquisição. Ferramentas que ajudam seu negócio a escalar através de dados e automação de vendas.",
    examples: [
      "Automação de SDRs e Qualificação",
      "Dashboards de Atribuição",
      "Sistemas de Indicação Automática",
      "Fisital (QR Codes Inteligentes)",
    ],
  },
];
