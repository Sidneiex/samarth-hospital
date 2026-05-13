"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";

function CountUp({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf: number;
    function tick(now: number) {
      const p = Math.min((now - t0) / 1800, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);
  return <>{count.toLocaleString()}{suffix}</>;
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!go) return;
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const gsap = (await import("gsap")).default;
      ctx = gsap.context(() => {
        gsap.fromTo(".st-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, [go]);

  return (
    <div ref={ref} className="bg-[#0a1628]">
      <div className="site-container grid grid-cols-2 lg:grid-cols-4 py-4 lg:py-6">
        {content.stats.map((s, i) => (
          <div key={i} className={`st-item py-8 text-center opacity-0 ${i < content.stats.length - 1 ? "border-r border-white/[.05]" : ""}`}>
            <p className="text-[2.5rem] lg:text-5xl font-extrabold text-white tabular-nums leading-none tracking-tight">
              <CountUp target={s.value} suffix={s.suffix} start={go} />
            </p>
            <p className="text-white/30 text-[11px] tracking-[.2em] uppercase mt-3 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
