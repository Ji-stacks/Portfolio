"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 px-6"
      aria-label="Hero Section"
    >
      {/* ── Animated background glows ───────────────── */}
      <motion.div
        style={{ y: glowY, scale: glowScale }}
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-violet-200 blur-[160px] opacity-50"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: glowY, scale: glowScale }}
        className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-violet-100 blur-[120px] opacity-60"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute -bottom-12 left-0 w-[320px] h-[320px] rounded-full bg-violet-300 blur-[130px] opacity-25"
        aria-hidden="true"
      />

      {/* ── Orbiting ring accents ────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-[800px] h-[800px] rounded-full border border-violet-100/40 absolute animate-spin-slow" />
        <div className="w-[560px] h-[560px] rounded-full border border-violet-200/30 absolute" style={{ animationDuration: "18s" }} />
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-violet-300 bg-violet-50 dark:bg-violet-900/30 dark:border-violet-700/50 dark:text-violet-300 text-violet-700 text-sm font-semibold tracking-wide shadow-sm shadow-violet-100 mb-8">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            BSCS Student · Software Engineer
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-black tracking-tighter leading-[0.92] text-black dark:text-white mb-8"
        >
          Software Engineer
          <br />
          building{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-violet-400 to-purple-500">
              modern, scalable
            </span>
            {/* underline glow */}
            <span className="absolute -bottom-2 left-0 w-full h-1 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 opacity-60 blur-sm" />
          </span>
          <br />
          systems.
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-14"
        >
          Crafting backend architectures, integrated mobile systems, and
          efficient library solutions — one clean commit at a time.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          {/* Primary */}
          <motion.a
            href="#projects"
            id="hero-cta-primary"
            className="relative group px-10 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-base tracking-wide overflow-hidden transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* violet glow on hover */}
            <span className="absolute inset-0 rounded-full bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute -inset-1 rounded-full bg-violet-400 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Explore My Systems
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </motion.a>

          {/* Secondary */}
          <motion.a
            href="#contact"
            id="hero-cta-secondary"
            className="group px-10 py-4 rounded-full border border-neutral-300 bg-white/80 backdrop-blur-sm text-black font-bold text-base tracking-wide hover:border-violet-400 hover:bg-violet-50/60 dark:bg-neutral-900/80 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="flex items-center gap-2">
              Get in Touch
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </span>
          </motion.a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={itemVariants}
          className="mt-20 flex flex-col items-center gap-2 text-neutral-400"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-neutral-300 dark:border-neutral-600 flex justify-center pt-1.5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
