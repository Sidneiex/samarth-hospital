"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Testimonials() {
  const { translations: tr } = useLanguage();
  const section = tr.testimonials;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".testi-card", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".testi-row", start: "top 84%" } });
        gsap.fromTo(".testi-head", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".testi-head", start: "top 88%" } });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-[#F4F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="testi-head mb-12">
          <p className="text-xs font-semibold text-navy/40 uppercase tracking-widest mb-2">Patient Stories</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">{section.heading}</h2>
        </div>

        <div className="testi-row grid grid-cols-1 md:grid-cols-3 gap-5">
          {section.items.map((item, i) => (
            <div key={i} className="testi-card bg-white rounded-2xl p-7 border border-slate-100">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(item.rating)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 fill-navy text-navy" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-6">&ldquo;{item.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-navy-light flex items-center justify-center flex-shrink-0">
                  <span className="text-navy text-sm font-bold">{item.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-navy font-semibold text-sm">{item.name}</p>
                  <p className="text-slate-400 text-xs">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
