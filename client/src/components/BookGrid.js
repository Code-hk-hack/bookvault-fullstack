import React, { useState } from 'react';
import { BookOpen, Bookmark, Star } from 'lucide-react';
import { motion } from 'framer-motion'; 
import books from '../data/books';
import { LoreModal } from './LoreModal';

// 1. Accept the savedBooks array and onToggleSave function from App.js
export function BookGrid({ savedBooks = [], onToggleSave }) {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null); 
  
  const genres = ['All', 'Grimdark', 'Eldritch Lore', 'Arcane Magic', 'Necromancy'];

  const filteredBooks = selectedGenre === 'All' 
    ? books 
    : books.filter(book => book.genre === selectedGenre);

  return (
    <section id="library" className="relative min-h-screen w-full py-24 overflow-hidden">
      
      {/* Aesthetic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2000&auto=format&fit=crop" 
          alt="Ancient Library Background" 
          className="w-full h-full object-cover opacity-[0.15] mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/15 rounded-full blur-[120px]" />

        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 6 + 2; 
          const startX = Math.random() * 100; 
          const duration = Math.random() * 10 + 15; 
          const delay = Math.random() * 10; 

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-red-500/40 blur-[2px] shadow-[0_0_10px_rgba(220,38,38,0.5)]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${startX}%`,
                bottom: '-10%',
              }}
              animate={{
                y: [0, -1000], 
                x: [0, Math.random() * 100 - 50], 
                opacity: [0, 0.8, 0], 
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: 'linear',
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.6)]">
            The Vault of Tomes
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Browse the forbidden archives. Click any tome to unseal its secrets and read the lore within.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-16">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-6 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 ${
                selectedGenre === genre 
                ? 'bg-red-900/40 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
                : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30 hover:text-white backdrop-blur-sm'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => {
            // 2. Check if THIS specific book is in the savedBooks array
            const isSaved = savedBooks.some((b) => b.id === book.id);

            return (
              <div 
                key={book.id} 
                className="group relative bg-gray-950/60 border border-white/10 rounded-2xl p-4 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-red-500/50 hover:shadow-[0_15px_40px_rgba(220,38,38,0.2)] flex flex-col"
              >
                <div className="relative overflow-hidden rounded-xl mb-5 aspect-[2/3] shadow-lg">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-xl">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-white">{book.rating}</span>
                  </div>
                </div>

                <div className="flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-1.5 line-clamp-1">{book.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 font-serif italic">{book.author}</p>
                  
                  <div className="flex justify-between items-center mt-auto mb-5">
                    <span className="text-xs font-medium text-red-300 bg-red-950/40 border border-red-900/50 px-2.5 py-1 rounded-md">
                      {book.genre}
                    </span>
                    
                    {/* 3. The Bookmark Button: Trigger save function and change color based on state */}
                    <button 
                      onClick={() => onToggleSave(book)}
                      className={`transition-colors duration-300 ${isSaved ? 'text-red-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'text-gray-500 hover:text-red-400'}`} 
                      title={isSaved ? "Remove from Vault" : "Save to Vault"}
                    >
                      <Bookmark size={22} className={isSaved ? "fill-red-500" : ""} />
                    </button>
                  </div>

                  <button 
                    onClick={() => setSelectedBook(book)}
                    className="w-full flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl bg-white/5 text-sm font-semibold text-white hover:bg-red-600/20 hover:border-red-500/50 transition-all duration-300"
                  >
                    <BookOpen size={18} /> Unseal Tome
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <LoreModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
        />
      </div>
    </section>
  );
}