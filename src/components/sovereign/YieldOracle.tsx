"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function YieldOracle() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Blinking cursor e terminais
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(".cursor-blink", { opacity: 0, duration: 0.1 })
      .to(".cursor-blink", { opacity: 1, duration: 0.1, delay: 0.5 });
      
    // Streaming data simulation
    const items = gsap.utils.toArray<HTMLElement>(".data-stream-item");
    gsap.from(items, {
        y: 10,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
        }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-full bg-void-depth border border-white/5 rounded-sm p-6 relative overflow-hidden font-mono text-[10px] md:text-xs">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
        <div className="flex items-center gap-2 text-antique-gold">
            <span className="material-symbols-outlined text-sm">history_edu</span>
            <span className="uppercase tracking-[0.2em]">Oracle Yield</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-900 border border-green-500 animate-pulse"></span>
            <span className="text-gray-500 tracking-widest">LIVE</span>
        </div>
      </div>

      {/* Content Stream */}
      <div className="space-y-3 relative z-10">
        <div className="data-stream-item flex justify-between text-gray-400">
            <span>&gt; ANALYZING REAL ESTATE VECTOR...</span>
            <span className="text-white">COMPLETE</span>
        </div>
        <div className="data-stream-item flex justify-between">
            <span className="text-gray-400">&gt; SOVEREIGN BOND YIELD projected:</span>
            <span className="text-antique-gold font-bold">12.4% APY</span>
        </div>
        <div className="data-stream-item flex justify-between">
            <span className="text-gray-400">&gt; PRIVATE EQUITY LIQUIDITY:</span>
            <span className="text-antique-gold font-bold">HIGH</span>
        </div>
        <div className="data-stream-item flex justify-between text-gray-500 mt-4 border-t border-white/5 pt-2 opacity-60">
            <span>&gt; SYSTEM RECOMMENDATION:</span>
        </div>
        <div className="data-stream-item text-platinum-mist uppercase tracking-widest ">
             ALLOCATE SURPLUS TO SECTOR 7G <span className="cursor-blink bg-antique-gold w-2 h-4 inline-block align-middle ml-1"></span>
        </div>
      </div>

      {/* Decorative Scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-antique-gold/5 to-transparent h-[20%] w-full animate-[scan_4s_linear_infinite] pointer-events-none"></div>
    </div>
  );
}
