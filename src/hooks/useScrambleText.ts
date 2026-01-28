"use client";

import { useEffect, useState, useRef } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export function useScrambleText(text: string, duration: number = 2000, trigger: boolean = false) {
    const [display, setDisplay] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!trigger) return;

        let iteration = 0;
        const totalIterations = text.length * 5; // How many shuffles per letter roughly
        
        clearInterval(intervalRef.current!);

        intervalRef.current = setInterval(() => {
            setDisplay(prev => text.split("").map((letter, index) => {
                if (index < iteration) {
                    return text[index];
                }
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join(""));

            if (iteration >= text.length) {
                clearInterval(intervalRef.current!);
                setDisplay(text); // Ensure clean final state
            }

            iteration += 1 / (duration / (text.length * 50)); // Pacing
            
        }, 30); // Frame rate 30ms

        return () => clearInterval(intervalRef.current!);
    }, [text, duration, trigger]);

    return display;
}
