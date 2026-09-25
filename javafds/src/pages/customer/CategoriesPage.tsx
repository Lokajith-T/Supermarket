import CustomerLayout from '@/components/layout/CustomerLayout';
import Card from '@/components/ui/Card';
import { categories } from '@/data/mockData';

export default function CategoriesPage() {
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">Browse</div>
          <h1 className="text-4xl font-black text-stone-900">All categories</h1>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden p-0">
              <div className="relative h-48">
                <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                <div className={`absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${category.accent}`}>{category.icon}</div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-stone-900">{category.name}</h3>
                <p className="mt-1 text-sm text-stone-500">{category.productCount} items available</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
}
