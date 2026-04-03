# TASKS — Logos Tech Landing Page

Este documento lista as tarefas técnicas priorizadas por dependência. Nenhuma tarefa de Frontend deve ser iniciada sem que sua dependência de Backend/Infra esteja validada.

---

## 🏗️ INFRA (Infraestrutura e Base)
*Dependência Severa: Bloqueia todo o projeto.*

- [ ] **Task INF-001: Setup do Projeto Next.js 15**
  - **Ação:** Inicializar projeto Next.js 15 com App Router, TypeScript e Tailwind v4.
  - **Agente:** `orchestrator` | **Skill:** `app-builder`
  - **Verificar:** `npm run dev` abre a página padrão sem erros.
- [ ] **Task INF-002: Configuração do Supabase Client**
  - **Ação:** Instalar `@supabase/supabase-js`, configurar `.env.local` e criar `src/lib/supabase.ts`.
  - **Agente:** `backend-specialist` | **Skill:** `nodejs-best-practices`
  - **Verificar:** Log de sucesso ao tentar instanciar o cliente no servidor.
- [ ] **Task INF-003: Schema do Banco de Dados (Leads)**
  - **Ação:** Criar tabela `whatsapp_leads` no Supabase conforme ARCHITECTURE.md.
  - **Agente:** `database-architect` | **Skill:** `database-design`
  - **Verificar:** Tabela visível no Supabase Table Editor com todas as colunas.
- [ ] **Task INF-004: Políticas de Segurança (RLS)**
  - **Ação:** Configurar RLS na tabela `whatsapp_leads` para permitir apenas `INSERT` público (anônimo).
  - **Agente:** `security-auditor` | **Skill:** `vulnerability-scanner`
  - **Verificar:** Tentativa de `SELECT` via API retorna vazio/erro; `INSERT` funciona.

---

## ⚙️ BACKEND (Lógica e Integrações)
*Dependência: Requer INF-002 e INF-003 concluídos.*

- [ ] **Task BKD-001: Server Action de Captura de Lead**
  - **Ação:** Criar `src/app/actions/leads.ts` para validar (Zod) e persistir o evento de clique no banco.
  - **Agente:** `backend-specialist` | **Skill:** `api-patterns`
  - **Verificar:** Chamada da função insere uma nova linha com metadados no Supabase.
- [ ] **Task BKD-002: Utilitário de Redirecionamento WhatsApp**
  - **Ação:** Criar helper em `src/lib/whatsapp.ts` para gerar URLs wa.me dinâmicas com UTMs e encode de mensagens.
  - **Agente:** `backend-specialist` | **Skill:** `clean-code`
  - **Verificar:** Output da função é uma URL válida decodificada corretamente.

---

## 🎨 FRONTEND (Interface e UX)
*Dependência: Requer BKD-001 para funcionalidades de conversão.*

- [ ] **Task FRN-001: Setup do Design System (Tailwind v4)**
  - **Ação:** Configurar `globals.css` com as cores, tipografia e tokens definidos no PRD.
  - **Agente:** `frontend-specialist` | **Skill:** `tailwind-patterns`
  - **Verificar:** Cores customizadas (ex: `#050505`) aplicáveis via classes CSS.
- [ ] **Task FRN-002: Navbar Global & CTA Principal**
  - **Ação:** Criar componente de navegação fixa com backdrop-blur e botão de ação imediata.
  - **Agente:** `frontend-specialist` | **Skill:** `frontend-design`
  - **Verificar:** Teste de scroll mantém navbar visível e botão dispara log de lead.
- [ ] **Task FRN-003: Hero Section (Atrito Zero)**
  - **Ação:** Implementar primeira dobra com Headline, Subtitle e visual de impacto (Loop ou Print).
  - **Agente:** `frontend-specialist` | **Skill:** `frontend-design`
  - **Verificar:** Desktop (2 colunas) e Mobile (1 coluna) sem overflow horizontal.
- [ ] **Task FRN-004: Grid de Serviços & Cards**
  - **Ação:** Criar seção de serviços com os 4 pilares definidos no PRD usando ícones Lucide.
  - **Agente:** `frontend-specialist` | **Skill:** `web-design-guidelines`
  - **Verificar:** Cards com hover effects funcionais e responsividade 2x2.
- [ ] **Task FRN-005: Seção de Portfólio (Trusted Solutions)**
  - **Ação:** Renderizar grid de projetos com descrição focada em "problema resolvido".
  - **Agente:** `frontend-specialist` | **Skill:** `frontend-design`
  - **Verificar:** Chips de tech stack visíveis e imagens/vídeos com lazy-load.
- [ ] **Task FRN-006: Processo de Trabalho & Footer**
  - **Ação:** Implementar timeline de 4 passos e rodapé com links sociais.
  - **Agente:** `frontend-specialist` | **Skill:** `web-design-guidelines`
  - **Verificar:** Links sociais funcionais e hierarquia visual clara.

---

## ✅ VERIFICAÇÃO FINAL (Phase X)
- [ ] **Task VRF-001: Auditoria de UX e Acessibilidade**
  - **Ação:** Rodar scripts `ux_audit.py` e verificar contraste das cores (Logos Tech Dark Mode).
- [ ] **Task VRF-002: Teste de Conversão End-to-End**
  - **Ação:** Simular clique no WhatsApp, verificar inserção no banco e redirecionamento final.
