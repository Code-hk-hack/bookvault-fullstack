import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ArrowLeft, CheckCircle } from 'lucide-react';

export default function MockCheckout() {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (!userId) navigate('/dashboard');
  }, [userId, navigate]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payments/success`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      if (res.ok) navigate('/dashboard?success=true');
      else { alert('Payment simulation failed'); setLoading(false); }
    } catch (err) { console.error(err); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4 font-sans text-gray-800">
      {/* Back */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => navigate('/upgrade')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-gray-400 hover:text-gray-700 transition-colors duration-300 text-sm"
      >
        <ArrowLeft size={16} /> Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Stripe-like Header */}
        <div className="bg-gradient-to-r from-[#635bff] to-[#7a73ff] p-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 opacity-80 text-xs font-semibold uppercase tracking-wider">
              <Lock size={12} /> Stripe Test Mode
            </div>
            <CheckCircle size={16} className="opacity-60" />
          </div>
          <h2 className="text-xl font-bold">BookVault Premium</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="opacity-90 text-sm">One-time upgrade</p>
            <p className="text-2xl font-bold">$49.99</p>
          </div>
        </div>

        <form onSubmit={handlePay} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
            <input type="email" required defaultValue="scholar@archives.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#635bff] focus:border-transparent outline-none transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Card Information</label>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center px-4 py-3 border-b border-gray-100">
                <CreditCard size={16} className="text-gray-400 mr-2" />
                <input type="text" required defaultValue="4242 4242 4242 4242" className="flex-1 outline-none text-sm tracking-widest font-mono" />
              </div>
              <div className="flex">
                <input type="text" required defaultValue="12/26" className="w-1/2 px-4 py-3 border-r border-gray-100 outline-none text-sm text-center font-mono" />
                <input type="text" required defaultValue="123" className="w-1/2 px-4 py-3 outline-none text-sm text-center font-mono" />
              </div>
            </div>
          </div>

          <motion.button
            type="submit" disabled={loading}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
            className="w-full bg-[#635bff] hover:bg-[#5046e5] text-white font-semibold py-3.5 rounded-xl transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
            ) : (
              <>Lock In — $49.99</>
            )}
          </motion.button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Lock size={10} /> Encrypted & Secure
          </div>
        </form>
      </motion.div>
    </div>
  );
}
