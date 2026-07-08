import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';

export function LoreModal({ book, onClose }) {
  // If no book is passed in, don't render anything
  if (!book) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        
        {/* Dark blurred background backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        />

        {/* The Modal Card */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl bg-gray-950 border border-red-900/50 rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.3)] overflow-hidden flex flex-col md:flex-row z-10"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/50 hover:bg-red-900/50 rounded-full p-1 transition-colors z-20"
          >
            <X size={24} />
          </button>

          {/* Left Side: Book Cover */}
          <div className="w-full md:w-2/5 h-64 md:h-auto relative">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent md:bg-gradient-to-r" />
          </div>

          {/* Right Side: Lore Content */}
          <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col">
            <span className="text-xs font-bold tracking-widest text-red-500 uppercase mb-2">
              {book.genre}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
              {book.title}
            </h2>
            <p className="text-sm text-gray-400 mb-6 border-b border-white/10 pb-4">
              Penned by <span className="text-gray-200">{book.author}</span>
            </p>
            
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-gray-300 leading-relaxed text-sm md:text-base italic">
                "{book.fullLoreText}"
              </p>
            </div>

            <button 
              onClick={onClose}
              className="mt-8 w-full py-3 bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <BookOpen size={18} /> Close Tome
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}