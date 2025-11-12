import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTerminalStore } from '@/store/terminalStore';
import { handleCommand } from '@/utils/commandHandler';

export const CommandInput = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToHistory, setStatus } = useTerminalStore();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setStatus('thinking');
    const output = handleCommand(input.trim());
    addToHistory(input, output);
    setInput('');
    
    setTimeout(() => {
      setStatus('online');
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
      <span className="text-terminal-green text-glow">{'>'}</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none text-foreground font-mono placeholder:text-muted-foreground"
        placeholder="Type 'help' for available commands..."
        autoComplete="off"
        spellCheck="false"
      />
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="w-2 h-4 bg-terminal-green cursor-glow"
      />
    </form>
  );
};
