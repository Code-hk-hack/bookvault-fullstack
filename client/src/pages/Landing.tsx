import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Library, LayoutGrid, BookOpen, LogIn } from 'lucide-react';

export default function Landing() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [logoExpanded, setLogoExpanded] = useState(false);

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
      const res = await fetch('http://localhost:5000/api/collections', {
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
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => { setBooks(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const filteredBooks = selectedFilter === 'All' 
    ? books 
    : books.filter((book: any) => book.genre === selectedFilter);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="relative min-h-screen bg-[#030303] text-neutral-300 font-sans selection:bg-red-900 overflow-x-hidden"
    >
      {/* CSS Animations for Embers & Glow */}
      <style>{`
        @keyframes ethereal-float {
          0%, 100% { transform: translateY(0px); box-shadow: 0 0 40px rgba(153, 27, 27, 0.2), inset 0 0 20px rgba(153, 27, 27, 0.1); }
          50% { transform: translateY(-15px); box-shadow: 0 0 80px rgba(220, 38, 38, 0.4), inset 0 0 40px rgba(220, 38, 38, 0.2); }
        }
        .animate-ethereal-board { animation: ethereal-float 5s ease-in-out infinite; }
        @keyframes slow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.95); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-core-glow { animation: slow-pulse 4s ease-in-out infinite; }
        @keyframes float-ember {
          0% { transform: translateY(10vh) translateX(0) scale(1); opacity: 0; }
          20%, 80% { opacity: var(--max-opacity); }
          100% { transform: translateY(-100vh) translateX(var(--drift)) scale(0.5); opacity: 0; }
        }
        
        /* Modern Web Guidance: Native CSS Scroll-Driven Parallax */
        @keyframes parallax-bg {
          from { transform: translateY(0px); }
          to { transform: translateY(-200px); }
        }
        @keyframes parallax-fg {
          from { transform: translateY(0px); }
          to { transform: translateY(-300px); }
        }
        @keyframes parallax-hero-anim {
          from { transform: translateY(0px); opacity: 1; }
          to { transform: translateY(-100px); opacity: 0; }
        }
        .parallax-background {
          animation: parallax-bg linear both;
          animation-timeline: scroll(root);
        }
        .parallax-characters {
          animation: parallax-fg linear both;
          animation-timeline: scroll(root);
        }
        .parallax-hero {
          animation: parallax-hero-anim linear both;
          animation-timeline: scroll(root);
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

      {/* Layer 1: Parallax Background */}
      <div className="fixed -top-[300px] -bottom-[300px] inset-x-0 z-0 pointer-events-none parallax-background">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
      </div>

      {/* Layer 2: Scaled Characters */}
      <div className="fixed inset-0 z-[1] pointer-events-none parallax-characters">
        <img src="/corner-bottom-left.png" className="absolute -bottom-4 -left-4 w-72 opacity-80 mix-blend-lighten" style={{ WebkitMaskImage: 'radial-gradient(circle at bottom left, black 50%, transparent 80%)' }} alt="" />
        <img src="/corner-bottom-right.png" className="absolute -bottom-4 -right-4 w-72 opacity-80 mix-blend-lighten" style={{ WebkitMaskImage: 'radial-gradient(circle at bottom right, black 50%, transparent 80%)' }} alt="" />
        <img src="/corner-top.png" className="absolute top-24 -right-4 w-[300px] opacity-80 mix-blend-lighten" style={{ WebkitMaskImage: 'radial-gradient(ellipse at right center, black 30%, transparent 75%)' }} alt="" />
      </div>

      {/* Layer 2.5: Floating Embers */}
      <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute bottom-0 rounded-full bg-[#ff4d4d] mix-blend-screen shadow-[0_0_8px_rgba(255,50,50,0.8)]"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              animation: `float-ember ${Math.random() * 15 + 10}s linear ${Math.random() * -20}s infinite`,
              // @ts-ignore
              '--max-opacity': Math.random() * 0.6 + 0.2, '--drift': (Math.random() * 100 - 50) + 'px'
            }}
          />
        ))}
      </div>

      {/* Layer 3: Main UI */}
      <div className="relative z-[10]">
        
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: 'spring', damping: 20 }}
          className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between relative z-[20] bg-transparent sticky top-0"
        >
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setLogoExpanded(true)}>
            <img src="/logo.png" className="w-10 h-10 object-contain rounded-full drop-shadow-[0_0_12px_rgba(220,38,38,0.9)] group-hover:scale-110 transition-all duration-300" style={{ WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)', maskImage: 'radial-gradient(circle, black 65%, transparent 100%)' }} alt="Logo" />
            <span className="text-white font-serif font-bold text-2xl tracking-widest group-hover:text-red-300 transition-colors">BookVault</span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-widest text-neutral-300 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            <a href="#" className="flex items-center gap-2 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all"><Library size={16}/> Library</a>
            <a href="#" className="flex items-center gap-2 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all"><LayoutGrid size={16}/> Collections</a>
            <a href="#" className="flex items-center gap-2 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all"><BookOpen size={16}/> Lore</a>
            {localStorage.getItem('token') ? (
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-red-500 border border-red-900/50 hover:bg-red-900/20 px-5 py-2 rounded transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
              >
                <Library size={16}/> My Vault
              </motion.button>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 text-red-500 border border-red-900/50 hover:bg-red-900/20 px-5 py-2 rounded transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
              >
                <LogIn size={16}/> Enter Vault
              </motion.button>
            )}
          </div>
        </motion.nav>

        {/* Hero Section */}
        <header className="parallax-hero max-w-4xl mx-auto text-center pt-[25vh] pb-[25vh] px-4 relative z-[10]">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
            className="text-5xl md:text-8xl font-black text-white font-serif mb-6 leading-tight drop-shadow-[0_5px_15px_rgba(0,0,0,1)]"
          >
            Enter the <br />
            <span className="text-red-600 drop-shadow-[0_0_40px_rgba(220,38,38,0.6)]">Forbidden Library</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] font-medium"
          >
            BookVault is a sanctuary for the stories the world tried to bury. Descend into an ever-growing collection of dark fantasy legends, arcane lore, and untold epics.
          </motion.p>
        </header>

        {/* The Vault Grid Section */}
        <motion.section 
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
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-wider transition-all ${
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
          ) : (
            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredBooks.map((book: any, index: number) => (
                <div 
                  key={book.id} 
                  className="animate-fade-in-up group relative bg-[#0a0a0c] backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-red-900/80 transition-all duration-500 flex flex-col shadow-2xl hover:-translate-y-2 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative h-80 w-full overflow-hidden">
                    <img 
                      src={book.coverImage} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 ease-out" 
                      alt={book.title}
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
              ))}
            </main>
          )}
        </motion.section>
      </div>
    </motion.div>
  );
}