"use client";

import { useEffect, useRef, useState } from "react";

export default function LoadingScreen() {
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function run() {
      const gsap = (await import("gsap")).default;
      const el = ref.current;
      if (!el) return;

      const paths = el.querySelectorAll<SVGPathElement>(".lp");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      const tl = gsap.timeline({ onComplete: () => setGone(true) });
      tl.to(".lp", { strokeDashoffset: 0, duration: 0.35, stagger: 0.04, ease: "power2.inOut" })
        .to(".load-txt", { opacity: 1, duration: 0.12 }, "-=0.1")
        .to(el, { yPercent: -100, duration: 0.35, ease: "power3.in", delay: 0.08 });
    }
    run();
  }, []);

  if (gone) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ background: "#0a1628" }}
    >
      <svg width="56" height="56" viewBox="0 0 100 120" fill="none">
        <line className="lp" x1="50" y1="25" x2="50" y2="110" stroke="#b89b3f" strokeWidth="2.5" strokeLinecap="round" />
        <path className="lp" d="M50 30Q42 22 30 18Q20 15 12 20Q18 25 28 26Q38 27 50 30" stroke="#b89b3f" strokeWidth="1.8" strokeLinecap="round" />
        <path className="lp" d="M50 30Q58 22 70 18Q80 15 88 20Q82 25 72 26Q62 27 50 30" stroke="#b89b3f" strokeWidth="1.8" strokeLinecap="round" />
        <path className="lp" d="M50 35C38 42 38 52 50 56C62 60 62 70 50 76C38 82 38 92 50 98" stroke="rgba(255,255,255,.7)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path className="lp" d="M50 35C62 42 62 52 50 56C38 60 38 70 50 76C62 82 62 92 50 98" stroke="rgba(255,255,255,.7)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="25" r="3.5" fill="#b89b3f" />
      </svg>
      <p className="load-txt text-white/40 text-[10px] tracking-[.25em] uppercase mt-4 opacity-0">
        Samarth Hospital
      </p>
    </div>
  );
}
