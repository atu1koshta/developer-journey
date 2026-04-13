"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiChevronDown } from "react-icons/fi";
import type { Profile } from "@/lib/types";
import CodeBackground from "./CodeBackground";

export default function Hero({ profile }: { profile: Profile }) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden bg-[var(--background)]"
    >
      <CodeBackground />

      <div className="relative z-20 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-block"
        >
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-[var(--border)] text-gray-300 dark:text-gray-400 backdrop-blur-sm">
            Solutions-Focused Software Engineer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 text-white dark:text-white"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl sm:text-3xl font-semibold text-white dark:text-white mb-6"
        >
          {profile.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-secondary dark:text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => scrollToSection("contributions")}
            className="px-8 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary)]/90 transition-colors"
          >
            View My Work
          </button>
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full border border-[var(--border)] text-secondary dark:text-muted hover:text-primary dark:hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors backdrop-blur-sm"
            >
              <FiGithub size={22} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full border border-[var(--border)] text-secondary dark:text-muted hover:text-primary dark:hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors backdrop-blur-sm"
            >
              <FiLinkedin size={22} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="p-3 rounded-full border border-[var(--border)] text-secondary dark:text-muted hover:text-primary dark:hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors backdrop-blur-sm"
            >
              <FiMail size={22} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <FiChevronDown
          size={24}
          className="text-secondary dark:text-muted"
        />
      </motion.div>
    </section>
  );
}
