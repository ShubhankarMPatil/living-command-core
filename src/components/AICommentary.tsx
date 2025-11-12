import { motion, AnimatePresence } from 'framer-motion';
import { useTerminalStore } from '@/store/terminalStore';
import { useEffect, useState } from 'react';

const commentaries = [
  "Analyzing visitor patterns...",
  "This portfolio adapts to your interests.",
  "Every interaction shapes the experience.",
  "I learn from each command you enter.",
  "Exploring the intersection of code and consciousness.",
  "Systems that think, interfaces that breathe.",
];

export const AICommentary = () => {
  const { aiCommentary, mode } = useTerminalStore();
  const [currentCommentary, setCurrentCommentary] = useState(aiCommentary);

  useEffect(() => {
    if (mode === 'ai-talk') {
      const interval = setInterval(() => {
        const randomCommentary = commentaries[Math.floor(Math.random() * commentaries.length)];
        setCurrentCommentary(randomCommentary);
      }, 5000);
      return () => clearInterval(interval);
    } else {
      setCurrentCommentary(aiCommentary);
    }
  }, [mode, aiCommentary]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentCommentary}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-card/80 backdrop-blur-sm border border-border rounded text-sm text-muted-foreground text-glow-cyan max-w-2xl text-center"
      >
        <span className="text-terminal-cyan mr-2">»</span>
        {currentCommentary}
      </motion.div>
    </AnimatePresence>
  );
};
