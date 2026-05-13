"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { content } from "@/lib/content";

export default function Testimonials() {
  const t = content.testimonials;
  const items = t.items;
  const total = items.length;
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((p) => (p + 1) % total), 4500);
    return () => clearInterval(id);
  }, [paused, total]);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".ts-head", { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".ts-head", start: "top 88%" }
        });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  const prev = (active - 1 + total) % total;
  const next = (active + 1) % total;

  const Card = useCallback(
    ({ index, position }: { index: number; position: "left" | "center" | "right" }) => {
      const item = items[index];
      const isCenter = position === "center";
      return (
        <div
          className="flex-shrink-0 w-[min(380px,85vw)] cursor-pointer"
          style={{
            transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
            transform: isCenter ? "scale(1) translateY(-8px)" : "scale(0.9)",
            opacity: isCenter ? 1 : 0.35,
            filter: isCenter ? "none" : "blur(1px)",
          }}
          onClick={() => setActive(index)}
        >
          <div className={`rounded-2xl p-8 h-full transition-shadow duration-500 ${
            isCenter
              ? "bg-white shadow-[0_20px_60px_-12px_rgba(10,22,40,.12)] border border-black/[.04]"
              : "bg-white/60 border border-black/[.03]"
          }`}>
            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {[...Array(item.rating)].map((_, j) => (
                <svg key={j} className="w-4 h-4 fill-[#b89b3f]" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-[#0a1628]/70 text-[15px] leading-[1.8] mb-7">
              &ldquo;{item.text}&rdquo;
            </p>

            <div className="flex items-center gap-3 pt-5 border-t border-black/[.04]">
              <div className="w-10 h-10 rounded-full bg-[#0a1628] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[13px] font-bold">{item.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold text-[14px] tracking-tight">{item.name}</p>
                <p className="text-gray-400 text-[12px]">{item.location}</p>
              </div>
            </div>
          </div>
        </div>
      );
    },
    [items]
  );

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#fafbfc] overflow-hidden">
      <div className="site-container">
        <div className="ts-head mb-14">
          <h2 className="text-2xl sm:text-[2rem] font-bold tracking-tight">{t.heading}</h2>
          <p className="text-gray-400 text-[15px] mt-2">{t.subheading}</p>
        </div>
      </div>

      {/* Carousel */}
      <div className="flex items-center justify-center gap-6 py-6"
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="hidden md:block"><Card index={prev} position="left" /></div>
        <Card index={active} position="center" />
        <div className="hidden md:block"><Card index={next} position="right" /></div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-400 ${
              active === i ? "bg-[#0a1628] w-6 h-2" : "bg-[#0a1628]/10 w-2 h-2 hover:bg-[#0a1628]/25"
            }`}
            aria-label={`Review ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
