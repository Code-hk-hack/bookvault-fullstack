import React from 'react';
import { Flame, Skull, Moon, Eclipse } from 'lucide-react';
import { motion } from 'framer-motion'; // <-- Make sure to import framer-motion

const loreEvents = [
  {
    id: 1,
    title: "The First Sundering",
    icon: <Eclipse className="w-6 h-6 text-red-500" />,
    description: "When the sky cracked and the ancient gods fell silent, leaving humanity to the mercy of the cosmic watchers. Magic bled into the soil, corrupting the kingdoms."
  },
  {
    id: 2,
    title: "The Age of Ash",
    icon: <Flame className="w-6 h-6 text-orange-500" />,
    description: "A century of burning. The great libraries were torched, and arcane magic was violently outlawed by the Usurper Kings of the Iron Valley."
  },
  {
    id: 3,
    title: "The Necromancer's Rise",
    icon: <Skull className="w-6 h-6 text-gray-400" />,
    description: "Death became a revolving door. The fallen soldiers of the northern crags were raised to fight eternal wars, fracturing the boundary between life and the void."
  },
  {
    id: 4,
    title: "The Sealing of the Vault",
    icon: <Moon className="w-6 h-6 text-purple-500" />,
    description: "The last surviving mages gathered the remaining forbidden texts, rituals, and grimdark histories, sealing them in BookVault to preserve the truth of the abyss."
  }
];

export function WorldLore() {
  return (
    <section id="lore" className="relative min-h-screen w-full py-24 bg-black overflow-hidden border-t border-white/5">
      
      {/* --- ANIMATED STORM BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/10 via-black to-black z-10" />

        {/* Distant Arcane Storm (Purple Flashes) */}
        <motion.div
          className="absolute inset-0 bg-purple-900/10 mix-blend-screen z-20"
          animate={{ opacity: [0, 0, 0, 0, 0.4, 0, 0.1, 0, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Sharp Lightning Strikes (White Flashes) */}
        <motion.div
          className="absolute inset-0 bg-white/5 mix-blend-overlay z-20"
          animate={{ opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0.6, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear", delay: 2 }}
        />
        
        {/* Secondary Lightning Strike (Offset timing) */}
        <motion.div
          className="absolute inset-0 bg-white/5 mix-blend-overlay z-20"
          animate={{ opacity: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "linear", delay: 7 }}
        />
      </div>
      {/* --- ANIMATED STORM BACKGROUND END --- */}


      <div className="relative z-30 px-6 w-full max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            History of the Abyss
          </h2>
          <p className="text-gray-400 text-lg">
            Before you read the tomes, you must understand the world that forged them.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {loreEvents.map((event, index) => (
            <div key={event.id} className="relative flex gap-6 md:gap-8 group">
              
              {/* Vertical Timeline Line */}
              {index !== loreEvents.length - 1 && (
                <div className="absolute left-[1.15rem] md:left-[1.65rem] top-14 bottom-[-2.5rem] w-px bg-gradient-to-b from-red-900/50 to-transparent group-hover:from-red-500 transition-colors duration-500" />
              )}

              {/* Glowing Icon Node */}
              <div className="relative z-10 flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-950 border border-red-900/50 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.2)] group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] group-hover:scale-110 transition-all duration-300">
                {event.icon}
              </div>

              {/* Content Card */}
              <div className="flex-grow bg-gray-950/40 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:-translate-y-1 hover:bg-gray-900/80 hover:border-red-900/60 transition-all duration-300">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{event.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base font-serif italic">
                  "{event.description}"
                </p>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}