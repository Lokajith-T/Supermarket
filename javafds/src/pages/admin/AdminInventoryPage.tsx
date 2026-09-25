import AdminLayout from '@/components/layout/AdminLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { inventoryRows } from '@/data/mockData';

export default function AdminInventoryPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Total Stock', value: '8,240', accent: 'emerald' },
            { label: 'Low Stock', value: '42', accent: 'amber' },
            { label: 'Out of Stock', value: '17', accent: 'red' },
            { label: 'Stock Value', value: '₹9.4L', accent: 'stone' },
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
                  <th className="p-4">SKU</th>
                  <th className="p-4">Current Stock</th>
                  <th className="p-4">Minimum Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Updated</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventoryRows.map((item) => (
                  <tr key={item.product} className="border-t border-stone-200 text-sm">
                    <td className="p-4 font-semibold text-stone-900">{item.product}</td>
                    <td className="p-4 text-stone-600">{item.sku}</td>
                    <td className="p-4 font-semibold text-stone-900">{item.currentStock}</td>
                    <td className="p-4 text-stone-600">{item.minStock}</td>
                    <td className="p-4"><Badge variant={item.status === 'Healthy' ? 'success' : item.status === 'Low' ? 'warning' : 'danger'}>{item.status}</Badge></td>
                    <td className="p-4 text-stone-600">{item.lastUpdated}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="rounded-xl border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-600">Add Stock</button>
                        <button className="rounded-xl border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-600">Adjust</button>
                        <button className="rounded-xl border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-600">History</button>
                      </div>
                    </td>
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
