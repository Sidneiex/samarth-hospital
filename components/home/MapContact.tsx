"use client";

import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

export default function MapContact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".map-wrap", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: ".map-wrap", start: "top 84%" } });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-[#F4F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-navy/40 uppercase tracking-widest mb-2">Location</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy">Find Us</h2>
          </div>
          <a
            href="https://maps.app.goo.gl/bgYJU2C2AqW9jwPU7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:underline whitespace-nowrap"
          >
            Open in Maps <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="map-wrap rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <iframe
            src="https://maps.google.com/maps?q=Samarth+Hospital+Kolhar+Budruk+Rahata+Ahmednagar+Maharashtra&output=embed&z=15"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Samarth Hospital Location"
          />
        </div>
      </div>
    </section>
  );
}
