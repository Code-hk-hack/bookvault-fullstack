import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, LayoutGrid } from 'lucide-react';
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

export default function Lore() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Lore Modal State
  const [selectedLoreBook, setSelectedLoreBook] = useState<{title: string, lore: string | null} | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(data => { setBooks(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (book.lore && book.lore.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="relative min-h-screen bg-[#030303] text-neutral-300 font-sans selection:bg-red-900 overflow-x-hidden"
    >
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-10 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-[#030303]" />
      </div>

      <div className="relative z-[10] max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              The Arcane Archives
            </h1>
            <p className="text-neutral-400 text-sm md:text-base max-w-xl">
              Delve into the deepest, most forbidden lore of the tomes. These texts have been recovered from the ruins of ancient libraries.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="text-neutral-400 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold border-b border-transparent hover:border-white"
            >
              Return Home
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-red-500 border border-red-900/50 hover:bg-red-900/20 px-4 py-2 rounded transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)] text-xs md:text-sm font-bold uppercase tracking-wider"
            >
              <LayoutGrid size={16} /> Collections
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500">
            <Search size={20} />
          </div>
          <input
            type="text"
            className="w-full bg-black/60 border border-red-900/30 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all shadow-[0_0_20px_rgba(220,38,38,0.1)] placeholder-neutral-600"
            placeholder="Search the lore entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Lore List */}
        {loading ? (
          <div className="text-center text-red-500 font-serif text-xl animate-pulse py-20">Unsealing texts...</div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {filteredBooks.map((book, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
                  key={book.id}
                  className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 hover:border-red-900/50 transition-all group"
                >
                  <div className="w-full md:w-48 h-64 shrink-0 overflow-hidden rounded-xl">
                    <img src={book.coverImage} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt={book.title} />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">{book.title}</h2>
                    <p className="text-red-500 text-xs tracking-widest uppercase font-bold mb-6">{book.author}</p>
                    
                    <p className="text-neutral-400 leading-relaxed line-clamp-3 mb-6 italic">
                      {book.lore ? book.lore.substring(0, 200) + '...' : 'The lore for this tome has been lost to time...'}
                    </p>
                    
                    <div>
                      <button 
                        onClick={() => setSelectedLoreBook({ title: book.title, lore: book.lore || null })}
                        className="inline-flex items-center gap-2 text-white bg-red-900/40 hover:bg-red-900/80 border border-red-500/30 px-5 py-2.5 rounded-lg transition-all uppercase tracking-widest text-xs font-bold"
                      >
                        <BookOpen size={16} /> Read Full Lore
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredBooks.length === 0 && (
              <div className="text-center py-20 text-neutral-500 font-serif text-xl">
                No lore matches your incantation.
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
