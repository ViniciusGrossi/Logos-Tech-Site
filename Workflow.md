# 🧠 MASTER PROJECT WORKFLOW — LOGOS TECH
**Use este documento como o guia definitivo de execução ponta a ponta para projetos na stack Logos Tech.**

Este guia incorpora as melhores práticas de Arquitetura de Dados, Engajamento Web, Resiliência e AI-First, incluindo todas as lições aprendidas em builds reais de produção.

---

## VISÃO GERAL DO CICLO DE VIDA

```
IDEIA → PRD → ARQUITETURA → DESIGN → TASKS → BUILD → VALIDATE → DEPLOY → RAG
```

Cada etapa possui um **Gatilho** (entrada), uma **Ferramenta/Agente** recomendada e uma **Saída** (artefato).

> **A Divisão de Ouro:**
> - **Claude / ChatGPT:** Estratégia, copy, estrutura de negócios, idealização de arquitetura.
> - **Antigravity:** Execução pesada de código, testes, debug sistemático e deploy.

---

## ⚙️ FASE 0 — SETUP INICIAL & GLOBAL

Antes de começar um novo projeto, prepare o ambiente:

### 1. Scaffold de Arquivos
Rode no terminal para criar as pastas e arquivos base de documentação:
```bash
python cli.py init [nome-do-projeto]
```

### 2. Arquivos Mandatórios
| Arquivo | Descrição |
| --- | --- |
| `.geminiignore` | Reduz consumo de tokens bloqueando: `node_modules`, `build/`, `out/`, `*.log` e pastas irrelevantes. |
| `GEMINI.md` | Contexto master do Antigravity. Define regras de negócio, restrições estritas e agentes responsáveis. |
| `STATE-PROJECT.md`| Documento vivo de progresso. A cada sessão ele guarda o que foi feito e o exato próximo passo. |

### 3. Setup de Global Skills (Antigravity)
Garanta que seu agente tem as extensões certas, instalando-as **globalmente**. Assim elas operam em qualquer projeto, e não precisam ficar restritas a um único `.agents` path:
```powershell
# Exemplo de instalação global via HTTPS:
npx skills add https://github.com/kepano/obsidian-skills.git --global --yes
```

---

## 🎯 FASE 1: PREPARAÇÃO (THE THINKING PHASE)

### ETAPA 1 — IDEIA & CLAREZA
**Gatilho:** Problema identificado.
**Onde:** 💬 Claude / ChatGPT

**Prompt Ideal:**
> *"Preciso clarear uma ideia de produto antes de escrever o PRD. Me faça perguntas para eu conseguir responder: 1. Qual o problema exato (1 frase)? 2. Quem sente a dor (1 frase)? 3. Qual a solução mínima (2-3 frases)?"*

**Saída:** Clareza total (não avance sem isso).

---

### ETAPA 2 — PRD (Product Requirements Document)
**Gatilho:** Respostas da Etapa 1.
**Onde:** 💬 Claude / ChatGPT

**Saída:** Arquivo `PRD.md` compacto contendo:
- Problema, Solução, Público, MVP (Escopo) e Fora do Escopo.
- Métricas de Sucesso Mensuráveis.

---

### ETAPA 3 — ARQUITETURA & MODELO DE DADOS
**Gatilho:** PRD aprovado.
**Onde:** 💬 Claude (geração) → 🤖 Antigravity `database-architect` (validação).

**Estrutura do `ARCHITECTURE.md`:**
1. **Stack:** (Ex: Next.js 15 App Router, Tailwind v4, Supabase, Vercel).
2. **Modelo de Dados Mapeado.**
3. **Fluxos Críticos (Pseudocódigo).**
4. **Integrações.**

**Rituais Obrigatórios:**
1. **Validar:** Peça ao Antigravity: *"Leia a ARQUITETURA e me diga de forma concisa: Riscos no fluxo principal e ausências no modelo de BD. Apenas análise, sem código"*.
2. **Glossário & Dados:** Inicialize `docs/glossary.md` e `docs/data-lineage.md` para suportar o entendimento profundo.

---

### ETAPA 4 — DESIGN SYSTEM (UI/UX)
**Gatilho:** Arquitetura definida.
**Onde:** 🤖 Antigravity `ui-ux-pro-max` + `frontend-design`.

**Saída:** `docs/design-system.html` e `globals.css`
*Determine a Paleta Completa (HSL preferred), Tipografia, Espaçamento e Estilo de Curvas antes de fazer telas.*

---

## 🏗️ FASE 2: EXECUÇÃO (THE BUILDING PHASE)

### ETAPA 5 — TASKS & PRIORIZAÇÃO
**Gatilho:** Fundação documental pronta.
**Onde:** 🤖 Antigravity — Workflow `plan` (`project-planner` + `plan-writing`).

**Prompt para o Agente:**
> *"Leia o PRD.md e ARCHITECTURE.md. Gere o docs/tasks.md priorizando: Backend (Banco, Endpoints) primeiro → Componentes Base → Telas → Integrações. Quebre qualquer task estimada > 4h em checkboxes menores."*

✅ Após gerar, preencha o `STATE-PROJECT.md` listando o fim da fase de planejamento e a Task 01 técnica.

---

