"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content > *", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="relative pt-16 pb-10 overflow-hidden bg-white">
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(196,30,30,0.5), rgba(196,30,30,0.7), rgba(196,30,30,0.5), transparent)" }}
      />

      <div className="footer-content px-6 max-w-lg mx-auto flex flex-col items-center gap-10">

        {/* Big Logo */}
        <div className="text-center">
          <div
            className="font-black leading-none mb-3"
            style={{
              fontFamily: "'Raleway', system-ui, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3.5rem, 18vw, 5.5rem)",
              letterSpacing: "-0.02em",
              color: "#0D1F3C",
            }}
          >
            MA<span className="relative inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/shadda.png"
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: "100%",
                  left: "50%",
                  transform: "translateX(-50%) translateY(45%)",
                  width: "0.65em",
                  height: "auto",
                  pointerEvents: "none",
                  userSelect: "none",
                  filter: "brightness(0) saturate(100%) invert(14%) sepia(96%) saturate(4938%) hue-rotate(353deg) brightness(85%) contrast(110%)",
                }}
              />
              Y
            </span>EL
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px bg-gradient-to-r from-transparent to-brand-blue/40" style={{ width: "40px" }} />
            <span
              className="font-semibold uppercase"
              style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#C41E1E" }}
            >
              Order · Eat · Repeat
            </span>
            <div className="h-px bg-gradient-to-l from-transparent to-brand-blue/40" style={{ width: "40px" }} />
          </div>
        </div>

        {/* Info Cards */}
        <div className="w-full grid grid-cols-1 gap-3">
          {/* Hours */}
          <div className="border-b border-dark-border pb-5">
            <p className="text-cream font-bold text-sm mb-3 tracking-wide">Opening Hours</p>
            <div className="space-y-2">
              {[
                { day: "Mon – Fri", hours: "12:00 PM – 3:00 AM" },
                { day: "Saturday", hours: "12:00 PM – 4:00 AM" },
                { day: "Sunday", hours: "5:00 PM – 3:00 AM" },
              ].map((h) => (
                <div key={h.day} className="flex items-center justify-between gap-4">
                  <span className="text-muted text-xs">{h.day}</span>
                  <span className="text-cream text-xs font-medium">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="border-b border-dark-border pb-5">
            <p className="text-cream font-bold text-sm mb-3 tracking-wide">Find Us</p>
            <p className="text-muted text-xs leading-relaxed mb-2">
              Mayel Restaurant · Lebanon
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-600 text-xs font-medium">Dine-in · Takeaway · Delivery</span>
            </div>
          </div>

          {/* Order CTA */}
          <div
            className="rounded-2xl p-5 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(196,30,30,0.05) 0%, rgba(196,30,30,0.02) 100%)",
              border: "1px solid rgba(196,30,30,0.15)",
            }}
          >
            <p className="text-brand-gold text-[0.6rem] tracking-[0.4em] uppercase font-semibold mb-2">
              Ready to order?
            </p>
            <p className="text-cream/80 text-sm mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Call us or message on WhatsApp
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+96179316188"
                className="btn-primary text-xs w-full"
                style={{ letterSpacing: "0.2em" }}
              >
                📞 Call to Order
              </a>
              <a
                href="https://wa.me/96179316188"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-8 py-3.5 rounded-full font-semibold text-xs tracking-widest uppercase transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  color: "white",
                  letterSpacing: "0.2em",
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          {[
            {
              label: "Instagram",
              href: "https://www.instagram.com/mayel.lb",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              ),
            },
            {
              label: "WhatsApp",
              href: "https://wa.me/96179316188",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              ),
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-dark-border text-muted flex items-center justify-center
                         hover:border-brand-blue hover:text-brand-blue transition-all duration-300"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="text-center pt-2 border-t border-dark-border w-full">
          <p className="text-muted text-[0.6rem] tracking-widest uppercase">
            © {new Date().getFullYear()} Mayel Restaurant. All rights reserved.
          </p>
          <p className="text-muted/50 text-[0.55rem] mt-1 tracking-widest">
            Order · Eat · Repeat
          </p>
          <div className="mt-4 pt-4 border-t border-dark-border/50">
            <p className="text-muted/40 text-[0.55rem] tracking-wider">
              Created by{" "}
              <a
                href="https://www.instagram.com/marketingleadsss"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue/50 hover:text-brand-blue transition-colors duration-300 font-semibold"
              >
                Marketing Leads
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
