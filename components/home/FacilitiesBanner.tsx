"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { BedDouble, Microscope, Zap, Activity } from "lucide-react";

const items = [
  { icon: BedDouble, title: "30-Bed Inpatient Ward", desc: "24/7 nursing care for maternity and post-surgical patients." },
  { icon: Zap, title: "Operation Theatre", desc: "Sterile, fully equipped OT with backup power." },
  { icon: Microscope, title: "Pathology Lab", desc: "Same-day results for all routine diagnostics." },
  { icon: Activity, title: "Sonography Center", desc: "Government-approved ultrasound imaging on-premises." },
];

export default function FacilitiesBanner() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".fac-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".fac-grid", start: "top 84%" } });
        gsap.fromTo(".fac-head", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".fac-head", start: "top 88%" } });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fac-head flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-2">Infrastructure</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Facilities</h2>
          </div>
          <Link href="/appointment" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-navy text-sm font-semibold hover:bg-white/90 transition-colors whitespace-nowrap">
            Book a Visit
          </Link>
        </div>

        <div className="fac-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="fac-item p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                <Icon className="w-6 h-6 text-white/60 mb-4" strokeWidth={1.5} />
                <p className="text-white font-semibold text-[15px] mb-1.5">{item.title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
