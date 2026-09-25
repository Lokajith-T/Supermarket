import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowUpRight, DollarSign, PackageSearch, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/ui/Card';
import { adminMetrics, categorySales, salesTrend, topSellingProducts } from '@/data/mockData';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-stone-500">Here’s what’s happening across your supermarket today.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {adminMetrics.map((metric) => (
            <Card key={metric.title} className="flex items-center justify-between">
              <div>
                <div className="text-sm text-stone-500">{metric.title}</div>
                <div className="mt-2 text-3xl font-black text-stone-900">{metric.value}</div>
                <div className={`mt-2 flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}><ArrowUpRight className="h-4 w-4" /> {metric.delta}</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><TrendingUp className="h-5 w-5" /></div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
          <Card className="p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-stone-500">Revenue</div>
                <h2 className="text-2xl font-black text-stone-900">Sales analytics</h2>
              </div>
              <div className="flex gap-2 text-xs">
                {['Today', '7 Days', '30 Days', '3 Months'].map((label) => (
                  <button key={label} className={label === '30 Days' ? 'rounded-full bg-emerald-600 px-3 py-1.5 font-semibold text-white' : 'rounded-full bg-stone-100 px-3 py-1.5 text-stone-600'}>{label}</button>
                ))}
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesTrend}>
                  <defs>
                    <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.6} /><stop offset="95%" stopColor="#10b981" stopOpacity={0.05} /></linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e7e5e4" strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="url(#salesFill)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-xl font-black text-stone-900">Top selling products</h2>
            <div className="mt-5 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={topSellingProducts}>
                  <CartesianGrid stroke="#e7e5e4" strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <Card className="p-5">
            <h2 className="text-xl font-black text-stone-900">Category sales</h2>
            <div className="mt-5 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categorySales} innerRadius={45} outerRadius={85} dataKey="value" paddingAngle={2} nameKey="name">
                    {categorySales.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-xl font-black text-stone-900">Restock demand</h2>
            <div className="mt-5 space-y-4">
              {[
                { name: 'Rice 5kg', stock: 12, waiting: 27, level: 'HIGH' },
                { name: 'Milk 1L', stock: 18, waiting: 18, level: 'MEDIUM' },
                { name: 'Cooking Oil 5L', stock: 9, waiting: 14, level: 'HIGH' },
              ].map((row) => (
                <div key={row.name} className="rounded-2xl border border-stone-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-stone-900">{row.name}</div>
                      <div className="text-sm text-stone-500">{row.waiting} customers waiting</div>
                    </div>
                    <div className={row.level === 'HIGH' ? 'rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-red-700' : 'rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700'}>{row.level}</div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
                    <span>Current stock: {row.stock}</span>
                    <span>Demand score: {row.waiting * 4}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
