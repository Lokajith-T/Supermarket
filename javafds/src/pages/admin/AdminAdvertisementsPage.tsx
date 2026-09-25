import AdminLayout from '@/components/layout/AdminLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const ads = [
  { title: 'Fresh Organic Honey', product: 'Honey', start: '2026-09-01', end: '2026-09-30', priority: 'High', status: 'Active', image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=80' },
  { title: 'Weekend Grocery Sale', product: 'Pantry Packs', start: '2026-09-12', end: '2026-09-18', priority: 'Medium', status: 'Scheduled', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80' },
  { title: 'Milk & Dairy Boost', product: 'Organic Milk', start: '2026-09-05', end: '2026-09-21', priority: 'Low', status: 'Inactive', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80' },
];

export default function AdminAdvertisementsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-600">Marketing</div>
            <h1 className="text-4xl font-black text-stone-900">Advertisements</h1>
          </div>
          <Button variant="primary">Create</Button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {ads.map((ad) => (
            <Card key={ad.title} className="overflow-hidden p-0">
              <img src={ad.image} alt={ad.title} className="h-42 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-stone-900">{ad.title}</div>
                  <Badge variant={ad.status === 'Active' ? 'success' : ad.status === 'Scheduled' ? 'warning' : 'neutral'}>{ad.status}</Badge>
                </div>
                <div className="mt-3 text-sm text-stone-600">{ad.product}</div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-stone-500">
                  <div>Start: {ad.start}</div>
                  <div>End: {ad.end}</div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.14em] text-stone-500">{ad.priority}</div>
                  <div className="flex gap-2">
                    <button className="rounded-xl border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-600">Edit</button>
                    <button className="rounded-xl border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-600">Delete</button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
