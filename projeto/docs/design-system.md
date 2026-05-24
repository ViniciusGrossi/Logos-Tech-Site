# Logos Legacy - Design System

Este documento serve como a **Bíblia Visual** do projeto Logos Legacy. Nenhuma cor ou fonte hardcoded deve ser utilizada no frontend; tudo deve ser referenciado via Tailwind a partir dos tokens definidos aqui.

## 1. Aesthetic: "Documentary Elegant"
O aplicativo não deve parecer um software tradicional nem um jogo de videogame colorido. Deve evocar a sensação de um arquivo de jornalismo investigativo esportivo (The Athletic) ou um terminal de diretor (Notion / Obsidian).

*   **Palavra-chave:** Elegância Documental, Inteligência, Minimalismo de Vidro (Glassmorphism).

## 2. Tipografia (Dual-Font System)
Nunca utilize a fonte Inter. O sistema é baseado em alto contraste tipográfico:

*   **Títulos, Nomes de Jogadores e Eventos Épicos (Display/Headlines):**
    *   **Font-Family:** `Playfair Display` (Serifada)
    *   **Uso:** Exclusivo para cabeçalhos grandes, evocando tradição e peso histórico.
    *   **Classes Tailwind:** `font-serif tracking-tighter leading-none`
*   **Corpo de Texto e Interface (Body/Labels):**
    *   **Font-Family:** `Geist` (ou `Outfit`)
    *   **Uso:** Textos gerados pela IA, dados numéricos, feeds da timeline, botões.
    *   **Classes Tailwind:** `font-sans leading-relaxed text-gray-400`

## 3. Paleta de Cores (Dark Mode Nativo)
A regra de ouro é **não usar preto puro (#000000)** e **proibir acentos genéricos oversaturated (neon, roxo AI, etc)**. A cor de destaque deve vir APENAS do escudo do clube em foco.

### Tokens Base
*   `--background`: `#09090B` (Zinc 950 - Fundo principal, abismo)
*   `--surface`: `#18181B` (Zinc 900 - Fundo de modais ou seções isoladas)
*   `--primary-text`: `#F4F4F5` (Zinc 50 - Branco suave, nunca branco ofuscante)
*   `--muted-text`: `#A1A1AA` (Zinc 400 - Para textos do feed secundários)

### Glassmorphism & Bordas ("Refração")
Nunca utilize bordas sólidas grossas ou "Cards" genéricos com drop-shadow pesados.
*   **Borda Estrutural:** Branca com 10% de opacidade (`border-white/10`).
*   **Efeito Refração:** Em modais ou painéis flutuantes, utilize `backdrop-blur-md` junto de uma sombra interna bem sutil (`shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`).

## 4. Layout e Fricção
*   **Asimetria e Espaço Negativo:** A timeline deve respirar. Use `gap-8` ou `gap-12` entre grandes blocos narrativos.
*   **Sidebar Minimalista:** O menu não deve ter blocos preenchidos, apenas textos com `opacity-70` que vão para `opacity-100` e ganham uma micro-transição no eixo X (GSAP) ao receberem `:hover`.
*   **Métricas Vitais:** Barras de tensão (Diretoria, FFP) não devem ser grossas. Devem ser linhas finas (2px a 4px de altura) como medidores de precisão militar.

## 5. Animação e Interação (Motion Engine)
Utilizando GSAP e Lenis (já instalados):
*   Nenhuma entrada instantânea na tela. Ao renderizar a timeline, os blocos de texto devem surgir com um *Staggered Fade-Up* (`y: 20`, `opacity: 0`, `duration: 0.8`, `ease: "power3.out"`).
*   Scroll perfeitamente fluído (`lenis`) para garantir que a longa leitura da IA não cause *jank* (engasgos).
