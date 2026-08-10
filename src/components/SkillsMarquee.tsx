"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Skill data ────────────────────────────────────────────────────────────────

const skills = [
  { name: "React", icon: "⚛️", level: "Expert" },
  { name: "Next.js", icon: "▲", level: "Expert" },
  { name: "Node.js", icon: "🟢", level: "Advanced" },
  { name: "Express", icon: "🚂", level: "Advanced" },
  { name: "Tailwind CSS", icon: "🎨", level: "Expert" },
  { name: "PostgreSQL", icon: "🐘", level: "Advanced" },
  { name: "PHP / Laravel", icon: "🐘", level: "Advanced" },
  { name: "React Native", icon: "📱", level: "Intermediate" },
  { name: "TypeScript", icon: "📘", level: "Advanced" },
  { name: "Prisma ORM", icon: "💎", level: "Advanced" },
];

// Duplicate for seamless loop
const marqueeSkills = [...skills, ...skills];

const levelColors: Record<string, string> = {
  Expert: "bg-violet-100 text-violet-700 border-violet-200",
  Advanced: "bg-purple-100 text-purple-700 border-purple-200",
  Intermediate: "bg-indigo-100 text-indigo-700 border-indigo-200",
};

// ── Marquee track ─────────────────────────────────────────────────────────────

function MarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="overflow-hidden relative group">
      {/* Fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent" aria-hidden="true" />

      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{
          duration: 28,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        /* pause on hover */
        whileHover={{ animationPlayState: "paused" } as never}
        style={{ willChange: "transform" }}
      >
        {marqueeSkills.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="group/card flex items-center gap-3 px-5 py-3 rounded-2xl border border-neutral-200 bg-white/80 dark:bg-neutral-900/80 dark:border-neutral-800 backdrop-blur-sm hover:border-violet-300 hover:bg-violet-50/60 hover:shadow-md hover:shadow-violet-100 transition-all duration-300 cursor-default flex-shrink-0"
          >
            <span className="text-xl leading-none" aria-hidden="true">
              {skill.icon}
            </span>
            <span className="font-bold text-black dark:text-white text-sm tracking-tight whitespace-nowrap">
              {skill.name}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide border ${levelColors[skill.level]}`}
            >
              {skill.level}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Proficiency grid (static) ────────────────────────────────────────────────

const coreStack = [
  { name: "React", pct: 95 },
  { name: "Next.js", pct: 90 },
  { name: "Node.js", pct: 85 },
  { name: "Express", pct: 82 },
  { name: "Tailwind CSS", pct: 93 },
  { name: "PostgreSQL", pct: 80 },
  { name: "PHP / Laravel", pct: 78 },
];

function ProficiencyBar({ name, pct, delay }: { name: string; pct: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-black dark:text-white tracking-tight">{name}</span>
        <span className="text-xs font-semibold text-neutral-400">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay }}
        />
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function SkillsMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-28 overflow-hidden"
      aria-label="Skills & Technologies"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-200 blur-[140px] opacity-30"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <p className="text-xs font-black tracking-[0.3em] text-violet-500 uppercase mb-3">
            Tech Stack
          </p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-black dark:text-white leading-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-500">
              Toolkit
            </span>
          </h2>
        </motion.div>
      </div>

      {/* ── Marquee rows ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.65, delay: 0.2 }}
        className="flex flex-col gap-4 mb-20"
      >
        <MarqueeTrack />
        <MarqueeTrack reverse />
      </motion.div>

      {/* ── Proficiency bars ── */}
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6"
        >
          {coreStack.map((item, i) => (
            <ProficiencyBar
              key={item.name}
              name={item.name}
              pct={item.pct}
              delay={0.05 * i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
