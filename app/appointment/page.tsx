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

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM",
];

export default function AppointmentPage() {
  const { translations: tr } = useLanguage();
  const appt = tr.appointment;
  const pageRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    department: "",
    message: "",
  });

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    async function init() {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const gsap = gsapMod.default;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".appt-hero",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
        );
        gsap.fromTo(
          ".appt-form-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: ".appt-form-card", start: "top 85%" },
          }
        );
        gsap.fromTo(
          ".appt-sidebar-item",
          { opacity: 0, x: 30 },
          {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: ".appt-sidebar", start: "top 80%" },
          }
        );
      }, pageRef);
    }
    init();
    return () => ctx?.revert();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulated submission — wire to actual backend/email when ready
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-gradient-to-b from-[#050E1A] to-[#0A1628] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="appt-hero max-w-2xl">
            <p className="text-[#C9A84C] text-xs font-medium tracking-[0.25em] uppercase mb-4">
              Book a Visit
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {appt.heading}
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">{appt.subheading}</p>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-3xl bg-[#0E2040] border border-[rgba(201,168,76,0.2)]">
                  <CheckCircle className="w-16 h-16 text-[#C9A84C] mb-5" />
                  <h2
                    className="text-3xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Appointment Requested
                  </h2>
                  <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                    {appt.success}
                  </p>
                  <div className="mt-6 flex gap-3">
                    <a
                      href="tel:8799918682"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C9A84C] text-[#0A1628] font-semibold text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      Call Us Now
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-full border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-sm font-medium"
                    >
                      Book Another
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="appt-form-card rounded-3xl bg-[#0E2040] border border-[rgba(201,168,76,0.15)] p-8 sm:p-10"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                        {appt.name} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full bg-[#0A1628] border border-[rgba(201,168,76,0.2)] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                        {appt.phone} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className="w-full bg-[#0A1628] border border-[rgba(201,168,76,0.2)] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm transition-all"
                      />
                    </div>

                    {/* Department */}
                    <div>
                      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                        {appt.department} *
                      </label>
                      <select
                        name="department"
                        required
                        value={form.department}
                        onChange={handleChange}
                        className="w-full bg-[#0A1628] border border-[rgba(201,168,76,0.2)] rounded-xl px-4 py-3 text-white text-sm transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select department</option>
                        {departments.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                        {appt.date} *
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={form.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full bg-[#0A1628] border border-[rgba(201,168,76,0.2)] rounded-xl px-4 py-3 text-white text-sm transition-all"
                      />
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                        {appt.time} *
                      </label>
                      <select
                        name="time"
                        required
                        value={form.time}
                        onChange={handleChange}
                        className="w-full bg-[#0A1628] border border-[rgba(201,168,76,0.2)] rounded-xl px-4 py-3 text-white text-sm transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select time slot</option>
                        <optgroup label="Morning (10 AM – 2 PM)">
                          {timeSlots.slice(0, 8).map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Evening (5 PM – 8 PM)">
                          {timeSlots.slice(8).map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">
                        {appt.message}
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe your symptoms or reason for visit..."
                        className="w-full bg-[#0A1628] border border-[rgba(201,168,76,0.2)] rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm resize-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#C9A84C] text-[#0A1628] font-semibold text-base hover:bg-[#D4B06A] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_8px_30px_rgba(201,168,76,0.25)]"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <>
                        {appt.submit}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-gray-600 text-xs text-center mt-4">
                    Or call directly: <a href="tel:8799918682" className="text-[#C9A84C]">87999 18682</a>
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="appt-sidebar space-y-5">
              {/* Quick call */}
              <div className="appt-sidebar-item rounded-2xl bg-[#C9A84C] p-6">
                <Phone className="w-6 h-6 text-[#0A1628] mb-3" />
                <p className="text-[#0A1628] font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
                  Prefer to call?
                </p>
                <p className="text-[#0A1628]/70 text-sm mt-1 mb-4">
                  Our team is available during OPD hours. For emergencies, call any time.
                </p>
                <a
                  href="tel:8799918682"
                  className="block text-[#0A1628] font-bold text-xl hover:underline"
                >
                  87999 18682
                </a>
                <a
                  href="tel:02422295588"
                  className="block text-[#0A1628]/70 text-sm mt-1"
                >
                  (02422) 295588
                </a>
              </div>

              {/* OPD timings */}
              <div className="appt-sidebar-item rounded-2xl bg-[#0E2040] border border-[rgba(201,168,76,0.15)] p-6">
                <Clock className="w-5 h-5 text-[#C9A84C] mb-3" />
                <p
                  className="text-white font-bold text-base mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  OPD Timings
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mon – Sat Morning</span>
                    <span className="text-white font-medium">10 AM – 2 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mon – Sat Evening</span>
                    <span className="text-white font-medium">5 PM – 8 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-[#C9A84C] font-medium">By Appointment</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="appt-sidebar-item rounded-2xl bg-[#0E2040] border border-[rgba(201,168,76,0.15)] p-6">
                <p
                  className="text-white font-bold text-base mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  How to Reach Us
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Patilbanagar, Kolhar Budruk, Tal. Rahata, Dist. Ahilyanagar, Maharashtra – 413710
                </p>
                <Link
                  href="https://maps.app.goo.gl/bgYJU2C2AqW9jwPU7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A84C] text-sm font-medium hover:underline flex items-center gap-1"
                >
                  Open in Maps
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
