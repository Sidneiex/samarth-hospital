"use client";

import { useEffect, useRef } from "react";
import { Award, Users, Building2, Layers } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const iconList = [Award, Award, Building2, Layers];

export default function WhyChooseUs() {
  const { translations: tr } = useLanguage();
  const why = tr.why;
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
        gsap.fromTo(
          ".why-heading",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".why-heading", start: "top 85%" },
          }
        );

        gsap.fromTo(
          ".why-item",
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: ".why-grid", start: "top 80%" },
          }
        );

        gsap.fromTo(
          ".why-visual",
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".why-visual", start: "top 80%" },
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
      className="py-24 bg-[#050E1A] relative overflow-hidden"
    >
      {/* Decorative blob */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[rgba(201,168,76,0.04)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <div>
            <div className="why-heading mb-10">
              <p className="text-[#C9A84C] text-xs font-medium tracking-[0.25em] uppercase mb-3">
                Our Promise
              </p>
              <h2
                className="text-4xl sm:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {why.heading}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {why.subheading}
              </p>
            </div>

            <div className="why-grid space-y-6">
              {why.items.map((item, i) => {
                const Icon = iconList[i] ?? Users;
                return (
                  <div
                    key={i}
                    className="why-item flex items-start gap-4 p-5 rounded-xl bg-[rgba(14,32,64,0.6)] border border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.3)] transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[rgba(201,168,76,0.12)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(201,168,76,0.2)] transition-colors">
                      <Icon className="w-5 h-5 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3
                        className="text-white font-semibold text-base mb-1"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: visual card */}
          <div className="why-visual">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0E2040] to-[#050E1A] border border-[rgba(201,168,76,0.15)] p-10">
              {/* Background caduceus */}
              <svg
                className="absolute right-4 bottom-4 w-48 h-48 opacity-[0.04] pointer-events-none"
                viewBox="0 0 200 200"
                fill="none"
              >
                <line x1="100" y1="20" x2="100" y2="180" stroke="white" strokeWidth="4" />
                <path d="M75 35 Q100 25 125 35" stroke="white" strokeWidth="3" fill="none" />
                <path d="M100 40 C80 60 80 80 100 90 C120 100 120 120 100 140" stroke="white" strokeWidth="4" fill="none" />
                <path d="M100 40 C120 60 120 80 100 90 C80 100 80 120 100 140" stroke="white" strokeWidth="4" fill="none" />
                <circle cx="100" cy="28" r="10" fill="white" />
              </svg>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[rgba(201,168,76,0.15)] flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-[#C9A84C]" />
                </div>
                <h3
                  className="text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  18 Years
                </h3>
                <p className="text-[#C9A84C] text-sm font-medium mb-6 uppercase tracking-widest">
                  Of Trusted Service
                </p>
                <p className="text-gray-300 text-base leading-relaxed">
                  From our first patient in 2007 to the thousands of families we serve today — every story here is one of trust, care, and new beginnings.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[rgba(201,168,76,0.07)] border border-[rgba(201,168,76,0.15)]">
                    <p
                      className="text-2xl font-bold text-[#C9A84C]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      30
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">Bed Capacity</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[rgba(201,168,76,0.07)] border border-[rgba(201,168,76,0.15)]">
                    <p
                      className="text-2xl font-bold text-[#C9A84C]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      2
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">Lead Specialists</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
