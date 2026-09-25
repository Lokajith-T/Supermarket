import { useState, useEffect } from 'react';
import { Search, House, LogOut } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate({ to: '/' });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400 text-lg font-black text-white shadow-glow">
            F
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">FreshCart</div>
            <div className="text-lg font-bold text-stone-900">Market</div>
          </div>
        </Link>

        <div className="hidden flex-1 max-w-xl md:block">
          <form onSubmit={handleSearch} className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search groceries, essentials, offers..."
              className="w-full rounded-full border border-stone-200 bg-stone-50 py-3 pl-11 pr-3 text-sm text-stone-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
            />
          </form>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          <Link to="/" className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100">
            <House className="h-4 w-4 text-emerald-600" />
            Home
          </Link>
          <Link to="/products" className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 hover:bg-emerald-100">Check Stock Availability</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          ) : (
            <Link to="/login" className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-bold text-emerald-700 hover:bg-emerald-50">Login</Link>
          )}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button className="rounded-full border border-stone-200 p-2 text-stone-700">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
