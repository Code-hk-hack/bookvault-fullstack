import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookGrid } from './components/BookGrid';
import { WorldLore } from './components/WorldLore';
import { Membership } from './components/Membership';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <BookGrid />
      <WorldLore /> {/* <-- New component added here */}
      <Membership/>
    </div>
  );
}

export default App;