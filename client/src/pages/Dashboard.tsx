import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [vaultBooks, setVaultBooks] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || !userId) {
      navigate('/login');
      return;
    }

    Promise.all([
      fetch(`http://localhost:5000/api/collections/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch(`http://localhost:5000/api/auth/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } })
    ])
      .then(async ([collectionsRes, userRes]) => {
        const collectionsData = await collectionsRes.json();
        const userData = await userRes.json();
        
        if (Array.isArray(collectionsData)) setVaultBooks(collectionsData);
        if (userData && !userData.error) setUser(userData);
        
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [navigate, token, userId]);

  const handleRemove = async (bookId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/collections`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, bookId })
      });
      if (res.ok) {
        setVaultBooks(prev => prev.filter((book: any) => book.id !== bookId));
      }
    } catch (error) {
      console.error("Failed to remove book", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-300 font-sans selection:bg-red-900">
      
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between relative z-[20] border-b border-white/5">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          <img src="/logo.png" className="w-10 h-10 object-contain rounded-full drop-shadow-[0_0_12px_rgba(220,38,38,0.9)]" alt="Logo" />
          <span className="text-white font-serif font-bold text-2xl tracking-widest group-hover:text-red-200 transition-colors">
            BookVault
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm font-bold tracking-widest uppercase">
          <span className="text-neutral-400">Archivist Profile</span>
          <button onClick={handleLogout} className="text-red-500 border border-red-900/50 hover:bg-red-900/20 px-4 py-2 rounded transition-all">
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16 relative z-[10]">
        
        {/* Profile Header */}
        <div className="mb-16 pb-8 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.3)] ${user?.isPremium ? 'bg-yellow-900/20 border border-yellow-500/50' : 'bg-red-900/20 border border-red-500/50'}`}>
              <span className={`text-4xl font-serif ${user?.isPremium ? 'text-yellow-500' : 'text-red-500'}`}>
                {user?.email?.[0]?.toUpperCase() || 'A'}
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-serif text-white mb-2">Your Personal Vault</h1>
              <p className="text-neutral-400 text-sm tracking-widest uppercase mb-1">
                Initiate Access Level: {user?.isPremium ? <span className="text-yellow-500 font-bold">Premium Scholar</span> : 'Standard'}
              </p>
              <p className="text-neutral-500 text-xs">{user?.email}</p>
            </div>
          </div>
          
          {!user?.isPremium && (
            <button 
              onClick={() => navigate('/upgrade')}
              className="bg-red-900/80 hover:bg-red-700 text-white font-bold uppercase tracking-widest px-6 py-3 rounded border border-red-500/50 transition-all drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            >
              Upgrade Vault
            </button>
          )}
        </div>

        {/* Vault Grid */}
        <h2 className="text-2xl font-serif text-white mb-8">Saved Tomes ({vaultBooks.length})</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-red-500 font-serif text-xl animate-pulse">Unsealing vault...</div>
          ) : vaultBooks.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-white/5 rounded-xl bg-black/50">
              <p className="text-neutral-500 font-serif text-xl mb-4">Your vault is empty.</p>
              <button onClick={() => navigate('/')} className="text-red-400 hover:text-red-300 border-b border-red-900/50">
                Return to the main library to discover tomes.
              </button>
            </div>
          ) : (
            vaultBooks.map((book: any) => (
              <div 
                key={book.id} 
                className="group relative bg-[#0a0a0c]/70 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-red-900/80 transition-all duration-500 flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img src={book.coverImage} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" alt={book.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
                  <button 
                    onClick={() => handleRemove(book.id)}
                    className="absolute top-3 right-3 bg-red-900/80 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors shadow-[0_0_10px_rgba(0,0,0,0.8)]"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="p-4 flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    <h3 className="text-white font-bold text-base mb-1 line-clamp-1">{book.title}</h3>
                    <p className="text-neutral-400 text-xs">{book.author}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
