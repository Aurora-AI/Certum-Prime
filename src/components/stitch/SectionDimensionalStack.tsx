"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Tilt3DCard from "@/components/effects/Tilt3DCard";
import { ParallaxLayer, ParallaxContainer } from "@/components/effects/ParallaxLayer";

gsap.registerPlugin(ScrollTrigger);

export default function SectionDimensionalStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef);

    // Initial setups
    gsap.set(containerRef.current, { opacity: 0 });
    gsap.set(q(".glass-card"), { y: 100, opacity: 0 });
    gsap.set(q(".glass-card-promoted"), { y: 150, opacity: 0, scale: 0.8 });
    gsap.set(q(".materialize-btn"), { scale: 0, opacity: 0 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
        }
    });

    tl.to(containerRef.current, { opacity: 1, duration: 0.8 })
      .to(q(".glass-card"), { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1.2)" })
      .to(q(".glass-card-promoted"), { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.75)" }, "-=0.8")
      .to(q(".materialize-btn"), { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }, "-=0.5");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex flex-col bg-void text-platinum-mist font-sans overflow-hidden selection:bg-antique-gold selection:text-white">
        <style jsx>{`
        .perspective-container {
            perspective: 1200px;
        }
        
        .glass-card {
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            background: linear-gradient(180deg, rgba(229, 228, 226, 0.05) 0%, rgba(5, 5, 5, 0.4) 100%);
            border: 1px solid rgba(229, 228, 226, 0.1);
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .glass-card-promoted {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            background: linear-gradient(180deg, rgba(197, 160, 89, 0.08) 0%, rgba(5, 5, 5, 0.6) 100%);
            border: 1px solid rgba(197, 160, 89, 0.6);
            box-shadow: 0 0 60px -10px rgba(197, 160, 89, 0.15), inset 0 0 20px rgba(197, 160, 89, 0.05);
        }

        .scanlines {
            background: linear-gradient(
                to bottom,
                rgba(255,255,255,0),
                rgba(255,255,255,0) 50%,
                rgba(0,0,0,0.2) 50%,
                rgba(0,0,0,0.2)
            );
            background-size: 100% 4px;
            pointer-events: none;
            z-index: 1;
            opacity: 0.2;
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
            animation: float 7s ease-in-out infinite 1s;
        }
      `}</style>
      
      {/* Background Layer */}
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 bg-void pointer-events-none">
        {/* Abstract deep space shapes */}
        <ParallaxLayer speed={0.2} className="absolute top-[-20%] left-[20%] w-[800px] h-[800px]">
            <div className="w-full h-full bg-platinum-mist/5 rounded-full blur-[120px] mix-blend-screen"></div>
        </ParallaxLayer>
        
        <ParallaxLayer speed={0.3} className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px]">
            <div className="w-full h-full bg-antique-gold/5 rounded-full blur-[100px] mix-blend-screen"></div>
        </ParallaxLayer>

        <div className="scanlines"></div>
        {/* Noise texture overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.05]"></div>
      </div>

      {/* Top Navigation */}
      <header className="relative z-50 flex items-center justify-between border-b border-white/10 bg-void/50 backdrop-blur-md px-10 py-4 w-full">
        <div className="flex items-center gap-4 text-white">
          <div className="size-6 text-antique-gold animate-pulse">
            <span className="material-symbols-outlined text-2xl">deployed_code</span>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[0.2em] font-sans">GENESIS OS</h2>
        </div>
        <div className="flex items-center gap-12">
          <nav className="flex items-center gap-8 hidden md:flex font-sans">
            <a className="text-white/60 hover:text-white text-xs font-bold tracking-widest transition-colors" href="#">SYSTEM</a>
            <a className="text-white text-xs font-bold tracking-widest border-b-2 border-antique-gold pb-1" href="#">PORTALS</a>
            <a className="text-white/60 hover:text-white text-xs font-bold tracking-widest transition-colors" href="#">METRICS</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
              <span className="text-[10px] font-mono text-white/70">NET: ONLINE</span>
            </div>
            <button className="flex cursor-pointer items-center justify-center rounded-sm h-9 px-4 bg-antique-gold/20 hover:bg-antique-gold/40 border border-antique-gold/50 text-platinum-mist text-xs font-bold tracking-wider transition-all">
                CONNECT ID
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-6 perspective-container py-20">
        {/* Header Text */}
        <div className="text-center mb-12 relative animate-float-delayed">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 text-4xl md:text-5xl font-bold tracking-[0.05em] uppercase mb-2 drop-shadow-lg font-serif">
            Dimensional Stack
          </h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-antique-gold to-transparent mx-auto mb-4"></div>
          <p className="text-platinum-dim/60 text-sm font-mono tracking-widest uppercase">
            Select a reality anchor to materialize
          </p>
        </div>

        {/* The 3D Stack (Carousel Replacement) */}
        <div className="relative w-full max-w-6xl h-[500px] flex items-center justify-center font-sans">
          
          {/* Left Card (Recessed) */}
          <div className="absolute left-[10%] md:left-[15%] w-[300px] h-[420px] transform scale-90 -translate-x-12 z-10 opacity-60 hover:opacity-100 hover:scale-95 grayscale-[0.5] hover:grayscale-0 transition-opacity duration-300">
             <Tilt3DCard maxTilt={8} speed={0.5} scale={1.02} glowColor="rgba(255,255,255,0.2)">
                <div className="w-full h-full glass-card rounded-[4px] p-6 flex flex-col justify-between relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-platinum/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                    <span className="material-symbols-outlined text-4xl text-platinum-dim">shield_with_heart</span>
                    <span className="text-[10px] font-mono text-white/40 border border-white/10 px-2 py-0.5 rounded">V1.0.4</span>
                    </div>
                    <h3 className="text-2xl font-medium text-white leading-tight mb-2">Seguro Vida<br/>Ilimitada</h3>
                    <p className="text-platinum/50 text-xs font-mono">Standard Protection Protocol</p>
                </div>
                <div className="w-full h-32 rounded bg-black/20 mt-4 border border-white/5 relative overflow-hidden">
                    {/* CSS Grid Pattern representing data */}
                    <div className="absolute inset-0" style={{backgroundImage: "radial-gradient(rgba(229, 228, 226, 0.3) 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
                </div>
                <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center group-hover:border-platinum/30 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Inactive</span>
                    <span className="material-symbols-outlined text-white/40 group-hover:text-platinum group-hover:translate-x-1 transition-all">arrow_forward</span>
                </div>
                </div>
            </Tilt3DCard>
          </div>

          {/* Right Card (Recessed) */}
          <div className="absolute right-[10%] md:right-[15%] w-[300px] h-[420px] transform scale-90 translate-x-12 z-10 opacity-60 hover:opacity-100 hover:scale-95 grayscale-[0.5] hover:grayscale-0 transition-opacity duration-300">
             <Tilt3DCard maxTilt={8} speed={0.5} scale={1.02} glowColor="rgba(197, 160, 89, 0.2)">
                <div className="w-full h-full glass-card rounded-[4px] p-6 flex flex-col justify-between relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-bl from-antique-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                    <span className="material-symbols-outlined text-4xl text-antique-gold/60">trending_up</span>
                    <span className="text-[10px] font-mono text-white/40 border border-white/10 px-2 py-0.5 rounded">V2.1.0</span>
                    </div>
                    <h3 className="text-2xl font-medium text-white leading-tight mb-2">Investimento<br/>Alpha</h3>
                    <p className="text-platinum/50 text-xs font-mono">High-Yield Data Stream</p>
                </div>
                <div className="w-full h-32 rounded bg-black/20 mt-4 border border-white/5 relative overflow-hidden">
                    {/* CSS Grid Pattern representing data */}
                    <div className="absolute inset-0" style={{backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(197, 160, 89, .1) 25%, rgba(197, 160, 89, .1) 26%, transparent 27%, transparent 74%, rgba(197, 160, 89, .1) 75%, rgba(197, 160, 89, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(197, 160, 89, .1) 25%, rgba(197, 160, 89, .1) 26%, transparent 27%, transparent 74%, rgba(197, 160, 89, .1) 75%, rgba(197, 160, 89, .1) 76%, transparent 77%, transparent)", backgroundSize: "30px 30px"}}></div>
                </div>
                <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center group-hover:border-antique-gold/30 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Inactive</span>
                    <span className="material-symbols-outlined text-white/40 group-hover:text-antique-gold group-hover:translate-x-1 transition-all">arrow_forward</span>
                </div>
                </div>
            </Tilt3DCard>
          </div>

          {/* Center Card (Promoted & Focused) */}
          <div className="absolute z-30 w-[340px] h-[480px]">
             <Tilt3DCard maxTilt={12} speed={0.4} scale={1.03} glowEffect={true} glowColor="rgba(197, 160, 89, 0.4)" shine={true}>
                <div className="w-full h-full glass-card-promoted rounded-[6px] p-8 flex flex-col relative overflow-hidden backdrop-blur-3xl h-full">
                {/* Ambient Light effects inside the card */}
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-antique-gold/20 blur-[80px] rounded-full pointer-events-none mix-blend-screen"></div>
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-gold-dim/20 to-transparent pointer-events-none"></div>
                
                {/* Promoted Badge */}
                <div className="absolute top-0 right-0">
                    <div className="bg-antique-gold text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg shadow-[0_0_15px_rgba(197,160,89,0.5)] font-mono">
                        SOVEREIGN CLASS
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-20 flex-1 flex flex-col">
                    <div className="mb-8 mt-2">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-antique-gold to-gold-dim flex items-center justify-center shadow-lg shadow-antique-gold/20 mb-6">
                        <span className="material-symbols-outlined text-black text-2xl">directions_car</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white leading-none mb-2 tracking-tight">Consórcio<br/>Porsche</h2>
                    <p className="text-antique-gold/70 text-sm font-mono tracking-wide">PROMOTED ENTITY</p>
                    </div>

                    {/* Visualization Area */}
                    <div className="flex-1 bg-black/40 rounded border border-antique-gold/20 relative overflow-hidden mb-6 group-hover:border-antique-gold/40 transition-colors">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-70 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-110"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                        <div className="flex gap-2">
                        <div className="h-1 w-1/3 bg-antique-gold/80 rounded-full shadow-[0_0_8px_rgba(197,160,89,1)]"></div>
                        <div className="h-1 w-1/4 bg-antique-gold/30 rounded-full"></div>
                        <div className="h-1 w-1/4 bg-antique-gold/30 rounded-full"></div>
                        </div>
                    </div>
                    </div>

                    {/* Internal Card Stats */}
                    <div className="grid grid-cols-2 gap-4 border-t border-antique-gold/20 pt-4 mb-4 font-mono">
                    <div>
                        <p className="text-[10px] text-white/40 uppercase">Interest</p>
                        <p className="text-lg font-bold text-white">0.0%</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-white/40 uppercase">Term</p>
                        <p className="text-lg font-bold text-white">80 Mo</p>
                    </div>
                    </div>
                </div>
                </div>
            </Tilt3DCard>
          </div>

          {/* Navigation Controls (Floating below stack) */}
          <div className="absolute -bottom-16 flex gap-8 z-20">
            <button className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all backdrop-blur-sm group cursor-pointer">
              <span className="material-symbols-outlined group-hover:-translate-x-0.5 transition-transform">chevron_left</span>
            </button>
            <button className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all backdrop-blur-sm group cursor-pointer">
              <span className="material-symbols-outlined group-hover:translate-x-0.5 transition-transform">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Primary Action */}
        <div className="materialize-btn mt-24 z-20 relative animate-float-delayed">
          <div className="absolute -inset-4 bg-antique-gold/20 blur-xl rounded-full"></div>
          <button className="relative flex min-w-[200px] cursor-pointer items-center justify-center rounded-sm h-14 px-8 bg-antique-gold hover:bg-white text-obsidian gap-3 text-sm font-bold tracking-[0.1em] border border-antique-gold/50 shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all active:scale-95 group overflow-hidden">
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></div>
            <span className="material-symbols-outlined">move_down</span>
            <span>MATERIALIZE PORTAL</span>
          </button>
        </div>
      </main>

      {/* Footer / Meta Data */}
      <footer className="relative z-10 w-full px-10 py-6 border-t border-glass-border bg-void/80 backdrop-blur-sm mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest">
                Coordinates: 45.22.11
            </p>
            <div className="h-3 w-[1px] bg-white/10"></div>
            <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest">
                V2.0.4 stable
            </p>
          </div>
          <p className="text-antique-gold/60 text-xs font-mono animate-pulse">
            System ready. Awaiting selection...
          </p>
          <div className="flex gap-2">
            <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-antique-gold/50"></div>
            </div>
          </div>
        </div>
      </footer>

      {/* Decorative Corner HUD elements */}
      <div className="fixed top-24 left-6 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none z-0 hidden md:block"></div>
      <div className="fixed top-24 right-6 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none z-0 hidden md:block"></div>
      <div className="fixed bottom-24 left-6 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-0 hidden md:block"></div>
      <div className="fixed bottom-24 right-6 w-32 h-[1px] bg-gradient-to-l from-transparent via-white/20 to-transparent pointer-events-none z-0 hidden md:block"></div>
    </div>
  );
}
