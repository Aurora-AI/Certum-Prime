"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AsymmetricalMediaProps {
  imageSrc: string;
  videoSrc?: string;
  alignment?: "left" | "right";
  rotation?: "cw" | "ccw"; // Clockwise or Counter-Clockwise
  className?: string;
  caption?: string;
}

export default function AsymmetricalMedia({
  imageSrc,
  videoSrc,
  alignment = "left",
  rotation = "cw",
  className = "",
  caption
}: AsymmetricalMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !frameRef.current || !mediaRef.current) return;

    const rotVal = rotation === "cw" ? 5 : -5;
    const alignX = alignment === "left" ? -50 : 50;

    // 1. Entrance & Rotation (The "Crooked" Effect)
    gsap.fromTo(frameRef.current, 
      { 
        rotation: rotVal * -1.5, // Start exaggerated
        scale: 0.9,
        y: 100
      },
      {
        rotation: rotVal, // End slightly crooked
        scale: 1,
        y: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1
        }
      }
    );

    // 2. Parallax (Inner Media moves faster than Frame)
    gsap.fromTo(mediaRef.current,
        { scale: 1.2, y: "-10%" },
        { 
            y: "10%",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        }
    );

    // 3. Video Reveal (If video exists)
    if (videoSrc && imageRef.current && videoRef.current) {
        gsap.to(imageRef.current, {
            opacity: 0,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "center 70%", // Start fading when getting close to center
                end: "center 40%",
                scrub: true,
                onEnter: () => videoRef.current?.play(),
                onEnterBack: () => videoRef.current?.play(),
            }
        });
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={`relative w-full py-24 md:py-48 flex ${alignment === "left" ? "justify-start" : "justify-end"} ${className}`}>
        
        {/* The Frame */}
        <div 
            ref={frameRef}
            className={`
                relative w-[80vw] md:w-[50vw] aspect-[4/5] md:aspect-[16/9] 
                overflow-hidden 
                ${alignment === 'left' ? 'md:ml-[10%]' : 'md:mr-[10%]'}
                will-change-transform
            `}
            style={{ borderRadius: '4px' }}
        >
            {/* Inner Scale Container for Parallax */}
            <div ref={mediaRef} className="absolute inset-0 w-full h-full -top-[10%] h-[120%]">
                
                {/* Video Layer (Bottom) */}
                {videoSrc && (
                    <video 
                        ref={videoRef}
                        src={videoSrc}
                        muted 
                        loop 
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                {/* Image Layer (Top) */}
                <div ref={imageRef} className="absolute inset-0 z-10 w-full h-full">
                     <img 
                        src={imageSrc} 
                        alt="Sovereign Visual" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Overlay for cinematic mood */}
                <div className="absolute inset-0 z-20 bg-black/10 mix-blend-overlay pointer-events-none"></div>
            </div>
        </div>

        {/* Decoration / Caption */}
        {caption && (
             <div className={`absolute top-1/2 -translate-y-1/2 ${alignment === 'left' ? 'right-[15%] text-right' : 'left-[15%] text-left'} hidden md:block z-0 mix-blend-difference text-white`}>
                <p className="font-serif italic text-2xl md:text-4xl opacity-80 max-w-xs leading-tight">
                    {caption}
                </p>
             </div>
        )}

    </section>
  );
}
