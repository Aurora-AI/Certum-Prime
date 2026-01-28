"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import MagneticButton from "@/components/sovereign/MagneticButton";
import Link from "next/link";
import SovereignStarfield from "@/components/sovereign/SovereignStarfield";
import { useScrambleText } from "@/hooks/useScrambleText";
import TextSplitReveal from "@/components/effects/TextSplitReveal";

gsap.registerPlugin(ScrollTrigger);

export default function HeroEventHorizon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  // Scramble State
  const [startScramble, setStartScramble] = React.useState(false);
  const scrambledTitle = useScrambleText("The Signal", 2000, startScramble);
  const scrambledSub = useScrambleText("In The Noise", 2000, startScramble);

  useGSAP(() => {
    // TRIGGER SCRAMBLE ON MOUNT
    setTimeout(() => setStartScramble(true), 500);

    // Initial Entrance
    const tl = gsap.timeline();
    tl.from(contentRef.current, { scale: 1.1, opacity: 0, duration: 1.8, ease: "power4.out" })
      .from(ringsRef.current, { scale: 0.5, opacity: 0, duration: 1.8, ease: "power3.out" }, "-=1.5")
      .from("#heroCTA", { x: 50, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.8");

    // Mouse Parallax Interaction
    const handleMouseMove = (e: MouseEvent) => {
        if (!textContainerRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 80; // INCREASED RANGE (More Reactive)
        const y = (e.clientY / window.innerHeight - 0.5) * 80;
        
        gsap.to(textContainerRef.current, {
            x: x,
            y: y,
            duration: 1.2,
            ease: "power2.out"
        });
        
        if (ringsRef.current) {
             gsap.to(ringsRef.current, {
                x: x * -0.5, // Stronger contrary motion
                y: y * -0.5,
                duration: 1.8,
                ease: "power2.out"
            });
        }
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // SPIRAL CONFIGURATION (Rest of existing code)
    const SPIRAL_CONFIG = {
        maxRotation: 180,
        minScale: 0.5,
        enable3DTwist: true,
        maxRotateX: 15,
        fadeSpeed: 1.5,
    };

    // Scroll Interaction (The Black Hole Reveal - SPIRAL UPGRADE)
    ScrollTrigger.create({
      trigger: containerRef.current, 
      start: "top top",
      end: "bottom top",
      scrub: 1, 
      onUpdate: (self) => {
        const progress = self.progress;
        const easedProgress = Math.pow(progress, 2); 
        
        // 1. Black Hole Mask (Original)
        const holeSize = easedProgress * 150; 
        const edgeEnd = holeSize + (5 + progress * 10); 

        if (heroLayerRef.current) {
          // GRADIENT MODIFICATION: Blend circular hole with bottom fade
          const mask = `radial-gradient(circle at 50% 50%, transparent ${holeSize}%, black ${edgeEnd}%)`; 
          heroLayerRef.current.style.maskImage = mask;
          heroLayerRef.current.style.webkitMaskImage = mask;
          heroLayerRef.current.style.pointerEvents = progress > 0.8 ? "none" : "auto";
        }

        // ... rest of update logic


        // 2. Spiral Vortex Transformation (New)
        if (contentRef.current) {
          const scale = 1 - (easedProgress * (1 - SPIRAL_CONFIG.minScale));
          const rotation = easedProgress * SPIRAL_CONFIG.maxRotation;
          const opacity = Math.max(0, 1 - (easedProgress * SPIRAL_CONFIG.fadeSpeed));
          
          let transform = `scale(${scale}) rotate(${rotation}deg)`;
          
          if (SPIRAL_CONFIG.enable3DTwist) {
             const rotateX = easedProgress * SPIRAL_CONFIG.maxRotateX;
             const translateZ = easedProgress * -100;
             transform = `perspective(1000px) ${transform} rotateX(${rotateX}deg) translateZ(${translateZ}px)`;
          }

          contentRef.current.style.transform = transform;
          contentRef.current.style.opacity = opacity.toString();
        }

        // 3. Rings React (New)
        if (ringsRef.current) {
            const ringsScale = 1 + (easedProgress * 2);
            const ringsOpacity = 0.4 - (easedProgress * 0.4);
            const ringsRotation = progress * 90;
            
            ringsRef.current.style.transform = `translate(-50%, -50%) scale(${ringsScale}) rotate(${ringsRotation}deg)`;
            ringsRef.current.style.opacity = Math.max(0, ringsOpacity).toString();
        }

        // 4. Glow Intensify (New)
        if (glowRef.current) {
            const glowIntensity = Math.sin(progress * Math.PI);
            const glowScale = 1 + (glowIntensity * 0.3);
            
            glowRef.current.style.transform = `translate(-50%, -50%) scale(${glowScale})`;
            glowRef.current.style.opacity = (0.15 + (glowIntensity * 0.2)).toString();
        }
      }
    });

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
    };

  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="h-[300vh] w-full pointer-events-none relative z-50">
        <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-end pb-12 items-center text-center">
            <span className="text-white/20 text-xs font-mono uppercase tracking-[0.5em] animate-pulse">Scroll to Initiate System</span>
        </div>
      </div>

      {/* The Fixed Sovereign Layer */}
      <div 
        ref={heroLayerRef}
        className="fixed inset-0 z-[100] w-full h-full bg-void overflow-hidden pointer-events-auto will-change-transform"
        style={{ 
          maskImage: 'radial-gradient(circle at 50% 50%, transparent 0%, black 0%)', // Center Hole
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 0%, black 0%)'
        }}
      >
        {/* Background Texture/Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(197,160,89,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'}}></div>
        
        {/* Sovereign Galaxy Layer - INCREASED OPACITY & Z-INDEX */}
        <div className="absolute inset-0 z-10 mix-blend-screen opacity-100">
            <SovereignStarfield />
        </div>

        {/* Central Glow - CENTERED */}
        <div 
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle,rgba(212,175,53,0.15)_0%,transparent_70%)] pointer-events-none"
        ></div>

         {/* Event Horizon Rings - CENTERED */}
        <div ref={ringsRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 z-10">
            <div className="w-[400px] h-[400px] border border-primary/20 rounded-full absolute -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-[600px] h-[600px] border border-primary/10 rounded-full absolute -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Photon Ring Animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(212,175,53,0.2),rgba(255,255,255,0.4),rgba(212,175,53,0.2),transparent)] blur-[35px] opacity-60 animate-[spin_15s_linear_infinite]"></div>
        </div>

        {/* Hero Content - LEFT ALIGNED */}
        <div ref={contentRef} className="relative z-20 w-full h-full flex flex-col items-start justify-center p-6 lg:pl-24 text-left pointer-events-none">
            
            {/* Typography - IMPOSING LEFT ALIGNMENT */}
            <div ref={textContainerRef} className="relative pointer-events-auto flex flex-col items-start gap-8 max-w-4xl">
                <div className="flex items-center gap-3 px-4 py-2 border border-primary/30 bg-primary/5 rounded-sm backdrop-blur-sm">
                    <span className="text-primary text-xs md:text-sm tracking-[0.3em] font-mono uppercase">Silence is Luxury</span>
                </div>

                <h1 className="font-serif italic text-transparent bg-clip-text bg-gradient-to-br from-white via-[#FFE5B4] to-[#8a7122] text-[clamp(4rem,12vw,11rem)] leading-[0.85] tracking-tighter drop-shadow-2xl">
                    {scrambledTitle}<br/>
                    <span className="not-italic font-light text-white">{scrambledSub}</span>
                </h1>
                


                <h2 className="text-gray-400 font-sans text-[clamp(1rem,2vw,1.5rem)] tracking-[0.2em] uppercase font-light mix-blend-plus-lighter max-w-2xl leading-relaxed">
                    <TextSplitReveal type="words" stagger={0.05} delay={2.5}>
                        While the market screams,
                    </TextSplitReveal>
                    <br/>
                    <TextSplitReveal type="words" stagger={0.05} delay={3.2}>
                        The Sovereign whispers.
                    </TextSplitReveal>
                </h2>

                <div id="heroCTA" className="mt-12 pl-0 md:pl-12 border-l-0 md:border-l border-primary/30">
                  <Link href="/dashboard">
                      <MagneticButton className="px-16 py-6 bg-primary text-black font-sans font-bold text-sm tracking-[0.25em] uppercase hover:bg-white transition-colors duration-500 shadow-[0_0_40px_rgba(212,175,53,0.4)]">
                          Enter The Vault
                      </MagneticButton>
                  </Link>
                </div>
            </div>
            
            {/* Decoration Lines - Moved to Right for Balance */}
            <div className="absolute bottom-12 right-12 hidden md:block text-right text-gray-500/50">
                <div className="font-mono text-[10px] tracking-widest mb-2">COORDINATES</div>
                <div className="font-mono text-xs">47.3769° N, 8.5417° E</div>
            </div>
            
        </div>
      </div>
    </>
  );
}