### ETAPA 6 — BUILD & CICLOS DEV
**Gatilho:** `tasks.md` preenchido.
**Onde:** 🤖 Antigravity (`backend-specialist`, `frontend-specialist`, `orchestrator`).

> 🔓 **SESSÃO DAILY START:**
> *"Leia o STATE-PROJECT.md e o tasks.md. Em uma linha: onde paramos e qual é a nossa próxima task exata agora?"*

#### Direcionais de Build:
1. **Banco & Backend (`database-architect` / `backend-specialist`):**
   - Use nomes descritivos (lower_snake_case para DB). Retorne JSON tipado no schema Zod. Siga `Repository → Service → Server Action/Controller`.
2. **Frontend & Performance-First (`frontend-specialist`):**
   - **Lazy Loading Mandatório:** Seções pesadas fora da dobra inicial DEVEM ser carregadas dinamicamente (`next/dynamic` + Skeleton de hidratação previne estouros de LCP/Cumulative Layout Shift).
   - **Imagens:** Use APENAS o `next/image` (`<Image />`). Esqueça tags `<img>` padrão.
   - **Interatividade:** Deixe animações densas em Client Components (`"use client";`) separados dos estáticos.

> 🔒 **SESSÃO DAILY CLOSE:**
> *"Faça o commit do que fizemos. Atualize o STATE-PROJECT.md com os entregáveis do dia, liste pendências vitais e aponte o próximo passo lógico. Forneça o resumo."*

---

## 🔎 FASE 3: QUALIDADE (THE VALIDATING PHASE)

### ETAPA 7 — VALIDATE (QA & SEGURANÇA)
**Gatilho:** Build da feature ou do módulo completo.
**Onde:** 🤖 Antigravity (`qa-automation-engineer`, `debugger`, `security-auditor`).

**Fórmula de QA Mental:**
- Isso quebra em 375px de largura?
- Se o usuário não botar texto no input ou a internet falhar no meio do POST, dá `500 Server Error` ou trata bonitinho com Toasts?

**Construção Racional do Conhecimento:**
Encontrou um erro complexo durante os testes? Documente em `docs/faq.md` ou atualize os `flows.md`, indicando "como resolve no Logos Tech stack".

---

## 🛫 FASE 4: ENTREGA (THE SHIPPING PHASE)

### ETAPA 8 — GITHUB & DEPLOY
**Gatilho:** Validado, código no main.
**Onde:** Github & Vercel.

**Checklist Critico de Deploy:**
1. **Vercel Root Config:** É extremamente comum o Vercel não encontrar o Next.js se houver mono-repo. Certifique-se nas opções "Root Directory" de colocar o nome do repositório (ex: `projeto/frontend`).
2. **GitHub Bloqueando Assets (.gitignore):** Imagens do Portfólio ou assets `public` costumam ser ocultados caso você cole wildcards acidentais no gitignore. Use whitelist se necessário:
   ```gitignore
   # Ignorar midia padrão
   *.png
   *.webp
   
   # MAS permitir caminhos críticos do public:
   !projeto/frontend/public/**/*.png
   !projeto/frontend/public/**/*.webp
   ```
3. Copiar vars do `.env` real pro painel de deploy.

---

### ETAPA 9 — ASSISTENTE RAG (EXPANSÃO)
**Gatilho:** Sistema lançado e gerando dúvidas em usuários/funcionários.
Combine todo esse markdown valioso (`PRD`, `ARCHITECTURE`, `faq`, `glossary`) via PGVector + LangChain para responder as pessoas com contexto corporativo exato.

---

## 🛑 TROUBLESHOOTING & GOTCHAS TÉCNICOS EXPERIMENTADOS

Ao trilhar a construção Next.js/Tailwind/Supabase, estes buracos foram documentados e resolvidos:

*   **Problemas com `Lucide-React`:** Importar itens como `MessageCircle` quando a bliblioteca atualizou para `MessageSquare` causa quebras crônicas de compilação sem stacktrace óbvio. *Check if icon names exist when building UI*.
*   **Dynamic imports e "ssr: false" em App Router:** Utilizar a tag `ssr: false` dentro do arquivo `page.tsx` causa Server Error no build de produção se a página for um Server Component. A página INTEIRA deve ter a flag `"use client"` ou essa lógica tem que ficar isolada num invólucro do lado do cliente separadamente.
*   **Conflitos Node.js vs Edge no Vercel (Supabase):** Action files de Server do Supabase podem conflitar entre Fetch Edge e Node API se libraries criptográficas estiverem ali. Se sua Server Action usar lib C/Rust node, adicione `export const runtime = "nodejs";`.
*   **Cumulative Layout Shift Elevado:** Arquitetar sites belos costuma ser custoso. Elementos que empurram o conteúdo sem carregar devem ter um esqueleto definido.

---

✅ **DEFINITION OF DONE (O Sistema Lançado)**
- [ ] Deploy concluído. Nenhum `500` no log da Vercel.
- [ ] Core Web Vitals em Verde (Split dinâmico de blocos abaixo da dobra ativado).
- [ ] Todos assets visuais no branch principal do GitHub e carregando no live URL.
- [ ] `STATE-PROJECT.md` reflete "Concluído em Produção".