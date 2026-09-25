import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/ui/Card';
import { categorySales, salesTrend, topSellingProducts } from '@/data/mockData';

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-600">Performance</div>
          <h1 className="text-4xl font-black text-stone-900">Analytics Workspace</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {['Date range', 'Category', 'Product'].map((filter) => (
            <div key={filter} className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-600">{filter}</div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-xl font-black text-stone-900">Sales trend</h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrend}>
                  <CartesianGrid stroke="#e7e5e4" strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
                  <Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-xl font-black text-stone-900">Product performance</h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSellingProducts}>
                  <CartesianGrid stroke="#e7e5e4" strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-xl font-black text-stone-900">Category performance</h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categorySales} innerRadius={50} outerRadius={90} dataKey="value" nameKey="name" />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-xl font-black text-stone-900">Inventory & loyalty activity</h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesTrend}>
                  <CartesianGrid stroke="#e7e5e4" strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#a78bfa" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
