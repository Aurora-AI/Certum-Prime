"use client";

import React, { useRef, useEffect } from 'react';

// Sovereign Starfield (Canvas 2D)
// Simulates a subtle galaxy orbiting the Event Horizon
export default function SovereignStarfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrameId: number;

        // Configuration
        const STAR_COUNT = 500; // Increased count
        const SPEED = 0.15; // 3x Faster Rotation
        
        type Star = {
            x: number, 
            y: number,
            z: number,
            currX: number,
            currY: number,
            size: number,
            color: string,
            angle: number,
            radius: number, 
            orbitSpeed: number,
            pulseOffset: number
        };

        const stars: Star[] = [];

        const colors = [
            'rgba(212, 175, 53, 0.9)', // Gold
            'rgba(255, 255, 255, 0.8)', // White
            'rgba(255, 229, 180, 0.6)', // Pale Gold
            'rgba(197, 160, 89, 0.4)', // Darker Gold
        ];

        // Initialize Stars
        const initStars = () => {
            stars.length = 0;
            const maxRadius = Math.max(width, height) * 0.8;
            
            for (let i = 0; i < STAR_COUNT; i++) {
                const radius = Math.random() * maxRadius + 50; 
                const angle = Math.random() * Math.PI * 2;
                
                stars.push({
                    x: 0,
                    y: 0,
                    z: Math.random() * 2,
                    currX: 0,
                    currY: 0,
                    size: Math.random() * 1.8, // Slightly larger
                    color: colors[Math.floor(Math.random() * colors.length)],
                    angle: angle,
                    radius: radius,
                    orbitSpeed: (SPEED / radius) * 300 * (Math.random() > 0.5 ? 1 : 1),
                    pulseOffset: Math.random() * Math.PI * 2
                });
            }
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        // Render Loop
        const render = () => {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; // Trail effect
            ctx.fillRect(0, 0, width, height);
            
            // Hard Clear for cleaner look (uncomment if trails are too messy)
            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            stars.forEach(star => {
                // Update
                star.angle += star.orbitSpeed * 0.01;
                
                // Orbit Logic (Ellipse)
                const x = Math.cos(star.angle) * star.radius;
                const y = Math.sin(star.angle) * star.radius * 0.4; 

                // Project
                star.currX = centerX + x;
                star.currY = centerY + y;

                // Pulsate Size
                const pulse = 1 + Math.sin(Date.now() * 0.003 + star.pulseOffset) * 0.3;
                const currentSize = star.size * pulse;

                // Draw
                const distFromCenter = Math.sqrt(x*x + y*y);
                const opacity = Math.max(0, 1 - (distFromCenter / (Math.max(width, height) * 0.6)));

                ctx.beginPath();
                ctx.arc(star.currX, star.currY, currentSize, 0, Math.PI * 2);
                ctx.fillStyle = star.color.replace(')', `, ${opacity})`).replace('rgba', 'rgba'); 
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resize);
        resize();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60 mix-blend-screen"
        />
    );
}
