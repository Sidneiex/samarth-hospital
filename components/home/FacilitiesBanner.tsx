"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { BedDouble, Microscope, Zap, Activity } from "lucide-react";
import { content } from "@/lib/content";

const iconMap: Record<string, React.ElementType> = { bed: BedDouble, zap: Zap, microscope: Microscope, activity: Activity };

export default function FacilitiesBanner() {
  const f = content.facilities;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".fc-head", { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".fc-head", start: "top 88%" }
        });
        gsap.fromTo(".fc-card", { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".fc-grid", start: "top 85%" }
        });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#0a1628]">
      <div className="site-container">
        <div className="fc-head flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <h2 className="text-2xl sm:text-[2rem] font-bold text-white tracking-tight">{f.heading}</h2>
          <Link href="/appointment"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#0a1628] text-[13px] font-semibold hover:bg-white/90 transition-colors">
            {f.cta}
          </Link>
        </div>

        <div className="fc-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {f.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Activity;
            return (
              <div key={i}
                className="fc-card p-7 rounded-2xl bg-white/[.04] border border-white/[.06] hover:bg-white/[.08] hover:border-white/[.12] transition-all duration-300">
                <Icon className="w-5 h-5 text-white/30 mb-5" strokeWidth={1.5} />
                <p className="text-white font-semibold text-[15px] mb-2 tracking-tight">{item.title}</p>
                <p className="text-white/30 text-[13px] leading-[1.7]">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
