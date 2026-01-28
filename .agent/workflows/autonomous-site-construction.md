---
description: Workflow final para construção de sites S-Tier (Referência -> Documentação -> Protótipo -> Construção)
---

# 👑 Sovereign Autonomous Site Construction Workflow v3.0

Este workflow codifica o "Sovereign Protocol" para construção de sites de Alta Performance e Design Institucional (S-Tier).

**Core Philosophy**: "Silence is Luxury".
**Core Philosophy**: "Silence is Luxury".
1.  **Asymmetry (Split Layout)**: Figure Centered vs. Text Right/Left. Never both centered.
2.  **Living Typography**: Text must "arrive" (Scramble/Decode), not just appear.
3.  **Imposing Scale**: Typography should be architectural (Macro-Scale 10vw+).

---

## 📋 **Fase 0: Referência & DNA (Forensics)**

### 0.1 Input do Usuário
Fornecer 3 URLs de referência.
*(Exemplo: site da Apple para scroll, site da Stripe para gradientes, site Awwwards para WebGL)*

### 0.2 Definição de Arquétipo (Critical Pivot)
Decidir o "Modo" do site antes de qualquer código:
*   **Modo Sovereign (Finance/Luxury)**: Cores "Void/Gold/Platinum", Fontes Serif/Sans blend, Ritmo Dark/Light.
*   **Modo Cyber (Tech/SaaS)**: Cores "Neon/Black", Fontes Mono/Sans, Dark Mode Only.

### 0.3 Direção de Arte Sênior
```yaml
agent: senior-art-director
action: DEFINE_UNIVERSE_AND_AESTHETICS
output: "docs/art-direction-brief.md"
```
**Obrigatório na Entrega v3.0:**
1.  **Fluid Typography**: Definir escala `clamp()` (ex: `hero: clamp(3rem, 8vw, 6rem)`). NADA de breakpoints fixos para texto.
2.  **Semantic Palette**: Definir `void`, `primary` (accent), `light-base`, `border-subtle`.
3.  **Visual Hook (The Slippery Slide)**: Definir a estrutura narrativa "Título -> Subtítulo -> Hook Visual". O usuário não pode querer parar de ler. (Regra de Sugarman).

---

## 🎨 **Fase 1: Estratégia Híbrida (Hybrid Architecture)**

A partir da v3.0, assumimos uma arquitetura híbrida como padrão para alta performance visual.

### 1.1 O Modelo Híbrido
*   **Layer 1 (Hero/Showcase)**: `position: fixed`. Alta computação (WebGL/Canvas/GSAP complexo). "O Punch".
*   **Layer 2 (Content)**: `position: relative`. Baixa computação (Semantic HTML/Tailwind). "A Leitura".
*   **Interaction**: O scroll do Layer 2 dispara animações no Layer 1 (Scrubbing).

### 1.2 Prototipagem (Stitch MCP)
Gera apenas os blocos de *Conteúdo* (Layer 2). O Hero (Layer 1) é construído manualmente ou via templates especializados (Black Hole, Particles, etc).

---

## 🏗️ **Fase 2: Construção Tátil (Tactile First)**

Diferente da v2.0, aqui construímos as **Interações** antes do Layout.

### 2.1 Primitivos de Interação (Physics)
Implementar componentes base com física (GSAP) antes de montar as páginas.
*   **MagneticButton**: Wrapper que atrai o cursor.
*   **SmoothScroll (Lenis)**: Interceptação de scroll obrigatória.
*   **CustomCursor**: Blending modes ou trail effects.

### 2.2 Ordem Cronológica de Execução

1.  **Tailwind Stylist Expert (CSS Forensics)**:
    *   Configura `globals.css` com variáveis de cor e fontes fluidas.
    *   *Sem isso, nada avança.*

### Phase 3: Tactile Construction (The Build)
1.  **The Spine**: Setup `Lenis` smooth scroll (Duration: 1.2s+).
2.  **The Hook (Hero)**: Build the "Event Horizon" or "Portal". No static headers.
3.  **The Body (Content)**: Use "Sticky Editorial" layouts.
4.  **The Breaks (Interstitials)**: Insert "Cinematic Crooked Frames" between major blocks.
    - *Exo Ape Rule*: Never transition block-to-block without a visual breath.
    - *Tech*: GSAP Rotation + Parallax + Video Reveal.
5.  **The Footer**: A massive, heavy closure.

2.  **R3F/GSAP Master (The Hero)**:
    *   Implementa o `Layer 1` (Fixed Hero).
    *   Garante "Mouse Parallax" e "Entrance Animation".

3.  **Neurofront Architect (The Body)**:
    *   Implementa `Layer 2` (SovereignContent).
    *   Usa o CSS Grid/Flexbox para layouts editoriais impecáveis.
    *   Injeta os Primitivos de Interação (Botões, Links).

---

## ⚡ **Fase 3: Refinamento "Sovereign" (The Polish Protocol)**

O polimento foca em remover o ruído ("Silence is Luxury") e garantir a Física.

### 3.1 Checklist de Refinamento (Mandatório)
*   [ ] **Noise/Texture**: Existe uma textura sutil (film grain/noise) sobrepondo o content?
*   [ ] **Rhythm**: Existe alternância clara entre seções Dark (Void) e Light (Platinum)?
*   [ ] **Weight**: As animações tem "peso" (ease: `power4.out` ou `expo.out`)? Nada linear.
*   [ ] **Typography**: O texto escala perfeitamente via `clamp()` sem "pulos" de breakpoint?

### 3.2 Gate: Transformation vs Scroll
**CRITICAL QA STEP**: O avaliador deve responder "SIM" a todas as perguntas abaixo para aprovar.
1.  **A Ilusão**: "O site parece que *não* está rolando, mas sim se transformando/viajando?"
2.  **Sincronia**: "A animação de entrada do próximo bloco começa EXATAMENTE quando a anterior termina (Scrub Linked)?"
3.  **Hook**: "Existe uma explosão visual ou efeito de profundidade (Zoom/Scale) na transição?"

---

## 📦 **Fase 4: Entrega & Deploy**

### 4.1 Validação Final (The White Glove Test)
Antes do deploy, verificar manualmente:
*   **Mobile Scale**: O `clamp()` segura em 320px sem quebrar palavras?
*   **Performance**: Lighthouse > 90 (Desktop) COM WebGL ativo?
*   **Aesthetic**: O site parece custar mais de $50k? (Se parecer template, REJEITAR).

### 4.2 Deploy
```yaml
workflow: /cloud-run-deploy
```

---

## 🔄 Fluxograma v3.1 (Sovereign Gates)

```mermaid
graph TD
    Ref[Input References] --> Archetype{Archetype?}
    Archetype -- Sovereign --> Palette[Build Gold/Void Palette]
    Archetype -- Cyber --> Palette[Build Neon/Black Palette]
    
    Palette --> Primitives[Build Tactile Primitives (Magnetic/Lenis)]
    Primitives --> Hybrid[Scaffold Hybrid Arch (Fixed Hero + Scroll Content)]
    
    Hybrid --> Hero[Build Hero (GSAP/WebGL)]
    Hybrid --> Content[Build Content (Tailwind/HTML)]
    
    Hero --> Integration
    Content --> Integration
    
    Integration --> QA_Gate{Transformation Check!}
    
    QA_Gate -- "Feels like Scrolling" --> Polish[Refine Physics (Sync/Scale)]
    QA_Gate -- "Feels like Flying" --> Deploy[🚀 Cloud Run Deploy]
    
    Polish --> QA_Gate
```
