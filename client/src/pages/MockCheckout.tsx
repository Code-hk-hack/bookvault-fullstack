import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1500));
    
    try {
      const res = await fetch('http://localhost:5000/api/payments/success', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      
      if (res.ok) {
        navigate('/dashboard?success=true');
      } else {
        alert('Payment failed simulation');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="bg-white max-w-md w-full rounded-xl shadow-xl overflow-hidden">
        {/* Stripe-like Header */}
        <div className="bg-[#5469d4] p-6 text-white">
          <div className="flex items-center gap-2 mb-4 opacity-80 text-sm font-semibold uppercase tracking-wider">
            <span>Stripe Test Mode</span>
          </div>
          <h2 className="text-2xl font-bold">BookVault Premium</h2>
          <p className="opacity-90 mt-1">$49.99</p>
        </div>
        
        <form onSubmit={handlePay} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required defaultValue="scholar@archives.com" className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-[#5469d4] outline-none" />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Information</label>
            <div className="border border-gray-300 rounded overflow-hidden">
              <input type="text" required defaultValue="4242 4242 4242 4242" className="w-full p-2 border-b border-gray-200 outline-none focus:bg-blue-50 tracking-widest font-mono" />
              <div className="flex">
                <input type="text" required defaultValue="12/26" className="w-1/2 p-2 border-r border-gray-200 outline-none focus:bg-blue-50 text-center font-mono" />
                <input type="text" required defaultValue="123" className="w-1/2 p-2 outline-none focus:bg-blue-50 text-center font-mono" />
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#5469d4] hover:bg-[#4355b9] text-white font-bold py-3 rounded transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Pay $49.99'}
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            By providing your card information, you allow BookVault to charge your card for future payments.
          </p>
        </form>
      </div>
    </div>
  );
}
