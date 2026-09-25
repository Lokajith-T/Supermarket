import CustomerLayout from '@/components/layout/CustomerLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const timeline = [
  { label: 'Order Placed', date: 'Sep 22, 9:30 AM', completed: true },
  { label: 'Processing', date: 'Sep 22, 12:30 PM', completed: true },
  { label: 'Packed', date: 'Sep 22, 6:00 PM', completed: true },
  { label: 'Out for Delivery', date: 'Sep 23, 8:10 AM', completed: false },
  { label: 'Delivered', date: 'Expected Sep 24', completed: false },
];

export default function OrderDetailPage() {
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">Order</div>
            <h1 className="text-4xl font-black text-stone-900">#ORD1028</h1>
          </div>
          <Badge variant="warning">Processing</Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <h2 className="text-xl font-black text-stone-900">Status timeline</h2>
            <div className="mt-6 space-y-5">
              {timeline.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={item.completed ? 'flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600' : 'flex h-5 w-5 items-center justify-center rounded-full border-2 border-stone-300'} />
                    {item.label !== timeline[timeline.length - 1].label && <div className="mt-2 h-12 w-px bg-stone-200" />}
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900">{item.label}</div>
                    <div className="text-sm text-stone-500">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-black text-stone-900">Summary</h2>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-stone-900">₹430</span></div>
              <div className="flex justify-between"><span>Discount</span><span className="font-semibold text-emerald-700">-₹40</span></div>
              <div className="flex justify-between"><span>Delivery</span><span className="font-semibold text-stone-900">₹49</span></div>
              <div className="border-t border-stone-200 pt-3 flex justify-between text-base font-bold text-stone-900"><span>Total</span><span>₹439</span></div>
            </div>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
}
