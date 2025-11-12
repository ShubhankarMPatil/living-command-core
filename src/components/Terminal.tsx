import { motion } from 'framer-motion';
import { CommandInput } from './CommandInput';
import { CommandOutput } from './CommandOutput';
import { StatusIndicator } from './StatusIndicator';
import { Terminal as TerminalIcon } from 'lucide-react';

export const Terminal = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen p-4 md:p-8"
    >
      <div className="flex-1 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <TerminalIcon className="text-terminal-green text-glow" size={24} />
            <div>
              <h1 className="text-xl font-bold text-terminal-green text-glow">
                THE LIVING TERMINAL
              </h1>
              <p className="text-xs text-muted-foreground">shubhankar.system v1.0</p>
            </div>
          </div>
          <StatusIndicator />
        </div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 space-y-2"
        >
          <p className="text-terminal-green text-glow">
            Welcome to The Living Terminal.
          </p>
          <p className="text-muted-foreground text-sm">
            An AI-driven portfolio that thinks and evolves with every interaction.
          </p>
          <p className="text-terminal-cyan text-sm">
            Type <span className="text-terminal-green">'help'</span> to begin your exploration.
          </p>
        </motion.div>

        {/* Output Area */}
        <div className="flex-1 mb-4">
          <CommandOutput />
        </div>

        {/* Input Area */}
        <div className="border-t border-border pt-4">
          <CommandInput />
        </div>
      </div>
    </motion.div>
  );
};
