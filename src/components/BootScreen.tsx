import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTerminalStore } from '@/store/terminalStore';

const bootMessages = [
  'Initializing system...',
  'Loading core modules...',
  '> Skills: [AI, ML, Web Dev, Systems Design]',
  '> Projects: [4 active, 2 in progress]',
  '> Personality: [Creative Technologist]',
  '> Terminal: [Ready]',
  '',
  'System boot complete.',
  'Welcome to The Living Terminal.',
];

export const BootScreen = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const { setIsBooting, setMode } = useTerminalStore();

  useEffect(() => {
    if (currentLine < bootMessages.length) {
      const timer = setTimeout(() => {
        setDisplayedMessages((prev) => [...prev, bootMessages[currentLine]]);
        setCurrentLine((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        setIsBooting(false);
        setMode('main');
      }, 1000);
      return () => clearTimeout(finalTimer);
    }
  }, [currentLine, setIsBooting, setMode]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-start justify-center min-h-screen p-8 space-y-2"
    >
      <div className="text-terminal-green text-glow mb-4">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-2"
        >
          SHUBHANKAR.SYSTEM v1.0
        </motion.div>
      </div>
      
      {displayedMessages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="text-terminal-green-dim text-sm font-mono"
        >
          {message}
        </motion.div>
      ))}
      
      {currentLine < bootMessages.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-terminal-green ml-1"
        />
      )}
    </motion.div>
  );
};
