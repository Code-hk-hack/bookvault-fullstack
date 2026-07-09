import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookGrid } from './components/BookGrid';
import { WorldLore } from './components/WorldLore';
import { Membership } from './components/Membership';
import { VaultPanel } from './components/VaultPanel'; // Imported the new panel

function App() {
  // 1. STATE: Track the saved books and whether the panel is open
  const [savedBooks, setSavedBooks] = useState([]);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  // 2. FUNCTION: Add a book if it isn't saved, remove it if it is
  const handleToggleSave = (book) => {
    setSavedBooks((prev) => {
      const isSaved = prev.some((b) => b.id === book.id);
      if (isSaved) {
        return prev.filter((b) => b.id !== book.id); // Remove
      } else {
        return [...prev, book]; // Add
      }
    });
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* We pass the open function and the count to the Navbar */}
      <Navbar onOpenVault={() => setIsVaultOpen(true)} savedCount={savedBooks.length} />
      
      <Hero />
      
      {/* We pass the saved books and toggle function down to the grid */}
      <BookGrid savedBooks={savedBooks} onToggleSave={handleToggleSave} />
      
      <WorldLore />
      <Membership />

      {/* The sliding panel sits at the bottom, waiting to be opened */}
      <VaultPanel 
        isOpen={isVaultOpen} 
        onClose={() => setIsVaultOpen(false)} 
        savedBooks={savedBooks}
        onRemove={(id) => setSavedBooks(prev => prev.filter(b => b.id !== id))}
      />
    </div>
  );
}

export default App;