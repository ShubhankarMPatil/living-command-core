import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTerminalStore } from '@/store/terminalStore';
import { BootScreen } from '@/components/BootScreen';
import { Terminal } from '@/components/Terminal';
import { AICommentary } from '@/components/AICommentary';
import { SystemLogs } from '@/components/SystemLogs';

const Index = () => {
  const { isBooting, mode, setAiCommentary } = useTerminalStore();

  useEffect(() => {
    // Set initial AI commentary
    setAiCommentary('Observing your exploration...');
  }, [setAiCommentary]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-terminal-green/5 to-transparent animate-scan" />
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootScreen key="boot" />
        ) : (
          <Terminal key="terminal" />
        )}
      </AnimatePresence>

      {/* AI Commentary */}
      {!isBooting && <AICommentary />}

      {/* System Logs */}
      <SystemLogs />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-terminal-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-terminal-cyan/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Index;
