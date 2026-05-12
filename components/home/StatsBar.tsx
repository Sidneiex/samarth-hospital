"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

function CountUp({ target, suffix, duration = 1800, start }: {
  target: number; suffix: string; duration?: number; start: boolean;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const raf = requestAnimationFrame(function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return <>{count}{suffix}</>;
}

export default function StatsBar() {
  const { translations: tr } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  function parse(v: string) {
    return { num: parseInt(v.replace(/\D/g, ""), 10), suffix: v.replace(/[0-9]/g, "") };
  }

  return (
    <div ref={ref} className="bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {tr.stats.map((stat, i) => {
            const { num, suffix } = parse(stat.value);
            return (
              <div key={i} className="flex flex-col items-center py-10 px-6 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                  <CountUp target={num} suffix={suffix} duration={1600 + i * 100} start={started} />
                </p>
                <p className="text-white/50 text-sm mt-1.5 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
