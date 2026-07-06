"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 lg:min-h-[78vh] flex items-center"
      style={{
        background: 'linear-gradient(to bottom, #5b0207, #73060b, #83090e)',
      }}
    >
      {/* Top gradient edge */}
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)' }}
      />

      {/* Bottom gradient edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)' }}
      />

      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <h2
          className="font-serif select-none"
          style={{
            fontSize: '14vw',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.03)',
          }}
        >
          SMJMUN
        </h2>
      </div>

      {/* Gold glow left */}
      <div className="absolute -left-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#BB8B57]/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-stretch">

          {/* Left Side — full-bleed image with text overlaid on it */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden min-h-[420px] lg:min-h-0"
            style={{ borderRadius: '20px' }}
          >
            {/* Background image fills the entire column */}
 <img
  src="/images/perparestudent.jpeg"
  alt="SMJMUN"
  className="
    absolute inset-0
    h-full w-full
    object-cover
    scale-100
    lg:object-[50%_25%]
  "
/>

            {/* Overlay for legibility — darker toward the bottom where copy sits */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.15) 75%, rgba(10,10,10,0.05) 100%)',
              }}
            />

            {/* Text content, overlaid on the image */}
            <div className="relative z-10 flex h-full flex-col justify-end p-8 lg:p-10">
              <span
                className="section-label mb-6"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                Get In Touch
              </span>

              <h2
                className="font-serif text-white leading-[1.12] mb-8"
                style={{
                  fontSize: 'clamp(26px, 3.2vw, 36px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                Shaping Tomorrow&apos;s Leaders
                <br />
                Starts With One Conversation.
              </h2>

              <div className="flex items-center gap-3">
                <div className="h-px w-8" style={{ background: '#BB8B57' }} />
                <p className="text-xs uppercase tracking-[0.3em] text-[#BB8B57]">Since 2023</p>
              </div>
              <h3 className="mt-2 font-serif text-lg text-white/85 leading-tight">
                Building India&apos;s Future Leaders
              </h3>
            </div>
          </motion.div>

          {/* Right Side — Form */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="card-ds p-8 flex flex-col justify-center"
            style={{
              background: '#0A0A0A',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="space-y-4">
              <input
                placeholder="Your Name"
                className="
                  h-12 w-full
                  rounded-[16px]
                  border border-[rgba(255,255,255,0.12)]
                  bg-white/[0.06]
                  px-4
                  text-white text-sm
                  placeholder:text-[#7A7A7A]
                  outline-none
                  focus:border-[#BB8B57]
                  focus:bg-white/[0.08]
                  transition-all duration-200
                "
                style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}
              />

              <input
                placeholder="Email Address"
                className="
                  h-12 w-full
                  rounded-[16px]
                  border border-[rgba(255,255,255,0.12)]
                  bg-white/[0.06]
                  px-4
                  text-white text-sm
                  placeholder:text-[#7A7A7A]
                  outline-none
                  focus:border-[#BB8B57]
                  focus:bg-white/[0.08]
                  transition-all duration-200
                "
                style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}
              />

              {/* Inquiry type select */}
              <div className="relative">
                <select
                  defaultValue=""
                  className="
                    h-12 w-full
                    rounded-[16px]
                    border border-[rgba(255,255,255,0.12)]
                    bg-[#111111]
                    px-4
                    text-white text-sm
                    outline-none
                    focus:border-[#BB8B57]
                    transition-all duration-200
                    appearance-none cursor-pointer
                  "
                  style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}
                >
                  <option value="" disabled className="text-[#7A7A7A] bg-[#111111]">Inquiry type</option>
                  <option value="school"   className="bg-[#111111] text-white">School</option>
                  <option value="college"  className="bg-[#111111] text-white">College</option>
                  <option value="uni"      className="bg-[#111111] text-white">University</option>
                  <option value="student"  className="bg-[#111111] text-white">Students</option>
                  <option value="sponsor"  className="bg-[#111111] text-white">Sponsor</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <textarea
                rows={3}
                placeholder="Tell us about your inquiry..."
                className="
                  w-full
                  rounded-[16px]
                  border border-[rgba(255,255,255,0.12)]
                  bg-white/[0.06]
                  p-4
                  text-white text-sm
                  placeholder:text-[#7A7A7A]
                  outline-none
                  focus:border-[#BB8B57]
                  focus:bg-white/[0.08]
                  transition-all duration-200
                  resize-none
                "
                style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}
              />

              <button
                type="submit"
                className="btn-ds-primary w-full justify-center mt-2"
              >
                <Send size={18} />
                <span>Send Message</span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}