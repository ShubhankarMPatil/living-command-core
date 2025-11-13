import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTerminalStore } from "@/store/terminalStore";
import { getCommentary } from "@/utils/getCommentary";

export const AICommentary: React.FC = () => {
  const { mode, commentaryMode } = useTerminalStore();
  const [line, setLine] = useState<string>("");
  const timerRef = useRef<number | null>(null);

  const desiredSection = (() => {
    // Choose a section based on current terminal mode
    if (mode === "boot") return "intro" as const;
    if (mode === "ai-talk") return "projects" as const;
    return "idle" as const;
  })();

  async function refresh() {
    // If commentaryMode is static, skip calling edge by reading getCommentary (it will still try edge),
    // but simpler: when commentaryMode === 'static' we use only static fallback.
    if (commentaryMode === "static") {
      // pick static directly from local data with the same semantics as getCommentary static fallback
      const { text } = await getCommentary(desiredSection);
      setLine(text);
      return;
    }

    // dynamic mode: let getCommentary handle edge+fallback
    const { text } = await getCommentary(desiredSection);
    setLine(text);
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      await refresh();
      if (!mounted) return;

      // schedule cycle
      function schedule() {
        const delay = Math.floor(Math.random() * (30000 - 15000)) + 15000; // 15-30s
        timerRef.current = window.setTimeout(async () => {
          await refresh();
          schedule();
        }, delay);
      }
      schedule();
    })();

    return () => {
      mounted = false;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, commentaryMode]);

  return (
    <AnimatePresence mode="wait">
      {line && (
        <motion.div
          key={line}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-card/70 backdrop-blur border border-border rounded text-sm text-muted-foreground max-w-xl text-center pointer-events-none"
          aria-hidden
        >
          <span className="text-terminal-cyan mr-2">»</span>
          {line}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
