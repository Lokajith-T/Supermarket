import { ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Bell, House, ShoppingBag, ShoppingCart, Star, User } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';

const baseTabs = [
  { label: 'Home', to: '/', icon: House },
  { label: 'Products', to: '/products', icon: ShoppingBag },
];

export default function CustomerLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true';
  
  const tabs = [
    ...baseTabs,
    { label: isAuthenticated ? 'Profile' : 'Login', to: isAuthenticated ? '/customer' : '/login', icon: User }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <TopBar />
      <main>{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/90 px-2 py-2 backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md gap-2" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
          {tabs.map(({ label, to, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to} className={active ? 'rounded-2xl bg-emerald-50 p-2 text-center text-emerald-700' : 'rounded-2xl p-2 text-center text-stone-500'}>
                <Icon className="mx-auto mb-1 h-4 w-4" />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <footer className="border-t border-stone-200 bg-white md:mt-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6 lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400 text-lg font-black text-white">F</div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">FreshCart</div>
                <div className="text-lg font-bold">Market</div>
              </div>
            </div>
            <p className="text-sm text-stone-600">Fresh groceries, smarter shopping, and better rewards for everyday life.</p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-stone-900">Shop</h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>Vegetables</li>
              <li>Dairy & Eggs</li>
              <li>Bakery</li>
              <li>Household</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-stone-900">Support</h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>Shipping & Returns</li>
              <li>Help Center</li>
              <li>Loyalty Terms</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-stone-900">Follow</h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Newsletter</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
