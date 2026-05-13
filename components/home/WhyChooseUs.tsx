"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { content } from "@/lib/content";

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const w = content.why;

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".wy-img", { opacity: 0, x: -40, scale: 0.95 }, {
          opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".wy-row", start: "top 75%" }
        });
        gsap.fromTo(".wy-title", { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".wy-row", start: "top 78%" }
        });
        gsap.fromTo(".wy-item", { opacity: 0, x: 20 }, {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".wy-items", start: "top 82%" }
        });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#fafbfc]">
      <div className="site-container">
        <div className="wy-row grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="wy-img order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-[0_24px_80px_-12px_rgba(10,22,40,.1)]">
              <Image src="/images/hospital-interior.jpg" alt="Hospital interior" width={600} height={400} className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="wy-title text-2xl sm:text-[2rem] font-bold tracking-tight mb-4">{w.heading}</h2>
            <p className="text-gray-400 text-[15px] leading-relaxed mb-10 max-w-md">{w.subheading}</p>

            <div className="wy-items space-y-7">
              {w.items.map((item, i) => (
                <div key={i} className="wy-item flex gap-5">
                  <div className="w-9 h-9 rounded-full bg-[#0a1628] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-[12px] font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[15px] tracking-tight">{item.title}</p>
                    <p className="text-gray-400 text-[13px] mt-1 leading-[1.7]">{item.desc}</p>
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
