"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// PARALLAX LAYER COMPONENT
// ============================================================

interface ParallaxLayerProps {
  children: ReactNode;
  /** Velocidade do parallax (0 = mais lento, 1 = mais rápido) */
  speed?: number;
  /** Direção do movimento */
  direction?: "vertical" | "horizontal";
  /** Multiplicador de movimento */
  intensity?: number;
  /** Se deve inverter a direção */
  reverse?: boolean;
  /** Classe adicional */
  className?: string;
  /** Tag HTML */
  as?: React.ElementType;
  style?: React.CSSProperties;
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  direction = "vertical",
  intensity = 100,
  reverse = false,
  className = "",
  as: Tag = "div",
  style,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const movement = (1 - speed) * intensity * (reverse ? -1 : 1);

    const animation = direction === "vertical"
      ? { yPercent: -movement }
      : { xPercent: -movement };

    gsap.to(element, {
      ...animation,
      ease: "none",
      scrollTrigger: {
        trigger: element.parentElement || element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === element.parentElement || st.vars.trigger === element) {
          st.kill();
        }
      });
    };
  }, [speed, direction, intensity, reverse]);

  return (
    <Tag
      ref={ref as any}
      className={`will-change-transform ${className}`}
      data-speed={speed}
      style={style}
    >
      {children}
    </Tag>
  );
}

// ============================================================
// PARALLAX CONTAINER
// ============================================================

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxContainer({ children, className = "", style }: ParallaxContainerProps) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {children}
    </div>
  );
}

// ============================================================
// AUTO PARALLAX HOOK
// ============================================================

/**
 * Aplica parallax automaticamente em elementos com data-speed
 * Similar ao sistema da Aurora Library
 */
export function useAutoParallax(containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('[data-speed]');
    const triggers: ScrollTrigger[] = [];

    elements.forEach((el) => {
      const speed = parseFloat((el as HTMLElement).dataset.speed || '0.5');
      const movement = (1 - speed) * 100;

      const trigger = ScrollTrigger.create({
        trigger: el.closest('section') || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        animation: gsap.to(el, {
          yPercent: -movement,
          ease: 'none',
        }),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, [containerRef]);
}

// ============================================================
// PARALLAX DEPTH SYSTEM (Multi-layer)
// ============================================================

interface DepthLayer {
  speed: number;
  content: ReactNode;
  className?: string;
  zIndex?: number;
}

interface ParallaxDepthSystemProps {
  layers: DepthLayer[];
  className?: string;
  height?: string;
}

export function ParallaxDepthSystem({ 
  layers, 
  className = "",
  height = "150vh"
}: ParallaxDepthSystemProps) {
  return (
    <ParallaxContainer className={`relative ${className}`} style={{ height }}>
      {layers.map((layer, index) => (
        <ParallaxLayer
          key={index}
          speed={layer.speed}
          className={`absolute inset-0 ${layer.className || ''}`}
          style={{ zIndex: layer.zIndex ?? index }}
        >
          {layer.content}
        </ParallaxLayer>
      ))}
    </ParallaxContainer>
  );
}

// ============================================================
// PRESET DEPTH CONFIGURATIONS
// ============================================================

export const DEPTH_PRESETS = {
  /** Background super lento */
  DEEP_BACKGROUND: 0.1,
  /** Background normal */
  BACKGROUND: 0.2,
  /** Grid/Texture */
  TEXTURE: 0.3,
  /** Elementos decorativos traseiros */
  DECORATION_BACK: 0.4,
  /** Conteúdo mid-ground */
  MIDGROUND: 0.5,
  /** Conteúdo principal */
  CONTENT: 0.6,
  /** Elementos decorativos frontais */
  DECORATION_FRONT: 0.7,
  /** Foreground */
  FOREGROUND: 0.8,
  /** Elementos super próximos */
  NEAR: 0.9,
} as const;

export default ParallaxLayer;
