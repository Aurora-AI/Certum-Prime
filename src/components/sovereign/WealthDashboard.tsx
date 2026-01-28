"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import AssetRing from "./AssetRing";
import YieldOracle from "./YieldOracle";

gsap.registerPlugin(ScrollTrigger);

export default function WealthDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance Animation
    gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
        }
    });

    const q = gsap.utils.selector(containerRef);
    gsap.from(q(".dash-panel"), {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%"
        }
    });

  }, { scope: containerRef });

  return (
    <div className="w-full min-h-screen bg-void text-platinum-mist font-sans flex items-center justify-center p-4 md:p-12 relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(197,160,89,0.05),_transparent_70%)] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-void-depth border border-white/5 rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none opacity-50"></div>

        <div ref={containerRef} className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* COLUMN 1: ID & Status (3 Cols) */}
            <div className="lg:col-span-3 flex flex-col gap-6">
                {/* ID Card */}
                <div className="dash-panel p-8 bg-void-depth/50 border border-white/5 backdrop-blur-md rounded-sm min-h-[300px] flex flex-col justify-between group hover:border-antique-gold/30 transition-colors duration-500">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <span className="material-symbols-outlined text-antique-gold text-3xl">shield_person</span>
                            <span className="text-[10px] font-mono border border-antique-gold/30 text-antique-gold px-2 py-1 rounded-sm">VERIFIED</span>
                        </div>
                        <h2 className="text-xl font-serif text-white mb-1">Rodobens Wealth</h2>
                        <p className="text-xs text-gray-500 font-mono tracking-wider">GENESIS ID: 884-XJ</p>
                    </div>
                    
                    <div className="space-y-4">
                         <div>
                            <p className="text-[10px] uppercase text-gray-600 tracking-widest mb-1">Sovereign Tier</p>
                            <p className="text-2xl font-serif italic text-antique-gold">Imperator</p>
                        </div>
                        <div className="h-px w-full bg-white/10"></div>
                        <div className="flex justify-between items-center">
                             <span className="text-[10px] uppercase text-gray-600 tracking-widest">Access Level</span>
                             <span className="text-xs font-mono text-white">UNLIMITED</span>
                        </div>
                    </div>
                </div>

                <div className="dash-panel p-6 bg-void-depth/50 border border-white/5 backdrop-blur-md rounded-sm flex-1 flex flex-col justify-center gap-3">
                     <button className="w-full py-3 bg-white/5 hover:bg-antique-gold hover:text-black border border-white/10 hover:border-antique-gold transition-all rounded-sm text-xs uppercase tracking-widest font-mono text-left px-4 flex justify-between items-center group/btn">
                        <span>Royal Concierge</span>
                        <span className="material-symbols-outlined text-sm opacity-50 group-hover/btn:opacity-100">diversity_3</span>
                     </button>
                     <button className="w-full py-3 bg-white/5 hover:bg-antique-gold hover:text-black border border-white/10 hover:border-antique-gold transition-all rounded-sm text-xs uppercase tracking-widest font-mono text-left px-4 flex justify-between items-center group/btn">
                        <span>Initiate Liquidity</span>
                        <span className="material-symbols-outlined text-sm opacity-50 group-hover/btn:opacity-100">currency_exchange</span>
                     </button>
                </div>
            </div>

            {/* COLUMN 2: Main Wealth View (6 Cols) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
                 {/* Total AUM Display */}
                <div className="dash-panel p-10 bg-gradient-to-b from-void-depth to-black border border-white/5 rounded-sm text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-antique-gold to-transparent opacity-50"></div>
                    
                    <p className="text-xs font-mono text-antique-gold uppercase tracking-[0.3em] mb-4 opacity-80">Total Assets Under Management</p>
                    <h1 className="text-5xl md:text-7xl font-sans font-light text-white tracking-tighter mb-4">
                        <span className="text-2xl align-top opacity-50 mr-2">$</span>
                        128<span className="text-gray-600">,</span>450<span className="text-gray-600">,</span>000
                    </h1>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/20 border border-green-800 rounded-full">
                        <span className="material-symbols-outlined text-green-500 text-xs">trending_up</span>
                        <span className="text-[10px] font-mono text-green-500 tracking-wider">+4.2% THIS MONTH</span>
                    </div>
                </div>

                {/* Allocation Rings */}
                <div className="dash-panel grid grid-cols-1 sm:grid-cols-3 gap-0 bg-void-depth/30 border border-white/5 rounded-sm p-6 backdrop-blur-sm">
                    <AssetRing percentage={45} label="Real Estate" subLabel="Stable Growth" color="#C5A059" delay={0.2} />
                    <AssetRing percentage={30} label="Private Equity" subLabel="High Yield" color="#8a7122" delay={0.4} />
                    <AssetRing percentage={25} label="Liquid Gold" subLabel="Inflation Hedge" color="#E5E4E2" delay={0.6} />
                </div>
            </div>

            {/* COLUMN 3: Oracle & Feed (3 Cols) */}
            <div className="lg:col-span-3 flex flex-col gap-6">
                <div className="dash-panel flex-1">
                    <YieldOracle />
                </div>
                
                <div className="dash-panel p-6 bg-void-depth/50 border border-white/5 rounded-sm h-[200px] flex flex-col relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">Priority Intel</span>
                         <span className="w-5 h-5 rounded-full bg-antique-gold text-black text-[10px] font-bold flex items-center justify-center">2</span>
                    </div>
                    <div className="space-y-4">
                        <div className="group cursor-pointer">
                            <h4 className="text-xs text-white group-hover:text-antique-gold transition-colors">Alpha Vector Detected</h4>
                            <p className="text-[10px] text-gray-500 truncate">System recommends immediate capital deployment...</p>
                        </div>
                         <div className="w-full h-px bg-white/5"></div>
                         <div className="group cursor-pointer">
                            <h4 className="text-xs text-white group-hover:text-antique-gold transition-colors">Sovereign Opportunity: Project 88</h4>
                            <p className="text-[10px] text-gray-500 truncate">Restricted allocation window opening...</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}
