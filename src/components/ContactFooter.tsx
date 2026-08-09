"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Icon components ───────────────────────────────────────────────────────────

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    // Simulate async send
    setTimeout(() => setStatus("sent"), 1800);
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white/90 text-sm text-black placeholder:text-neutral-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all duration-200 font-medium";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className="text-xs font-bold text-neutral-500 tracking-wide uppercase">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Jane Smith"
            required
            value={form.name}
            onChange={handleChange}
            className={inputCls}
            disabled={status === "sent"}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className="text-xs font-bold text-neutral-500 tracking-wide uppercase">
            Work Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="jane@company.com"
            required
            value={form.email}
            onChange={handleChange}
            className={inputCls}
            disabled={status === "sent"}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-role" className="text-xs font-bold text-neutral-500 tracking-wide uppercase">
          Your Role
        </label>
        <select
          id="contact-role"
          name="role"
          value={form.role}
          onChange={handleChange}
          className={inputCls}
          disabled={status === "sent"}
        >
          <option value="">Select your role…</option>
          <option value="recruiter">Technical Recruiter</option>
          <option value="engineer">Software Engineer</option>
          <option value="manager">Engineering Manager</option>
          <option value="founder">Founder / CTO</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-xs font-bold text-neutral-500 tracking-wide uppercase">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Tell me about the role or project…"
          required
          value={form.message}
          onChange={handleChange}
          className={`${inputCls} resize-none`}
          disabled={status === "sent"}
        />
      </div>

      <motion.button
        id="contact-submit"
        type="submit"
        disabled={status !== "idle"}
        whileHover={status === "idle" ? { scale: 1.02 } : {}}
        whileTap={status === "idle" ? { scale: 0.98 } : {}}
        className="relative group flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-black text-white font-bold text-sm tracking-wide overflow-hidden disabled:opacity-70 transition-all duration-300"
      >
        <span className="absolute inset-0 bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute -inset-1 bg-violet-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        <span className="relative z-10 flex items-center gap-2">
          {status === "idle" && (
            <>
              <SendIcon className="w-4 h-4" />
              Send Message
            </>
          )}
          {status === "sending" && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Sending…
            </>
          )}
          {status === "sent" && <>✓ Message Sent!</>}
        </span>
      </motion.button>
    </form>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function ContactFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <>
      {/* ── Contact Section ─────────────────────────────── */}
      <section
        id="contact"
        ref={ref}
        className="relative py-28 px-6 overflow-hidden"
        aria-label="Contact"
      >
        {/* BG glow */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-[600px] h-[600px] rounded-full bg-violet-200 blur-[160px] opacity-30" />
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative z-10 max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <p className="text-xs font-black tracking-[0.3em] text-violet-500 uppercase mb-3">
              Open to Opportunities
            </p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-black leading-tight">
              Let's build something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-500">
                extraordinary
              </span>
              .
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left column: info + socials */}
            <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <p className="text-neutral-600 leading-relaxed text-base mb-6">
                  I'm currently seeking software engineering internships and entry-level roles. If
                  you're a recruiter or collaborator with an interesting project, let's talk.
                </p>

                {/* Quick info */}
                <div className="space-y-3">
                  {[
                    { label: "Availability", value: "Open to Internship / Full-Time" },
                    { label: "Location", value: "Philippines (Remote-Friendly)" },
                    { label: "Response time", value: "Within 24 hours" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 text-sm">
                      <span className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                      <span className="text-neutral-500 font-medium">{item.label}:</span>
                      <span className="text-black font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4">
                <a
                  id="link-github"
                  href="https://github.com/Ji-stacks"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-neutral-200 bg-white hover:border-violet-300 hover:bg-violet-50 hover:shadow-md hover:shadow-violet-100 transition-all duration-300"
                >
                  <GitHubIcon className="w-5 h-5 text-black group-hover:text-violet-600 transition-colors duration-300" />
                  <span className="text-sm font-bold text-black group-hover:text-violet-700 transition-colors duration-300">
                    GitHub
                  </span>
                </a>

                <a
                  id="link-linkedin"
                  href="https://www.linkedin.com/in/atn107/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="group flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-neutral-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:shadow-md hover:shadow-blue-100 transition-all duration-300"
                >
                  <LinkedInIcon className="w-5 h-5 text-[#0A66C2] transition-colors duration-300" />
                  <span className="text-sm font-bold text-black group-hover:text-blue-700 transition-colors duration-300">
                    LinkedIn
                  </span>
                </a>
              </div>

              {/* Resume download */}
              {/* Resume download */}
              {/* Resume download (Nuclear Option using JavaScript) */}
              <button
                id="btn-download-resume"
                onClick={() => window.open("/Antonio-Tenegra-CV.pdf", "_blank")}
                type="button"
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border-2 border-black bg-white font-bold text-sm text-black tracking-wide overflow-hidden hover:bg-black hover:text-white transition-all duration-300 w-fit"
              >
                <DownloadIcon className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-200" />
                Download Resume
                <span className="px-2 py-0.5 rounded-md bg-violet-100 text-violet-700 text-[10px] font-black border border-violet-200 group-hover:bg-violet-700 group-hover:text-white group-hover:border-violet-700 transition-all duration-200">
                  PDF
                </span>
              </button>
            </motion.div>

            {/* Right column: form */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 rounded-3xl border border-neutral-200 bg-white/80 backdrop-blur-sm p-8 shadow-sm shadow-violet-100 hover:shadow-violet-200 transition-shadow duration-500"
            >
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="relative border-t border-neutral-100 bg-white/60 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <p>
            <span className="font-black text-black tracking-tight">Antonio</span>
            <span className="text-violet-500">.</span>
            {" "}— Software Engineer · BSCS
          </p>
          <p>
            Built with{" "}
            <span className="text-black font-semibold">Next.js</span>,{" "}
            <span className="text-black font-semibold">Tailwind CSS</span> &amp;{" "}
            <span className="text-black font-semibold">Framer Motion</span>
          </p>
          <p>© {new Date().getFullYear()} Ji. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
