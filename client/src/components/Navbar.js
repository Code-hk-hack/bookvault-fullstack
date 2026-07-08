import { motion } from "framer-motion";
// Import your logo image from assets
import logoImg from '../assets/logo.png';

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-md shadow-[0_0_15px_rgba(220,38,38,0.2)]">
        
        {/* Logo Section - Hover Interactive */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <motion.img 
            src={logoImg} 
            alt="BookVault Logo" 
            className="h-9 w-9 object-contain rounded-lg drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]"
            // Hover animation effects
            whileHover={{ 
              scale: 1.15,
              rotate: 8,
              filter: "drop-shadow(0px 0px 15px rgba(239, 68, 68, 0.9))"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          />
          <span className="text-lg font-bold tracking-wide text-white drop-shadow-md transition-colors group-hover:text-red-400">
            BookVault
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          {["Library", "Collections", "Lore", "Membership"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Enter Vault Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:shadow-[0_0_12px_rgba(255,255,255,0.3)]"
        >
          Enter Vault
        </motion.button>
      </div>
    </motion.nav>
  );
}