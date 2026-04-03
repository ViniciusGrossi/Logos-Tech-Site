# GLOSSARY — Logos Tech

Este documento padroniza a linguagem utilizada no ecossistema da Logos Tech, servindo de base para o desenvolvimento, comunicação com clientes e alimentação do Assistente de IA (RAG).

---

## 🏗️ Conceitos de Negócio & Estratégia

### Logos Tech
@type: concept
Ecossistema de Transformação Digital Modular focado em PMEs e Setor Público. Utiliza a razão estruturada ocidental (Logos) para organizar processos caóticos através de tecnologia de ponta.

### Land & Expand
@type: strategy
Estratégia comercial da Logos Tech. Consiste em entrar no cliente com uma solução de baixo atrito/custo (Land - ex: Bot de WhatsApp) e expandir progressivamente para módulos mais complexos (Expand - ex: ERP, Analytics).

### Peça de Vendas Silenciosa
@type: concept
Referência ao Site Institucional. Um sistema que opera 24h, qualificando leads e convertendo visitantes em contatos de WhatsApp sem intervenção humana direta.

### TTV (Time to Value)
@type: metric
Tempo decorrido entre o fechamento do projeto e a entrega do primeiro valor real ao cliente. A meta da Logos Tech é o TTV instantâneo através de MVPs entregues em semanas.

### Persona 1 (Gestor de PME)
@type: persona
Dono ou gerente de empresas tradicionais (clínicas, oficinas). Foco em resolver dores operacionais (WhatsApp bagunçado, falta de dados) sem necessidade de conhecimento técnico.

### Persona 2 (Fundador/CTO)
@type: persona
Perfil técnico de startups que busca parceiros com domínio de stack moderna (Next.js, Supabase, IA) e processos previsíveis.

---

## 📦 Módulos do Ecossistema

### Systems (Core Operacional)
@type: module
Módulo focado na criação de ERPs verticalizados e sistemas enxutos sob medida, eliminando fluxos manuais de gestão.

### Automations (IA & Workflows)
@type: module
Orquestração de ferramentas (n8n, Evolution API, Typebot) para reduzir erro humano e automatizar triagens e atendimentos.

### Analytics (Dados & Inteligência)
@type: module
Módulo de inteligência que utiliza Data Warehouses e Dashboards para transformar dados brutos em decisões executivas.

### Growth (Marketing & Expansão)
@type: module
Estruturação de ferramentas de tração, CRMs automatizados e tracking de campanhas integrados ao core comercial.

---

## 💻 Stack Tecnológica & Arquitetura

### Supabase
@type: tech
Plataforma Backend-as-a-Service (BaaS) baseada em PostgreSQL. Utilizada pela Logos Tech para Banco de Dados, Autenticação (Auth) e Edge Functions.

### RLS (Row Level Security)
@type: security
Camada de segurança nativa do PostgreSQL/Supabase que garante que usuários acessem apenas os dados que lhes pertencem, fundamental para o multi-tenant do ecossistema.

### n8n
@type: tech
Orquestrador de automação low-code utilizado para conectar APIs, processar dados e gerenciar fluxos de trabalho complexos.

### Evolution API
@type: tech
Ponte de integração para WhatsApp que permite ao sistema enviar, receber e processar mensagens de forma programática.

### Layout "De Guerra"
@type: concept
Padrão arquitetural obrigatório: Next.js (App Router) + Supabase + Tailwind CSS v4 + n8n.

---

## 🤖 Inteligência Artificial & Dados

### RAG (Retrieval-Augmented Generation)
@type: concept
Arquitetura que permite à IA responder perguntas baseando-se em documentos e dados específicos do cliente, em vez de depender apenas do seu treinamento genérico.

### Embeddings
@type: tech
Representações numéricas (vetores) de textos que permitem à IA realizar buscas semânticas (por significado) em vez de apenas palavras-chave.

### pgvector
@type: tech
Extensão do PostgreSQL que permite armazenar e realizar buscas eficientes em Embeddings (vetores) dentro do banco de dados Logos Tech.

### SDR de IA (Sales Development Representative)
@type: concept
Agente conversacional de IA treinado para qualificar leads, tirar dúvidas básicas e agendar reuniões diretamente pelo WhatsApp.

### Data Lineage
@type: concept
Rastreamento da origem e transformações de um dado, desde a captura bruta até a exibição em um dashboard de Analytics.

---

## 🔄 Fluxos de Trabalho (SOP)

### Pipeline Industrial (10 Passos)
@type: flow
Fluxo obrigatório de execução: Ideia → PRD → Arquitetura → Design → Tasks → Build → Validate → Document → RAG → Deploy.

### Definition of Done (DoD)
@type: criteria
Critérios que garantem que uma task está concluída: Funciona, validado, segue Rules.md, simples, legível e documentado.

---

*Nota: Este glossário é um documento vivo e deve ser atualizado sempre que novos termos forem introduzidos no ecossistema.*
