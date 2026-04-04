# GEMINI.md — [Nome do Projeto]
# Contexto permanente carregado automaticamente pelo agente em cada sessão.
# Mantenha enxuto — cada linha aqui custa tokens em todo prompt.

## Projeto
- **Nome:** Site Logos Tech
- **Stack:** [Backend] + [Frontend] + Supabase + [Automação] + [IA]
- **Fase atual:** MVP

## Regras globais
As regras de arquitetura, código e padrões estão em `GLOBAL-RULES.md`.
Siga-as sem exceção. Em caso de conflito, as regras deste arquivo prevalecem.

## Arquitetura
Camadas: Controller → Service → Repository → Supabase.
Estrutura de pastas documentada em `ARCHITECTURE.md`.

## Banco de dados
Supabase (PostgreSQL). Migrations em `supabase/migrations/`.
Nomenclatura: tabelas snake_case plural, FKs {tabela}_id, timestamps em toda tabela.

## Design system
Tokens definidos em `docs/design-system.md`.
Nunca inventar cor, espaçamento ou tipografia durante o build — usar apenas os tokens.

## Contexto de negócio
Site/Landing Page da empresa Logos Tech, com foco em capturar leads através de botões de WhatsApp. O site deve ser responsivo e otimizado para SEO. Nele apresentaria toda a minha empresa, os serviços que ofereço, os módulos que tenho, meu portfolio, etc. O site deve ser moderno e atraente, com um design clean e profissional. O site deve ser rápido e leve, com um bom score no Google PageSpeed Insights.

## O que NÃO fazer
- Não criar arquivos fora da estrutura de pastas definida
- Não hardcodar valores que deveriam ser variáveis de ambiente
- Não pular camadas (Controller chamando Repository diretamente)
- Não inventar estilos fora do design system
- Não criar lógica de negócio no Controller ou no componente React
