"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionOracle() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef);

    // Initial State
    gsap.set(containerRef.current, { opacity: 0 });
    gsap.set(q(".orb-container"), { scale: 0, opacity: 0 });
    gsap.set(q("header"), { y: -20, opacity: 0 });
    gsap.set(q(".oracle-content > *"), { y: 20, opacity: 0 });

    // Entrance Sequnece
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
        }
    });

    tl.to(containerRef.current, { opacity: 1, duration: 1 })
      .to(q("header"), { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .to(q(".orb-container"), { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.7)" }, "-=0.5")
      .to(q(".oracle-content > *"), { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=1");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex flex-col bg-void text-platinum-mist font-sans overflow-hidden antialiased selection:bg-antique-gold selection:text-black">
      <style jsx>{`
        .orb-particles {
            background-image: radial-gradient(circle, #C5A059 1.5px, transparent 1.5px);
            background-size: 20px 20px;
            mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
            -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
        }
        .input-glow:focus {
            box-shadow: 0 10px 30px -10px rgba(197, 160, 89, 0.2);
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
        }
        .event-horizon-ring {
            background: conic-gradient(
                from 0deg,
                transparent,
                rgba(197, 160, 89, 0.1),
                rgba(138, 113, 34, 0.6),
                rgba(197, 160, 89, 0.9),
                rgba(138, 113, 34, 0.6),
                rgba(197, 160, 89, 0.1),
                transparent
            );
            filter: blur(12px);
        }
      `}</style>

      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(197,160,89,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(197,160,89,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0 opacity-30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(10,10,10,0.8),_transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none z-50 mix-blend-overlay"></div>

      <header className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 border-b border-white/5 bg-void/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-8 text-antique-gold">
            <span className="material-symbols-outlined text-3xl">token</span>
          </div>
          <h2 className="text-white text-sm font-bold tracking-[0.2em] uppercase font-sans">Genesis <span className="text-antique-gold/70">Protocol</span></h2>
        </div>
        <nav className="hidden md:flex flex-1 justify-center gap-12">
          <a className="text-gray-500 hover:text-antique-gold text-xs font-mono uppercase tracking-widest transition-colors" href="#">Vault</a>
          <a className="text-gray-500 hover:text-antique-gold text-xs font-mono uppercase tracking-widest transition-colors" href="#">Concierge</a>
          <a className="text-antique-gold text-xs font-mono uppercase tracking-widest flex items-center gap-2 drop-shadow-[0_0_8px_rgba(197,160,89,0.3)]" href="#">
            <span className="size-1.5 rounded-full bg-antique-gold"></span>
            Oracle Online
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 px-5 py-2 bg-white/5 hover:bg-antique-gold/10 border border-white/10 hover:border-antique-gold/50 rounded-sm text-xs font-mono font-bold uppercase tracking-widest transition-all text-gray-300 hover:text-antique-gold hover:shadow-[0_0_15px_rgba(197,160,89,0.2)] cursor-pointer">
            <span className="material-symbols-outlined text-sm">fingerprint</span>
            <span>Auth_ID</span>
          </button>
          <button className="md:hidden text-white cursor-pointer">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      <main className="relative flex-grow flex flex-col items-center justify-center w-full z-10 px-4">
        <div className="flex flex-col items-center justify-center w-full max-w-4xl space-y-12">
          <div className="flex flex-col items-center gap-2 opacity-80">
            <span className="text-[10px] text-antique-gold font-mono tracking-[0.3em] uppercase border-b border-antique-gold/30 pb-1">Sovereign Interface v9.0</span>
          </div>
          
          <div className="orb-container relative flex items-center justify-center group">
            <div className="absolute w-[400px] h-[400px] rounded-full event-horizon-ring animate-[spin_30s_linear_infinite] opacity-40 mix-blend-screen"></div>
            <div className="absolute w-[320px] h-[320px] rounded-full bg-antique-gold/5 blur-[60px] pointer-events-none"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center overflow-visible">
              <div className="absolute inset-0 rounded-full bg-black border border-white/5 z-20"></div>
              <div className="absolute inset-0 rounded-full border-[1px] border-antique-gold/30 shadow-[0_0_30px_rgba(197,160,89,0.2)] z-30"></div>
              <div className="absolute inset-[-40px] rounded-full orb-particles opacity-30 animate-[spin_60s_linear_infinite] z-10"></div>
              <div className="absolute inset-0 rounded-full orb-particles opacity-20 rotate-45 scale-75 z-10"></div>
              <div className="absolute w-32 h-32 bg-antique-gold rounded-full blur-[50px] opacity-10 mix-blend-screen z-10"></div>
              <svg className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] text-antique-gold/40 animate-[spin_40s_linear_infinite_reverse] z-30" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="49.5" stroke="currentColor" strokeDasharray="0.5 8" strokeWidth="0.3"></circle>
                <circle cx="50" cy="50" fill="none" opacity="0.4" r="45" stroke="currentColor" strokeDasharray="2 6" strokeWidth="0.1"></circle>
              </svg>
              <div className="z-40 flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-platinum-mist mix-blend-overlay opacity-90">visibility</span>
              </div>
            </div>
          </div>

          <div className="oracle-content w-full max-w-2xl relative z-20">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight">
                The Oracle
              </h1>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-void-depth via-antique-gold to-void-depth opacity-20 group-focus-within:opacity-60 transition duration-1000 blur rounded-lg"></div>
              <div className="relative flex items-center bg-black rounded-lg border border-white/10 group-focus-within:border-antique-gold/50 p-1">
                <div className="pl-4 pr-2 text-antique-gold">
                  <span className="material-symbols-outlined text-lg">terminal</span>
                </div>
                <input autoComplete="off" className="w-full bg-transparent border-0 focus:ring-0 text-white font-mono text-lg placeholder-gray-600 py-4 caret-antique-gold outline-none" placeholder="Tell me your desire..." spellCheck="false" type="text"/>
                <button className="px-6 py-2 m-1 bg-white/5 hover:bg-antique-gold hover:text-black text-antique-gold rounded-sm font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer">
                    Execute
                </button>
              </div>
              <div className="flex justify-between mt-3 px-2">
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                  <span className="text-antique-gold">&gt;&gt;</span> Encryption: Sovereign-Grade
                </p>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                  Latency: 1ms
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden xl:flex absolute bottom-12 left-12 flex-col gap-4 w-64 oracle-content">
          <div className="flex flex-col gap-1 p-4 border-l-2 border-antique-gold/30 bg-gradient-to-r from-antique-gold/5 to-transparent backdrop-blur-sm">
            <div className="flex justify-between items-center text-antique-gold/80 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest">Neural Sync</span>
              <span className="material-symbols-outlined text-sm">hub</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-mono text-white">98.4%</span>
              <span className="text-[10px] text-gray-400 mb-1">STABLE</span>
            </div>
            <div className="w-full h-0.5 bg-gray-800 mt-2">
              <div className="w-[98%] h-full bg-antique-gold shadow-[0_0_10px_#C5A059]"></div>
            </div>
          </div>
          <div className="text-[10px] text-gray-600 font-mono">
            System_ID: GEN-001<br/>
            Node: Alpha_Centauri
          </div>
        </div>

        <div className="hidden xl:flex absolute bottom-12 right-12 flex-col gap-4 w-64 text-right oracle-content">
          <div className="flex flex-col gap-1 p-4 border-r-2 border-platinum-mist/20 bg-gradient-to-l from-void/30 to-transparent backdrop-blur-sm">
            <div className="flex justify-end items-center text-platinum-dim mb-2 gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest">Market Sentiment</span>
              <span className="material-symbols-outlined text-sm">show_chart</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xl font-mono text-white">BULLISH</span>
              <span className="text-[10px] text-antique-gold font-mono mt-1">AI CONFIDENCE: HIGH</span>
            </div>
          </div>
          <div className="flex justify-end gap-1">
            <div className="h-1 w-1 bg-antique-gold rounded-full"></div>
            <div className="h-1 w-1 bg-antique-gold rounded-full opacity-50"></div>
            <div className="h-1 w-1 bg-antique-gold rounded-full opacity-25"></div>
          </div>
        </div>
      </main>

      <footer className="relative z-20 w-full border-t border-white/5 bg-void/80 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 md:px-12 gap-4">
          <div className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">
            © 2024 Genesis Protocol.
          </div>
          <div className="flex items-center gap-8">
            <a className="text-gray-600 hover:text-white text-[10px] font-mono uppercase tracking-widest transition-colors" href="#">Legal</a>
            <a className="text-gray-600 hover:text-white text-[10px] font-mono uppercase tracking-widest transition-colors" href="#">Privacy</a>
            <a className="text-gray-600 hover:text-white text-[10px] font-mono uppercase tracking-widest transition-colors" href="#">Manifesto</a>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="size-1.5 bg-antique-gold rounded-full shadow-[0_0_8px_rgba(197,160,89,0.8)]"></span>
            <span className="text-[10px] text-antique-gold font-mono uppercase tracking-wider">Connected</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
