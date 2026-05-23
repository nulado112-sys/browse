"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const photos = [
  {
    src: "/images/chef.jpg",
    alt: "Chef presenting signature Mayel sandwich",
    label: "Sandwiches",
    tab: "sandwiches",
    span: "tall",
  },
  {
    src: "/images/burger.jpg",
    alt: "Mayel signature burger on black tray",
    label: "Burgers",
    tab: "burgers",
    span: "normal",
  },
  {
    src: "/images/bowl.jpg",
    alt: "Fresh chicken bowl",
    label: "Salads",
    tab: "salads",
    span: "normal",
  },
  {
    src: "/images/waffle.jpg",
    alt: "Nutella waffle with strawberries and banana",
    label: "Desserts",
    tab: "desserts",
    span: "wide",
  },
];

function goToMenuTab(tab: string) {
  window.dispatchEvent(new CustomEvent("setMenuTab", { detail: tab }));
  setTimeout(() => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  }, 50);
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<null | { src: string; alt: string }>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-label", {
        opacity: 0, y: 30, duration: 0.7,
        scrollTrigger: { trigger: ".gallery-label", start: "top 85%" },
      });
      gsap.from(".gallery-heading", {
        opacity: 0, y: 50, duration: 0.8,
        scrollTrigger: { trigger: ".gallery-heading", start: "top 85%" },
      });
      gsap.from(".gallery-cell", {
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: { amount: 0.5, from: "start" },
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Close lightbox on escape
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section ref={sectionRef} id="gallery" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="px-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="gallery-label flex items-center gap-3 mb-5">
          <div className="gold-divider" />
          <span className="section-label">Gallery</span>
        </div>

        <h2 className="gallery-heading section-title mb-10">
          Food that<br />
          <span className="italic text-brand-gold">speaks</span>
        </h2>

        {/* GRID */}
        <div
          className="gallery-grid grid gap-3"
          style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto" }}
        >
          {/* Cell 1 — Chef (tall, spans 1 col, 2 rows) */}
          <div
            className="gallery-cell gallery-img-wrap"
            style={{ gridRow: "span 2", minHeight: "380px", borderRadius: "1.25rem" }}
            onClick={() => goToMenuTab(photos[0].tab)}
          >
            <Image
              src={photos[0].src}
              alt={photos[0].alt}
              fill
              className="object-cover transition-transform duration-700"
              sizes="50vw"
            />
            <div className="gallery-overlay" />
            <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-semibold tracking-wider bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                {photos[0].label}
              </span>
            </div>
            {/* Always-visible label */}
            <div className="absolute bottom-4 left-4 z-10">
              <span
                className="text-white/80 text-xs font-semibold tracking-wider"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
              >
                {photos[0].label}
              </span>
            </div>
          </div>

          {/* Cell 2 — Burger */}
          <div
            className="gallery-cell gallery-img-wrap"
            style={{ minHeight: "185px", borderRadius: "1.25rem" }}
            onClick={() => goToMenuTab(photos[1].tab)}
          >
            <Image
              src={photos[1].src}
              alt={photos[1].alt}
              fill
              className="object-cover transition-transform duration-700"
              sizes="50vw"
            />
            <div className="gallery-overlay" />
            <div className="absolute bottom-3 left-3 z-10">
              <span
                className="text-white/80 text-xs font-semibold tracking-wider"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
              >
                {photos[1].label}
              </span>
            </div>
          </div>

          {/* Cell 3 — Bowl */}
          <div
            className="gallery-cell gallery-img-wrap"
            style={{ minHeight: "185px", borderRadius: "1.25rem" }}
            onClick={() => goToMenuTab(photos[2].tab)}
          >
            <Image
              src={photos[2].src}
              alt={photos[2].alt}
              fill
              className="object-cover transition-transform duration-700"
              sizes="50vw"
            />
            <div className="gallery-overlay" />
            <div className="absolute bottom-3 left-3 z-10">
              <span
                className="text-white/80 text-xs font-semibold tracking-wider"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
              >
                {photos[2].label}
              </span>
            </div>
          </div>

          {/* Cell 4 — Waffle (wide, spans 2 cols) */}
          <div
            className="gallery-cell gallery-img-wrap"
            style={{ gridColumn: "span 2", minHeight: "240px", borderRadius: "1.25rem" }}
            onClick={() => goToMenuTab(photos[3].tab)}
          >
            <Image
              src={photos[3].src}
              alt={photos[3].alt}
              fill
              className="object-cover transition-transform duration-700"
              style={{ objectPosition: "center 30%" }}
              sizes="100vw"
            />
            <div className="gallery-overlay" />
            <div className="absolute bottom-4 left-4 z-10">
              <span
                className="text-white/80 text-xs font-semibold tracking-wider"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
              >
                {photos[3].label}
              </span>
            </div>
            {/* Gold tag */}
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-[0.6rem] font-semibold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-sm">
                Sweet
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div
            className="relative w-full max-w-sm rounded-2xl overflow-hidden"
            style={{ maxHeight: "80vh", aspectRatio: "3/4" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}
