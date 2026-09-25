import AdminLayout from '@/components/layout/AdminLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { restockDemand } from '@/data/mockData';

export default function AdminRestockPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Total Requests', value: '89', accent: 'emerald' },
            { label: 'High Demand', value: '32', accent: 'red' },
            { label: 'Products Out of Stock', value: '17', accent: 'amber' },
            { label: 'Pending Restocks', value: '14', accent: 'stone' },
          ].map((card) => (
            <Card key={card.label} className="p-4">
              <div className="text-sm text-stone-500">{card.label}</div>
              <div className="mt-3 text-3xl font-black text-stone-900">{card.value}</div>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-stone-50 text-xs uppercase tracking-[0.12em] text-stone-500">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Current Stock</th>
                  <th className="p-4">Customers Waiting</th>
                  <th className="p-4">Demand</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {restockDemand.map((item) => (
                  <tr key={item.name} className="border-t border-stone-200 text-sm">
                    <td className="p-4 font-semibold text-stone-900">{item.name}</td>
                    <td className="p-4 text-stone-600">{item.stock}</td>
                    <td className="p-4 text-stone-600">{item.waiting}</td>
                    <td className="p-4 text-stone-600">{item.level}</td>
                    <td className="p-4"><Badge variant={item.level === 'High' ? 'danger' : item.level === 'Medium' ? 'warning' : 'success'}>{item.level}</Badge></td>
                    <td className="p-4"><button className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white">Restock</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
