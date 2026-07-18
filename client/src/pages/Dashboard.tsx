import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, Library, LayoutGrid, BookOpen, LogOut, Crown, Menu } from 'lucide-react';
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

interface User {
  id: string;
  email: string;
  isPremium?: boolean;
}

export default function Dashboard() {
  const [vaultBooks, setVaultBooks] = useState<Book[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLoreBook, setSelectedLoreBook] = useState<{ title: string, lore: string | null } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || !userId) { navigate('/login'); return; }
    Promise.all([
      fetchJSON<Book[]>(`/api/collections/${userId}`, { timeoutMs: 8000, headers: { 'Authorization': `Bearer ${token}` } }),
      fetchJSON<User>(`/api/auth/${userId}`, { timeoutMs: 8000, headers: { 'Authorization': `Bearer ${token}` } })
    ]).then(([collectionsData, userData]) => {
      if (collectionsData && Array.isArray(collectionsData)) setVaultBooks(collectionsData);
      if (userData && !('error' in userData)) setUser(userData);
      setLoading(false);
    });
  }, [navigate, token, userId]);

  const handleRemove = async (bookId: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/collections`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ userId, bookId })
      });
      if (res.ok) setVaultBooks(prev => prev.filter(book => book.id !== bookId));
    } catch (error) { console.error("Failed to remove book", error); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="min-h-screen bg-[var(--bg-deep)] text-[var(--text-secondary)] font-sans overflow-x-hidden relative"
    >
      {/* Background */}
      <div className="fixed inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-[0.06] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-[var(--bg-deep)]/80 to-[var(--bg-deep)] pointer-events-none z-0" />

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[var(--bg-deep)]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8">
            <button className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-white transition-colors p-2" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-2xl">×</span>
            </button>
            {[
              { icon: Library, label: 'Library', action: () => { setMobileMenuOpen(false); navigate('/'); } },
              { icon: LayoutGrid, label: 'Collections', action: () => setMobileMenuOpen(false) },
              { icon: BookOpen, label: 'Lore', action: () => { setMobileMenuOpen(false); navigate('/lore'); } },
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
            <span className="text-[var(--text-muted)] text-xs tracking-[0.15em] uppercase font-medium">Archivist Profile</span>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleLogout} className="flex items-center gap-2 text-[var(--accent)] glass-accent hover:bg-[var(--accent-muted)] px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300">
              <LogOut size={14} /> Logout
            </motion.button>
          </div>
          <button className="md:hidden text-[var(--text-muted)] hover:text-white transition-colors p-2" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      <main className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-16 relative z-10">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12 md:mb-16 pb-8 border-b border-[var(--border-subtle)] flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <motion.div
              animate={user?.isPremium ? { boxShadow: ['0 0 20px rgba(234,179,8,0.2)', '0 0 40px rgba(234,179,8,0.4)', '0 0 20px rgba(234,179,8,0.2)'] } : {}}
              transition={user?.isPremium ? { duration: 3, repeat: Infinity } : {}}
              className={`w-20 h-20 rounded-2xl flex items-center justify-center ${user?.isPremium ? 'bg-[var(--premium-muted)] border border-[var(--premium)]/30 glow-gold' : 'bg-[var(--accent-muted)] border border-[var(--accent)]/20'}`}
            >
              {user?.isPremium ? <Crown size={32} className="text-[var(--premium)]" /> : <span className="text-3xl font-serif text-[var(--accent)]">{user?.email?.[0]?.toUpperCase() || 'A'}</span>}
            </motion.div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">Your Personal Vault</h1>
              <p className="text-[var(--text-muted)] text-[11px] tracking-[0.2em] uppercase mb-1">
                Access Level: {user?.isPremium ? <span className="text-[var(--premium)] font-bold">Premium Scholar</span> : 'Standard'}
              </p>
              <p className="text-[var(--text-ghost)] text-xs">{user?.email}</p>
            </div>
          </div>
          {!user?.isPremium && (
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/upgrade')} className="w-full md:w-auto px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold rounded-xl text-sm uppercase tracking-[0.1em] transition-all duration-300 glow-red flex items-center justify-center gap-2">
              <Crown size={16} /> Upgrade Vault
            </motion.button>
          )}
        </motion.div>

        {/* Vault Grid */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif text-white">Saved Tomes <span className="text-[var(--text-ghost)] text-lg">({vaultBooks.length})</span></h2>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading ? (
            <div className="col-span-full text-center py-20">
              <div className="inline-flex items-center gap-3 text-[var(--accent)] font-serif text-lg animate-pulse">
                <div className="w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                Unsealing vault...
              </div>
            </div>
          ) : vaultBooks.length === 0 ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="col-span-full py-20 text-center glass rounded-2xl">
              <p className="text-[var(--text-muted)] font-serif text-xl mb-4">Your vault is empty.</p>
              <button onClick={() => navigate('/')} className="text-[var(--accent)] hover:text-[var(--accent-hover)] text-sm font-medium transition-colors border-b border-[var(--accent)]/30 hover:border-[var(--accent)]">
                Return to the library to discover tomes.
              </button>
            </motion.div>
          ) : (
            <AnimatePresence>
              {vaultBooks.map((book, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.06 } }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl overflow-hidden hover-lift"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <img src={book.coverImage} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt={book.title} loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] via-transparent to-transparent" />
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleRemove(book.id)} className="absolute top-3 right-3 bg-red-900/80 hover:bg-red-700 text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-colors">
                      Remove
                    </motion.button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-serif font-bold text-base mb-1 line-clamp-1">{book.title}</h3>
                    <p className="text-[var(--text-muted)] text-xs mb-3">{book.author}</p>
                    <div className="flex justify-end pt-3 border-t border-[var(--border-subtle)]">
                      <button title="Read Lore" onClick={() => setSelectedLoreBook({ title: book.title, lore: book.lore || null })} className="text-[var(--text-ghost)] hover:text-[var(--accent)] transition-colors p-1.5 rounded-lg hover:bg-[var(--accent-muted)]">
                        <Scroll size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </main>

      <LoreModal isOpen={selectedLoreBook !== null} onClose={() => setSelectedLoreBook(null)} bookTitle={selectedLoreBook?.title || ''} lore={selectedLoreBook?.lore || null} />
    </motion.div>
  );
}
