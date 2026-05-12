"use client";

import { useEffect, useRef } from "react";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Testimonials() {
  const { translations: tr } = useLanguage();
  const section = tr.testimonials;
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
          ".testi-heading",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".testi-heading", start: "top 85%" },
          }
        );

        gsap.fromTo(
          ".testi-card",
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: ".testi-grid", start: "top 80%" },
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
      {/* Top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="testi-heading text-center mb-16">
          <p className="text-[#C9A84C] text-xs font-medium tracking-[0.25em] uppercase mb-3">
            Patient Stories
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {section.heading}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">{section.subheading}</p>
        </div>

        <div className="testi-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {section.items.map((item, i) => (
            <div
              key={i}
              className="testi-card relative rounded-2xl bg-[#0E2040] border border-[rgba(201,168,76,0.12)] p-7 hover:border-[rgba(201,168,76,0.35)] transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-6 opacity-10">
                <Quote className="w-10 h-10 text-[#C9A84C]" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(item.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10">
                &ldquo;{item.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[rgba(201,168,76,0.15)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A84C] text-sm font-semibold">
                    {item.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{item.name}</p>
                  <p className="text-gray-500 text-xs">{item.location}</p>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
            </div>
          ))}
        </div>

        {/* Placeholder note */}
        <p className="text-center text-gray-600 text-xs mt-8 italic">
          * Testimonial names may be placeholder — replace with verified patient reviews before publishing.
        </p>
      </div>
    </section>
  );
}
