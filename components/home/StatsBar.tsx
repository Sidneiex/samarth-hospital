"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

function CountUp({
  target,
  suffix,
  duration = 2000,
  start,
}: {
  target: number;
  suffix: string;
  duration?: number;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const raf = requestAnimationFrame(function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function StatsBar() {
  const { translations: tr } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Parse numeric target and suffix from strings like "18+", "30", "5000+"
  function parse(val: string) {
    const num = parseInt(val.replace(/\D/g, ""), 10);
    const suffix = val.replace(/[0-9]/g, "");
    return { num, suffix };
  }

  const stats = tr.stats;

  return (
    <div
      ref={ref}
      className="relative z-10 bg-[#0E2040] border-y border-[rgba(201,168,76,0.15)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[rgba(201,168,76,0.12)]">
          {stats.map((stat, i) => {
            const { num, suffix } = parse(stat.value);
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-8 px-6 text-center"
              >
                <p
                  className="text-3xl sm:text-4xl font-bold text-[#C9A84C] tabular-nums"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  <CountUp
                    target={num}
                    suffix={suffix}
                    duration={1800 + i * 150}
                    start={visible}
                  />
                </p>
                <p className="text-gray-400 text-sm mt-1.5 tracking-wide">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
