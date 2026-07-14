import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Choose the correct backend route based on if they are logging in or signing up
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      
      // Success! Save the security token to the browser
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      
      // Send the user to the secret dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)]" />
      </div>

      {/* The Auth Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.15)]">
        
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-16 h-16 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
          <h2 className="text-3xl font-serif text-white font-bold tracking-wider">
            {isLogin ? 'Enter the Vault' : 'Join the Shadows'}
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            {isLogin ? 'Speak your credentials to pass.' : 'Bind your soul to the archives.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded bg-red-900/40 border border-red-500/50 text-red-200 text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
              placeholder="scholar@archives.com"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-900/80 hover:bg-red-700 text-white font-bold uppercase tracking-widest py-3 rounded border border-red-500/50 transition-all drop-shadow-[0_0_10px_rgba(220,38,38,0.5)] disabled:opacity-50"
          >
            {loading ? 'Summoning...' : (isLogin ? 'Unlock' : 'Bind Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already bound? Log in"}
          </button>
        </div>
        
      </div>
    </div>
  );
}