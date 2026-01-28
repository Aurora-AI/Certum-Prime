# Art Direction Brief: Certum Prime (Refinement v2.0)

## 1. O Universo (The Vibe)
- **Conceito**: *The Vault of Sovereignty*. A digital cathedral of wealth preservation. Not a spaceship (Hitech), but a Fortress of Solitude made of obsidian and gold.
- **Arquétipo**: **The Ruler (O Governante)**. Stable, timeless, unshakeable.
- **Keywords**: Sovereignty, Gravitas, Tacit Luxury, Deep Silence, Golden Ratio.
- **Shift**: Move AWAY from "Cyberpunk/Glitch/Neon" -> TOWARD "Cinematic/Texture/Atmosphere".

## 2. Sistema Visual (Neurodesign)

### Paleta Emocional (The Sovereign Spectrum)
- **Void (Primary)**: `#050505` -> The canvas of infinite potential. Not just black, but "Void".
- **Antique Gold (Accent)**: `#C5A059` -> Old money. Muted, metallic, not yellow. Used sparingly for interaction points.
- **Platinum Mist (Text)**: `#E5E4E2` -> High contrast but softer than pure white.
- **Deep Navy/Regal** (Optional): Subtle background gradients to suggest depth, not space.

### Tipografia (The Voice)
- **Display**: *Playfair Display* or *Cinzel*. Serif, editorial, sharp. "The voice of the contract."
- **Body**: *Inter* or *Manrope*. Clean, swiss, invisible. "The voice of the analyst."
- **Sizing Rule**: **Viewport Sovereignty**. All typography must be calculated via `clamp()` and `vw` units. A headline is not "2em"; it is "5% of the user's reality" (`5vw`).

## 3. Diretrizes de Composição (The Physics)
- **Grid**: Asymmetric, wide gutters. Allow the content to breathe. "Luxury is Space."
- **Texture**: **Mandatory**. Use grain, noise, and "smoke" overlays from the **Aurora Effects Library**. The screen should feel like a physical object (granite, paper, glass), not a light projection.
- **Motion**:
    - **Entrance**: Slow, heavy inertia. Things arrive with weight (Lenis `duration: 1.5`).
    - **Interaction**: Magnetic. Buttons pull the cursor.
    - **Black Hole**: Use the `Black Hole Reveal` technique for the Hero section, but style it as a *Gravity Well of Wealth*, not a sci-fi portal.

## 4. Execution Plan (Refinery)
1.  **Ingest Aurora Effects**: Implement `black-hole-reveal.html` and `parallax-depth-stack.html` logic into React components.
2.  **Global CSS Overhaul**: 
    - Strip "Neon Cyan" and "Glitch".
    - Inject "Grain" overlays.
    - Implement `fluid-type` entry in Tailwind config using `clamp`.
3.  **Hero Redesign**: Implement "The Event Horizon" using the stored effect, but colored in Gold/Void.

---
*Directing Agent: Senior Art Director (Mad Lab Aurora)*
