"use client";

import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import ContactFooter from "@/components/ContactFooter";

// ── Section wrapper with scroll-triggered fade-up reveal ────────────────────

function SectionReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Navigation ───────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-neutral-100/80 shadow-sm shadow-violet-50"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          id="nav-logo"
          className="text-2xl font-black tracking-tighter text-black hover:text-violet-600 transition-colors duration-200"
          aria-label="Tonyo — home"
        >
          Tonyo<span className="text-violet-500">.</span>
        </a>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-8 text-sm font-semibold text-neutral-600">
          {[
            { href: "#projects", label: "Systems" },
            { href: "#skills", label: "Stack" },
            { href: "#contact", label: "Contact" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              id={`nav-${link.label.toLowerCase()}`}
              className="relative hover:text-black transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:rounded-full after:bg-violet-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#contact"
          id="nav-cta"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative group px-5 py-2.5 rounded-full bg-black text-white text-sm font-bold tracking-wide overflow-hidden transition-all duration-300"
        >
          <span className="absolute inset-0 rounded-full bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute -inset-1 rounded-full bg-violet-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          <span className="relative z-10">Get in Touch</span>
        </motion.a>
      </div>
    </motion.nav>
  );
}

// ── Divider ──────────────────────────────────────────────────────────────────

function SectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6" aria-hidden="true">
      <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main
      className="min-h-screen bg-white text-black relative overflow-x-hidden"
      id="main-content"
    >
      {/* Fixed global background glows */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-200 blur-[180px] opacity-30" />
        <div className="absolute -top-32 right-0 w-[450px] h-[450px] rounded-full bg-violet-100 blur-[120px] opacity-40" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-purple-200 blur-[140px] opacity-20" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Content */}
      <div className="relative z-10">
        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSection />
        </motion.div>

        <SectionDivider />

        {/* ── Projects ── */}
        <SectionReveal delay={0.05}>
          <ProjectsSection />
        </SectionReveal>

        <SectionDivider />

        {/* ── Skills ── */}
        <SectionReveal delay={0.05}>
          <SkillsMarquee />
        </SectionReveal>

        <SectionDivider />

        {/* ── Contact + Footer ── */}
        <SectionReveal delay={0.05}>
          <ContactFooter />
        </SectionReveal>
      </div>
    </main>
  );
}