"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".hero-letter",      { opacity: 0, y: 40, rotateX: -30 });
      gsap.set(".hero-tagline-wrap",{ opacity: 0, y: 18 });
      gsap.set(".hero-subtitle",    { opacity: 0, y: 14 });
      gsap.set(".hero-cta-btn",     { opacity: 0, y: 24, scale: 0.96 });
      gsap.set(".scroll-hint",      { opacity: 0 });
      gsap.set(".hero-top-bar",     { opacity: 0, y: -20 });

      const tl = gsap.timeline({ delay: 0.4 });

      tl
        .to(".hero-top-bar",      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(".hero-letter",       { opacity: 1, y: 0, rotateX: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 }, "-=0.2")
        .to(".hero-tagline-wrap", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.2")
        .to(".hero-subtitle",     { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .to(".hero-cta-btn",      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" }, "-=0.3")
        .to(".scroll-hint",       { opacity: 1, duration: 0.5 }, "+=0.2");

      // Bounce scroll dot
      gsap.to(".scroll-dot-inner", {
        y: 8, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.5,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen min-h-[100svh] overflow-hidden noise"
    >
      {/* VIDEO */}
      <div className="hero-video-wrap absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay muted loop playsInline preload="auto"
        >
          <source src="/video/intro.mov" type="video/mp4" />
          <source src="/video/intro.mov" type="video/quicktime" />
        </video>
      </div>

      {/* OVERLAYS */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/75 via-black/40 to-black/90" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* TOP BAR */}
      <div className="hero-top-bar absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
          <span className="text-white/60 text-xs tracking-widest uppercase font-medium">Mayel</span>
        </div>
        <div className="flex items-center gap-1">
          {["•","•","•"].map((d,i) => <span key={i} className="text-white/40 text-xs">{d}</span>)}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">

        {/* MAYEL WORDMARK */}
        <div className="mb-2 flex items-end justify-center" style={{ perspective: "600px" }}>
          {/* M */}
          <span
            className="hero-letter text-white font-black leading-none select-none"
            style={{
              fontFamily: "'Raleway', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(4rem, 22vw, 7rem)",
              letterSpacing: "-0.02em",
              textShadow: "0 0 60px rgba(255,255,255,0.08)",
            }}
          >
            M
          </span>
          {/* A */}
          <span
            className="hero-letter text-white font-black leading-none select-none"
            style={{
              fontFamily: "'Raleway', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(4rem, 22vw, 7rem)",
              letterSpacing: "-0.02em",
              textShadow: "0 0 60px rgba(255,255,255,0.08)",
            }}
          >
            A
          </span>
          {/* Y — blue with shadda above */}
          <span
            className="hero-letter relative inline-block leading-none select-none"
            style={{
              fontFamily: "'Raleway', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(4rem, 22vw, 7rem)",
              letterSpacing: "-0.02em",
              color: "#1870b8",
              textShadow: "0 0 40px rgba(24,112,184,0.6)",
            }}
          >
            {/* Shadda image — bottom edge sits at top of Y, centered */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/shadda.png"
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "100%",
                left: "50%",
                transform: "translateX(-50%) translateY(30%)",
                width: "0.55em",
                height: "auto",
                pointerEvents: "none",
                userSelect: "none",
              }}
            />
            Y
          </span>
          {/* E */}
          <span
            className="hero-letter text-white font-black leading-none select-none"
            style={{
              fontFamily: "'Raleway', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(4rem, 22vw, 7rem)",
              letterSpacing: "-0.02em",
              textShadow: "0 0 60px rgba(255,255,255,0.08)",
            }}
          >
            E
          </span>
          {/* L */}
          <span
            className="hero-letter text-white font-black leading-none select-none"
            style={{
              fontFamily: "'Raleway', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(4rem, 22vw, 7rem)",
              letterSpacing: "-0.02em",
              textShadow: "0 0 60px rgba(255,255,255,0.08)",
            }}
          >
            L
          </span>
        </div>

        {/* TAGLINE */}
        <div className="hero-tagline-wrap flex items-center gap-3 mt-2 mb-6">
          <div className="h-px bg-gradient-to-r from-transparent to-brand-blue/60" style={{ width: "45px" }} />
          <span className="text-brand-blue font-semibold uppercase select-none" style={{ fontSize: "0.65rem", letterSpacing: "0.35em" }}>
            Order · Eat · Repeat
          </span>
          <div className="h-px bg-gradient-to-l from-transparent to-brand-blue/60" style={{ width: "45px" }} />
        </div>

        {/* SUBTITLE */}
        <p className="hero-subtitle text-cream/60 text-sm font-light tracking-wide mb-8 max-w-xs">
          Premium food experience. Crafted with passion.
        </p>

        {/* CTA */}
        <div className="hero-cta-btn flex flex-col items-center gap-3 w-full max-w-xs">
          <a href="#menu" className="btn-primary w-full text-center" style={{ letterSpacing: "0.25em" }}>
            View Menu
          </a>
          <a href="#gallery" className="btn-ghost w-full text-center" style={{ letterSpacing: "0.2em", fontSize: "0.75rem" }}>
            Our Food
          </a>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/30 text-[0.6rem] tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <div className="scroll-dot-inner w-1.5 h-1.5 rounded-full bg-brand-blue" />
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[3] bg-gradient-to-t from-dark-bg to-transparent pointer-events-none" />
    </section>
  );
}
