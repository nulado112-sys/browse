"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer animation
  useEffect(() => {
    if (!drawerRef.current) return;

    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;

    gsap.set(drawerRef.current, { x: "100%" });
    gsap.set(overlayRef.current, { opacity: 0 });

    tl.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" })
      .to(drawerRef.current, { x: "0%", duration: 0.45, ease: "power3.out" }, "-=0.2")
      .from(".drawer-link", {
        x: 40,
        opacity: 0,
        stagger: 0.07,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.2")
      .from(".drawer-footer", { opacity: 0, y: 20, duration: 0.4 }, "-=0.1");
  }, []);

  const openDrawer = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    tlRef.current?.play();
  };

  const closeDrawer = () => {
    tlRef.current?.reverse().then(() => {
      setIsOpen(false);
      document.body.style.overflow = "";
    });
  };

  const handleNavClick = (href: string) => {
    closeDrawer();
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-dark-bg/90 backdrop-blur-xl border-b border-dark-border/50 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo — only visible after scrolling past the hero */}
          <a
            href="#home"
            className={`flex flex-col items-start transition-all duration-500 ${
              scrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
          >
            <span
              className="text-white font-black leading-none"
              style={{
                fontFamily: "'Raleway', system-ui, sans-serif",
                fontWeight: 900,
                fontSize: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              MA<span className="text-brand-blue">Y</span>EL
            </span>
            <span
              className="text-brand-blue/70"
              style={{ fontSize: "0.45rem", letterSpacing: "0.3em", fontWeight: 600 }}
            >
              ORDER · EAT · REPEAT
            </span>
          </a>

          {/* Hamburger */}
          <button
            onClick={isOpen ? closeDrawer : openDrawer}
            className="relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                isOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${
                isOpen ? "w-0 opacity-0" : "w-5"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                isOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm opacity-0 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* DRAWER — translate-x-full hides it before GSAP kicks in */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 z-[70] w-[80vw] max-w-sm flex flex-col translate-x-full"
        style={{ background: "linear-gradient(160deg, #0d0e1a 0%, #06070f 100%)" }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-dark-border">
          <span
            className="text-white font-black"
            style={{
              fontFamily: "'Raleway', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "1.3rem",
              letterSpacing: "-0.02em",
            }}
          >
            MA<span className="text-brand-blue">Y</span>EL
          </span>
          <button
            onClick={closeDrawer}
            className="w-8 h-8 rounded-full border border-dark-border flex items-center justify-center text-muted hover:text-white hover:border-brand-blue transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div ref={navLinksRef} className="flex-1 px-6 py-8 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="drawer-link group flex items-center justify-between py-4 border-b border-dark-border/50 w-full text-left"
            >
              <div className="flex items-center gap-4">
                <span
                  className="text-dark-border font-mono text-xs"
                  style={{ minWidth: "20px" }}
                >
                  0{i + 1}
                </span>
                <span
                  className="text-cream/80 group-hover:text-white font-medium text-xl transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {link.label}
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-brand-blue/50 group-hover:text-brand-blue group-hover:translate-x-1 transition-all"
              >
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        {/* Drawer footer */}
        <div className="drawer-footer px-6 pb-8 pt-4 border-t border-dark-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-cream/50 text-xs tracking-wider">Open Now</span>
          </div>
          <p className="text-muted text-xs leading-relaxed">
            Premium burgers, sandwiches & more<br />
            Order · Eat · Repeat
          </p>
        </div>

        {/* Blue accent line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{
            background: "linear-gradient(to bottom, transparent, #1870b8, transparent)",
          }}
        />
      </div>
    </>
  );
}
