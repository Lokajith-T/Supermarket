import { Search } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { adminProducts } from '@/data/mockData';

export default function AdminProductsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-600">Catalog</div>
            <h1 className="text-4xl font-black text-stone-900">Products</h1>
          </div>
          <Button variant="primary">Add Product</Button>
        </div>

        <Card className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input className="input-shell pl-9" placeholder="Search products" />
            </div>
            <div className="flex gap-2">
              <button className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-600">Category</button>
              <button className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-600">Stock</button>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-stone-50 text-xs uppercase tracking-[0.12em] text-stone-500">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Updated</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminProducts.map((item) => (
                  <tr key={item.id} className="border-t border-stone-200 text-sm">
                    <td className="p-4 font-semibold text-stone-900">{item.name}</td>
                    <td className="p-4 text-stone-600">{item.sku}</td>
                    <td className="p-4 text-stone-600">{item.category}</td>
                    <td className="p-4 font-semibold text-stone-900">₹{item.price}</td>
                    <td className="p-4 text-stone-600">{item.stock}</td>
                    <td className="p-4"><Badge variant={item.status === 'IN STOCK' ? 'success' : item.status === 'LOW STOCK' ? 'warning' : 'danger'}>{item.status}</Badge></td>
                    <td className="p-4 text-stone-600">{item.updated}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="rounded-xl border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-600">View</button>
                        <button className="rounded-xl border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-600">Edit</button>
                        <button className="rounded-xl border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-600">Deactivate</button>
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
