import { motion, AnimatePresence } from 'framer-motion';
import { useTerminalStore } from '@/store/terminalStore';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

const logMessages = [
  '[CORE] Neural pathways active',
  '[MONITOR] Visitor interaction detected',
  '[AI] Processing contextual data...',
  '[SYSTEM] Adaptive response generated',
  '[MEMORY] Storing interaction pattern',
  '[CORE] Optimizing experience flow',
];

export const SystemLogs = () => {
  const { showLogs, toggleLogs } = useTerminalStore();
  const [logs, setLogs] = useState<Array<{ id: number; message: string; timestamp: string }>>([]);

  useEffect(() => {
    if (showLogs) {
      const interval = setInterval(() => {
        const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
        const timestamp = new Date().toLocaleTimeString();
        setLogs((prev) => [
          ...prev.slice(-9),
          { id: Date.now(), message: randomLog, timestamp },
        ]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showLogs]);

  return (
    <AnimatePresence>
      {showLogs && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="fixed right-0 top-0 h-full w-80 bg-card/95 backdrop-blur-sm border-l border-border p-4 z-40"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-terminal-green text-glow font-bold">SYSTEM LOGS</h3>
            <button
              onClick={toggleLogs}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-muted-foreground"
              >
                <span className="text-terminal-cyan">{log.timestamp}</span>
                <div className="text-terminal-green-dim">{log.message}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
