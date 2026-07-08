import React, { useState } from 'react';
import { BookOpen, Bookmark, Star } from 'lucide-react';
import books from '../data/books';

export function BookGrid() {
  // State to track which genre filter is currently active
  const [selectedGenre, setSelectedGenre] = useState('All');
  const genres = ['All', 'Grimdark', 'Eldritch Lore', 'Arcane Magic', 'Necromancy'];

  // Filter the books array based on the selected genre
  const filteredBooks = selectedGenre === 'All' 
    ? books 
    : books.filter(book => book.genre === selectedGenre);

  return (
    <section id="library" className="py-20 px-6 w-full max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
          The Vault of Tomes
        </h2>
        <p className="text-gray-400">Discover forbidden knowledge and ancient legends.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-300 ${
              selectedGenre === genre 
              ? 'bg-red-900/40 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.6)]' 
              : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <div 
            key={book.id} 
            className="group relative bg-black/40 border border-white/10 rounded-2xl p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-red-500/50 hover:shadow-[0_10px_30px_rgba(220,38,38,0.15)] flex flex-col"
          >
            {/* Book Cover Image */}
            <div className="relative overflow-hidden rounded-xl mb-4 aspect-[2/3]">
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Rating Badge */}
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-white">{book.rating}</span>
              </div>
            </div>

            {/* Card Text Content */}
            <div className="flex-grow flex flex-col">
              <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{book.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{book.author}</p>
              
              <div className="flex justify-between items-center mt-auto mb-4">
                <span className="text-xs text-red-300 bg-red-950/40 border border-red-900/50 px-2 py-1 rounded-md">
                  {book.genre}
                </span>
                <button className="text-gray-400 hover:text-red-500 transition-colors" title="Save to Vault">
                  <Bookmark size={20} />
                </button>
              </div>

              {/* Read Lore Button */}
              <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-xl bg-white/5 text-sm font-semibold text-white hover:bg-red-600/20 hover:border-red-500/50 transition-all duration-300">
                <BookOpen size={16} /> Read Lore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}