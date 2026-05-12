"use client";

import { useEffect, useRef } from "react";
import AllServices from "@/components/services/AllServices";
import { useLanguage } from "@/context/LanguageContext";

function ServicesHero() {
  const { translations: tr } = useLanguage();
  const sp = tr.services_page;
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const gsapMod = await import("gsap");
      const gsap = gsapMod.default;
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".spage-heading",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
        );
      }, headingRef);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <div
      ref={headingRef}
      className="relative pt-36 pb-20 bg-gradient-to-b from-[#050E1A] to-[#0A1628] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="spage-heading">
          <p className="text-[#C9A84C] text-xs font-medium tracking-[0.25em] uppercase mb-4">
            What We Offer
          </p>
          <h1
            className="text-5xl sm:text-6xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {sp.heading}
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            {sp.subheading}
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <AllServices />
    </>
  );
}
