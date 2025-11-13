import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { getCommentary } from "@/utils/getCommentary";

export const AICommentary = () => {
  const { mode, commentaryMode } = useTerminalStore();
  const [line, setLine] = useState("");
  const timer = useRef<number>();

  // Map terminal mode → commentary section
  const section =
    mode === "boot" ? "intro" :
    mode === "ai-talk" ? "aiTalk" :
    mode === "main" ? "idle" :
    "idle";

  function refresh() {
    const next = getCommentary(section as any);
    setLine(next);
  }

  useEffect(() => {
    refresh();

    function cycle() {
      const delay = Math.random() * (30000 - 15000) + 15000;
      timer.current = window.setTimeout(() => {
        refresh();
        cycle();
      }, delay);
    }

    cycle();

    return () => timer.current && clearTimeout(timer.current);
  }, [section]);

  return (
    <AnimatePresence mode="wait">
      {line && (
        <motion.div
          key={line}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 
              bg-card/70 backdrop-blur border border-border rounded 
              text-sm text-muted-foreground max-w-xl text-center pointer-events-none"
        >
          <span className="text-terminal-cyan mr-2">»</span>
          {line}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
