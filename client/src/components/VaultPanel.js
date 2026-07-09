import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Book } from 'lucide-react';

export function VaultPanel({ isOpen, onClose, savedBooks, onRemove }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark blurred backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-950 border-l border-white/10 z-[101] shadow-2xl flex flex-col"
          >
            {/* Panel Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
              <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                <Book className="text-red-500" />
                Personal Vault
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Saved Books List */}
            <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
              {savedBooks.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  <p>Your vault is empty.</p>
                  <p className="text-sm mt-2">Bookmark tomes from the library to save them here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedBooks.map((book) => (
                    <div key={book.id} className="flex gap-4 bg-black/40 border border-white/5 rounded-xl p-3 hover:border-red-900/50 transition-colors group">
                      <img src={book.coverImage} alt={book.title} className="w-16 h-24 object-cover rounded-md shadow-md" />
                      <div className="flex-grow flex flex-col justify-center">
                        <h3 className="text-white font-bold line-clamp-1">{book.title}</h3>
                        <span className="text-xs text-red-400 mb-2">{book.genre}</span>
                        <button 
                          onClick={() => onRemove(book.id)}
                          className="text-gray-500 hover:text-red-500 flex items-center gap-1 text-xs transition-colors self-start"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}