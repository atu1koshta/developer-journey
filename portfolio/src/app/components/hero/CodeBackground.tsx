"use client";

import { motion } from "framer-motion";

const TERMINAL_LINES = [
  { text: "$ npm run build", color: "#4ade80" },
  { text: "  Compiling 127 modules...", color: "#6b7280" },
  { text: "  ✓ Compiled successfully", color: "#4ade80" },
  { text: "$ docker push registry/api:latest", color: "#4ade80" },
  { text: "  Layer 3/7: Pushing [======>    ]", color: "#6b7280" },
  { text: "$ jest --coverage", color: "#4ade80" },
  { text: "  Tests: 94 passed, 94 total", color: "#4ade80" },
  { text: "  Coverage: 87% branches", color: "#6b7280" },
  { text: "$ aws ecs update-service --force", color: "#4ade80" },
  { text: "  ✓ Deployment complete. All tasks healthy.", color: "#4ade80" },
];

const VSCODE_LINES: { num: number; tokens: { t: string; c: string }[] }[] = [
  { num: 1, tokens: [{ t: "import", c: "#c792ea" }, { t: " express ", c: "#eeffff" }, { t: "from", c: "#c792ea" }, { t: " 'express'", c: "#c3e88d" }, { t: ";", c: "#89ddff" }] },
  { num: 2, tokens: [{ t: "import", c: "#c792ea" }, { t: " { authenticate } ", c: "#eeffff" }, { t: "from", c: "#c792ea" }, { t: " './middleware'", c: "#c3e88d" }, { t: ";", c: "#89ddff" }] },
  { num: 3, tokens: [] },
  { num: 4, tokens: [{ t: "const", c: "#c792ea" }, { t: " app ", c: "#82aaff" }, { t: "= ", c: "#89ddff" }, { t: "express", c: "#82aaff" }, { t: "();", c: "#89ddff" }] },
  { num: 5, tokens: [{ t: "const", c: "#c792ea" }, { t: " ledger ", c: "#82aaff" }, { t: "= ", c: "#89ddff" }, { t: "new", c: "#c792ea" }, { t: " LedgerService", c: "#ffcb6b" }, { t: "();", c: "#89ddff" }] },
  { num: 6, tokens: [] },
  { num: 7, tokens: [{ t: "// Double-entry bookkeeping", c: "#546e7a" }] },
  { num: 8, tokens: [{ t: "app", c: "#82aaff" }, { t: ".post(", c: "#89ddff" }, { t: "'/api/wallet/credit'", c: "#c3e88d" }, { t: ", ", c: "#89ddff" }, { t: "async", c: "#c792ea" }, { t: " (req, res) ", c: "#f78c6c" }, { t: "=> {", c: "#89ddff" }] },
  { num: 9, tokens: [{ t: "  const", c: "#c792ea" }, { t: " { amount } ", c: "#eeffff" }, { t: "= ", c: "#89ddff" }, { t: "req", c: "#82aaff" }, { t: ".body;", c: "#89ddff" }] },
  { num: 10, tokens: [{ t: "  await", c: "#c792ea" }, { t: " ledger", c: "#82aaff" }, { t: ".credit(", c: "#89ddff" }, { t: "wallet", c: "#82aaff" }, { t: ", amount);", c: "#89ddff" }] },
  { num: 11, tokens: [{ t: "  res", c: "#82aaff" }, { t: ".json(", c: "#89ddff" }, { t: "{ ", c: "#89ddff" }, { t: "success", c: "#f78c6c" }, { t: ": ", c: "#89ddff" }, { t: "true", c: "#ff5370" }, { t: " });", c: "#89ddff" }] },
  { num: 12, tokens: [{ t: "});", c: "#89ddff" }] },
];

export default function CodeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Terminal — bottom left */}
      <motion.div
        className="absolute bottom-8 left-6 sm:left-12 w-[340px] sm:w-[420px] rounded-lg overflow-hidden shadow-2xl"
        style={{
          background: "#0c0c0c",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.75 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div
          className="flex items-center gap-1.5 px-3 py-2"
          style={{ background: "#1a1a1a" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="text-[10px] text-gray-500 ml-2 font-mono">
            terminal — zsh
          </span>
        </div>
        <div className="px-3 py-2 font-mono text-[11px] leading-[1.7]">
          {TERMINAL_LINES.map((line, i) => (
            <motion.div
              key={i}
              style={{ color: line.color }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.4, duration: 0.3 }}
            >
              {line.text}
            </motion.div>
          ))}
          <motion.span
            className="inline-block w-2 h-3.5 bg-green-400 ml-0.5 mt-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* VS Code — top right */}
      <motion.div
        className="absolute top-20 right-4 sm:right-12 w-[320px] sm:w-[420px] rounded-lg overflow-hidden shadow-2xl"
        style={{
          background: "#1e1e2e",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.75 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div
          className="flex items-center gap-1.5 px-3 py-2"
          style={{ background: "#181825" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="text-[10px] text-gray-500 ml-2 font-mono">
            rewards.service.ts — VS Code
          </span>
        </div>
        {/* Tab bar */}
        <div
          className="flex text-[10px] font-mono"
          style={{ background: "#11111b" }}
        >
          <span
            className="px-3 py-1 border-b-2 border-[#cba6f7] text-gray-300"
            style={{ background: "#1e1e2e" }}
          >
            rewards.service.ts
          </span>
          <span className="px-3 py-1 text-gray-600">ledger.service.ts</span>
          <span className="px-3 py-1 text-gray-600">auth.middleware.ts</span>
        </div>
        {/* Code */}
        <div className="px-3 py-2 font-mono text-[11px] leading-[1.8]">
          {VSCODE_LINES.map((line, i) => (
            <motion.div
              key={i}
              className="flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.3, duration: 0.3 }}
            >
              <span
                className="mr-3 select-none min-w-[20px] text-right"
                style={{ color: "#3b3f51" }}
              >
                {line.num}
              </span>
              <span>
                {line.tokens.map((tok, j) => (
                  <span key={j} style={{ color: tok.c }}>
                    {tok.t}
                  </span>
                ))}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Center gradient for readability */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(10,10,25,0.9) 0%, rgba(10,10,25,0.55) 55%, rgba(10,10,25,0.2) 85%, transparent 100%)",
        }}
      />
    </div>
  );
}
