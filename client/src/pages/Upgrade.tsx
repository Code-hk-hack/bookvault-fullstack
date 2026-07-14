import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Upgrade() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      navigate('/login');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      
      if (data.url) {
        // Redirect to the mock Stripe Checkout
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] opacity-90" />
      
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
          Become a Premium Scholar
        </h1>
        <p className="text-neutral-400 text-lg">Unlock forbidden lore and infinite vault storage.</p>
      </div>

      <div className="relative z-10 bg-[#0a0a0c]/80 backdrop-blur-xl border border-red-900/50 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-[0_0_50px_rgba(220,38,38,0.2)] mx-4 sm:mx-0">
        <div className="text-center mb-6">
          <span className="text-red-500 font-bold tracking-widest uppercase text-sm">One-time Fee</span>
          <div className="text-4xl font-serif text-white mt-2 mb-4">$49.99</div>
        </div>

        <ul className="space-y-4 mb-8 text-neutral-300">
          <li className="flex items-center gap-2">
            <span className="text-red-500">✓</span> Unlimited Tome Saves
          </li>
          <li className="flex items-center gap-2">
            <span className="text-red-500">✓</span> Access to Restricted Arcane Lore
          </li>
          <li className="flex items-center gap-2">
            <span className="text-red-500">✓</span> Premium Avatar Border
          </li>
        </ul>

        <button 
          onClick={handleUpgrade}
          disabled={loading}
          className="w-full bg-red-900/80 hover:bg-red-700 text-white font-bold uppercase tracking-widest py-4 rounded border border-red-500/50 transition-all drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] disabled:opacity-50"
        >
          {loading ? 'Opening Gateway...' : 'Unlock Premium'}
        </button>
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full mt-4 text-neutral-500 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
