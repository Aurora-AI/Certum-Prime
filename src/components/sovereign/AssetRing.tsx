"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface AssetRingProps {
  percentage: number;
  label: string;
  subLabel: string;
  color?: string; // Default to Antique Gold if not provided
  delay?: number;
}

export default function AssetRing({ 
  percentage, 
  label, 
  subLabel, 
  color = "var(--color-antique-gold)", 
  delay = 0 
}: AssetRingProps) {
  const circleRef = React.useRef<SVGCircleElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Circle config
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useGSAP(() => {
    if (!circleRef.current) return;

    gsap.fromTo(circleRef.current, 
      { strokeDashoffset: circumference },
      { 
        strokeDashoffset: strokeDashoffset, 
        duration: 2, 
        ease: "power3.out",
        delay: delay + 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
      }
    );

    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out",
      delay: delay,
       scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%"
        }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center relative p-4 group cursor-default">
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-full blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
        style={{ background: color }}
      ></div>

      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90 overflow-visible"
        >
          {/* Background Ring */}
          <circle
            stroke="var(--color-void-depth)"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="opacity-50"
          />
          {/* Progress Ring */}
          <circle
            ref={circleRef}
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset: circumference }}
            strokeLinecap="butt"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-300"
          />
        </svg>

        {/* Center Percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-mono font-light text-white tracking-tighter">
                {percentage}<span className="text-xs text-gray-500">%</span>
            </span>
        </div>
      </div>

      {/* Labeling */}
      <div className="mt-4 text-center">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-platinum-mist mb-1 group-hover:text-white transition-colors">
            {label}
        </h4>
        <p className="text-[10px] font-mono text-gray-500 tracking-wider">
            {subLabel}
        </p>
      </div>
    </div>
  );
}
