import { projects } from '@/data/projects';
import { useTerminalStore } from '@/store/terminalStore';

export const handleCommand = (command: string): string => {
  const cmd = command.toLowerCase().trim();
  const store = useTerminalStore.getState();

  // ───────────────────────────────────────────────
  //  NUMERIC PROJECT ID HANDLER (UNLIMITED RANGE)
  // ───────────────────────────────────────────────
  const num = Number(cmd);
  if (!isNaN(num) && num >= 1 && num <= projects.length) {
    const p = projects[num - 1];
    return `
<span class="text-terminal-green text-glow">${p.title}</span>

${p.description}

<span class="text-terminal-cyan">Technology Stack:</span>
${p.techStack.map((t) => `  • ${t}`).join('\n')}

<span class="text-terminal-cyan">Status:</span> ${p.status.toUpperCase()}
${p.link ? `<span class="text-terminal-cyan">Link:</span> ${p.link}` : ''}
    `.trim();
  }

  // ───────────────────────────────────────────────
  //  COMMAND SWITCH
  // ───────────────────────────────────────────────
  switch (cmd) {
    case 'help':
      return `
<span class="text-terminal-green text-glow">Available Commands:</span>

<span class="text-terminal-cyan">about</span>       - About Shubhankar
<span class="text-terminal-cyan">projects</span>    - Show project list
<span class="text-terminal-cyan">resume</span>      - Download resume
<span class="text-terminal-cyan">ai-talk</span>     - AI commentary mode
<span class="text-terminal-cyan">logs</span>        - Toggle system logs
<span class="text-terminal-cyan">clear</span>       - Clear terminal
<span class="text-terminal-cyan">status</span>      - System status
<span class="text-terminal-cyan">help</span>        - Show this help
      `.trim();

    case 'about':
      return `
<span class="text-terminal-green text-glow">About Shubhankar</span>

I'm a creative technologist who builds systems that think and interfaces that breathe.

<span class="text-terminal-cyan">Interests:</span>
• AI & Machine Learning
• Generative Systems
• Web Technologies
• Human-Computer Interaction

<span class="text-terminal-cyan">Philosophy:</span>
"Code is poetry. Systems are living organisms."
      `.trim();

    case 'projects':
      return `
<span class="text-terminal-green text-glow">Project Portfolio</span>

${projects
  .map(
    (p, i) => `
<span class="text-terminal-cyan">[${i + 1}]</span> <span class="text-terminal-green">${p.title}</span>
${p.description}
<span class="text-terminal-yellow">Status:</span> ${p.status}
<span class="text-terminal-yellow">Stack:</span> ${p.techStack.join(', ')}
`
  )
  .join('\n')}

<span class="text-muted-foreground">Type project ID (1-${projects.length}) to view details</span>
      `.trim();

    // ───────────────────────────────────────────────
    // RESUME COMMAND — REAL ANIMATED PROGRESS BAR
    // ───────────────────────────────────────────────
    case "resume": {
      const storeState = useTerminalStore.getState();
    
      // Progress frames
      const frames = [
        { bar: "▱▱▱▱▱▱▱▱▱▱", pct: "0%" },
        { bar: "▰▱▱▱▱▱▱▱▱▱", pct: "10%" },
        { bar: "▰▰▱▱▱▱▱▱▱▱", pct: "20%" },
        { bar: "▰▰▰▱▱▱▱▱▱▱", pct: "30%" },
        { bar: "▰▰▰▰▱▱▱▱▱▱", pct: "40%" },
        { bar: "▰▰▰▰▰▱▱▱▱▱", pct: "50%" },
        { bar: "▰▰▰▰▰▰▱▱▱▱", pct: "60%" },
        { bar: "▰▰▰▰▰▰▰▱▱▱", pct: "70%" },
        { bar: "▰▰▰▰▰▰▰▰▱▱", pct: "80%" },
        { bar: "▰▰▰▰▰▰▰▰▰▱", pct: "90%" },
        { bar: "▰▰▰▰▰▰▰▰▰▰", pct: "100%" },
      ];
    
      const initial = `
    <span class="text-terminal-green text-glow">Generating resume.pdf...</span>
    <span class="text-terminal-cyan">${frames[0].bar} ${frames[0].pct}</span>
      `.trim();
    
      // Return initial output so CommandInput adds *one* history entry
      setTimeout(() => {
        // Animate frames
        frames.forEach((frame, i) => {
          setTimeout(() => {
            storeState.replaceLastHistory(`
    <span class="text-terminal-green text-glow">Generating resume.pdf...</span>
    <span class="text-terminal-cyan">${frame.bar} ${frame.pct}</span>
            `.trim());
          }, i * 150);
        });
    
        // Final completion + download
        setTimeout(() => {
          try {
            const a = document.createElement("a");
            a.href = "/resume.pdf";
            a.download = "resume.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
    
            storeState.replaceLastHistory(
              `<span class="text-terminal-green">✓ Resume downloaded successfully</span>`
            );
          } catch {
            storeState.replaceLastHistory(
              `<span class="text-terminal-red">Failed to download resume.</span>`
            );
          }
        }, frames.length * 150 + 30);
      }, 10);
    
      return initial;
    }
    
    // ───────────────────────────────────────────────

    case 'ai-talk':
      store.setMode('ai-talk');
      store.setStatus('thinking');
      return `
<span class="text-terminal-green text-glow">Entering AI Commentary Mode...</span>
<span class="text-muted-foreground">Type 'exit' to return</span>
      `.trim();

    case 'exit':
      if (store.mode === 'ai-talk') {
        store.setMode('main');
        store.setStatus('online');
        return `<span class="text-terminal-green">Exited AI Commentary Mode</span>`;
      }
      return `<span class="text-terminal-red">Nothing to exit</span>`;

    case 'logs':
      store.toggleLogs();
      return `<span class="text-terminal-green">System logs ${store.showLogs ? 'enabled' : 'disabled'}</span>`;

    case 'clear':
      store.clearHistory();
      return '';

    case 'status':
      return `
<span class="text-terminal-green text-glow">System Status</span>

<span class="text-terminal-cyan">Mode:</span> ${store.mode.toUpperCase()}
<span class="text-terminal-cyan">Status:</span> ${store.status.toUpperCase()}
<span class="text-terminal-cyan">History:</span> ${store.history.length} commands logged
      `.trim();

    default:
      return `<span class="text-terminal-red">Unknown command: ${command}</span>`;
  }
};
