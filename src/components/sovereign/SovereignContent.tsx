"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";
import Link from 'next/link';
import AsymmetricalMedia from "./AsymmetricalMedia";
import TextSplitReveal from "@/components/effects/TextSplitReveal";
import { VelocityWrapper } from "@/components/effects/ScrollVelocity";

gsap.registerPlugin(ScrollTrigger);

export default function SovereignContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ═══════════════════════════════════════════════════════════════
    // HERO ENTRANCE (Staggered)
    // ═══════════════════════════════════════════════════════════════
    // Note: The Hero itself is handled by HeroEventHorizon. 
    // This handles the entrance of the CONTENT sections below it.
    
    // ═══════════════════════════════════════════════════════════════
    // SCROLL-TRIGGERED ANIMATIONS
    // ═══════════════════════════════════════════════════════════════
    
    // ═══════════════════════════════════════════════════════════════
    // SCROLL-TRIGGERED ANIMATIONS
    // ═══════════════════════════════════════════════════════════════
    
    // ═══════════════════════════════════════════════════════════════
    // SCROLL-TRIGGERED ANIMATIONS
    // ═══════════════════════════════════════════════════════════════
    
    // ═══════════════════════════════════════════════════════════════
    // SCROLL-TRIGGERED ANIMATIONS
    // ═══════════════════════════════════════════════════════════════
    
    // Reverse Funnel Effect (Big Bang) - Synchronized with Hero
    const runFunnelEffect = () => {
        const streamCards = gsap.utils.toArray<HTMLElement>('.stream-card');
        const container = document.querySelector('#streamContainer');
        
        // We sync this trigger EXACTLY with the HeroEventHorizon spacer
        // The Hero spacer is 200vh. The funnel effect should complete as the Hero finishes opening.
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        streamCards.forEach((card, i) => {
            // Get final state
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            const xDist = centerX - cardCenterX;
            const yDist = centerY - cardCenterY;

            // FANTASY.CO TRANSFORMATION LOGIC
            // Instead of just moving, we scale HUGE from the center to "pass through" the user
            gsap.fromTo(card, 
                {
                    opacity: 0,
                    scale: 0.2, // Start small in the "distance"
                    z: -1000, // Deep in space
                    x: xDist * 0.5,
                    y: yDist * 0.5,
                    rotationX: 45, // Angled for depth
                }, 
                {
                    opacity: 1,
                    scale: 1,
                    z: 0,
                    x: 0, 
                    y: 0,
                    rotationX: 0,
                    ease: "power1.inOut", // Smooth transition
                    scrollTrigger: {
                        trigger: document.body, // Global scroll trigger
                        start: "top top", 
                        end: "1000px top", // Matches roughly the Hero scroll distance
                        scrub: true // Locked directly to scroll
                    }
                }
            );
        });
    };
    
    // Wait for layout
    const ctx = gsap.context(() => {
        setTimeout(runFunnelEffect, 100);
    });


    // Note: tlText was removed to allow TextSplitReveal to handle its own triggers.


    // Product cards
    const cards = gsap.utils.toArray<HTMLElement>('.card-animate');
    cards.forEach((card, i) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#cardsGrid',
                start: 'top 75%',
            }
        });
    });

    // Fade animations
    const fadeElements = gsap.utils.toArray<HTMLElement>('.fade-animate');
    fadeElements.forEach(el => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
            }
        });
    });

     // Metric Counters
    const metrics = gsap.utils.toArray<HTMLElement>('.metric-number');
    metrics.forEach(el => {
        const value = parseFloat(el.dataset.value || "0");
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        
        ScrollTrigger.create({
            trigger: el,
            start: 'top 80%',
            onEnter: () => {
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: value,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function() {
                        if (value >= 100) {
                            el.textContent = prefix + Math.round(obj.val) + suffix;
                        } else {
                            el.textContent = prefix + obj.val.toFixed(1) + suffix;
                        }
                    }
                });
            },
            once: true
        });
    });

    // CTA Glow
    gsap.to('#ctaGlow', {
        scale: 1.3,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-light-base text-dark-base font-sans antialiased selection:bg-primary selection:text-white relative z-20">
      
      {/* SECTION 2: THE SLIPPERY SLIDE (Product Triptych) */}
      <section ref={slideRef} className="relative w-full h-[400vh] bg-void">
        {/* GRADIENT BRIDGE: Fades from Black (Hero) to Transparent (Content) - SCROLLS AWAY */}
        {/* FIX: Lower z-index so it doesn't obscure cards, reduce height */}
        <div className="absolute top-0 left-0 w-full h-[25vh] bg-gradient-to-b from-void via-void/90 to-transparent z-10 pointer-events-none"></div>

        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center z-20">
            {/* Parallax Stream Container */}
            <div id="streamContainer" className="absolute inset-0 w-full h-full pointer-events-none">


                {/* Card 1: Gold Bullion (Left, Slow) */}
                <div className="stream-card absolute top-[20%] left-[10%] w-64 h-40 bg-gradient-to-br from-[#FEDC77] via-[#D4AF37] to-[#8a7122] rounded-sm shadow-2xl opacity-80 transform rotate-[-12deg] z-10 border border-white/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-[100px] text-black/10 font-bold tracking-tighter">Au</span>
                    </div>
                    <div className="absolute bottom-4 left-4 font-mono text-[10px] text-black/60 font-bold tracking-widest">999.9 FINE GOLD</div>
                </div>

                {/* Card 2: Real Estate Blueprint (Right, Fast) */}
                <div className="stream-card absolute top-[40%] right-[15%] w-72 h-96 bg-[#0A2A4A] rounded-sm shadow-2xl opacity-90 transform rotate-[6deg] z-20 border border-blue-500/30 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
                    <div className="p-6 border-b border-white/10">
                        <div className="text-blue-200/50 font-mono text-[10px] uppercase tracking-widest">Architectural Plan</div>
                        <div className="text-white font-serif text-2xl mt-2">The Spire</div>
                    </div>
                    <div className="absolute bottom-6 right-6 text-white/20 font-mono text-4xl">01</div>
                </div>

                {/* Card 3: Sovereign Bond (Center, Medium) */}
                <div className="stream-card absolute top-[60%] left-[30%] w-80 h-56 bg-[#F8F8F8] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.2)] transform rotate-[-3deg] z-30 border-2 border-[#D4AF37] p-8">
                    <div className="w-full h-full border border-gray-200 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute -right-12 -top-12 w-24 h-24 bg-[#D4AF37]/20 rounded-full blur-xl"></div>
                        <span className="font-serif text-3xl text-dark-base mb-2">Certum Prime</span>
                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">Yield Bearing Instrument</span>
                        <div className="mt-6 w-16 h-[1px] bg-dark-base/20"></div>
                    </div>
                </div>

                {/* Card 4: Black Card (Bottom Right, Very Fast) */}
                <div className="stream-card absolute top-[85%] right-[25%] w-96 h-56 bg-black rounded-xl shadow-2xl transform rotate-[15deg] z-40 border-t border-white/20">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black via-gray-900 to-gray-800 rounded-xl"></div>
                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                        <div className="w-12 h-8 bg-gradient-to-r from-yellow-200 to-yellow-500 rounded-md opacity-80"></div>
                        <div className="text-right">
                            <div className="font-mono text-xs text-gray-500 tracking-[0.2em] mb-1">MEMBER SINCE</div>
                            <div className="font-mono text-lg text-white tracking-widest">2024</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copy Strategy (The Slide) */}
            <div className="relative z-50 text-center max-w-4xl px-6 mt-32 mix-blend-multiply">
                {/* Title: The Hook */}
                <VelocityWrapper skewFactor={3}>
                    <h2 className="font-serif text-6xl md:text-8xl text-dark-base mb-6 leading-[0.9] tracking-tighter">
                        <TextSplitReveal type="chars" stagger={0.03} duration={1.2}>
                            Clarity in
                        </TextSplitReveal>
                        <br/>
                        <TextSplitReveal type="chars" stagger={0.03} duration={1.2} delay={0.2}>
                            Complexity
                        </TextSplitReveal>
                    </h2>
                </VelocityWrapper>
                
                {/* Subhead: The Bridge */}
                <div className="font-sans text-xl md:text-2xl text-gray-600 font-light italic mb-8 max-w-2xl mx-auto">
                     <TextSplitReveal type="words" delay={0.5}>
                        "The market is a noise machine designed to separate you from your conviction."
                     </TextSplitReveal>
                </div>
                
                {/* Body: The Slide */}
                <div id="slideBody" className="opacity-0 translate-y-[30px] flex flex-col items-center">
                    <p className="font-sans text-sm md:text-base text-gray-500 font-medium tracking-wide uppercase mb-12">
                        We provide the signal.
                    </p>
                    <div className="w-[1px] h-24 bg-gradient-to-b from-dark-base to-transparent"></div>
                </div>
            </div>
        </div>
      </section>

      {/* INTERSTITIAL 1: ASYMMETRICAL MEDIA (Left) */}
      <AsymmetricalMedia 
        imageSrc="/sovereign_tower_architecture.png" 
        // videoSrc="/videos/structure_reveal.mp4" // Placeholder
        alignment="left"
        rotation="ccw"
        caption="Architecture of the Unseen."
      />

      {/* Section 3: Products (Editorial Layout) */}
      <section id="products" className="bg-light-base py-32 relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            
            <div className="flex flex-col lg:flex-row gap-20">
                {/* Left Column: Sticky Editorial Header */}
                <div className="lg:w-1/3 relative">
                    <div className="lg:sticky lg:top-32">
                        <span className="text-gray-400 text-xs font-mono tracking-[0.2em] block mb-6 fade-animate">01 — INSTRUMENTS</span>
                        <VelocityWrapper>
                            <h2 className="text-dark-base font-serif text-5xl lg:text-7xl leading-[0.9] mb-8">
                                <TextSplitReveal type="chars" stagger={0.02}>Sovereign</TextSplitReveal>
                                <br/>
                                <TextSplitReveal type="chars" stagger={0.02} delay={0.1}>Yield</TextSplitReveal>
                            </h2>
                        </VelocityWrapper>
                        <p className="text-gray-500 max-w-sm leading-relaxed text-sm fade-animate">
                            Access to institutional-grade opportunities usually reserved for sovereign funds. We eschew the retail noise for pure signal.
                        </p>
                        
                        <div className="mt-12 hidden lg:block fade-animate">
                            <div className="w-12 h-[1px] bg-dark-base"></div>
                        </div>
                    </div>
                </div>

                {/* Right Column: The Asset Stream */}
                <div className="lg:w-2/3 flex flex-col gap-32 pt-20 lg:pt-0">
                    
                    {/* Card 1: Structured Notes (Wide) */}
                    <div className="card-animate group relative w-full aspect-[16/9] bg-white border border-border-subtle p-8 lg:p-12 flex flex-col justify-between hover:border-primary/50 transition-colors duration-500 shadow-xl shadow-gray-200/50">
                        <div className="absolute top-8 right-8 text-primary/20 text-9xl font-serif leading-none select-none group-hover:text-primary/10 transition-colors">01</div>
                        <div>
                             <div className="w-10 h-10 border border-primary/20 rounded-full flex items-center justify-center mb-6 text-primary">
                                <span className="material-symbols-outlined text-sm">token</span>
                             </div>
                             <h3 className="text-3xl font-serif mb-4">Structured Notes</h3>
                             <p className="text-gray-500 max-w-md">Customized debt obligations providing capital protection and enhanced yield through derivative components.</p>
                        </div>
                        <div className="flex justify-between items-end mt-8">
                             <span className="font-mono text-xs text-gray-400">TARGET: 12-15% APY</span>
                             <span className="w-12 h-12 rounded-full bg-dark-base text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-lg">arrow_outward</span>
                             </span>
                        </div>
                    </div>

                    {/* Card 2: Private Equity (Tall / Offset) */}
                    <div className="w-full flex justify-end">
                        <div className="card-animate group relative w-full lg:w-[80%] aspect-[4/5] bg-dark-base text-white p-8 lg:p-12 flex flex-col justify-between shadow-2xl">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:opacity-30 transition-opacity duration-700"></div>
                            <div className="relative z-10">
                                <span className="font-mono text-xs text-primary tracking-widest block mb-4">IL-LIQUIDITY PREMIUM</span>
                                <h3 className="text-4xl font-serif mb-6">Private Equity</h3>
                                <p className="text-gray-400 max-w-sm">Direct stakes in high-growth operational companies before they hit the public markets.</p>
                            </div>
                            <div className="relative z-10 border-t border-white/10 pt-8 flex justify-between items-center">
                                <span className="font-mono text-xs">VINTAGE 2025</span>
                                <span className="text-primary italic font-serif">Open for Subscription</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Real Estate (Wide) */}
                    <div className="card-animate group relative w-full aspect-[16/8] bg-[#F5F5F0] border border-transparent p-8 lg:p-12 flex flex-col justify-center items-center text-center hover:bg-white hover:border-border-subtle transition-all duration-500">
                         <h3 className="text-3xl font-serif mb-4">Real Assets</h3>
                         <p className="text-gray-500 max-w-lg mb-8">Tangible luxury assets including Commercial Real Estate, Fine Art, and Collectibles.</p>
                         <button className="px-8 py-3 border border-dark-base text-xs font-bold uppercase tracking-widest hover:bg-dark-base hover:text-white transition-colors">
                            Explore Catalog
                         </button>
                    </div>

                </div>
            </div>
        </div>
      </section>

      {/* Section 4: Metrics */}
      <section id="metrics" className="bg-white pb-24 lg:pb-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 border-t border-border-subtle pt-24">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
                <div className="fade-animate opacity-0 translate-y-[40px] metric-item text-center lg:text-left lg:border-r border-border-subtle lg:px-8 lg:first:pl-0">
                    <h3 className="metric-number font-serif text-5xl md:text-6xl text-dark-base mb-2" data-value="2.4" data-prefix="$" data-suffix="B">$0B</h3>
                    <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">Assets Under Management</p>
                </div>
                <div className="fade-animate opacity-0 translate-y-[40px] metric-item text-center lg:text-left lg:border-r border-border-subtle lg:px-8">
                    <h3 className="metric-number font-serif text-5xl md:text-6xl text-dark-base mb-2" data-value="147" data-prefix="" data-suffix="">0</h3>
                    <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">Global Partners</p>
                </div>
                <div className="fade-animate opacity-0 translate-y-[40px] metric-item text-center lg:text-left lg:border-r border-border-subtle lg:px-8">
                    <h3 className="metric-number font-serif text-5xl md:text-6xl text-dark-base mb-2" data-value="12" data-prefix="" data-suffix="">0</h3>
                    <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">Jurisdictions</p>
                </div>
                <div className="fade-animate opacity-0 translate-y-[40px] metric-item text-center lg:text-left lg:px-8">
                    <h3 className="metric-number font-serif text-5xl md:text-6xl text-dark-base mb-2" data-value="100" data-prefix="" data-suffix="%">0%</h3>
                    <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">Fiduciary Standard</p>
                </div>
            </div>
        </div>
      </section>

      {/* INTERSTITIAL 2: ASYMMETRICAL MEDIA (Right) */}
      <AsymmetricalMedia 
        imageSrc="/sovereign_vault_interior.png" 
        // videoSrc="/videos/vault_open.mp4" // Placeholder
        alignment="right"
        rotation="cw"
        caption="Silence is the ultimate asset."
      />

      {/* Section 5: Philosophy */}
      <section id="philosophy" className="bg-[#F8F8F8] py-24 lg:py-0 lg:min-h-[80vh] flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
                <div className="lg:w-1/2 py-12">
                    <span className="fade-animate opacity-0 translate-y-[40px] text-primary text-sm font-bold tracking-widest block mb-6">02 — PHILOSOPHY</span>
                    <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-8">
                        <TextSplitReveal type="words" stagger={0.05}>We don't predict the future.</TextSplitReveal>
                        <br/>
                        <span className="italic text-gray-500">
                             <TextSplitReveal type="words" stagger={0.05} delay={0.5}>We structure for it.</TextSplitReveal>
                        </span>
                    </h2>
                    <div className="fade-animate opacity-0 translate-y-[40px] space-y-6 text-gray-600 leading-relaxed max-w-md">
                        <p>
                            In an era of unprecedented volatility, traditional diversification is insufficient. Sovereign Wealth employs a rigorous, engineering-first approach.
                        </p>
                        <p>
                            We isolate risk factors, hedge tail events, and capture illiquidity premiums to deliver outcomes robust across market cycles.
                        </p>
                    </div>
                    <div className="fade-animate opacity-0 translate-y-[40px] mt-10">
                        <MagneticButton className="inline-block border-b border-dark-base pb-1 text-sm font-bold tracking-widest uppercase hover:text-primary hover:border-primary transition-colors">
                            Read Our Thesis
                        </MagneticButton>
                    </div>
                </div>
                
                <div className="lg:w-1/2 w-full h-[400px] lg:h-[500px] fade-animate opacity-0 translate-y-[40px]" id="philosophyImage">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden shadow-2xl shadow-gray-300/50 rounded-sm">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 border border-primary/30 rounded-full"></div>
                            <div className="absolute w-48 h-48 border border-primary/20 rounded-full"></div>
                            <div className="absolute w-64 h-64 border border-primary/10 rounded-full"></div>
                        </div>
                        <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 border-l-2 border-primary">
                            <p className="font-serif italic text-lg text-dark-base">"Stability is not a lack of movement, but a balance of forces."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section id="cta" className="bg-dark-base h-[60vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div id="ctaGlow" className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
            <h2 className="fade-animate opacity-0 translate-y-[40px] text-white font-serif text-4xl md:text-5xl lg:text-6xl mb-8">Ready to begin?</h2>
            <MagneticButton className="fade-animate opacity-0 translate-y-[40px] px-10 py-5 bg-primary text-dark-base text-sm font-bold uppercase tracking-widest hover:bg-white transition-all rounded-sm">
                Schedule Consultation
            </MagneticButton>
            <p className="fade-animate opacity-0 translate-y-[40px] mt-8 text-gray-500 text-xs tracking-wide uppercase">
                Minimum investable assets: $1M USD
            </p>
        </div>
      </section>

      {/* Section 7: Footer */}
      <footer id="footer" className="bg-dark-base border-t border-white/10 pt-20 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                <div className="fade-animate opacity-0 translate-y-[40px] col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-primary">account_balance</span>
                        <span className="text-white font-bold tracking-widest">SOVEREIGN</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Zurich • London • New York • Singapore
                    </p>
                </div>
                <div className="fade-animate opacity-0 translate-y-[40px]">
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Firm</h4>
                    <ul className="space-y-4">
                        <li><a className="text-gray-500 hover:text-primary text-sm transition-colors" href="#">About Us</a></li>
                        <li><a className="text-gray-500 hover:text-primary text-sm transition-colors" href="#">Leadership</a></li>
                        <li><a className="text-gray-500 hover:text-primary text-sm transition-colors" href="#">Careers</a></li>
                    </ul>
                </div>
                <div className="fade-animate opacity-0 translate-y-[40px]">
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Services</h4>
                    <ul className="space-y-4">
                        <li><a className="text-gray-500 hover:text-primary text-sm transition-colors" href="#">Wealth Planning</a></li>
                        <li><a className="text-gray-500 hover:text-primary text-sm transition-colors" href="#">Investment</a></li>
                        <li><a className="text-gray-500 hover:text-primary text-sm transition-colors" href="#">Family Office</a></li>
                    </ul>
                </div>
                <div className="fade-animate opacity-0 translate-y-[40px]">
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Portal</h4>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </div>
                        <span className="text-gray-400 text-xs font-mono uppercase">Operational</span>
                    </div>
                    <Link className="text-primary text-sm hover:text-white transition-colors" href="/dashboard">Secure Login →</Link>
                </div>
            </div>
            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-xs">© 2024 Sovereign Wealth Partners</p>
                <div className="flex gap-6">
                    <a className="text-gray-600 hover:text-white text-xs transition-colors" href="#">Privacy</a>
                    <a className="text-gray-600 hover:text-white text-xs transition-colors" href="#">Terms</a>
                    <a className="text-gray-600 hover:text-white text-xs transition-colors" href="#">Disclosures</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
