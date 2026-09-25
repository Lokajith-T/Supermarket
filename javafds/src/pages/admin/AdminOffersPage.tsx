import AdminLayout from '@/components/layout/AdminLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const offers = [
  { title: '10% OFF on Dairy', product: 'Organic Milk', discount: '10%', start: '2026-09-15', end: '2026-09-30', status: 'Active' },
  { title: 'Buy 1 Get 1 Free', product: 'Brown Rice', discount: 'BOGO', start: '2026-09-20', end: '2026-09-27', status: 'Scheduled' },
  { title: 'Weekend Grocery Sale', product: 'Fresh Produce', discount: '30%', start: '2026-09-18', end: '2026-09-24', status: 'Inactive' },
];

export default function AdminOffersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-600">Promotions</div>
            <h1 className="text-4xl font-black text-stone-900">Offers</h1>
          </div>
          <Button variant="primary">Create Offer</Button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {offers.map((offer) => (
            <Card key={offer.title}>
              <div className="flex items-center justify-between">
                <div className="text-xl font-black text-stone-900">{offer.title}</div>
                <Badge variant={offer.status === 'Active' ? 'success' : offer.status === 'Scheduled' ? 'warning' : 'neutral'}>{offer.status}</Badge>
              </div>
              <div className="mt-4 text-sm text-stone-500">Product: {offer.product}</div>
              <div className="mt-2 text-sm text-stone-500">Discount: {offer.discount}</div>
              <div className="mt-2 text-sm text-stone-500">Start: {offer.start}</div>
              <div className="mt-2 text-sm text-stone-500">End: {offer.end}</div>
              <div className="mt-5 flex gap-2">
                <button className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-600">Edit</button>
                <button className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-600">Deactivate</button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
