import { motion } from 'framer-motion';
import { useTerminalStore } from '@/store/terminalStore';

export const StatusIndicator = () => {
  const { status } = useTerminalStore();

  const statusConfig = {
    online: {
      color: 'bg-terminal-green',
      text: 'ONLINE',
      pulse: true,
    },
    thinking: {
      color: 'bg-terminal-cyan',
      text: 'THINKING',
      pulse: true,
    },
    idle: {
      color: 'bg-terminal-yellow',
      text: 'IDLE',
      pulse: false,
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2 text-xs">
      <motion.div
        className={`w-2 h-2 rounded-full ${config.color}`}
        animate={config.pulse ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className="text-muted-foreground">{config.text}</span>
    </div>
  );
};
