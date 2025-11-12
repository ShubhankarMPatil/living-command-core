import { motion } from 'framer-motion';
import { useTerminalStore } from '@/store/terminalStore';
import { useEffect, useRef } from 'react';

export const CommandOutput = () => {
  const { history } = useTerminalStore();
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div ref={outputRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-4 custom-scrollbar">
      {history.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-terminal-green text-glow">{'>'}</span>
            <span className="text-foreground">{item.command}</span>
          </div>
          <div 
            className="text-muted-foreground pl-4 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: item.output }}
          />
        </motion.div>
      ))}
    </div>
  );
};
