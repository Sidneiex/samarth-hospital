"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { content } from "@/lib/content";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const h = content.hero;

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const gsap = (await import("gsap")).default;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.8 });

        // Eyebrow slides in
        tl.fromTo(".h-eyebrow", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 })
        // Headline words reveal with clip
          .fromTo(".h-word", { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.08 }, "-=0.2")
        // Description fades up
          .fromTo(".h-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        // Buttons scale in
          .fromTo(".h-btn", { opacity: 0, y: 16, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 }, "-=0.3")
        // Badges fade
          .fromTo(".h-badge", { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.06 }, "-=0.2")
        // Image reveals with parallax feel
          .fromTo(".h-img-wrap", { opacity: 0, yPercent: 8, scale: 0.94 },
            { opacity: 1, yPercent: 0, scale: 1, duration: 1, ease: "power2.out" }, "-=0.8")
        // Decorative line draws
          .fromTo(".h-line", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, "-=0.4");
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="pt-20 bg-white">
      <div className="site-container py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <div className="h-eyebrow inline-flex items-center gap-2 text-[12px] text-[#0a1628]/35 font-medium tracking-widest uppercase mb-8 opacity-0">
              <MapPin className="w-3 h-3" /> {h.eyebrow}
            </div>

            <h1 className="text-[clamp(2.5rem,5.5vw,3.8rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              <span className="block overflow-hidden"><span className="h-word inline-block">{h.headline}</span></span>
              <span className="block overflow-hidden"><span className="h-word inline-block text-[#0a1628]/25">{h.headlineFaded}</span></span>
            </h1>

            <p className="h-desc mt-7 text-gray-400 text-lg leading-relaxed max-w-[400px] opacity-0">
              {h.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/appointment"
                className="h-btn inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#0a1628] text-white text-sm font-semibold hover:bg-[#152244] transition-all duration-300 group opacity-0">
                {h.cta1} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link href="/services"
                className="h-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-gray-200 text-sm font-medium text-[#0a1628] hover:border-[#0a1628]/40 transition-all duration-300 opacity-0">
                {h.cta2}
              </Link>
            </div>

            {/* Decorative line */}
            <div className="h-line mt-12 h-px bg-gray-200 origin-left" style={{ transform: "scaleX(0)" }} />

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {h.badges.map((b) => (
                <span key={b} className="h-badge text-[11px] text-gray-400 font-medium tracking-wide opacity-0">{b}</span>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="h-img-wrap opacity-0">
            <div className="rounded-3xl overflow-hidden shadow-[0_24px_80px_-12px_rgba(10,22,40,.12)]">
              <Image src="/images/hero-hospital.jpg" alt="Samarth Hospital" width={640} height={420} priority className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
