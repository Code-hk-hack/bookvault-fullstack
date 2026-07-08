import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import witchImg from '../assets/witch.png';
import warriorImg from '../assets/warrior.png';
import sorceressImg from '../assets/sorceress.png';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  // Scroll function for the library section
  const scrollToLibrary = (e) => {
    e.preventDefault();
    const librarySection = document.getElementById('library');
    if (librarySection) {
      librarySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // NEW: Scroll function for the Lore section
  const scrollToLore = (e) => {
    e.preventDefault();
    const loreSection = document.getElementById('lore');
    if (loreSection) {
      loreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black">
      
      {/* 1. MAIN BACKGROUND: The Warrior Image fills the screen */}
      <div className="absolute inset-0 z-0">
        <img
          src={warriorImg}
          alt="Library Path"
          className="h-full w-full object-cover object-center opacity-40"
        />
        {/* Dark gradients to make the text readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
      </div>

      {/* Floating embers */}
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute h-1.5 w-1.5 rounded-full bg-red-500/70 blur-[1px]"
          style={{ left: `${12 + i * 15}%`, bottom: "-5%" }}
          animate={{ y: [0, -600], opacity: [0, 1, 0] }}
          transition={{
            duration: 7 + i,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 1.2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 2. SECONDARY CHARACTERS: Faded into the corners smoothly */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* The Witch - Fading seamlessly into the top right sky */}
        <img 
          src={witchImg} 
          alt="Witch on tower" 
          className="absolute top-0 right-0 w-[550px] max-w-[40%] h-auto opacity-70" 
          style={{ 
            WebkitMaskImage: 'linear-gradient(to bottom left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)', 
            maskImage: 'linear-gradient(to bottom left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)' 
          }}
        />

        {/* The Sorceress - Fading seamlessly into the bottom left path */}
        <img 
          src={sorceressImg} 
          alt="Sorceress reading" 
          className="absolute bottom-0 left-0 w-[600px] max-w-[45%] h-auto opacity-85" 
          style={{ 
            WebkitMaskImage: 'linear-gradient(to top right, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)', 
            maskImage: 'linear-gradient(to top right, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)' 
          }}
        />
      </div>

      {/* 3. UI CONTENT: Forced text to be WHITE and GLOWING so it is visible */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-4xl px-6 text-center mt-20"
      >
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-red-400 backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Over 12,000 forbidden tomes catalogued
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-5xl font-bold leading-[1.05] tracking-tight text-balance text-white sm:text-6xl md:text-7xl drop-shadow-lg"
        >
          Enter the <span className="text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">Forbidden</span> Library
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-300 text-pretty sm:text-lg"
        >
          BookVault is a sanctuary for the stories the world tried to bury.
          Descend into an ever-growing collection of dark fantasy legends, arcane
          lore, and untold epics.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Attached scroll function to the Browse Books button */}
          <motion.a
            href="#library"
            onClick={scrollToLibrary}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            Browse Books
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.a>

          {/* UPDATED: Attached new scroll function and updated href to #lore */}
          <a
            href="#lore"
            onClick={scrollToLore}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-500 px-8 py-4 text-base font-semibold text-gray-200 transition-colors hover:border-red-500 hover:text-red-400 cursor-pointer"
          >
            Read the Lore
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}