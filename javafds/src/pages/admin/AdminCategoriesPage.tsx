import AdminLayout from '@/components/layout/AdminLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const categories = [
  { name: 'Fruits & Vegetables', products: 148, status: 'Active', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dairy & Eggs', products: 92, status: 'Active', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80' },
  { name: 'Rice & Grains', products: 64, status: 'Draft', image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80' },
  { name: 'Bakery', products: 58, status: 'Active', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
];

export default function AdminCategoriesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-600">Organization</div>
            <h1 className="text-4xl font-black text-stone-900">Categories</h1>
          </div>
          <Button variant="primary">Add Category</Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.name} className="overflow-hidden p-0">
              <img src={category.image} alt={category.name} className="h-36 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-stone-900">{category.name}</h3>
                  <Badge variant={category.status === 'Active' ? 'success' : 'warning'}>{category.status}</Badge>
                </div>
                <div className="mt-3 text-sm text-stone-500">{category.products} products</div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-600">Edit</button>
                  <button className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-600">Archive</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
