import { create } from "zustand";

export type TerminalMode = "boot" | "main" | "ai-talk";

export type CommandHistory = {
  command: string;
  output: string;
  timestamp: Date;
};

export type TerminalState = {
  mode: TerminalMode;
  history: CommandHistory[];
  currentCommand: string;
  isBooting: boolean;
  showLogs: boolean;
  status: "online" | "thinking" | "idle";

  // AI commentary mode (still static, but stored for future flexibility)
  commentaryMode: "static";
  setCommentaryMode: (m: "static") => void;

  // 🔥 REQUIRED by CommandInput.tsx (restored)
  hasShownCommands: boolean;
  setHasShownCommands: (value: boolean) => void;

  setMode: (mode: TerminalMode) => void;
  addToHistory: (cmd: string, out: string) => void;
  replaceLastHistory: (out: string) => void;
  setCurrentCommand: (cmd: string) => void;
  setIsBooting: (b: boolean) => void;
  toggleLogs: () => void;
  setStatus: (s: "online" | "thinking" | "idle") => void;
  clearHistory: () => void;
};

export const useTerminalStore = create<TerminalState>((set) => ({
  mode: "boot",
  history: [],
  currentCommand: "",
  isBooting: true,
  showLogs: false,
  status: "idle",

  commentaryMode: "static",
  setCommentaryMode: (m) => set({ commentaryMode: m }),

  // 🔥 Add these back
  hasShownCommands: false,
  setHasShownCommands: (value) => set({ hasShownCommands: value }),

  setMode: (mode) => set({ mode }),

  addToHistory: (command, output) =>
    set((state) => ({
      history: [
        ...state.history,
        { command, output, timestamp: new Date() },
      ],
    })),

  replaceLastHistory: (output) =>
    set((state) => {
      if (!state.history.length) return state;
      return {
        history: state.history.map((entry, index) =>
          index === state.history.length - 1
            ? { ...entry, output, timestamp: new Date() }
            : entry
        ),
      };
    }),

  setCurrentCommand: (currentCommand) => set({ currentCommand }),
  setIsBooting: (isBooting) => set({ isBooting }),
  toggleLogs: () => set((state) => ({ showLogs: !state.showLogs })),
  setStatus: (status) => set({ status }),
  clearHistory: () => set({ history: [] }),
}));
