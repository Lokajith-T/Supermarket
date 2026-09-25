import { ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Activity, Bell, BriefcaseBusiness, CreditCard, Gauge, Package, ReceiptText, Settings, ShoppingBag, ShoppingCart, Sparkles, Tag, TrendingUp, Users, Warehouse, WalletCards, ShieldCheck, ClipboardList } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: Gauge },
  { label: 'Products', to: '/admin/products', icon: Package },
  { label: 'Categories', to: '/admin/categories', icon: ClipboardList },
  { label: 'Inventory', to: '/admin/inventory', icon: Warehouse },
  { label: 'Restock Demand', to: '/admin/restock', icon: Sparkles },
  { label: 'Orders', to: '/admin/orders', icon: ShoppingCart },
  { label: 'POS Billing', to: '/admin/pos', icon: CreditCard },
  { label: 'Users', to: '/admin/users', icon: Users },
  { label: 'Advertisements', to: '/admin/advertisements', icon: Bell },
  { label: 'Offers', to: '/admin/offers', icon: Tag },
  { label: 'Loyalty', to: '/admin/loyalty', icon: WalletCards },
  { label: 'Reports', to: '/admin/reports', icon: ReceiptText },
  { label: 'Analytics', to: '/admin/analytics', icon: TrendingUp },
  { label: 'Audit Logs', to: '/admin/audit-logs', icon: ShieldCheck },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f5f7f3] text-stone-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-stone-200 bg-white/80 p-5 backdrop-blur-xl lg:block">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-lime-500 text-lg font-black text-white">F</div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-600">Supermarket</div>
              <div className="text-base font-bold">Admin Console</div>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map(({ label, to, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link key={to} to={to} className={active ? 'flex items-center gap-3 rounded-2xl bg-emerald-50 px-3 py-2.5 font-semibold text-emerald-700' : 'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-stone-600 transition hover:bg-stone-100'}>
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/80 backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 py-4 md:px-6">
              <div>
                <p className="text-sm text-stone-500">Good morning, Admin</p>
                <h1 className="text-xl font-bold">Operations Overview</h1>
              </div>

              <div className="flex items-center gap-3">
                <button className="rounded-full border border-stone-200 bg-white p-2 text-stone-600"> <Bell className="h-4 w-4" /> </button>
                <div className="hidden items-center gap-3 rounded-full border border-stone-200 bg-white px-3 py-2 md:flex">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-lime-500 text-xs font-bold text-white">AD</div>
                  <div>
                    <div className="text-sm font-semibold">Aditi Raman</div>
                    <div className="text-[11px] text-stone-500">Store Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
