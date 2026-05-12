"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const departments = [
  "Gynecology & Obstetrics",
  "General Surgery",
  "Maternity / Delivery",
  "Sonography",
  "Pathology Lab",
  "Family Planning",
  "Cancer Screening",
  "General Consultation",
];

const timeSlots = ["10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM"];

export default function AppointmentPage() {
  const { translations: tr } = useLanguage();
  const appt = tr.appointment;
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", department: "", message: "" });

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".appt-hero", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
        gsap.fromTo(".appt-form", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", scrollTrigger: { trigger: ".appt-form", start: "top 88%" } });
      }, ref);
    }
    init();
    return () => ctx?.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1000);
  }

  const labelClass = "block text-xs font-semibold text-navy/50 uppercase tracking-wider mb-1.5";
  const inputClass = "w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-navy text-sm placeholder-slate-300";

  return (
    <div ref={ref}>
      {/* Header */}
      <div className="pt-28 pb-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="appt-hero">
            <p className="text-xs font-semibold text-navy/40 uppercase tracking-widest mb-3">Book a Visit</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-3">{appt.heading}</h1>
            <p className="text-slate-500 text-lg">{appt.subheading}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="py-20 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-20 bg-white rounded-2xl border border-slate-100">
                  <CheckCircle className="w-12 h-12 text-navy mb-4" strokeWidth={1.5} />
                  <h2 className="text-2xl font-bold text-navy mb-2">Appointment Requested</h2>
                  <p className="text-slate-500 max-w-sm text-base leading-relaxed mb-6">{appt.success}</p>
                  <div className="flex gap-3">
                    <a href="tel:8799918682" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy text-white text-sm font-medium">
                      <Phone className="w-4 h-4" /> Call Us
                    </a>
                    <button onClick={() => setSubmitted(false)} className="px-5 py-2.5 rounded-full border border-slate-200 text-navy text-sm font-medium">
                      Book Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="appt-form bg-white rounded-2xl border border-slate-100 p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label className={labelClass}>{appt.name} *</label>
                      <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>{appt.phone} *</label>
                      <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="10-digit number" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>{appt.department} *</label>
                      <select name="department" required value={form.department} onChange={handleChange} className={inputClass}>
                        <option value="" disabled>Select department</option>
                        {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>{appt.date} *</label>
                      <input type="date" name="date" required value={form.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>{appt.time} *</label>
                      <select name="time" required value={form.time} onChange={handleChange} className={inputClass}>
                        <option value="" disabled>Select time</option>
                        <optgroup label="Morning (10 AM – 2 PM)">{timeSlots.slice(0, 8).map((t) => <option key={t} value={t}>{t}</option>)}</optgroup>
                        <optgroup label="Evening (5 PM – 8 PM)">{timeSlots.slice(8).map((t) => <option key={t} value={t}>{t}</option>)}</optgroup>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>{appt.message}</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Describe your symptoms or reason for visit..." className={`${inputClass} resize-none`} />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-navy text-white font-semibold text-sm hover:bg-navy-mid transition-colors disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : <>{appt.submit} <ArrowRight className="w-4 h-4" /></>}
                  </button>
                  <p className="text-center text-slate-400 text-xs mt-3">
                    Or call: <a href="tel:8799918682" className="text-navy font-medium">87999 18682</a>
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-navy text-white">
                <Phone className="w-5 h-5 mb-3 opacity-60" strokeWidth={1.5} />
                <p className="font-bold text-lg mb-1">Prefer to call?</p>
                <p className="text-white/50 text-sm mb-4">Our team is available during OPD hours.</p>
                <a href="tel:8799918682" className="block text-xl font-bold hover:underline">87999 18682</a>
                <a href="tel:02422295588" className="block text-white/40 text-sm mt-0.5">(02422) 295588</a>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-100">
                <Clock className="w-5 h-5 text-navy mb-3" strokeWidth={1.75} />
                <p className="text-navy font-semibold text-base mb-4">OPD Timings</p>
                <div className="space-y-2 text-sm">
                  {[["Mon – Sat Morning", "10 AM – 2 PM"], ["Mon – Sat Evening", "5 PM – 8 PM"], ["Sunday", "By Appointment"]].map(([d, t]) => (
                    <div key={d} className="flex justify-between">
                      <span className="text-slate-400">{d}</span>
                      <span className="text-navy font-medium">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-100">
                <p className="text-navy font-semibold text-base mb-2">How to Reach Us</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">Patilbanagar, Kolhar Budruk, Tal. Rahata, Dist. Ahilyanagar – 413710</p>
                <Link href="https://maps.app.goo.gl/bgYJU2C2AqW9jwPU7" target="_blank" rel="noopener noreferrer" className="text-navy text-sm font-medium hover:underline flex items-center gap-1">
                  Open in Maps <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
