"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import ContactFooter from "@/components/ContactFooter";

// ── Bulletproof Scroll Reveal Wrapper ──────────────────────────────────────────
function FadeUpReveal({ children, delay = 0.3 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ── Navigation ───────────────────────────────────────────────────────────────
function Navbar() {
    const [isDark, setIsDark] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        if (document.documentElement.classList.contains("dark")) {
            setIsDark(true);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["projects", "skills", "contact"];
            let current = "";
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if the section is currently in the upper part of the viewport
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        current = section;
                    }
                }
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        setIsDark((prev) => !prev);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl border-b border-neutral-100/80 dark:border-neutral-800 shadow-sm shadow-violet-50 transition-colors duration-300"
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="#" className="text-2xl font-black tracking-tighter text-black dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                    Ji<span className="text-violet-500">.</span>
                </a>

                <div className="hidden sm:flex items-center gap-8 text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                    {[
                        { href: "#projects", id: "projects", label: "Systems" },
                        { href: "#skills", id: "skills", label: "Stack" },
                        { href: "#contact", id: "contact", label: "Contact" },
                    ].map((link) => {
                        const isActive = activeSection === link.id;
                        return (
                            <motion.a
                                key={link.id}
                                href={link.href}
                                animate={{
                                    color: isActive 
                                        ? (isDark ? "#a78bfa" : "#7c3aed") // violet-400 (dark) or violet-600 (light)
                                        : (isDark ? "#d4d4d8" : "#52525b") // neutral-300 (dark) or neutral-600 (light)
                                }}
                                transition={{ duration: 0.3 }}
                                className="relative px-3 py-1.5 font-semibold text-sm transition-colors hover:text-violet-500 dark:hover:text-violet-400"
                            >
                                {link.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav-shade"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 30,
                                            opacity: { duration: 0.2 }
                                        }}
                                        className="absolute inset-0 z-[-1] rounded-full bg-violet-100 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-700/50 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                                    />
                                )}
                            </motion.a>
                        );
                    })}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group px-5 py-2.5 rounded-full bg-black text-white text-sm font-bold overflow-hidden"
                    >
                        <span className="absolute inset-0 rounded-full bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10">Get in Touch</span>
                    </motion.a>
                </div>
            </div>
        </motion.nav>
    );
}

// ── Divider ──────────────────────────────────────────────────────────────────
function SectionDivider() {
    return (
        <div className="max-w-6xl mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
        </div>
    );
}

// ── Animated Grid ────────────────────────────────────────────────────────────
function AnimatedGrid() {
    return (
        <div 
            className="pointer-events-none fixed inset-0 z-0"
            style={{
                maskImage: "radial-gradient(circle at center, black, transparent 80%)",
                WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)",
            }}
        >
            <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #8b5cf6 1px, transparent 1px),
                        linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px",
                    opacity: 0.6, // Increased opacity for darker lines
                }}
                animate={{
                    backgroundPosition: ["0px 0px", "50px 50px"],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "linear",
                }}
            />
        </div>
    );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
    return (
        <main className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white relative transition-colors duration-500">
            {/* Animated Grid Background */}
            <AnimatedGrid />

            <Navbar />

            <div className="relative z-10">
                <HeroSection />

                <SectionDivider />
                <FadeUpReveal>
                    <ProjectsSection />
                </FadeUpReveal>

                <SectionDivider />
                <FadeUpReveal>
                    <SkillsMarquee />
                </FadeUpReveal>

                <SectionDivider />
                <FadeUpReveal>
                    <ContactFooter />
                </FadeUpReveal>
            </div>
        </main>
    );
}