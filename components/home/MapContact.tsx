"use client";

import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MapContact() {
  const { translations: tr } = useLanguage();
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
          ".map-container",
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".map-container", start: "top 80%" },
          }
        );
      }, sectionRef);
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#050E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[#C9A84C] text-xs font-medium tracking-[0.25em] uppercase mb-3">
            Location
          </p>
          <h2
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {tr.contact.heading}
          </h2>
        </div>

        <div className="map-container rounded-3xl overflow-hidden border border-[rgba(201,168,76,0.15)] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          <iframe
            src="https://maps.google.com/maps?q=Samarth+Hospital+Kolhar+Budruk+Rahata+Ahmednagar+Maharashtra&output=embed&z=15"
            width="100%"
            height="450"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Samarth Hospital Location"
          />
        </div>

        <div className="text-center mt-6">
          <a
            href="https://maps.app.goo.gl/bgYJU2C2AqW9jwPU7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-medium hover:underline"
          >
            Open in Google Maps
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
