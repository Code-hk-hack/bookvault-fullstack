import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';

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
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${endpoint}`, {
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
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`, {
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
    <div className="min-h-screen bg-[#030303] flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)]" />
      </div>

      {/* The Auth Card */}
      <div className="relative z-10 w-full max-w-md mx-4 sm:mx-0 p-6 sm:p-8 bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.15)]">
        
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
          <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold tracking-wider">
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
              className="w-full bg-black/50 border border-white/10 rounded px-3 py-2.5 sm:px-4 sm:py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
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
              className="w-full bg-black/50 border border-white/10 rounded px-3 py-2.5 sm:px-4 sm:py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
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

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#0a0a0c] px-2 text-neutral-500 uppercase tracking-widest">Or continue with</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLoginMock}
          disabled={loading}
          className="w-full bg-white text-black font-bold uppercase tracking-widest py-3 rounded border border-neutral-300 transition-all hover:bg-neutral-200 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        {/* Real implementation below - uncomment when Client ID is available */}
        {/* <div className="mt-4 flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                // handle logic with credentialResponse.credential
              }}
              onError={() => setError('Google Login Failed')}
            />
        </div> */}

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