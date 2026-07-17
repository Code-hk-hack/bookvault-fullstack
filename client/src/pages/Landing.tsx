import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Library, LayoutGrid, BookOpen, LogIn, Menu, X, Scroll } from 'lucide-react';
import LoreModal from '../components/LoreModal';
import { fetchJSON } from '../utils/api';

interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string;
  coverImage?: string;
  rating?: number;
  lore?: string;
}

// Generate fewer embers (was 30) to reduce GPU work
const embers = [...Array(10)].map((_, i) => ({
  id: i,
  width: `${Math.random() * 3 + 1}px`,
  height: `${Math.random() * 3 + 1}px`,
  left: `${Math.random() * 100}%`,
  animation: `float-ember ${Math.random() * 15 + 20}s linear ${Math.random() * -30}s infinite`,
  maxOpacity: Math.random() * 0.4 + 0.15,
  drift: (Math.random() * 60 - 30) + 'px'
}));

export default function Landing() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [logoExpanded, setLogoExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLoreBook, setSelectedLoreBook] = useState<{title: string, lore: string | null} | null>(null);
  const filters = ["All", "Fantasy", "Adventure", "Dark Magic", "Romance"];
  const navigate = useNavigate();

  const handleSaveToVault = async (bookId: string) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/collections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ userId, bookId })
      });
      if (res.ok) alert('Tome added to your Vault!');
      else alert('Tome is already in your Vault, or failed to add.');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Use timeout-protected fetch so the UI doesn't hang if backend is cold-starting
    fetchJSON<Book[]>('/api/books', { timeoutMs: 8000 })
      .then(data => {
        if (data) {
          setBooks(data);
          setLoading(false);
        } else {
          setApiError(true);
          setLoading(false);
        }
      });
    
    // No more manual scroll tracking — simplified parallax via CSS will-change
  }, []);

  const filteredBooks = selectedFilter === 'All' 
    ? books 
    : books.filter((book) => book.genre === selectedFilter);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="relative min-h-screen bg-[#030303] text-neutral-300 font-sans selection:bg-red-900 overflow-x-hidden"
    >
      {/* Optimized CSS Animations — reduced count, GPU-friendly, respects reduced motion */}
      <style>{`
        @keyframes float-ember {
          0% { transform: translateY(10vh) translateX(0) scale(1); opacity: 0; }
          20%, 80% { opacity: var(--max-opacity); }
          100% { transform: translateY(-100vh) translateX(var(--drift)) scale(0.5); opacity: 0; }
        }
        @keyframes vignette-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes float-hero {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bg-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes ethereal-float {
          0%, 100% { transform: translateY(0px); box-shadow: 0 0 40px rgba(153, 27, 27, 0.2); }
          50% { transform: translateY(-15px); box-shadow: 0 0 80px rgba(220, 38, 38, 0.4); }
        }

        .animate-ethereal-board { animation: ethereal-float 5s ease-in-out infinite; will-change: transform; }
        .animate-bg-breathe { animation: bg-breathe 25s ease-in-out infinite; will-change: transform; }
        .animate-float-hero { animation: float-hero 8s ease-in-out infinite; will-change: transform; }
        .animate-vignette { animation: vignette-pulse 8s ease-in-out infinite; }
        .animate-ember { will-change: transform, opacity; }
        
        /* GPU-friendly parallax using translateZ */
        .parallax-layer-bg { transform: translateZ(-1px) scale(1.2); will-change: transform; }
        .parallax-layer-fg { will-change: transform; }
        .parallax-hero { will-change: transform, opacity; }

        /* Respect user motion preferences — disable heavy animations */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          .animate-bg-breathe { animation: none !important; }
          .animate-float-hero { animation: none !important; }
        }
      `}</style>

      {/* Full-Screen Dark Fantasy Board Overlay */}
      <AnimatePresence>
        {logoExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={() => setLogoExpanded(false)}
          >
            <motion.div 
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex items-center justify-center p-12 md:p-24 rounded-2xl border border-white/5 border-t-red-900/50 border-b-red-900/50 bg-[#070709]/80 animate-ethereal-board"
            >
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2)_0%,transparent_70%)] animate-core-glow pointer-events-none" />
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-red-900/50" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-red-900/50" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-red-900/50" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-red-900/50" />

              <img 
                src="/logo.png" 
                alt="Expanded Logo"
                className="relative z-10 w-[200px] md:w-[320px] object-contain drop-shadow-[0_0_25px_rgba(220,38,38,1)]"
                style={{ WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)', maskImage: 'radial-gradient(circle, black 65%, transparent 100%)' }}
              />
            </motion.div>
            <p className="absolute bottom-20 text-neutral-500 tracking-[0.4em] uppercase text-xs font-bold animate-pulse">
              Click to return to the shadows
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#030303]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
          >
            <button className="absolute top-6 right-6 text-neutral-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            
            <a href="#vault-section" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-serif text-white tracking-widest uppercase flex items-center gap-4 hover:text-red-500 transition-colors drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <Library size={28}/> Library
            </a>
            
            <button onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }} className="text-3xl font-serif text-white tracking-widest uppercase flex items-center gap-4 hover:text-red-500 transition-colors drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <LayoutGrid size={28}/> Collections
            </button>
            
            <button onClick={() => { setMobileMenuOpen(false); navigate('/lore'); }} className="text-3xl font-serif text-white tracking-widest uppercase flex items-center gap-4 hover:text-red-500 transition-colors drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <BookOpen size={28}/> Lore
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer 1: Background — simplified, no more js scroll-driven parallax (was causing jank) */}
      <div className="fixed -top-[300px] -bottom-[300px] inset-x-0 z-0 pointer-events-none parallax-layer-bg overflow-hidden">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-[position:25%_15vh] md:bg-center opacity-85 animate-bg-breathe origin-center" />
        
        {/* Atmospheric Layers — removed lightning (GPU heavy) and reduced from 2 mist to 1 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#030303_100%)] animate-vignette pointer-events-none opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/10 to-transparent opacity-80 pointer-events-none" />
      </div>

      {/* Layer 2: Scaled Characters — simplified parallax */}
      <div className="fixed inset-0 z-[1] pointer-events-none parallax-layer-fg block opacity-40 md:opacity-100">
        <img src="/corner-bottom-left.png" className="absolute -bottom-10 -left-10 w-40 md:w-72 opacity-50 mix-blend-screen" style={{ WebkitMaskImage: 'radial-gradient(circle at bottom left, black 30%, transparent 90%)' }} alt="" loading="lazy" />
        <img src="/corner-bottom-right.png" className="absolute -bottom-10 -right-10 w-40 md:w-72 opacity-50 mix-blend-screen" style={{ WebkitMaskImage: 'radial-gradient(circle at bottom right, black 30%, transparent 90%)' }} alt="" loading="lazy" />
        <img src="/corner-top.png" className="absolute -top-10 -right-10 w-48 md:w-[300px] opacity-40 mix-blend-screen" style={{ WebkitMaskImage: 'radial-gradient(ellipse at right center, black 20%, transparent 80%)' }} alt="" loading="lazy" />
      </div>

      {/* Layer 2.5: Floating Embers — reduced from 30 to 10 */}
      <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
        {embers.map((ember) => (
          <div 
            key={ember.id}
            className="absolute bottom-0 rounded-full bg-[#ff4d4d] mix-blend-screen shadow-[0_0_8px_rgba(255,50,50,0.8)] animate-ember"
            style={{
              width: ember.width,
              height: ember.height,
              left: ember.left,
              animation: ember.animation,
              // @ts-expect-error - Custom CSS properties are not in React.CSSProperties
              '--max-opacity': ember.maxOpacity, '--drift': ember.drift
            }}
          />
        ))}
      </div>

      {/* Layer 3: Main UI */}
      <div className="relative z-[10]">
        
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: 'spring', damping: 20 }}
          className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between relative z-[20] bg-transparent sticky top-0"
        >
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => setLogoExpanded(true)}>
            <img src="/logo.png" className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-full drop-shadow-[0_0_12px_rgba(220,38,38,0.9)] group-hover:scale-110 transition-all duration-300" style={{ WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)', maskImage: 'radial-gradient(circle, black 65%, transparent 100%)' }} alt="Logo" />
            <span className="text-white font-serif font-bold text-lg sm:text-xl md:text-2xl tracking-wide md:tracking-widest group-hover:text-red-300 transition-colors">BookVault</span>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-widest text-neutral-300 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
              <a href="#vault-section" className="flex items-center gap-2 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all"><Library size={16}/> Library</a>
              <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all uppercase tracking-widest"><LayoutGrid size={16}/> Collections</button>
              <button onClick={() => navigate('/lore')} className="flex items-center gap-2 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all uppercase tracking-widest"><BookOpen size={16}/> Lore</button>
            </div>
            
            {localStorage.getItem('token') ? (
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-red-500 border border-red-900/50 hover:bg-red-900/20 px-3 py-1.5 md:px-5 md:py-2 rounded transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider"
              >
                <Library size={14} className="hidden sm:block"/> My Vault
              </motion.button>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 text-red-500 border border-red-900/50 hover:bg-red-900/20 px-3 py-1.5 md:px-5 md:py-2 rounded transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider"
              >
                <LogIn size={14} className="hidden sm:block"/> Enter Vault
              </motion.button>
            )}

            <button 
              className="md:hidden text-neutral-300 hover:text-white transition-colors flex items-center"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </motion.nav>

        {/* Hero Section — simplified parallax with will-change */}
        <header className="parallax-hero max-w-4xl mx-auto text-center pt-[15vh] md:pt-[25vh] pb-[15vh] md:pb-[25vh] px-4 relative z-[10]">
          <div className="animate-float-hero">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              className="text-3xl sm:text-5xl md:text-8xl font-black text-white font-serif mb-4 md:mb-6 leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,1)]"
            >
              Enter the <br />
              <span className="text-red-600 drop-shadow-[0_0_40px_rgba(220,38,38,0.6)] text-[8vw] sm:text-5xl md:text-8xl block mt-2">Forbidden Library</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
              className="text-sm sm:text-base md:text-xl text-neutral-300 max-w-2xl mx-auto mb-8 md:mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] font-medium px-4"
            >
              BookVault is a sanctuary for the stories the world tried to bury. Descend into an ever-growing collection of dark fantasy legends, arcane lore, and untold epics.
            </motion.p>
          </div>
        </header>

        {/* The Vault Grid Section */}
        <motion.section 
          id="vault-section"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 pb-32 relative z-[20] bg-[#030303]/90 pt-16 rounded-t-[3rem] backdrop-blur-sm border-t border-red-900/30"
        >
          <div className="text-center mb-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <h2 className="text-4xl font-serif text-white mb-2 tracking-wide">The Vault of Tomes</h2>
            <div className="w-24 h-1 bg-red-900/50 mx-auto rounded-full mb-4" />
            <p className="text-neutral-400 text-sm tracking-widest uppercase">Uncover the forbidden archives.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {filters.map((filter) => (
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                key={filter} onClick={() => setSelectedFilter(filter)}
                className={`px-4 sm:px-6 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wider transition-all ${
                  selectedFilter === filter
                  ? 'bg-red-900 text-white border border-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]' 
                  : 'bg-black/60 text-neutral-300 border border-white/10 hover:border-white/30 hover:bg-black/80'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Book Grid */}
          {loading ? (
            <div className="text-center text-red-500 font-serif text-xl animate-pulse py-20">Summoning archives...</div>
          ) : apiError ? (
            <div className="text-center py-20 border border-white/5 rounded-xl bg-black/50">
              <p className="text-neutral-500 font-serif text-xl mb-2">The archives are silent...</p>
              <p className="text-neutral-600 text-sm">The ancient server may be awakening. Try again in a moment.</p>
            </div>
          ) : (
            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredBooks.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-neutral-500 font-serif text-xl">No tomes match this category.</p>
                </div>
              ) : (
                filteredBooks.map((book) => (
                  <div 
                    key={book.id} 
                    className="group relative bg-[#0a0a0c] backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-red-900/80 transition-all duration-500 flex flex-col shadow-2xl hover:-translate-y-2 hover:scale-[1.02]"
                  >
                    <div className="relative h-80 w-full overflow-hidden">
                      <img 
                        src={book.coverImage} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 ease-out" 
                        alt={book.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/20 to-transparent" />
                      
                      <div className="absolute top-4 right-4 bg-black/90 border border-yellow-900/50 text-yellow-500 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(0,0,0,1)] backdrop-blur-md">
                        <span>★</span> {book.rating || 4.8}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col justify-between relative z-10 -mt-10">
                      <div>
                        <h3 className="text-white font-serif font-bold text-xl mb-1 line-clamp-1 drop-shadow-md">{book.title}</h3>
                        <p className="text-red-400 text-xs mb-4 uppercase tracking-widest font-semibold">{book.author}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/10">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">{book.genre || "Dark Fantasy"}</span>
                        <div className="flex gap-2">
                          <button 
                            title="Read Lore"
                            onClick={() => setSelectedLoreBook({ title: book.title, lore: book.lore || null })} 
                            className="text-neutral-400 transition-colors p-2 hover:text-red-500 hover:scale-110 active:scale-95"
                          >
                            <Scroll size={20} />
                          </button>
                          <button 
                            title="Save to Vault"
                            onClick={() => handleSaveToVault(book.id)} 
                            className="text-neutral-400 transition-colors p-2 hover:text-red-500 hover:scale-110 active:scale-95"
                          >
                            <Bookmark size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </main>
          )}
        </motion.section>
      </div>
      
      <LoreModal 
        isOpen={selectedLoreBook !== null} 
        onClose={() => setSelectedLoreBook(null)}
        bookTitle={selectedLoreBook?.title || ''}
        lore={selectedLoreBook?.lore || null}
      />
    </motion.div>
  );
}