"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import type { Profile } from "@/lib/types";
import CodeBackground from "./CodeBackground";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden"
      style={{ background: "#0a0a19" }}
    >
      <CodeBackground />

      <div className="relative z-20 max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-xl sm:text-2xl text-gray-300 mb-4"
        >
          {profile.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-8"
        >
          {profile.tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center justify-center gap-5"
        >
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-3 rounded-full border border-white/15 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors backdrop-blur-sm"
          >
            <FiGithub size={22} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-3 rounded-full border border-white/15 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors backdrop-blur-sm"
          >
            <FiLinkedin size={22} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="p-3 rounded-full border border-white/15 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors backdrop-blur-sm"
          >
            <FiMail size={22} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
