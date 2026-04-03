# GEMINI.md — [Nome do Projeto]
# Contexto permanente carregado automaticamente pelo agente em cada sessão.
# Mantenha enxuto — cada linha aqui custa tokens em todo prompt.

## Projeto
- **Nome:** [Nome do Projeto]
- **Stack:** [Backend] + [Frontend] + Supabase + [Automação] + [IA]
- **Fase atual:** [MVP / Fase 2 / ...]

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
[Descreva em 2-3 frases o que o sistema faz e para quem.]

## O que NÃO fazer
- Não criar arquivos fora da estrutura de pastas definida
- Não hardcodar valores que deveriam ser variáveis de ambiente
- Não pular camadas (Controller chamando Repository diretamente)
- Não inventar estilos fora do design system
- Não criar lógica de negócio no Controller ou no componente React
