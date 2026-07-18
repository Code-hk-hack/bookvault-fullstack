import { motion, AnimatePresence } from 'framer-motion';
import { X, Scroll } from 'lucide-react';
import { useEffect } from 'react';

interface LoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  lore: string | null;
}

export default function LoreModal({ isOpen, onClose, bookTitle, lore }: LoreModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[var(--bg-deep)]/90 backdrop-blur-xl" onClick={onClose} />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 180 }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-[var(--border-subtle)] flex items-start justify-between bg-gradient-to-b from-[var(--accent-muted)] to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-3 glass-accent rounded-xl text-[var(--accent)]">
                  <Scroll size={22} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif text-white">Arcane Record</h2>
                  <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase font-medium">{bookTitle}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-[var(--text-ghost)] hover:text-white transition-colors p-2 rounded-xl hover:bg-white/[0.05]">
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Lore Content */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 relative">
              <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-[var(--bg-elevated)] to-transparent pointer-events-none z-10" />
              {lore ? (
                <div className="prose prose-invert max-w-none">
                  <p className="text-[var(--text-secondary)] leading-[1.8] font-serif text-lg tracking-wide whitespace-pre-wrap first-letter:text-5xl first-letter:font-bold first-letter:text-[var(--accent)] first-letter:mr-2 first-letter:float-left first-line:uppercase first-line:tracking-[0.15em]">
                    {lore}
                  </p>
                </div>
              ) : (
                <div className="text-center py-16 flex flex-col items-center">
                  <Scroll size={40} className="text-[var(--text-ghost)] mb-4 opacity-40" />
                  <p className="text-[var(--text-muted)] font-serif text-xl">The pages of this tome have been torn out.</p>
                  <p className="text-[var(--text-ghost)] text-sm mt-2">No lore is recorded for this artifact.</p>
                </div>
              )}
              <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[var(--bg-elevated)] to-transparent pointer-events-none z-10" />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[var(--border-subtle)] text-center">
              <span className="text-[9px] text-[var(--text-ghost)] tracking-[0.3em] uppercase font-semibold">Property of the Grand Archives</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
