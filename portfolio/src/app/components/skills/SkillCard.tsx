"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { SKILL_PROFICIENCY } from "@/lib/constants";

interface SkillCardProps {
  category: string;
  label: string;
  skills: string[];
  categoryKey: string;
}

export default function SkillCard({
  category,
  label,
  skills,
  categoryKey,
}: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const proficiency = SKILL_PROFICIENCY[categoryKey] || 7;

  return (
    <motion.div
      layout
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden cursor-pointer hover:border-accent/60 transition-colors"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6 flex items-center justify-between hover:bg-[var(--background)] transition-colors"
      >
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{label}</h3>
          <div className="flex items-center gap-3">
            <div className="w-24 h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(proficiency / 10) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="h-full bg-gradient-to-r from-accent to-accent/60"
              />
            </div>
            <span className="text-xs font-medium text-accent">{proficiency}/10</span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4"
        >
          <FiChevronDown size={20} className="text-accent" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-[var(--border)] bg-[var(--background)]/50"
          >
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm font-medium text-accent hover:border-accent/60 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
