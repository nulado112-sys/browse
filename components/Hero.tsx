"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle Ken Burns
      gsap.fromTo(bgRef.current,
        { scale: 1.06 },
        { scale: 1, duration: 9, ease: "power1.out" }
      );

      gsap.set(".hero-top",     { opacity: 0, y: -10 });
      gsap.set(".hero-logo",    { opacity: 0, y: 18, scale: 0.96 });
      gsap.set(".hero-line",    { scaleX: 0, opacity: 0 });
      gsap.set(".hero-sub",     { opacity: 0, y: 10 });
      gsap.set(".hero-cta",     { opacity: 0, y: 14 });
      gsap.set(".hero-ticker",  { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.3 });
      tl
        .to(".hero-top",    { opacity: 1, y: 0,      duration: 0.55, ease: "power2.out" })
        .to(".hero-logo",   { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }, "-=0.15")
        .to(".hero-line",   { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out" },       "-=0.2")
        .to(".hero-sub",    { opacity: 1, y: 0,      duration: 0.45, ease: "power2.out" },       "-=0.2")
        .to(".hero-cta",    { opacity: 1, y: 0,      duration: 0.45, ease: "back.out(1.5)" },    "-=0.15")
        .to(".hero-ticker", { opacity: 1,             duration: 0.4 },                            "-=0.1");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const tickerItems = ["Burgers", "Kaaek", "Wraps", "Spicy Philly", "Salads", "Platters", "Sandwiches", "Tenders"];

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", background: "#080808" }}
    >
      {/* ── BACKGROUND PHOTO ── */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <style>{`
          .hero-bg-img { object-position: 62% center; }
          @media (max-width: 768px) { .hero-bg-img { object-position: 78% center; } }
        `}</style>
        <Image
          src="/images/love-that-chicken.jpg"
          alt=""
          fill
          priority
          className="object-cover hero-bg-img"
          sizes="100vw"
        />
      </div>

      {/* ── OVERLAY ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.22) 38%, rgba(0,0,0,0.28) 62%, rgba(0,0,0,0.9) 100%)"
      }} />

      {/* ── LAYOUT ── */}
      <div className="relative z-10 flex flex-col" style={{ minHeight: "100svh" }}>

        {/* ── TOP: Logo + status ── */}
        <div
          className="hero-top flex flex-col items-center px-5"
          style={{ paddingTop: "calc(2rem + env(safe-area-inset-top, 0px))", paddingBottom: "1rem" }}
        >
          {/* Status row */}
          <div className="flex items-center justify-between w-full mb-5">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.13)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.8)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Now Open
              </span>
            </div>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.1em" }}>
              Anfeh, Lebanon
            </span>
          </div>

          {/* LOGO — centered at top, no tagline */}
          <div className="hero-logo">
            <Image
              src="/images/mayel-logo-hero.png"
              alt="Mayel"
              width={320}
              height={140}
              priority
              style={{
                width: "clamp(160px, 48vw, 240px)",
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>
        </div>

        {/* ── MIDDLE: empty — mural shows through ── */}
        <div className="flex-1" />

        {/* ── BOTTOM: tagline + CTA ── */}
        <div className="flex flex-col items-center px-6 text-center" style={{ paddingBottom: "1.5rem" }}>

          {/* DIVIDER */}
          <div
            className="hero-line"
            style={{
              width: "44px",
              height: "2px",
              background: "#C41E1E",
              borderRadius: "2px",
              marginBottom: "14px",
              transformOrigin: "center",
            }}
          />

          {/* TAGLINE */}
          <p
            className="hero-sub"
            style={{
              fontSize: "0.58rem",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 700,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            Burgers · Wraps · Kaaek · More
          </p>

          {/* CTA */}
          <a
            href="#menu"
            className="hero-cta"
            style={{
              display: "inline-block",
              fontWeight: 800,
              fontSize: "0.65rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              padding: "1rem 2.8rem",
              borderRadius: "9999px",
              color: "#fff",
              background: "#C41E1E",
              boxShadow: "0 8px 30px rgba(196,30,30,0.48)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(196,30,30,0.6)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(196,30,30,0.48)";
            }}
          >
            Order Now
          </a>
        </div>

        {/* TICKER */}
        <div
          className="hero-ticker w-full overflow-hidden"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: "11px",
            paddingBottom: "max(14px, env(safe-area-inset-bottom, 14px))",
          }}
        >
          <style>{`
            @keyframes ticker {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .ticker-track {
              display: flex;
              width: max-content;
              animation: ticker 20s linear infinite;
            }
          `}</style>
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.52rem",
                  color: "rgba(255,255,255,0.28)",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  padding: "0 1.4rem",
                }}
              >
                {item}
                <span style={{ marginLeft: "1.4rem", color: "#C41E1E", opacity: 0.65 }}>·</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
