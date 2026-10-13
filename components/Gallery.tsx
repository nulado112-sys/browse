"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-header", {
        opacity: 0, y: 30, duration: 0.7,
        scrollTrigger: { trigger: ".gallery-header", start: "top 88%" },
      });
      gsap.from(".brand-card", {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".brand-cards", start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="relative py-24 overflow-hidden bg-white">

      <div className="px-6 max-w-lg mx-auto">

        {/* Header */}
        <div className="gallery-header mb-10">
          <h2 style={{
            fontFamily: "'Raleway', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.2rem, 9vw, 3.5rem)",
            lineHeight: 1.0,
            color: "#0D1B2A",
            letterSpacing: "-0.02em",
          }}>
            The brand.<br />
            <span style={{ color: "#C41E1E" }}>Up close.</span>
          </h2>
        </div>

        {/* BRAND CARDS */}
        <div className="brand-cards flex flex-col gap-4">

          {/* Card 1 — Wrap (full width, most bold) */}
          <div className="brand-card relative overflow-hidden rounded-3xl" style={{ minHeight: "340px" }}>
            <Image
              src="/images/brand-wrap.jpg"
              alt="Mayel Wraps"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              sizes="100vw"
            />
            {/* subtle overlay at bottom for label */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,61,191,0.55) 0%, transparent 50%)" }} />
            <div className="absolute bottom-5 left-5">
              <span className="text-white font-black text-lg tracking-tight" style={{ fontFamily: "'Raleway', sans-serif" }}>Wraps</span>
              <p className="text-white/70 text-xs tracking-wider mt-0.5">Made to order</p>
            </div>
          </div>

          {/* Row — Rooster mascot + Spicy Philly (side by side) */}
          <div className="grid grid-cols-2 gap-4">

            {/* Card 2 — Rooster on dark navy */}
            <div
              className="brand-card relative overflow-hidden rounded-3xl flex items-center justify-center"
              style={{ minHeight: "220px", background: "#0D1B3E" }}
            >
              <Image
                src="/images/mascot-correct.jpg"
                alt="Mayel Mascot"
                fill
                className="object-contain p-3 transition-transform duration-500 hover:scale-105"
                sizes="50vw"
              />
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <span className="text-white/90 text-[0.6rem] font-black tracking-[0.2em] uppercase">
                  The Mascot
                </span>
              </div>
            </div>

            {/* Card 3 — Spicy Philly on blue */}
            <div
              className="brand-card relative overflow-hidden rounded-3xl flex items-center justify-center"
              style={{ minHeight: "220px", background: "#1A3DBF" }}
            >
              <Image
                src="/images/brand-spicy-philly.jpg"
                alt="The Spicy Philly"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="50vw"
              />
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <span className="text-white/90 text-[0.6rem] font-black tracking-[0.2em] uppercase">
                  Spicy Philly
                </span>
              </div>
            </div>
          </div>

          {/* Card 4 — Restaurant interior (full width) */}
          <div className="brand-card relative overflow-hidden rounded-3xl" style={{ minHeight: "280px" }}>
            <Image
              src="/images/brand-interior.jpg"
              alt="Mayel Restaurant"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              sizes="100vw"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }} />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-white font-black text-lg tracking-tight" style={{ fontFamily: "'Raleway', sans-serif" }}>Our Space</span>
              <p className="text-white/65 text-xs tracking-wider mt-0.5">Dine in · Takeaway · Delivery</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
