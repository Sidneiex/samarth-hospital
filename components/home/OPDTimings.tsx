"use client";

import { useEffect, useRef } from "react";
import { Clock, Phone, Mail, MapPin } from "lucide-react";
import { content } from "@/lib/content";

export default function OPDTimings() {
  const o = content.opd;
  const c = content.contact;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".opd-head", { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".opd-head", start: "top 88%" }
        });
        gsap.fromTo(".opd-block", { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".opd-grid", start: "top 85%" }
        });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="site-container">
        <h2 className="opd-head text-2xl sm:text-[2rem] font-bold tracking-tight mb-14">{o.heading}</h2>

        <div className="opd-grid grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* OPD Card */}
          <div className="opd-block prem-card p-8">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-[#0a1628]/[.04] flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#0a1628]" strokeWidth={1.75} />
              </div>
              <span className="font-semibold text-lg tracking-tight">{o.timingsTitle}</span>
            </div>

            <p className="text-[10px] text-[#0a1628]/25 font-semibold tracking-[.2em] uppercase mb-4">{o.days}</p>

            <div className="space-y-4 text-[15px]">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{o.morning}</span>
                <span className="font-semibold">{o.morningTime}</span>
              </div>
              <div className="h-px bg-black/[.04]" />
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{o.evening}</span>
                <span className="font-semibold">{o.eveningTime}</span>
              </div>
              <div className="h-px bg-black/[.04]" />
              <div className="flex justify-between items-center">
                <span className="text-gray-400">{o.sunday}</span>
                <span className="font-semibold">{o.sundayNote}</span>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-black/[.04] flex items-center gap-2 text-[13px] text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" /> {o.emergency}
            </div>
          </div>

          {/* Contact 2×2 */}
          <div className="opd-block lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="prem-card p-7 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0a1628]/[.04] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#0a1628]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] text-[#0a1628]/25 font-semibold tracking-[.2em] uppercase mb-2">{c.addressLabel}</p>
                <p className="text-gray-500 text-[14px] leading-[1.7]">{c.address}</p>
              </div>
            </div>

            <div className="prem-card p-7 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0a1628]/[.04] flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#0a1628]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] text-[#0a1628]/25 font-semibold tracking-[.2em] uppercase mb-2">{c.phoneLabel}</p>
                <a href="tel:8799918682" className="block font-semibold text-[15px] hover:underline">{c.phone2}</a>
                <a href="tel:02422295588" className="block text-gray-400 text-[14px] mt-0.5">{c.phone1}</a>
              </div>
            </div>

            <div className="prem-card p-7 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0a1628]/[.04] flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#0a1628]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] text-[#0a1628]/25 font-semibold tracking-[.2em] uppercase mb-2">{c.emailLabel}</p>
                <a href={`mailto:${c.email}`} className="text-gray-500 text-[14px] break-all hover:text-[#0a1628] transition-colors">{c.email}</a>
              </div>
            </div>

            <div className="rounded-2xl p-7 bg-[#0a1628] text-white flex flex-col justify-center">
              <p className="font-semibold text-[17px] mb-1.5">{o.needHelp}</p>
              <p className="text-white/35 text-[14px] mb-4 leading-relaxed">{o.needHelpDesc}</p>
              <a href="tel:8799918682" className="inline-flex items-center gap-2 text-[15px] font-semibold hover:underline">
                <Phone className="w-4 h-4" /> {c.phone2}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
