"use client";

import React from "react";
import SovereignCursor from "@/components/cursor/SovereignCursor";
import GenesisPreloader from "@/components/preloader/GenesisPreloader";
import SpiralVortexMenu, { useSpiralMenu } from "@/components/menu/SpiralVortexMenu";

export default function SovereignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, close, toggle } = useSpiralMenu();

  return (
    <>
      <GenesisPreloader minDuration={2500} />
      <SovereignCursor 
        color="#d4af35"
        magnetic={true}
        blend={true}
      />
      <SpiralVortexMenu 
        isOpen={isOpen} 
        onClose={close} 
      />
      
      {/* Optional: Add a trigger button if keyboard is not enough */}
      <div className="fixed top-6 right-6 z-50 mix-blend-difference pointer-events-none">
          <button 
             onClick={toggle}
             className="pointer-events-auto text-white/50 hover:text-white transition-colors uppercase text-[10px] tracking-[0.2em] font-mono"
             style={{ writingMode: 'vertical-rl' }}
          >
             Menu [M]
          </button>
      </div>

      {children}
    </>
  );
}
