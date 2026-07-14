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
  // Lock body scroll when open
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
          <div className="absolute inset-0 bg-[#030303]/90 backdrop-blur-md" onClick={onClose} />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#0a0a0c] border border-red-900/40 rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.15)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-start justify-between bg-gradient-to-b from-red-950/20 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                  <Scroll size={24} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif text-white drop-shadow-md">Arcane Record</h2>
                  <p className="text-neutral-400 text-xs tracking-widest uppercase">{bookTitle}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-neutral-500 hover:text-white transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Lore Content */}
            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1 relative">
              <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-[#0a0a0c] to-transparent pointer-events-none" />
              
              {lore ? (
                <div className="prose prose-invert max-w-none">
                  <p className="text-neutral-300 leading-relaxed font-serif text-lg tracking-wide whitespace-pre-wrap first-letter:text-5xl first-letter:font-bold first-letter:text-red-500 first-letter:mr-2 first-letter:float-left first-line:uppercase first-line:tracking-widest">
                    {lore}
                  </p>
                </div>
              ) : (
                <div className="text-center py-16 flex flex-col items-center">
                  <Scroll size={48} className="text-neutral-700 mb-4 opacity-50" />
                  <p className="text-neutral-500 font-serif text-xl">The pages of this tome have been torn out.</p>
                  <p className="text-neutral-600 text-sm mt-2">No lore is recorded for this artifact.</p>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#0a0a0c] to-transparent pointer-events-none" />
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-white/10 text-center bg-black/40">
              <span className="text-[10px] text-red-900/80 tracking-[0.3em] uppercase font-bold">Property of the Grand Archives</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
