import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Crown, ArrowLeft, Shield, BookOpen, Palette } from 'lucide-react';

export default function Upgrade() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) { navigate('/login'); return; }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const features = [
    { icon: BookOpen, title: 'Unlimited Tome Saves', desc: 'Save as many forbidden tomes to your vault as you desire.' },
    { icon: Shield, title: 'Restricted Arcane Lore', desc: 'Access classified lore entries hidden from standard scholars.' },
    { icon: Palette, title: 'Premium Avatar Border', desc: 'Display your prestigious status with an exclusive golden border.' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] text-white flex flex-col items-center justify-center p-5 relative overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-transparent to-[var(--bg-deep)]" />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => navigate('/dashboard')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors duration-300 text-sm"
      >
        <ArrowLeft size={16} /> Dashboard
      </motion.button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 text-center mb-10">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5">
          <Crown size={12} className="text-[var(--premium)]" />
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--text-muted)]">Premium Access</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-3">
          Become a <span className="text-[var(--premium)] text-glow-gold">Premium Scholar</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-base">Unlock forbidden lore and infinite vault storage.</p>
      </motion.div>

      {/* Pricing Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 glass-strong rounded-3xl p-7 sm:p-9 max-w-sm w-full shadow-[0_0_60px_rgba(0,0,0,0.5)]"
      >
        {/* Price */}
        <div className="text-center mb-7">
          <span className="text-[var(--premium)] font-semibold tracking-[0.2em] uppercase text-xs">One-time Fee</span>
          <div className="text-5xl font-serif text-white mt-2 mb-1">$49<span className="text-2xl">.99</span></div>
          <p className="text-[var(--text-ghost)] text-xs">Lifetime access to Premium features</p>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {features.map((f) => (
            <li key={f.title} className="flex items-start gap-3">
              <div className="mt-0.5 w-7 h-7 rounded-lg bg-[var(--accent-muted)] border border-[var(--accent)]/20 flex items-center justify-center shrink-0">
                <f.icon size={14} className="text-[var(--accent)]" />
              </div>
              <div>
                <span className="text-white text-sm font-medium block">{f.title}</span>
                <span className="text-[var(--text-muted)] text-xs leading-relaxed">{f.desc}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          onClick={handleUpgrade} disabled={loading}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold uppercase tracking-[0.15em] py-4 rounded-xl text-sm transition-all duration-300 glow-red disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Opening Gateway...</>
          ) : (
            <><Crown size={16} /> Unlock Premium</>
          )}
        </motion.button>

        <button onClick={() => navigate('/dashboard')} className="w-full mt-4 text-[var(--text-muted)] hover:text-white transition-colors duration-300 uppercase tracking-[0.15em] text-[11px] font-semibold">
          Return to Dashboard
        </button>
      </motion.div>
    </div>
  );
}
