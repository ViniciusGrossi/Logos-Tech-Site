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
    title: "Sistemas sob Medida",
    description:
      "Desenvolvemos o sistema exato que sua empresa precisa: do CRM ao ERP, sem as funcionalidades que você nunca vai usar e sem o preço de uma grande consultoria.",
    examples: [
      "Plataformas SaaS White-label",
      "Sistemas de Gestão (ERP)",
      "CRMs Customizados",
      "Portais de Atendimento",
    ],
  },
  {
    icon: Zap,
    title: "Automação com IA",
    description:
      "Eliminamos o trabalho manual que consome seu time: agentes de IA que atendem clientes, aprovam pedidos e enviam relatórios — sem você precisar tocar em nada.",
    examples: [
      "Agentes de IA 24/7 (WhatsApp)",
      "Workflows n8n Complexos",
      "Extração de Dados via Vision AI",
      "Processamento de Documentos",
    ],
  },
  {
    icon: BarChart3,
    title: "Dados e Dashboards",
    description:
      "Seus dados já estão lá. A gente os transforma em um painel que mostra em tempo real onde seu negócio está ganhando e onde está perdendo dinheiro.",
    examples: [
      "Data Warehouses (Supabase/Postgres)",
      "Dashboards Executivos",
      "Análise de Sentimento em Massa",
      "Alertas de KPIs Críticos",
    ],
  },
  {
    icon: Sparkles,
    title: "Crescimento Digital",
    description:
      "Tecnologia que vende por você: SDR de IA que qualifica leads, sistemas de indicação automática e QR codes que rastreiam cada cliente offline.",
    examples: [
      "Automação de SDRs e Qualificação",
      "Dashboards de Atribuição",
      "Sistemas de Indicação Automática",
      "Fisital (QR Codes Inteligentes)",
    ],
  },
];
