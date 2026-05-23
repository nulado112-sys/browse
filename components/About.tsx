"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll(".fade-up");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 px-6 overflow-hidden">
      <style>{`
        .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .fade-up.is-visible { opacity: 1; transform: translateY(0); }
        .fade-up:nth-child(2) { transition-delay: 0.1s; }
        .fade-up:nth-child(3) { transition-delay: 0.2s; }
        .fade-up:nth-child(4) { transition-delay: 0.25s; }
        .fade-up:nth-child(5) { transition-delay: 0.3s; }
        .fade-up:nth-child(6) { transition-delay: 0.35s; }
      `}</style>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(24,112,184,0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-lg mx-auto">

        <div className="fade-up flex items-center gap-3 mb-5">
          <div className="gold-divider" />
          <span className="section-label">Our Story</span>
        </div>

        <h2 className="fade-up section-title mb-6">
          Born from<br />
          <span className="italic text-brand-blue">the streets</span>
        </h2>

        <p className="fade-up text-cream/60 text-sm leading-relaxed mb-4 font-light">
          We started in 2018 as a small kiosk with one passion — serving the
          best kaaek in Lebanon. What began as a humble street corner grew into
          something bigger: a full indoor restaurant where people come to eat,
          gather, and come back again.
        </p>
        <p className="fade-up text-cream/50 text-sm leading-relaxed mb-4 font-light">
          Today we serve everything from our legendary kaaek to loaded
          sandwiches, fresh salads, and premium burgers — but the secret behind
          every plate is the same: our house-made sauces. That&apos;s the magic.
        </p>
        <p className="fade-up text-cream/40 text-sm leading-relaxed mb-10 font-light italic">
          &ldquo;Order. Eat. Repeat.&rdquo;
        </p>

        <div className="fade-up grid grid-cols-3 gap-4 mb-12">
          {[
            { num: "2018", label: "Est." },
            { num: "50+", label: "Menu Items" },
            { num: "100%", label: "Fresh Daily" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center gradient-border">
              <div className="text-brand-blue font-bold mb-1"
                style={{ fontFamily: "'Raleway', sans-serif", fontSize: "1.2rem" }}>
                {stat.num}
              </div>
              <div className="text-muted text-[0.6rem] tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="fade-up relative rounded-3xl overflow-hidden" style={{ height: "420px" }}>
          <Image
            src="/images/chef.jpg"
            alt="Mayel kitchen"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent z-10" />
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <div className="glass-card p-4 gradient-border">
              <p className="text-brand-gold text-[0.6rem] tracking-[0.3em] uppercase font-semibold mb-1">
                The Secret
              </p>
              <p className="text-cream text-sm font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                &ldquo;Our sauces are the magic&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
