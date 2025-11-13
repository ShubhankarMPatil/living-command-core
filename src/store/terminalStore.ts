import { create } from 'zustand';

export type CommandHistory = {
  command: string;
  output: string;
  timestamp: Date;
};

export type TerminalMode = 'boot' | 'main' | 'ai-talk';

export type TerminalState = {
  mode: TerminalMode;
  history: CommandHistory[];
  currentCommand: string;
  isBooting: boolean;
  aiCommentary: string;
  showLogs: boolean;
  status: 'online' | 'thinking' | 'idle';

  hasShownCommands: boolean;

  setMode: (mode: TerminalMode) => void;
  addToHistory: (command: string, output: string) => void;
  replaceLastHistory: (output: string) => void;
  setCurrentCommand: (command: string) => void;
  setIsBooting: (isBooting: boolean) => void;
  setAiCommentary: (commentary: string) => void;
  toggleLogs: () => void;
  setStatus: (status: 'online' | 'thinking' | 'idle') => void;
  clearHistory: () => void;

  setHasShownCommands: (value: boolean) => void;
};

export const useTerminalStore = create<TerminalState>((set) => ({
  mode: 'boot',
  history: [],
  currentCommand: '',
  isBooting: true,
  aiCommentary: 'System initializing...',
  showLogs: false,
  status: 'idle',

  hasShownCommands: false,

  setMode: (mode) => set({ mode }),

  addToHistory: (command, output) =>
    set((state) => ({
      history: [...state.history, { command, output, timestamp: new Date() }],
    })),

  // NEW — Allows live replacement of the last history entry (for animations)
  replaceLastHistory: (output) =>
    set((state) => {
      if (state.history.length === 0) return state;

      const updated = [...state.history];
      const last = updated[updated.length - 1];

      updated[updated.length - 1] = {
        ...last,
        output,
        timestamp: new Date(),
      };

      return { history: updated };
    }),

  setCurrentCommand: (currentCommand) => set({ currentCommand }),
  setIsBooting: (isBooting) => set({ isBooting }),
  setAiCommentary: (aiCommentary) => set({ aiCommentary }),
  toggleLogs: () => set((state) => ({ showLogs: !state.showLogs })),
  setStatus: (status) => set({ status }),
  clearHistory: () => set({ history: [] }),

  setHasShownCommands: (value) => set({ hasShownCommands: value }),
}));
