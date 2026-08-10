"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Project Data ─────────────────────────────────────────────────────────────

const projects = [
  {
    id: "dlms",
    title: "Digital Library Management System",
    acronym: "DLMS",
    tagline: "Scalable e-library architecture at its finest.",
    description:
      "A full-stack integrated library platform enabling seamless cataloging, digital-resource management, member portals, and real-time circulation tracking. Designed for institutions that need a future-proof, cloud-ready e-library backbone.",
    tags: ["Next.js", "PostgreSQL", "Prisma ORM", "TailwindCSS", "REST API"],
    highlights: [
      "Multi-role user portal (Admin, Librarian, Member)",
      "Automated cataloging with Dewey Decimal support",
      "Real-time book availability & reservation system",
      "Comprehensive audit logs & reporting dashboard",
    ],
    accentColor: "from-violet-500 to-purple-600",
    glowColor: "bg-violet-300",
    index: "01",
  },
  {
    id: "ims",
    title: "Integrated Mobile Systems",
    acronym: "IMS",
    tagline: "React Native → Laravel → PostgreSQL, end-to-end.",
    description:
      "A cross-platform mobile ecosystem bridging a React Native frontend with a robust Laravel REST API middleware and PostgreSQL database. Features seamless JWT-authenticated sessions, offline-first caching, and real-time push notifications.",
    tags: ["React Native", "Laravel", "PostgreSQL", "JWT Auth", "Expo"],
    highlights: [
      "Cross-platform iOS & Android support via Expo",
      "Laravel REST API with Sanctum authentication",
      "PostgreSQL with optimised relational schemas",
      "Offline-first with background sync queue",
    ],
    accentColor: "from-purple-500 to-indigo-600",
    glowColor: "bg-purple-300",
    index: "02",
  },
];

// ── Spotlight Card Component ──────────────────────────────────────────────────

function SpotlightCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Cursor-tracking tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 260,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 260,
    damping: 28,
  });

  // Spotlight position
  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, 80]), {
    stiffness: 300,
    damping: 30,
  });
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, 80]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: index * 0.15,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl z-10 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(280px circle at ${spotlightX.get()}% ${spotlightY.get()}%, rgba(196,181,253,0.18), transparent 70%)`
            : "none",
          opacity: isHovered ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Outer glow */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          `shadow-[0_0_50px_0px] shadow-violet-200`
        )}
        aria-hidden="true"
      />

      {/* Card body */}
      <div className="relative h-full rounded-3xl border border-neutral-200 bg-white/80 dark:bg-neutral-900/80 dark:border-neutral-800 backdrop-blur-sm p-8 overflow-hidden flex flex-col transition-all duration-500 group-hover:border-violet-300 group-hover:shadow-xl group-hover:shadow-violet-100">
        {/* Background glow blob */}
        <div
          className={cn(
            "absolute -bottom-16 -right-16 w-52 h-52 rounded-full blur-[80px] opacity-0 group-hover:opacity-60 transition-opacity duration-500",
            project.glowColor
          )}
          aria-hidden="true"
        />

        {/* Index + acronym header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-black tracking-[0.25em] text-neutral-300 uppercase">
            {project.index}
          </span>
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-black tracking-widest text-white bg-gradient-to-r",
              project.accentColor
            )}
          >
            {project.acronym}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black tracking-tight text-black dark:text-white mb-2 leading-tight">
          {project.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm font-semibold text-violet-500 mb-4 tracking-wide">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
              <span className="mt-0.5 w-4 h-4 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-300 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                ✓
              </span>
              {h}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-900/30 dark:border-violet-700/50 dark:text-violet-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function ProjectsSection() {
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
      id="projects"
      ref={ref}
      className="relative py-28 px-6 overflow-hidden"
      aria-label="Featured Projects"
    >
      {/* Section glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-100 blur-[120px] opacity-40"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row sm:items-end gap-6 mb-20"
        >
          <div className="flex-1">
            <p className="text-xs font-black tracking-[0.3em] text-violet-500 uppercase mb-3">
              Featured Systems
            </p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-black dark:text-white leading-tight">
              What I've{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-500">
                Built
              </span>
            </h2>
          </div>
          <p className="text-neutral-400 text-base max-w-xs leading-relaxed sm:text-right">
            Real-world systems designed for scale, performance, and maintainability.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, i) => (
            <SpotlightCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
