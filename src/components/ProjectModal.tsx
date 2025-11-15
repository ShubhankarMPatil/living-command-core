import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Project } from '@/data/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  const statusColors = {
    completed: 'text-terminal-green',
    'in-progress': 'text-terminal-cyan',
    concept: 'text-terminal-yellow',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-card border border-border border-glow rounded p-6 max-w-2xl w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-terminal-green text-glow mb-2">
                {project.title}
              </h2>
              <span className={`text-sm ${statusColors[project.status]} uppercase tracking-wider`}>
                [{project.status.replace('-', ' ')}]
              </span>
            </div>

            <p className="text-foreground">{project.description}</p>

            <div>
              <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary border border-border rounded text-sm text-terminal-cyan"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.link && (
              <a
                href={project.link}
                target={project.link}
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                View Project →
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
