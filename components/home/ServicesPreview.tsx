"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Baby,
  Stethoscope,
  Syringe,
  ScanLine,
  FlaskConical,
  Heart,
  ShieldCheck,
  Pill,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  baby: Baby,
  stethoscope: Stethoscope,
  scalpel: Syringe,
  scan: ScanLine,
  flask: FlaskConical,
  heart: Heart,
  shield: ShieldCheck,
  pill: Pill,
};

export default function ServicesPreview() {
  const { translations: tr } = useLanguage();
  const svc = tr.services;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    async function init() {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const gsap = gsapMod.default;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Heading reveal
        gsap.fromTo(
          ".svc-heading",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".svc-heading",
              start: "top 85%",
            },
          }
        );

        // Cards stagger
        gsap.fromTo(
          ".svc-card",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".svc-grid",
              start: "top 80%",
            },
          }
        );
      }, sectionRef);
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#0A1628] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[rgba(201,168,76,0.03)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="svc-heading text-center mb-16">
          <p className="text-[#C9A84C] text-xs font-medium tracking-[0.25em] uppercase mb-3">
            What We Offer
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {svc.heading}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {svc.subheading}
          </p>
        </div>

        {/* Cards grid */}
        <div className="svc-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {svc.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Heart;
            return (
              <div
                key={i}
                className="svc-card service-card group relative p-6 rounded-2xl bg-[#0E2040] border border-[rgba(201,168,76,0.1)] cursor-default"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-4 group-hover:bg-[rgba(201,168,76,0.2)] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <h3
                  className="text-white font-semibold text-base mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {item.desc}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-[#C9A84C]/0 via-[#C9A84C]/30 to-[#C9A84C]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#C9A84C] font-medium hover:gap-3 transition-all duration-200 group"
          >
            View all services in detail
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
