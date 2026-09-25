import AdminLayout from '@/components/layout/AdminLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { products } from '@/data/mockData';

const billItems = [
  { name: 'Organic Milk', price: 68, qty: 2 },
  { name: 'Brown Rice', price: 89, qty: 1 },
  { name: 'Whole Wheat Bread', price: 56, qty: 3 },
];

export default function AdminPosPage() {
  const subtotal = billItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = 42;
  const total = subtotal + tax;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-600">Cashier</div>
          <h1 className="text-4xl font-black text-stone-900">POS Billing</h1>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.8fr_0.9fr]">
          <Card className="p-5">
            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-3">
              <div className="text-stone-400">⌕</div>
              <input className="w-full bg-transparent text-sm outline-none" placeholder="Scan barcode or search product..." />
            </div>
            <div className="grid gap-3">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between rounded-2xl border border-stone-200 p-3">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="h-12 w-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-semibold text-stone-900">{product.name}</div>
                      <div className="text-xs text-stone-500">₹{product.price}</div>
                    </div>
                  </div>
                  <button className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">Add</button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-xl font-black text-stone-900">Current bill</h2>
            <div className="mt-5 space-y-3 text-sm">
              {billItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-xl bg-stone-50 p-3">
                  <div>
                    <div className="font-semibold text-stone-900">{item.name}</div>
                    <div className="text-stone-500">₹{item.price} × {item.qty}</div>
                  </div>
                  <div className="font-semibold text-stone-900">₹{item.price * item.qty}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-xl font-black text-stone-900">Customer</h2>
            <div className="mt-4 space-y-4">
              <input className="input-shell" placeholder="Search customer" />
              <div className="rounded-2xl bg-emerald-50 p-3">
                <div className="font-semibold text-stone-900">Aisha Khan</div>
                <div className="mt-1 text-sm text-stone-600">2,540 loyalty points</div>
              </div>
              <div className="space-y-2 text-sm text-stone-600">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-stone-900">₹{subtotal}</span></div>
                <div className="flex justify-between"><span>Discount</span><span className="font-semibold text-emerald-700">-₹80</span></div>
                <div className="flex justify-between"><span>Tax</span><span className="font-semibold text-stone-900">₹{tax}</span></div>
                <div className="flex justify-between border-t border-stone-200 pt-2 text-base font-bold text-stone-900"><span>Total</span><span>₹{total}</span></div>
              </div>
              <div className="mt-4 flex gap-2">
                {['Cash', 'Card', 'UPI'].map((method) => (
                  <button key={method} className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-600">{method}</button>
                ))}
              </div>
              <Button variant="primary" className="mt-2 w-full">Complete Sale</Button>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
