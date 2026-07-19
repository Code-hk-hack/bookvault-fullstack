import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { API_BASE_URL } from '../utils/api';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/dashboard');
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginMock = async () => {
    setError('');
    setLoading(true);
    try {
      const mockName = `scholar_${Math.floor(Math.random() * 1000)}`;
      const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: `mock_token_${mockName}` })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Google Auth failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google Auth failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] flex items-center justify-center relative overflow-hidden font-sans px-4">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-transparent to-[var(--bg-deep)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-deep)_80%)]" />
      </div>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors duration-300 text-sm"
      >
        <ArrowLeft size={16} /> Back
      </motion.button>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md p-7 sm:p-8 glass-strong rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.5)]"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-14 h-14 mx-auto mb-4 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]" style={{ WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)', maskImage: 'radial-gradient(circle, black 60%, transparent 100%)' }} />
          <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold tracking-wide">
            {isLogin ? 'Enter the Vault' : 'Join the Shadows'}
          </h2>
          <p className="text-[var(--text-muted)] text-sm mt-2">
            {isLogin ? 'Speak your credentials to pass.' : 'Bind your soul to the archives.'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-3 rounded-xl bg-red-900/20 border border-red-500/30 text-red-300 text-sm text-center">
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-2">Email Address</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-white placeholder-[var(--text-ghost)] focus:outline-none focus:border-[var(--accent)]/40 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all duration-300"
              placeholder="scholar@archives.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-[var(--text-ghost)] focus:outline-none focus:border-[var(--accent)]/40 focus:ring-1 focus:ring-[var(--accent)]/20 transition-all duration-300"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-ghost)] hover:text-[var(--text-muted)] transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <motion.button
            type="submit" disabled={loading}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold uppercase tracking-[0.15em] py-3.5 rounded-xl text-sm transition-all duration-300 glow-red disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Summoning...</>
            ) : (isLogin ? 'Unlock' : 'Bind Account')}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border-subtle)]" /></div>
          <div className="relative flex justify-center text-[10px]">
            <span className="bg-[var(--bg-surface)] px-3 text-[var(--text-ghost)] uppercase tracking-[0.2em] font-medium">Or continue with</span>
          </div>
        </div>

        {/* Google Button */}
        <motion.button
          onClick={handleGoogleLoginMock} disabled={loading}
          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
          className="w-full bg-white/[0.06] hover:bg-white/[0.1] text-white font-semibold uppercase tracking-[0.1em] py-3.5 rounded-xl border border-[var(--border-default)] transition-all duration-300 flex items-center justify-center gap-3 text-sm disabled:opacity-50"
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </motion.button>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-sm text-[var(--text-muted)] hover:text-white transition-colors duration-300">
            {isLogin ? "Don't have an account? Sign up" : "Already bound? Log in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}