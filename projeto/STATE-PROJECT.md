# ESTADO DO PROJETO — Logos Tech Site Institucional

## Fase atual
**🔴 FASE DE PLANEJAMENTO: CONCLUÍDA (READY FOR BUILD)**  
O projeto passou pela triagem técnica, análise de stress e quebra de tarefas. Toda a base estratégica está documentada e o roteiro técnico está priorizado.

## O que a IA já fez
- **Análise de Stress:** Identificação e resolução de riscos de runtime (Edge vs Node) e captura de leads.
- **Documentação de Negócio:** Criação do **PRD** (Públicos e Copy) e **Glossário** (Termos Vitais para RAG).
- **Documentação Técnica:** Criação da **ARCHITECTURE** (Stack de Guerra) e **Design System** tokens.
- [x] **Setup Baseline:** Next.js 15 + Tailwind 4 + Shadcn UI pronto.
- [x] **Design Tokens:** Tokens do `design-system.html` aplicados em `globals.css`.
- [x] **Backend Logic:** Server Action `log-lead.ts` integrada ao Supabase.
- [x] **Build das Seções:** Navbar, Hero, Serviços, Portfólio, Processo, Stack, Contato e Footer.
- [x] **Animações Premium:**
    - Mouse Follower ambient glow.
    - Floating Particles canvas layer.
    - Scroll Progress neon bar.
    - 3D Tilt Cards em Serviços e Portfólio.
    - Infinite Marquee no Stack de tecnologia.
    - Animated Counters na nova seção de Stats.
    - Shimmering headings e Liquid buttons.
    - Word-by-word reveal no Hero.

## Em andamento
- Finalizar o refinamento do **Footer**, implementar **Textura de Ruído (Noise)** global e realizar o **Manual Audit** final via `checklist.py`.

## Próximo passo categórico exato
**🚀 Executar Task INF-001:** Setup inicial do Next.js 15 (App Router) + Tailwind CSS v4 no diretório `projeto/frontend`.

## Decisões recentes
- **Stack:** Next.js 15 + Supabase + Tailwind v4.
- **Performance:** Uso preferencial de Node.js runtime para rotas de banco para evitar instabilidade no Edge.
- **Métrica:** Persistência obrigatória de cliques em WhatsApp na tabela `leads` para análise de conversão.

## Evitar
- Iniciar o frontend sem o setup de variáveis de ambiente do Supabase.
- Usar cores fora do Design System (preferir HSL Orange/Amber e Dark-Low).
