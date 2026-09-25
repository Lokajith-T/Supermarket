import { Clock3 } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import Button from '@/components/ui/Button';
import { offers } from '@/data/mockData';

export default function OffersPage() {
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-orange-600">Savings</div>
          <h1 className="text-4xl font-black text-stone-900">Exclusive offers</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {offers.map((offer) => (
            <div key={offer.id} className="overflow-hidden rounded-[30px] border border-stone-200 bg-white shadow-soft">
              <div className="relative h-52">
                <img src={offer.image} alt={offer.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">{offer.discount}</div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-2xl font-black text-stone-900">{offer.title}</h2>
                  <div className="flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700"><Clock3 className="h-3.5 w-3.5" /> {offer.expiry}</div>
                </div>
                <p className="mt-3 text-stone-600">{offer.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="text-sm text-stone-500">Valid for a limited time</div>
                  <Button variant="primary">Claim offer</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
}
