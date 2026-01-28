"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string; // Additional classes
}

export default function MagneticButton({ children, className = "", ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull effect
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: buttonRef });

  return (
    <button
      ref={buttonRef}
      className={`relative inline-flex items-center justify-center transition-transform ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
