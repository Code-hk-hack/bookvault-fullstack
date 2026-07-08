import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookGrid } from './components/BookGrid';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <BookGrid />
    </div>
  );
}

export default App;