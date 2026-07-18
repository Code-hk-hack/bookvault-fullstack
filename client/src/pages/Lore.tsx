import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, LayoutGrid } from 'lucide-react';
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

export default function Lore() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedLoreBook, setSelectedLoreBook] = useState<{ title: string, lore: string | null } | null>(null);

  useEffect(() => {
    fetchJSON<Book[]>('/api/books', { timeoutMs: 8000 }).then(data => {
      if (data) setBooks(data);
      else setApiError(true);
      setLoading(false);
    });
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (book.lore && book.lore.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="relative min-h-screen bg-[var(--bg-deep)] text-[var(--text-secondary)] font-sans overflow-x-hidden"
    >
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-[0.06] mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-[var(--bg-deep)]/80 to-[var(--bg-deep)]" />
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[var(--bg-deep)]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8">
            <button className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-white transition-colors p-2" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-2xl">×</span>
            </button>
            {[
              { icon: LayoutGrid, label: 'Library', action: () => { setMobileMenuOpen(false); navigate('/'); } },
              { icon: BookOpen, label: 'Lore', action: () => setMobileMenuOpen(false) },
            ].map(item => (
              <button key={item.label} onClick={item.action} className="text-2xl font-serif text-white tracking-[0.2em] uppercase flex items-center gap-4 hover:text-[var(--accent)] transition-colors duration-300">
                <item.icon size={24} className="text-[var(--text-muted)]" /> {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.nav initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="sticky top-0 z-50 bg-[var(--bg-deep)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
            <img src="/logo.png" className="w-8 h-8 object-contain rounded-full drop-shadow-[0_0_10px_rgba(220,38,38,0.6)]" style={{ WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)', maskImage: 'radial-gradient(circle, black 60%, transparent 100%)' }} alt="Logo" />
            <span className="text-white font-serif font-bold text-xl tracking-wide group-hover:text-red-300 transition-colors">BookVault</span>
          </button>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate('/')} className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-white transition-colors duration-300">Home</button>
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-[var(--accent)] glass-accent hover:bg-[var(--accent-muted)] px-4 py-2 rounded-xl text-[11px] font-semibold uppercase tracking-[0.1em] transition-all duration-300">
              <LayoutGrid size={14} /> Collections
            </button>
          </div>
          <button className="md:hidden text-[var(--text-muted)] hover:text-white transition-colors p-2" onClick={() => setMobileMenuOpen(true)}>
            <LayoutGrid size={22} />
          </button>
        </div>
      </motion.nav>

      <div className="relative z-[10] max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5">
            <BookOpen size={12} className="text-[var(--accent)]" />
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)]">Forbidden Archives</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-4 tracking-tight">
            The Arcane <span className="text-[var(--accent)]">Archives</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-xl leading-relaxed">
            Delve into the deepest, most forbidden lore of the tomes. These texts have been recovered from the ruins of ancient libraries.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative max-w-2xl mb-12">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-ghost)]" />
          <input
            type="text"
            className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl pl-11 pr-4 py-4 text-sm text-white placeholder-[var(--text-ghost)] focus:outline-none focus:border-[var(--accent)]/40 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all duration-300"
            placeholder="Search the lore entries by title, author, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        {/* Lore List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 text-[var(--accent)] font-serif text-lg animate-pulse">
              <div className="w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
              Unsealing texts...
            </div>
          </div>
        ) : apiError ? (
          <div className="text-center py-20 glass rounded-2xl">
            <p className="text-[var(--text-muted)] font-serif text-xl mb-2">The ancient server is awakening.</p>
            <p className="text-[var(--text-ghost)] text-sm">Try again in a moment.</p>
          </div>
        ) : (
          <div className="space-y-5">
            <AnimatePresence>
              {filteredBooks.map((book, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
                  key={book.id}
                  className="group bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl p-5 md:p-7 flex flex-col md:flex-row gap-6 md:gap-8 hover:border-[var(--accent)]/20 transition-all duration-300"
                >
                  <div className="w-full md:w-44 h-56 shrink-0 overflow-hidden rounded-xl">
                    <img src={book.coverImage} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt={book.title} loading="lazy" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-xl md:text-2xl font-serif text-white mb-1">{book.title}</h2>
                    <p className="text-[var(--accent)] text-[10px] tracking-[0.2em] uppercase font-semibold mb-4 opacity-80">{book.author}</p>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3 mb-5 italic">
                      {book.lore ? book.lore.substring(0, 220) + '...' : 'The lore for this tome has been lost to time...'}
                    </p>
                    <div>
                      <button
                        onClick={() => setSelectedLoreBook({ title: book.title, lore: book.lore || null })}
                        className="inline-flex items-center gap-2 glass-accent hover:bg-[var(--accent-muted)] border border-[var(--accent)]/20 px-5 py-2.5 rounded-xl transition-all duration-300 uppercase tracking-[0.1em] text-xs font-semibold text-[var(--accent)]"
                      >
                        <BookOpen size={14} /> Read Full Lore
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredBooks.length === 0 && !loading && (
              <div className="text-center py-20 glass rounded-2xl">
                <p className="text-[var(--text-muted)] font-serif text-xl">No lore matches your incantation.</p>
              </div>
            )}
          </div>
        )}
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
