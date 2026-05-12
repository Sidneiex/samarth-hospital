"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyChooseUs() {
  const { translations: tr } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".why-left", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: ".why-row", start: "top 82%" } });
        gsap.fromTo(".why-right", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: ".why-row", start: "top 82%" } });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-[#F4F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="why-row grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: image placeholder */}
          <div className="why-left order-2 lg:order-1">
            <div className="img-placeholder w-full rounded-2xl" style={{ aspectRatio: "4/3" }}>
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs text-slate-400 mt-2">Hospital interior photo</p>
            </div>
          </div>

          {/* Right: content */}
          <div className="why-right order-1 lg:order-2">
            <p className="text-xs font-semibold text-navy/40 uppercase tracking-widest mb-3">Our Promise</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">{tr.why.heading}</h2>
            <p className="text-slate-500 text-base leading-relaxed mb-8">{tr.why.subheading}</p>

            <div className="space-y-4">
              {tr.why.items.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-navy flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-navy font-semibold text-[15px]">{item.title}</p>
                    <p className="text-slate-400 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
