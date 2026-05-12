"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang, translations: tr } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const gsap = (await import("gsap")).default;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
        tl.fromTo(".hero-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 })
          .fromTo(".hero-title", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
          .fromTo(".hero-sub", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
          .fromTo(".hero-ctas", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
          .fromTo(".hero-img", { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }, "-=0.4");
      }, containerRef);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="pt-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          {/* Left: text */}
          <div>
            <div className="hero-eyebrow opacity-0 inline-flex items-center gap-2 text-xs text-slate-500 font-medium tracking-wide uppercase mb-5">
              <MapPin className="w-3.5 h-3.5 text-navy" />
              Rahata, Ahilyanagar · Est. 2007
            </div>

            <h1 className="hero-title opacity-0 text-4xl sm:text-5xl lg:text-[56px] font-bold text-navy leading-[1.1] tracking-tight mb-5">
              {lang === "hi" ? (
                <>
                  हर परिवार के लिए<br />
                  <span className="text-navy/60">विश्वसनीय देखभाल</span>
                </>
              ) : (
                <>
                  Trusted Care for<br />
                  <span className="text-navy/50">Every Family</span>
                </>
              )}
            </h1>

            <p className="hero-sub opacity-0 text-slate-500 text-lg leading-relaxed mb-8 max-w-md">
              {lang === "hi"
                ? "मातृत्व, स्त्री रोग और शल्य चिकित्सा — 2007 से राहाता की पहली पसंद।"
                : "Maternity, gynecology and surgery — the first choice for families across Rahata since 2007."}
            </p>

            <div className="hero-ctas opacity-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-navy text-white text-sm font-semibold hover:bg-navy-mid transition-colors duration-200 group"
              >
                Book an Appointment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-slate-200 text-navy text-sm font-medium hover:border-navy hover:bg-navy-light transition-all duration-200"
              >
                Our Services
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center gap-5 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-navy" />
                Govt. Approved Sonography
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-navy" />
                30-Bed Facility
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-navy" />
                18+ Years of Service
              </span>
            </div>
          </div>

          {/* Right: image placeholder */}
          <div className="hero-img opacity-0 relative">
            <div className="img-placeholder w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs text-slate-400 mt-2">Hospital photo coming soon</p>
            </div>

            {/* Floating info card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3 hidden sm:block">
              <p className="text-navy font-bold text-2xl leading-none">5,000+</p>
              <p className="text-slate-400 text-xs mt-0.5">Successful deliveries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="border-t border-slate-100" />
    </section>
  );
}
