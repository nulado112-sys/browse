"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow Ken Burns on background
      gsap.fromTo(bgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 8, ease: "power1.out" }
      );

      // Content entrance
      gsap.set(".hero-badge",        { opacity: 0, y: -10 });
      gsap.set(".hero-letter",       { opacity: 0, y: 50 });
      gsap.set(".hero-divider",      { scaleX: 0, opacity: 0 });
      gsap.set(".hero-tagline-wrap", { opacity: 0, y: 12 });
      gsap.set(".hero-cta-btn",      { opacity: 0, y: 16 });
      gsap.set(".hero-ticker",       { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.3 });
      tl
        .to(".hero-badge",        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(".hero-letter",       { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "-=0.2")
        .to(".hero-divider",      { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2")
        .to(".hero-tagline-wrap", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .to(".hero-cta-btn",      { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, "-=0.2")
        .to(".hero-ticker",       { opacity: 1, duration: 0.4 }, "-=0.1");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const tickerItems = ["Burgers", "Kaaek", "Wraps", "Spicy Philly", "Salads", "Platters", "Sandwiches", "Tenders"];

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-[100svh] overflow-hidden"
      style={{ background: "#0A1628" }}
    >
      {/* ── BACKGROUND PHOTO ── */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/love-that-chicken.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ── OVERLAYS ── */}
      {/* Top fade */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to bottom, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.05) 35%, rgba(10,22,40,0.1) 60%, rgba(10,22,40,0.92) 100%)"
      }} />

      {/* ── TOP BAR ── */}
      <div
        className="hero-badge absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 pt-6"
        style={{ paddingRight: "68px" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#C41E1E" }} />
          <span style={{ fontSize: "0.65rem", color: "white", opacity: 0.75, fontWeight: 600, letterSpacing: "0.15em" }}>
            Now Open
          </span>
        </div>
        <span style={{ fontSize: "0.65rem", color: "white", opacity: 0.4, fontWeight: 400, letterSpacing: "0.1em" }}>
          Anfeh, Lebanon
        </span>
      </div>

      {/* ── MAIN CONTENT — pinned to bottom ── */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-[100svh] px-5 pb-10 text-center">

        {/* SHADDA */}
        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "-8px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/shadda.png"
            alt=""
            aria-hidden="true"
            style={{
              width: "clamp(40px, 10vw, 56px)",
              height: "auto",
              marginLeft: "5%",
              filter: "brightness(0) saturate(100%) invert(14%) sepia(96%) saturate(4938%) hue-rotate(353deg) brightness(85%) contrast(110%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* MAYEL */}
        <div className="flex items-end justify-center" style={{ lineHeight: 1 }}>
          {["M", "A", "Y", "E", "L"].map((letter) => (
            <span
              key={letter}
              className="hero-letter select-none"
              style={{
                fontFamily: "'Raleway', system-ui, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(5rem, 24vw, 10rem)",
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                lineHeight: 0.9,
                display: "block",
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* RED DIVIDER */}
        <div
          className="hero-divider"
          style={{
            width: "100%",
            maxWidth: "320px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #C41E1E 30%, #C41E1E 70%, transparent)",
            margin: "14px auto 14px",
            transformOrigin: "center",
          }}
        />

        {/* TAGLINE */}
        <div className="hero-tagline-wrap" style={{ marginBottom: "24px" }}>
          <p style={{
            fontSize: "0.6rem",
            color: "white",
            opacity: 0.65,
            fontWeight: 700,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
          }}>
            Order · Eat · Repeat
          </p>
        </div>

        {/* CTA */}
        <div className="hero-cta-btn w-full" style={{ maxWidth: "240px", marginBottom: "28px" }}>
          <a
            href="#menu"
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              fontFamily: "'Raleway', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              padding: "1.05rem 0",
              borderRadius: "9999px",
              color: "white",
              background: "#C41E1E",
              boxShadow: "0 6px 28px rgba(196,30,30,0.45)",
              transition: "transform 0.25s, box-shadow 0.25s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 36px rgba(196,30,30,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(196,30,30,0.45)";
            }}
          >
            Order Now
          </a>
        </div>

        {/* TICKER — menu items scrolling */}
        <div className="hero-ticker w-full overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "12px" }}>
          <style>{`
            @keyframes ticker {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .ticker-track {
              display: flex;
              width: max-content;
              animation: ticker 18s linear infinite;
            }
          `}</style>
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.55rem",
                  color: "white",
                  opacity: 0.35,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  padding: "0 1.5rem",
                }}
              >
                {item}
                <span style={{ marginLeft: "1.5rem", color: "#C41E1E", opacity: 0.6 }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
