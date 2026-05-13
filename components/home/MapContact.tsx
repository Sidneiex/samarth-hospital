"use client";

import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { content } from "@/lib/content";

export default function MapContact() {
  const c = content.contact;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".map-box", { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".map-box", start: "top 85%" }
        });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#fafbfc]">
      <div className="site-container">
        <div className="flex items-end justify-between gap-4 mb-10">
          <h2 className="text-2xl sm:text-[2rem] font-bold tracking-tight">{c.heading}</h2>
          <a href={c.mapsUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-[#0a1628]/40 hover:text-[#0a1628] transition-colors">
            {c.openInMaps} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="map-box rounded-2xl overflow-hidden border border-black/[.04] shadow-[0_8px_40px_-12px_rgba(10,22,40,.06)]">
          <iframe
            src="https://maps.google.com/maps?q=Samarth+Hospital+Kolhar+Budruk+Rahata+Ahmednagar+Maharashtra&output=embed&z=15"
            width="100%" height="420" style={{ border: 0, display: "block" }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location"
          />
        </div>
      </div>
    </section>
  );
}
