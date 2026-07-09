import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import vaultLogo from '../assets/logo.png'; 

export function Navbar({ onOpenVault, savedCount }) {
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  return (
    <>
      {/* ✨ THE FIX: bg-transparent makes the bar completely invisible, removing the blur and the black fill ✨ */}
      <nav className="fixed top-0 w-full z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            
            {/* Logo Wrapper (Keeps the hover tilt and soft red glow behind the image) */}
            <motion.div 
              onClick={() => setIsLogoModalOpen(true)}
              className="relative flex items-center justify-center w-12 h-12 cursor-pointer group"
              whileHover={{ rotate: 10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/40 blur-md rounded-full transition-all duration-300 pointer-events-none" />

              {/* Pure image blending (No square box) */}
              <img 
                src={vaultLogo}
                alt="BookVault Logo"
                className="w-full h-full object-contain mix-blend-lighten relative z-10"
              />
            </motion.div>

            <span 
              className="text-white font-bold text-xl tracking-wider hover:text-red-400 transition-colors cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              BookVault
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#library" className="hover:text-white transition-colors drop-shadow-md">Library</a>
            
            <button 
              onClick={onOpenVault}
              className="hover:text-white transition-colors flex items-center gap-2 relative drop-shadow-md"
            >
              Collections
              {savedCount > 0 && (
                <span className="absolute -top-3 -right-4 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]">
                  {savedCount}
                </span>
              )}
            </button>
            
            <a href="#lore" className="hover:text-white transition-colors drop-shadow-md">Lore</a>
            <a href="#membership" className="hover:text-white transition-colors drop-shadow-md">Membership</a>
          </div>

          {/* Right CTA */}
          <div>
            <button className="px-5 py-2 border border-white/20 rounded-full text-white text-sm font-semibold hover:bg-white/10 transition-colors bg-black/20 backdrop-blur-sm">
              Enter Vault
            </button>
          </div>
        </div>
      </nav>

      {/* ✨ CINEMATIC LOGO MODAL ✨ */}
      <AnimatePresence>
        {isLogoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-[#0a0a0e] border border-white/5 rounded-3xl p-10 flex flex-col items-center shadow-[0_0_60px_rgba(220,38,38,0.25)] max-w-sm w-full text-center"
            >
              <button 
                onClick={() => setIsLogoModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="absolute top-32 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-600/20 blur-[60px] pointer-events-none rounded-full" />

              <img 
                src={vaultLogo} 
                alt="BookVault Crest" 
                className="w-48 h-48 object-contain relative z-10 mb-6 mix-blend-lighten"
              />

              <h2 className="text-2xl font-bold text-white mb-2 relative z-10">
                BookVault Crest
              </h2>
              <p className="text-[10px] font-bold text-red-500 tracking-[0.3em] uppercase relative z-10">
                Arcane Library Emblem
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}