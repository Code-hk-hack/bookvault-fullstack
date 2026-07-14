import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll } from 'lucide-react';
import LoreModal from '../components/LoreModal';

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
  const [selectedLoreBook, setSelectedLoreBook] = useState<{title: string, lore: string | null} | null>(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || !userId) {
      navigate('/login');
      return;
    }

    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/collections/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } })
    ])
      .then(async ([collectionsRes, userRes]) => {
        const collectionsData = await collectionsRes.json();
        const userData = await userRes.json();
        
        if (Array.isArray(collectionsData)) setVaultBooks(collectionsData);
        if (userData && !userData.error) setUser(userData);
        
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
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
      if (res.ok) {
        setVaultBooks(prev => prev.filter(book => book.id !== bookId));
      }
    } catch (error) {
      console.error("Failed to remove book", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="min-h-screen bg-[#030303] text-neutral-300 font-sans selection:bg-red-900 overflow-x-hidden relative"
    >
      <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-10 pointer-events-none fixed" />
      
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between relative z-[20] border-b border-white/5 backdrop-blur-sm gap-4 sm:gap-0"
      >
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          <img src="/logo.png" className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full drop-shadow-[0_0_12px_rgba(220,38,38,0.9)]" style={{ WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)', maskImage: 'radial-gradient(circle, black 65%, transparent 100%)' }} alt="Logo" />
          <span className="text-white font-serif font-bold text-xl sm:text-2xl tracking-widest group-hover:text-red-200 transition-colors">
            BookVault
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm font-bold tracking-widest uppercase">
          <span className="hidden sm:block text-neutral-400">Archivist Profile</span>
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={handleLogout} 
            className="text-red-500 border border-red-900/50 hover:bg-red-900/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded transition-all text-xs sm:text-sm"
          >
            Logout
          </motion.button>
        </div>
      </motion.nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-[10]">
        
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="mb-8 sm:mb-16 pb-6 sm:pb-8 border-b border-white/10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-0 text-center sm:text-left"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <motion.div 
              animate={user?.isPremium ? { scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(234,179,8,0.3)", "0 0 40px rgba(234,179,8,0.6)", "0 0 20px rgba(234,179,8,0.3)"] } : {}}
              transition={user?.isPremium ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.3)] ${user?.isPremium ? 'bg-yellow-900/20 border border-yellow-500/50' : 'bg-red-900/20 border border-red-500/50'}`}
            >
              <span className={`text-3xl sm:text-4xl font-serif ${user?.isPremium ? 'text-yellow-500' : 'text-red-500'}`}>
                {user?.email?.[0]?.toUpperCase() || 'A'}
              </span>
            </motion.div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif text-white mb-2">Your Personal Vault</h1>
              <p className="text-neutral-400 text-[10px] sm:text-sm tracking-widest uppercase mb-1">
                Initiate Access Level: {user?.isPremium ? <span className="text-yellow-500 font-bold drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]">Premium Scholar</span> : 'Standard'}
              </p>
              <p className="text-neutral-500 text-[10px] sm:text-xs">{user?.email}</p>
            </div>
          </div>
          
          {!user?.isPremium && (
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/upgrade')}
              className="w-full sm:w-auto bg-red-900/80 hover:bg-red-700 text-white font-bold uppercase tracking-widest px-4 sm:px-6 py-3 rounded border border-red-500/50 transition-all drop-shadow-[0_0_15px_rgba(220,38,38,0.5)] text-xs sm:text-base"
            >
              Upgrade Vault
            </motion.button>
          )}
        </motion.div>

        {/* Vault Grid */}
        <motion.h2 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-2xl font-serif text-white mb-8"
        >
          Saved Tomes ({vaultBooks.length})
        </motion.h2>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-red-500 font-serif text-xl animate-pulse">Unsealing vault...</div>
          ) : vaultBooks.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="col-span-full py-20 text-center border border-white/5 rounded-xl bg-black/50"
            >
              <p className="text-neutral-500 font-serif text-xl mb-4">Your vault is empty.</p>
              <button onClick={() => navigate('/')} className="text-red-400 hover:text-red-300 border-b border-red-900/50">
                Return to the main library to discover tomes.
              </button>
            </motion.div>
          ) : (
            <AnimatePresence>
              {vaultBooks.map((book, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  whileHover={{ y: -5, boxShadow: "0 0 30px rgba(220,38,38,0.3)" }}
                  key={book.id} 
                  className="group relative bg-[#0a0a0c]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-red-900/80 transition-colors duration-300 flex flex-col"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <img src={book.coverImage} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700" alt={book.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
                    <motion.button 
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemove(book.id)}
                      className="absolute top-3 right-3 bg-red-900/90 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors shadow-[0_0_10px_rgba(0,0,0,0.8)]"
                    >
                      Remove
                    </motion.button>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col justify-between relative z-10">
                    <div>
                      <h3 className="text-white font-bold text-base mb-1 line-clamp-1">{book.title}</h3>
                      <p className="text-neutral-400 text-xs">{book.author}</p>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                      <button 
                        title="Read Lore"
                        onClick={() => setSelectedLoreBook({ title: book.title, lore: book.lore || null })} 
                        className="text-neutral-400 transition-colors p-2 hover:text-red-500 hover:scale-110 active:scale-95"
                      >
                        <Scroll size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </main>
      
      <LoreModal 
        isOpen={selectedLoreBook !== null} 
        onClose={() => setSelectedLoreBook(null)}
        bookTitle={selectedLoreBook?.title || ''}
        lore={selectedLoreBook?.lore || null}
      />
    </motion.div>
  );
}
