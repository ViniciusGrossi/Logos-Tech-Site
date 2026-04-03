export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  sector: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  videoUrl?: string;
  // Case Study Plan A
  challenge: string;
  solution: string;
  results?: string[];
  additionalImages?: string[];
}

export const projects: PortfolioProject[] = [
  {
    id: "logos-juris",
    title: "Logos Juris",
    category: "Jurídico / IA / Management",
    sector: "Legal Tech",
    description: "Ecossistema completo para advocacia moderna. Com monitor de prazos automático e 'Memória Jurídica' via RAG.",
    image: "/portfolio/logos-juris.png",
    tags: ["Next.js", "Supabase", "Python", "RAG", "Agentes"],
    videoUrl: "#demo-juris",
    challenge: "Escritórios de advocacia lidam com volumes massivos de documentos e prazos fatais pulverizados em diferentes sistemas. A perda de um prazo ou a dificuldade em localizar jurisprudência interna gera prejuízos financeiros e operacionais.",
    solution: "Desenvolvemos um sistema 'RAG Native' (Memória Jurídica) que indexa toda a base de conhecimento do escritório. Integramos um monitor de prazos que consulta tribunais automaticamente e um Agente SDR no WhatsApp para triagem jurídica inicial e agendamento.",
    results: [
      "Redução de 70% no tempo de busca por peças jurídicas.",
      "Zero prazos perdidos em 12 meses de teste.",
      "Automatização total da triagem de novos leads via WhatsApp."
    ]
  },
  {
    id: 'win-analytics',
    title: 'Win Analytics',
    category: 'Finanças / IA / SaaS',
    sector: 'Sports Fintech',
    description: 'Plataforma premium de gestão de apostas com IA. OCR automático de comprovantes via WhatsApp.',
    image: '/portfolio/win-analytics-1.png',
    tags: ['React', 'N8N', 'Python', 'Supabase', 'OCR'],
    link: 'https://win-analytics.vercel.app/',
    challenge: "Apostadores profissionais tinham dificuldade em manter um diário de apostas preciso. A entrada manual de dados é lenta e propensa a erros, resultando em uma visão distorcida da lucratividade real.",
    solution: "Um ecossistema modular que utiliza a Evolution API + N8N. O usuário envia o print da aposta pelo WhatsApp, um modelo de IA (Vision) extrai os dados via OCR e atualiza o dashboard em tempo real, calculando ROI e Yield automaticamente.",
    results: [
      "Processamento de tickets em menos de 5 segundos.",
      "Mais de 5.000 comprovantes lidos automaticamente.",
      "Dashboard dinâmico com métricas avançadas de analytics."
    ]
  },
  {
    id: 'modern-dw',
    title: 'Modern Data Warehouse',
    category: 'Engenharia de Dados / BI',
    sector: 'E-commerce Analytics',
    description: 'Pipeline completo ponta a ponta: extração de Data Lake (S3), orquestração dbt e Gold Layer Data Marts.',
    image: '/portfolio/Data-Warehouse-1.png',
    tags: ['dbt', 'Supabase', 'Python', 'Vibe Coding', 'Chart.js'],
    link: '#demo-dw',
    challenge: "Dados fragmentados em planilhas e sistemas de E-commerce dificultavam a tomada de decisão estratégica sobre precificação e estoque. A falta de uma 'única fonte da verdade' gerava relatórios conflitantes entre os times.",
    solution: "Implementação da Arquitetura Medalhão (Bronze/Silver/Gold). Utilizamos dbt para modelagem dimensional e Supabase como storage analítico. Criamos Data Marts dedicados para Sales, Customer Success e Pricing, consumíveis via dashboards 'GSAP-animated'.",
    results: [
      "Unificação de 100% dos silos de dados do E-commerce.",
      "Redução do custo operacional de BI em 40%.",
      "Decisões de pricing baseadas em dados históricos reais (Gold Layer)."
    ]
  },
  {
    id: 'logos-polis',
    title: 'Logos Polis',
    category: 'Político / IA / SaaS',
    sector: 'Gov Tech',
    description: 'Inteligência política para gabinetes. Mapeia demandas territoriais e automatiza o atendimento cidadão.',
    image: '/portfolio/logos-polis-1.png',
    tags: ['Next.js', 'PostgreSQL', 'MapLibre', 'Zustand'],
    link: 'https://logos-polis.vercel.app',
    challenge: "Candidatos e mandatos políticos perdem o contato com as bases territoriais entre as eleições. A gestão de demandas enviadas por redes sociais e WhatsApp é impossível sem centralização e geolocalização.",
    solution: "Plataforma de mapeamento territorial que geolocaliza pedidos de melhoria urbana. Sistema de CRM modular com IA para gerenciar o sentiment dos eleitores e disparar automações baseadas em nichos territoriais específicos.",
    results: [
      "Mapeamento de 10.000+ demandas por território.",
      "Atendimento automático de 80% das dúvidas frequentes via bot IA.",
      "Dashboard de calor para visualização de densidade eleitoral."
    ]
  },
  {
    id: 'oficina-pro',
    title: 'OficinaPro',
    category: 'Gestão / Automação',
    sector: 'Automotivo',
    description: 'Sistema ERP para oficinas mecânicas que automatiza o ciclo de Ordens de Serviço (OS).',
    image: '/portfolio/oficina-pro-1.png',
    tags: ['TypeScript', 'Supabase', 'Zod', 'Framer Motion'],
    link: 'https://oficinapro.vercel.app',
    challenge: "Oficinas pequenas e médias sofrem com descontrole de estoque e processos manuais para criar Ordens de Serviço (OS), resultando em perda de peças e atrasos na entrega dos veículos.",
    solution: "ERP simplificado com foco operacional 'one-click'. Checklist de entrada via tablet que gera a OS automaticamente e notifica o cliente via WhatsApp sobre o progresso do serviço e faturamento.",
    results: [
      "Redução de 50% no tempo de abertura de OS.",
      "Controle de estoque 100% digital e integrado.",
      "Aumento na satisfação do cliente com notificações automáticas."
    ]
  },
  {
    id: 'gas-price',
    title: 'Gas Price Brazil',
    category: 'Data BI / ML',
    sector: 'Economia',
    description: 'Hub analítico para visualização de preços de combustíveis com predição ML.',
    image: '/portfolio/Gas-Price-Brazil-1.png',
    tags: ['Machine Learning', 'Recharts', 'API SGS', 'BI'],
    link: 'https://gas-price-brazil.vercel.app',
    challenge: "A volatilidade dos preços de combustíveis no Brasil impacta toda a cadeia logística. Faltava uma ferramenta simples para cruzar dados da ANP com indicadores globais (Brent/Dólar) para prever tendências locais.",
    solution: "Pipeline de dados que consome APIs governamentais e financeiras. Algoritmos de Machine Learning realizam a detecção de anomalias e predição de curto prazo para auxiliar empresas de transporte no planejamento de combustível.",
    results: [
      "Acurácia de 85% na predição de tendência de semanal.",
      "Mais de 1 milhão de pontos de dados processados.",
      "Visualização interativa para dashboards executivos."
    ]
  }
];
