"use client";

import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import ContactFooter from "@/components/ContactFooter";

// ── Bulletproof Scroll Reveal Wrapper ──────────────────────────────────────────
function FadeUpReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }} // Safe margin para ma-trigger agad
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
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
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-neutral-100/80 shadow-sm shadow-violet-50"
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="#" className="text-2xl font-black tracking-tighter text-black hover:text-violet-600 transition-colors">
                    Ji<span className="text-violet-500">.</span>
                </a>

                <div className="hidden sm:flex items-center gap-8 text-sm font-semibold text-neutral-600">
                    <a href="#projects" className="hover:text-violet-600 transition-colors">Systems</a>
                    <a href="#skills" className="hover:text-violet-600 transition-colors">Stack</a>
                    <a href="#contact" className="hover:text-violet-600 transition-colors">Contact</a>
                </div>

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

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
    return (
        <main className="min-h-screen bg-white text-black relative">
            {/* Background Glows (Always visible) */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-200 blur-[180px] opacity-30" />
            </div>

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