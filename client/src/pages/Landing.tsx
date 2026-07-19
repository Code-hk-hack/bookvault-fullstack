import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Library, LayoutGrid, BookOpen, LogIn, Menu, X, Scroll, Search, ChevronDown } from 'lucide-react';
import LoreModal from '../components/LoreModal';
import { fetchJSON, API_BASE_URL } from '../utils/api';

interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string;
  coverImage?: string;
  rating?: number;
  lore?: string;
}

const filters = ["All", "Fantasy", "Sci-Fi", "Dark Magic", "Cyberpunk", "Dystopian"];

const embers = [...Array(8)].map((_, i) => ({
  id: i,
  width: `${Math.random() * 2.5 + 1}px`,
  height: `${Math.random() * 2.5 + 1}px`,
  left: `${Math.random() * 100}%`,
  animation: `float-ember ${Math.random() * 18 + 22}s linear ${Math.random() * -30}s infinite`,
  maxOpacity: Math.random() * 0.35 + 0.1,
  drift: (Math.random() * 50 - 25) + 'px'
}));

export default function Landing() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [logoExpanded, setLogoExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLoreBook, setSelectedLoreBook] = useState<{ title: string, lore: string | null } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveToVault = async (bookId: string) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) { navigate('/login'); return; }
    try {
      const res = await fetch(`${API_BASE_URL}/api/collections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ userId, bookId })
      });
      if (res.ok) alert('Tome added to your Vault!');
      else alert('Tome is already in your Vault, or failed to add.');
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchJSON<Book[]>('/api/books', { timeoutMs: 8000 }).then(data => {
      if (data) { setBooks(data); setLoading(false); }
      else { setApiError(true); setLoading(false); }
    });
  }, []);

  const filteredBooks = useMemo(() => {
    let result = selectedFilter === 'All' ? books : books.filter(b => b.genre === selectedFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    return result;
  }, [books, selectedFilter, searchQuery]);

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="relative min-h-screen bg-[var(--bg-deep)] text-[var(--text-secondary)] font-sans overflow-x-hidden"
    >
      {/* ═══════ CSS Animations ═══════ */}
      <style>{`
        @keyframes float-ember {
          0% { transform: translateY(10vh) translateX(0) scale(1); opacity: 0; }
          20%, 80% { opacity: var(--max-opacity); }
          100% { transform: translateY(-100vh) translateX(var(--drift)) scale(0.4); opacity: 0; }
        }
        @keyframes bg-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.025); }
        }
        @keyframes vignette-pulse {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }
        .animate-bg-breathe { animation: bg-breathe 28s ease-in-out infinite; will-change: transform; }
        .animate-vignette { animation: vignette-pulse 10s ease-in-out infinite; }
        .animate-ember { will-change: transform, opacity; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* ═══════ Logo Expanded Overlay ═══════ */}
      <AnimatePresence>
        {logoExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl cursor-pointer"
            onClick={() => setLogoExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.6, y: 80, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.6, y: 80, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 150 }}
              className="relative flex items-center justify-center p-16 md:p-24 rounded-3xl glass-strong"
            >
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15)_0%,transparent_70%)] pointer-events-none" />
              <img
                src="/logo.png"
                alt="BookVault Emblem"
                className="relative z-10 w-[200px] md:w-[300px] object-contain drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]"
                style={{ WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)', maskImage: 'radial-gradient(circle, black 60%, transparent 100%)' }}
              />
            </motion.div>
            <p className="absolute bottom-16 text-[var(--text-muted)] tracking-[0.5em] uppercase text-[10px] font-bold animate-pulse">
              Click anywhere to return
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════ Mobile Navigation ═══════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[var(--bg-deep)]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-white transition-colors p-2" onClick={() => setMobileMenuOpen(false)}>
              <X size={28} />
            </button>
            {[
              { icon: Library, label: 'Library', action: () => { setMobileMenuOpen(false); document.getElementById('vault-section')?.scrollIntoView({ behavior: 'smooth' }); } },
              { icon: LayoutGrid, label: 'Collections', action: () => { setMobileMenuOpen(false); navigate('/dashboard'); } },
              { icon: BookOpen, label: 'Lore', action: () => { setMobileMenuOpen(false); navigate('/lore'); } },
            ].map((item) => (
              <button key={item.label} onClick={item.action} className="text-2xl font-serif text-white tracking-[0.2em] uppercase flex items-center gap-4 hover:text-[var(--accent)] transition-colors duration-300 group">
                <item.icon size={24} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════ Background Layers ═══════ */}
      <div className="fixed -top-[300px] -bottom-[300px] inset-x-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-[position:25%_15vh] md:bg-center opacity-80 animate-bg-breathe origin-center" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--bg-deep)_85%)] animate-vignette pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-transparent to-[var(--bg-deep)]/60 pointer-events-none" />
      </div>

      {/* ═══════ Corner Characters ═══════ */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-30 md:opacity-80">
        <img src="/corner-bottom-left.png" className="absolute -bottom-10 -left-10 w-36 md:w-64 opacity-40 mix-blend-screen" style={{ WebkitMaskImage: 'radial-gradient(circle at bottom left, black 25%, transparent 85%)' }} alt="" loading="lazy" />
        <img src="/corner-bottom-right.png" className="absolute -bottom-10 -right-10 w-36 md:w-64 opacity-40 mix-blend-screen" style={{ WebkitMaskImage: 'radial-gradient(circle at bottom right, black 25%, transparent 85%)' }} alt="" loading="lazy" />
        <img src="/corner-top.png" className="absolute -top-10 -right-10 w-40 md:w-[260px] opacity-30 mix-blend-screen" style={{ WebkitMaskImage: 'radial-gradient(ellipse at right center, black 15%, transparent 75%)' }} alt="" loading="lazy" />
      </div>

      {/* ═══════ Floating Embers ═══════ */}
      <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
        {embers.map((ember) => (
          <div
            key={ember.id}
            className="absolute bottom-0 rounded-full bg-[#ff4d4d] mix-blend-screen animate-ember"
            style={{
              width: ember.width, height: ember.height, left: ember.left,
              animation: ember.animation,
              boxShadow: '0 0 6px rgba(255,77,77,0.8)',
              // @ts-expect-error custom CSS properties
              '--max-opacity': ember.maxOpacity, '--drift': ember.drift
            }}
          />
        ))}
      </div>

      {/* ═══════ Main UI Layer ═══════ */}
      <div className="relative z-[10]">

        {/* ── Navigation ── */}
        <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className={`sticky top-0 z-[50] transition-all duration-500 ${
            scrolled
              ? 'bg-[var(--bg-deep)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => setLogoExpanded(true)} className="flex items-center gap-3 group cursor-pointer">
              <img src="/logo.png" className="w-9 h-9 md:w-10 md:h-10 object-contain rounded-full drop-shadow-[0_0_12px_rgba(220,38,38,0.7)] group-hover:scale-110 transition-transform duration-300" style={{ WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)', maskImage: 'radial-gradient(circle, black 60%, transparent 100%)' }} alt="BookVault" />
              <span className="text-white font-serif font-bold text-xl md:text-2xl tracking-wide group-hover:text-red-300 transition-colors duration-300">BookVault</span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'Library', action: () => document.getElementById('vault-section')?.scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Collections', action: () => navigate('/dashboard') },
                { label: 'Lore', action: () => navigate('/lore') },
              ].map((item) => (
                <button key={item.label} onClick={item.action} className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-white transition-colors duration-300 relative group">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Auth Button + Mobile Toggle */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-[var(--accent)] glass-accent hover:bg-[var(--accent-muted)] px-4 py-2 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300">
                  <Library size={14} /> My Vault
                </motion.button>
              ) : (
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/login')} className="flex items-center gap-2 text-[var(--accent)] glass-accent hover:bg-[var(--accent-muted)] px-4 py-2 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300">
                  <LogIn size={14} /> Enter Vault
                </motion.button>
              )}
              <button className="md:hidden text-[var(--text-muted)] hover:text-white transition-colors p-2" onClick={() => setMobileMenuOpen(true)}>
                <Menu size={22} />
              </button>
            </div>
          </div>
        </motion.nav>

        {/* ── Hero Section ── */}
        <header className="relative z-[10] max-w-5xl mx-auto text-center pt-[12vh] md:pt-[22vh] pb-[10vh] md:pb-[18vh] px-5">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 md:mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)]">12,000+ Forbidden Tomes</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold text-white mb-5 md:mb-6 leading-[1.05] tracking-tight">
              Enter the{' '}
              <span className="text-[var(--accent)] text-glow-red block mt-1 md:mt-2">Forbidden Library</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
              A sanctuary for the stories the world tried to bury. Descend into an ever-growing collection of dark fantasy legends, arcane lore, and untold epics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => document.getElementById('vault-section')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-7 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold rounded-xl text-sm tracking-wide transition-all duration-300 glow-red flex items-center justify-center gap-2">
                <Library size={16} /> Explore the Vault
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/lore')} className="w-full sm:w-auto px-7 py-3.5 glass hover:bg-white/[0.06] text-white font-semibold rounded-xl text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2">
                <Scroll size={16} /> Read the Lore
              </motion.button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown size={20} className="text-[var(--text-ghost)] animate-bounce" />
          </motion.div>
        </header>

        {/* ── Vault Grid Section ── */}
        <motion.section
          id="vault-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative z-[20] max-w-7xl mx-auto px-5 md:px-8 pb-32"
        >
          <div className="bg-[var(--bg-surface)]/80 backdrop-blur-2xl border border-[var(--border-subtle)] rounded-3xl pt-14 pb-16 px-6 md:px-12 shadow-[0_-8px_60px_rgba(0,0,0,0.3)]">
            {/* Section Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-3 tracking-tight">The Vault of Tomes</h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent mx-auto rounded-full mb-3" />
              <p className="text-[var(--text-muted)] text-[11px] tracking-[0.3em] uppercase font-medium">Uncover the forbidden archives</p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto mb-8">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-ghost)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or author..."
                className="w-full bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-[var(--text-ghost)] focus:outline-none focus:border-[var(--accent)]/40 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all duration-300"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-5 py-2 rounded-full text-[11px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 ${
                    selectedFilter === filter
                      ? 'bg-[var(--accent)] text-white shadow-[0_0_20px_var(--accent-glow)]'
                      : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-default)] hover:border-[var(--border-strong)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  {filter}
                </motion.button>
              ))}
            </div>

            {/* Book Grid */}
            {loading ? (
              <div className="text-center py-24">
                <div className="inline-flex items-center gap-3 text-[var(--accent)] font-serif text-lg animate-pulse">
                  <div className="w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                  Summoning archives...
                </div>
              </div>
            ) : apiError ? (
              <div className="text-center py-24 glass rounded-2xl">
                <p className="text-[var(--text-muted)] font-serif text-xl mb-2">The archives are silent...</p>
                <p className="text-[var(--text-ghost)] text-sm">The ancient server may be awakening. Try again in a moment.</p>
              </div>
            ) : (
              <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                {filteredBooks.length === 0 ? (
                  <div className="col-span-full text-center py-20">
                    <p className="text-[var(--text-muted)] font-serif text-xl">No tomes match this incantation.</p>
                  </div>
                ) : (
                  filteredBooks.map((book, i) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl overflow-hidden hover-lift cursor-pointer"
                    >
                      {/* Cover Image */}
                      <div className="relative h-72 w-full overflow-hidden">
                        <img
                          src={book.coverImage}
                          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                          alt={book.title}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] via-[var(--bg-elevated)]/10 to-transparent" />

                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 glass rounded-full px-2.5 py-1 flex items-center gap-1">
                          <span className="text-[var(--premium)] text-[10px]">★</span>
                          <span className="text-[var(--text-secondary)] text-[10px] font-semibold">{book.rating || 4.8}</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 -mt-8 relative z-10">
                        <h3 className="text-white font-serif font-bold text-lg mb-1 line-clamp-1">{book.title}</h3>
                        <p className="text-[var(--accent)] text-[10px] mb-4 uppercase tracking-[0.2em] font-semibold opacity-80">{book.author}</p>

                        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-ghost)] font-semibold">{book.genre || "Dark Fantasy"}</span>
                          <div className="flex gap-1.5">
                            <button
                              title="Read Lore"
                              onClick={(e) => { e.stopPropagation(); setSelectedLoreBook({ title: book.title, lore: book.lore || null }); }}
                              className="text-[var(--text-ghost)] hover:text-[var(--accent)] transition-colors duration-200 p-1.5 rounded-lg hover:bg-[var(--accent-muted)]"
                            >
                              <Scroll size={16} />
                            </button>
                            <button
                              title="Save to Vault"
                              onClick={(e) => { e.stopPropagation(); handleSaveToVault(book.id); }}
                              className="text-[var(--text-ghost)] hover:text-[var(--accent)] transition-colors duration-200 p-1.5 rounded-lg hover:bg-[var(--accent-muted)]"
                            >
                              <Bookmark size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </main>
            )}
          </div>
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
