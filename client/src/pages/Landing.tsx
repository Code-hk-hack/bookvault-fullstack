import { useEffect, useState } from 'react';

export default function Landing() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  // State to handle the full-screen logo animation
  const [logoExpanded, setLogoExpanded] = useState(false);

  const filters = ["All", "Fantasy", "Adventure", "Dark Magic", "Romance"];

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
    <div className="relative min-h-screen bg-[#030303] text-neutral-300 font-sans selection:bg-red-900 overflow-x-hidden">
      
      {/* Custom Keyframes for Animations */}
      <style>{`
        @keyframes ethereal-float {
          0%, 100% { 
            transform: translateY(0px); 
            box-shadow: 0 0 40px rgba(153, 27, 27, 0.2), inset 0 0 20px rgba(153, 27, 27, 0.1);
          }
          50% { 
            transform: translateY(-15px); 
            box-shadow: 0 0 80px rgba(220, 38, 38, 0.4), inset 0 0 40px rgba(220, 38, 38, 0.2);
          }
        }
        .animate-ethereal-board {
          animation: ethereal-float 5s ease-in-out infinite;
        }
        @keyframes slow-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.95); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-core-glow {
          animation: slow-pulse 4s ease-in-out infinite;
        }
        
        /* NEW: Dark Fantasy Ember Particle Animation */
        @keyframes float-ember {
          0% {
            transform: translateY(10vh) translateX(0) scale(1);
            opacity: 0;
          }
          20% {
            opacity: var(--max-opacity);
          }
          80% {
            opacity: var(--max-opacity);
          }
          100% {
            transform: translateY(-100vh) translateX(var(--drift)) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>

      {/* =========================================
          THE FULL-SCREEN "DARK FANTASY BOARD" OVERLAY
      ========================================= */}
      <div 
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          logoExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setLogoExpanded(false)}
      >
        <div className={`relative flex items-center justify-center p-12 md:p-24 rounded-2xl border border-white/5 border-t-red-900/50 border-b-red-900/50 bg-[#070709]/80 backdrop-blur-2xl transition-all duration-1000 delay-100 ${
          logoExpanded ? 'scale-100 translate-y-0 opacity-100 animate-ethereal-board' : 'scale-50 translate-y-24 opacity-0'
        }`}>
          
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2)_0%,transparent_70%)] animate-core-glow pointer-events-none" />
          
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-red-900/50" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-red-900/50" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-red-900/50" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-red-900/50" />

          <img 
            src="/logo.png" 
            alt="Expanded Logo"
            className="relative z-10 w-[200px] md:w-[320px] object-contain drop-shadow-[0_0_25px_rgba(220,38,38,1)]"
            style={{ 
              WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)',
              maskImage: 'radial-gradient(circle, black 65%, transparent 100%)'
            }}
          />
        </div>

        <p className={`absolute bottom-20 text-neutral-500 tracking-[0.4em] uppercase text-xs font-bold transition-opacity duration-1000 delay-700 ${
          logoExpanded ? 'opacity-100 animate-pulse' : 'opacity-0'
        }`}>
          Click to return to the shadows
        </p>
      </div>

      {/* =========================================
          LAYER 1: CLEAR ATMOSPHERIC BACKGROUND
      ========================================= */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
      </div>

      {/* =========================================
          LAYER 2: SCALED CHARACTERS
      ========================================= */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <img 
          src="/corner-bottom-left.png" 
          className="absolute -bottom-4 -left-4 w-72 opacity-80 mix-blend-lighten"
          style={{ WebkitMaskImage: 'radial-gradient(circle at bottom left, black 50%, transparent 80%)' }}
          alt="" 
        />
        <img 
          src="/corner-bottom-right.png" 
          className="absolute -bottom-4 -right-4 w-72 opacity-80 mix-blend-lighten"
          style={{ WebkitMaskImage: 'radial-gradient(circle at bottom right, black 50%, transparent 80%)' }}
          alt="" 
        />
        <img 
          src="/corner-top.png" 
          className="absolute top-24 -right-4 w-[300px] opacity-80 mix-blend-lighten"
          style={{ WebkitMaskImage: 'radial-gradient(ellipse at right center, black 30%, transparent 75%)' }}
          alt="" 
        />
      </div>

      {/* =========================================
          LAYER 2.5: FLOATING EMBERS (New Particle System)
      ========================================= */}
      <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => {
          // Randomize particle properties for a natural look
          const size = Math.random() * 3 + 1; // 1px to 4px
          const left = Math.random() * 100; // 0% to 100% width
          const duration = Math.random() * 15 + 10; // 10s to 25s float time
          const delay = Math.random() * -20; // Negative delay so they start already on screen
          const maxOpacity = Math.random() * 0.6 + 0.2; // 0.2 to 0.8 opacity
          const drift = (Math.random() * 100 - 50) + 'px'; // Drift left or right up to 50px

          return (
            <div 
              key={i}
              className="absolute bottom-0 rounded-full bg-[#ff4d4d] mix-blend-screen shadow-[0_0_8px_rgba(255,50,50,0.8)]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                animation: `float-ember ${duration}s linear ${delay}s infinite`,
                // @ts-ignore - passing custom variables to CSS keyframes
                '--max-opacity': maxOpacity,
                '--drift': drift
              }}
            />
          )
        })}
      </div>

      {/* =========================================
          LAYER 3: THE UI 
      ========================================= */}
      <div className="relative z-[10]">
        
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between relative z-[20] bg-gradient-to-b from-black/60 to-transparent">
          
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setLogoExpanded(true)}
          >
            <img 
              src="/logo.png" 
              className="w-10 h-10 object-contain rounded-full drop-shadow-[0_0_12px_rgba(220,38,38,0.9)] group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(220,38,38,1)] transition-all duration-300" 
              style={{ 
                WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)',
                maskImage: 'radial-gradient(circle, black 65%, transparent 100%)'
              }}
              alt="Logo" 
            />
            <span className="text-white font-serif font-bold text-2xl tracking-widest group-hover:text-red-200 transition-colors">
              BookVault
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-widest text-neutral-300 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            <a href="#" className="hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all">Library</a>
            <a href="#" className="hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all">Collections</a>
            <a href="#" className="hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all">Lore</a>
            <a href="/login" className="text-red-500 border border-red-900/50 hover:bg-red-900/20 px-4 py-2 rounded transition-all">Enter Vault</a>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="max-w-4xl mx-auto text-center pt-[35vh] pb-20 px-4 relative z-[10]">
          <h1 className="text-5xl md:text-7xl font-black text-white font-serif mb-6 leading-tight drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            Enter the <br />
            <span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]">Forbidden Library</span>
          </h1>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            BookVault is a sanctuary for the stories the world tried to bury. Descend into an ever-growing collection of dark fantasy legends, arcane lore, and untold epics.
          </p>
        </header>

        {/* The Vault Grid Section */}
        <section className="max-w-7xl mx-auto px-6 pb-32 relative z-[10]">
          
          <div className="text-center mb-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <h2 className="text-3xl font-serif text-white mb-2">The Vault of Tomes</h2>
            <p className="text-neutral-400 text-sm">Uncover the forbidden archives.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button 
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  selectedFilter === filter
                  ? 'bg-red-900/60 text-white border border-red-500/50 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]' 
                  : 'bg-black/60 text-neutral-300 border border-white/10 hover:border-white/30 hover:bg-black/80'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Book Grid */}
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-red-500 font-serif text-xl animate-pulse">Summoning archives...</div>
            ) : (
              filteredBooks.map((book: any) => (
                <div 
                  key={book.id} 
                  className="group relative bg-[#0a0a0c]/70 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-red-900/80 transition-all duration-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] flex flex-col"
                >
                  <div className="relative h-72 w-full overflow-hidden">
                    <img 
                      src={book.coverImage} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                      alt={book.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
                    
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-yellow-900/50 text-yellow-500 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                      <span>★</span> {book.rating || 4.8}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between relative z-10">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{book.title}</h3>
                      <p className="text-neutral-400 text-xs mb-4">{book.author}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                      <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold">{book.genre || "Dark Fantasy"}</span>
                      <button className="text-neutral-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </main>
        </section>
      </div>
    </div>
  );
}