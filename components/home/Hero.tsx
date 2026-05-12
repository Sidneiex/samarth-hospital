"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { translations: tr } = useLanguage();
  const hero = tr.hero;

  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const caduceusRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function init() {
      const gsapModule = await import("gsap");
      const gsap = gsapModule.default;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.7 }
        )
          .fromTo(
            titleRef.current,
            { opacity: 0, y: 50, skewY: 2 },
            { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "expo.out" },
            "-=0.3"
          )
          .fromTo(
            subtitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.5"
          )
          .fromTo(
            taglineRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.4"
          )
          .fromTo(
            ctaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.3"
          )
          .fromTo(
            badgeRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.3"
          );

        // Caduceus: floating loop
        if (caduceusRef.current) {
          gsap.to(caduceusRef.current, {
            y: -18,
            rotation: 3,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      }, containerRef);
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050E1A] via-[#0A1628] to-[#0E2040]" />

      {/* Radial glow behind the text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[rgba(201,168,76,0.04)] blur-[80px] pointer-events-none" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Large decorative caduceus background */}
      <svg
        ref={caduceusRef}
        className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[320px] h-[320px] opacity-[0.06] pointer-events-none hidden lg:block"
        viewBox="0 0 200 200"
        fill="none"
      >
        <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="4" />
        <path d="M75 35 Q100 25 125 35" stroke="white" strokeWidth="3" fill="none" />
        <path d="M75 50 Q100 40 125 50" stroke="white" strokeWidth="2" fill="none" />
        <path d="M100 40 C80 60 80 80 100 90 C120 100 120 120 100 140" stroke="white" strokeWidth="4" fill="none" />
        <path d="M100 40 C120 60 120 80 100 90 C80 100 80 120 100 140" stroke="white" strokeWidth="4" fill="none" />
        <circle cx="100" cy="28" r="10" fill="white" opacity="0.6" />
        <circle cx="100" cy="28" r="5" fill="white" />
      </svg>

      {/* Small floating cross elements */}
      <div className="absolute top-24 left-10 opacity-10 hidden md:block">
        <div className="relative w-8 h-8">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#C9A84C] -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-[#C9A84C] -translate-x-1/2" />
        </div>
      </div>
      <div className="absolute bottom-32 left-16 opacity-[0.07] hidden md:block">
        <div className="relative w-14 h-14">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#C9A84C] -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-[#C9A84C] -translate-x-1/2" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="opacity-0 inline-flex items-center gap-2 text-[#C9A84C] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-6"
        >
          <span className="w-6 h-px bg-[#C9A84C]" />
          {hero.eyebrow}
          <span className="w-6 h-px bg-[#C9A84C]" />
        </p>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="opacity-0 font-[var(--font-playfair)] text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {hero.title}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="opacity-0 font-[var(--font-playfair)] text-2xl sm:text-3xl lg:text-4xl font-400 text-[#C9A84C] mt-2 tracking-wide"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {hero.subtitle}
        </p>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]" />
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="opacity-0 text-gray-300 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto whitespace-pre-line"
        >
          {hero.tagline}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <Link
            href="/appointment"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-[#C9A84C] text-[#0A1628] font-semibold text-base hover:bg-[#D4B06A] transition-all duration-300 shadow-[0_8px_30px_rgba(201,168,76,0.35)] hover:shadow-[0_12px_40px_rgba(201,168,76,0.5)] hover:-translate-y-0.5"
          >
            {hero.cta1}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/services"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-[rgba(201,168,76,0.4)] text-white text-base font-medium hover:bg-[rgba(201,168,76,0.08)] hover:border-[#C9A84C] transition-all duration-300"
          >
            {hero.cta2}
          </Link>
        </div>

        {/* Badge */}
        <div
          ref={badgeRef}
          className="opacity-0 inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.25)] text-[#C9A84C] text-xs font-medium tracking-wide"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          {hero.badge}
        </div>

        {/* Scroll cue */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-bounce">
          <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">Scroll</p>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1628] to-transparent pointer-events-none" />
    </section>
  );
}
