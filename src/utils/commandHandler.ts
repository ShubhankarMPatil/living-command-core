import { projects } from '@/data/projects';
import { useTerminalStore } from '@/store/terminalStore';

export const handleCommand = (command: string): string => {
  const cmd = command.toLowerCase().trim();
  
  switch (cmd) {
    case 'help':
      return `
<span class="text-terminal-green text-glow">Available Commands:</span>

<span class="text-terminal-cyan">help</span>        - Show this help message
<span class="text-terminal-cyan">about</span>       - Learn about Shubhankar
<span class="text-terminal-cyan">projects</span>    - View project portfolio
<span class="text-terminal-cyan">resume</span>      - Download resume
<span class="text-terminal-cyan">ai-talk</span>     - Enter AI commentary mode
<span class="text-terminal-cyan">logs</span>        - Toggle system logs
<span class="text-terminal-cyan">clear</span>       - Clear terminal history
<span class="text-terminal-cyan">status</span>      - Check system status
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
"Code is poetry. Systems are living organisms. Every interface should feel alive."

The intersection of artificial intelligence and human creativity fascinates me. 
I believe the best technology is invisible, intuitive, and evolves with its users.
      `.trim();

    case 'projects':
      return `
<span class="text-terminal-green text-glow">Project Portfolio</span>

${projects.map((project, index) => `
<span class="text-terminal-cyan">[${index + 1}]</span> <span class="text-terminal-green">${project.title}</span>
    ${project.description}
    <span class="text-terminal-yellow">Status:</span> ${project.status}
    <span class="text-terminal-yellow">Stack:</span> ${project.techStack.join(', ')}
`).join('\n')}

<span class="text-muted-foreground">Type project ID (1-${projects.length}) to learn more</span>
      `.trim();

    case '1':
    case '2':
    case '3':
    case '4':
      const projectIndex = parseInt(cmd) - 1;
      if (projects[projectIndex]) {
        const p = projects[projectIndex];
        return `
<span class="text-terminal-green text-glow">${p.title}</span>

${p.description}

<span class="text-terminal-cyan">Technology Stack:</span>
${p.techStack.map(tech => `  • ${tech}`).join('\n')}

<span class="text-terminal-cyan">Status:</span> ${p.status.replace('-', ' ').toUpperCase()}
${p.link ? `\n<span class="text-terminal-cyan">Link:</span> ${p.link}` : ''}
        `.trim();
      }
      return '<span class="text-terminal-red">Invalid project ID</span>';

    case 'resume':
      return `
<span class="text-terminal-green text-glow">Generating resume.pdf...</span>

<span class="text-terminal-cyan">█████████░</span> 90%

<span class="text-terminal-green">✓ Resume generated successfully</span>

<span class="text-muted-foreground">Note: This is a demo. Connect a real PDF in production.</span>
      `.trim();

    case 'ai-talk':
      useTerminalStore.getState().setMode('ai-talk');
      useTerminalStore.getState().setStatus('thinking');
      return `
<span class="text-terminal-green text-glow">Entering AI Commentary Mode...</span>

The system is now actively analyzing and narrating your experience.
Watch the commentary bar at the bottom of the screen.

<span class="text-terminal-cyan">AI Status:</span> <span class="text-terminal-green">ACTIVE</span>

<span class="text-muted-foreground">Type 'exit' to return to normal mode</span>
      `.trim();

    case 'exit':
      if (useTerminalStore.getState().mode === 'ai-talk') {
        useTerminalStore.getState().setMode('main');
        useTerminalStore.getState().setStatus('online');
        return '<span class="text-terminal-green">Exited AI Commentary Mode</span>';
      }
      return '<span class="text-terminal-red">Nothing to exit</span>';

    case 'logs':
      useTerminalStore.getState().toggleLogs();
      return `<span class="text-terminal-green">System logs ${useTerminalStore.getState().showLogs ? 'opened' : 'closed'}</span>`;

    case 'clear':
      useTerminalStore.getState().clearHistory();
      return '';

    case 'status':
      return `
<span class="text-terminal-green text-glow">System Status</span>

<span class="text-terminal-cyan">Core:</span> <span class="text-terminal-green">OPERATIONAL</span>
<span class="text-terminal-cyan">AI:</span> <span class="text-terminal-green">ACTIVE</span>
<span class="text-terminal-cyan">Memory:</span> ${useTerminalStore.getState().history.length} commands logged
<span class="text-terminal-cyan">Mode:</span> ${useTerminalStore.getState().mode.toUpperCase()}
<span class="text-terminal-cyan">Status:</span> ${useTerminalStore.getState().status.toUpperCase()}
      `.trim();

    default:
      return `<span class="text-terminal-red">Command not found: ${command}</span>\n<span class="text-muted-foreground">Type 'help' for available commands</span>`;
  }
};
