"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionChaosOrder() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef);
    
    // Animate Chaos Side
    gsap.from(q(".chaos-content > *"), {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // Animate Order Side
    gsap.from(q(".order-content > *"), {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      delay: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex flex-col md:flex-row font-sans antialiased overflow-hidden selection:bg-gold selection:text-black">
       <style jsx>{`
        .glitch-text {
            position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
        }
        .glitch-text::before {
            left: 2px;
            text-shadow: -1px 0 #ff00c1;
            clip-path: inset(44% 0 61% 0);
            animation: glitch 2.5s infinite;
        }
        .glitch-text::after {
            left: -2px;
            text-shadow: -1px 0 #00fff9;
            clip-path: inset(58% 0 43% 0);
            animation: glitch 2.5s infinite reverse;
        }
        @keyframes glitch {
           0% { clip-path: inset(40% 0 61% 0); }
           20% { clip-path: inset(92% 0 1% 0); }
           40% { clip-path: inset(43% 0 1% 0); }
           60% { clip-path: inset(25% 0 58% 0); }
           80% { clip-path: inset(54% 0 7% 0); }
           100% { clip-path: inset(58% 0 43% 0); }
        }
        .cinematic-purple {
            background: radial-gradient(circle at center, #2e0f5c 0%, #0a0412 85%, #050208 100%);
        }
      `}</style>

      {/* CHAOS SECTION */}
      <section className="relative w-full md:w-[30%] cinematic-purple flex flex-col justify-center p-8 md:p-12 overflow-hidden border-r border-white/10 z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.65%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22%20opacity=%220.15%22/%3E%3C/svg%3E')] opacity-50 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none select-none">
          <div className="absolute top-10 left-[-20px] text-9xl font-bold text-deep-purple/40 rotate-12 blur-[2px]">ERROR</div>
          <div className="absolute bottom-20 right-[-40px] text-8xl font-mono text-deep-purple/60 -rotate-6">404</div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-purple-glow/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/4 right-10 w-32 h-[1px] bg-purple-glow/30 rotate-45"></div>
          <div className="absolute bottom-1/3 left-10 w-[1px] bg-purple-glow/30 h-32 -rotate-12"></div>
        </div>
        
        <div className="chaos-content relative z-10 space-y-6">
          <div className="inline-block px-2 py-1 bg-deep-purple/60 border border-purple-glow/30 text-purple-300 text-[10px] font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(147,51,234,0.1)]">
            System Failure
          </div>
          <h2 className="glitch-text text-4xl md:text-5xl font-black uppercase leading-tight tracking-tighter text-white/90 mix-blend-screen" data-text="The Chaos of Wealth">
            The Chaos<br/>of Wealth
          </h2>
          <p className="text-purple-200/60 text-sm font-mono leading-relaxed max-w-xs border-l-2 border-purple-glow/40 pl-4">
            Fragmented assets. <br/>
            Sovereignty lost in noise. <br/>
            The entropy of the old world consumes value without structure.
          </p>
          <div className="pt-8">
            <div className="h-px w-24 bg-purple-glow/30 mb-2"></div>
            <div className="text-[10px] font-mono text-purple-400/50 opacity-60">ERR_CONNECTION_UNSECURE</div>
          </div>
        </div>
      </section>

      {/* ORDER SECTION */}
      <section className="relative w-full md:w-[70%] bg-black flex flex-col justify-center items-center p-12 md:p-24 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        <div className="absolute top-12 right-12 flex items-center gap-4">
          <div className="text-right">
            <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Status</div>
            <div className="text-xs text-gold font-serif italic">Optimized</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#D4AF37]"></div>
        </div>
        
        <div className="absolute bottom-12 left-12 text-[10px] text-gray-600 font-mono tracking-widest">
            GENESIS.PROTOCOL.V1 // 99.9% UPTIME
        </div>

        <div className="order-content relative z-10 max-w-2xl">
          <div className="mb-8 flex justify-center">
            <span className="material-symbols-outlined text-gold text-4xl font-light opacity-80">balance</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#F5E6C8] tracking-tight leading-none mb-8">
            The Genesis<br/>
            <span className="italic font-light opacity-90">Order</span>
          </h1>
          <div className="w-px h-16 bg-gradient-to-b from-gold/0 via-gold/50 to-gold/0 mx-auto mb-8"></div>
          <p className="text-gray-400 font-light tracking-wide text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            Absolute clarity in a world of noise. Structuring sovereign wealth through deep-tech precision and swiss-tier security.
          </p>
          <div className="mt-12">
            <button className="group relative px-8 py-3 bg-transparent border border-gold/30 text-gold hover:bg-gold/5 transition-all duration-500 overflow-hidden cursor-pointer">
              <span className="relative z-10 text-xs font-bold uppercase tracking-[0.25em]">Restore Order</span>
              <div className="absolute inset-0 bg-gold/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </button>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_85%)] pointer-events-none opacity-60"></div>
      </section>
    </div>
  );
}
