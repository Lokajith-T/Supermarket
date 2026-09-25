import CustomerLayout from '@/components/layout/CustomerLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

const steps = ['Cart', 'Delivery', 'Payment', 'Confirmation'];

export default function CheckoutPage() {
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">Secure checkout</div>
          <h1 className="text-4xl font-black text-stone-900">Checkout</h1>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <div className={index === 1 ? 'flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white' : 'flex h-9 w-9 items-center justify-center rounded-full bg-stone-200 text-sm font-bold text-stone-700'}>{index + 1}</div>
              <span className={index === 1 ? 'font-semibold text-stone-900' : 'text-stone-500'}>{step}</span>
              {index < steps.length - 1 && <div className="h-px w-8 bg-stone-200" />}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <h2 className="text-2xl font-black text-stone-900">Delivery details</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Input placeholder="Full name" />
              <Input placeholder="Mobile number" />
              <div className="md:col-span-2"><Input placeholder="Address" /></div>
              <Input placeholder="City" />
              <Input placeholder="State" />
              <Input placeholder="Pincode" />
            </div>

            <h3 className="mt-8 text-xl font-black text-stone-900">Payment</h3>
            <div className="mt-4 space-y-3">
              <label className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-3"><span>Cash on Delivery</span><input type="radio" name="payment" checked className="h-4 w-4 accent-emerald-600" /></label>
              <label className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-3"><span>Online Payment</span><input type="radio" name="payment" className="h-4 w-4 accent-emerald-600" /></label>
            </div>
          </Card>

          <Card className="h-fit">
            <h2 className="text-2xl font-black text-stone-900">Final summary</h2>
            <div className="mt-5 space-y-3 text-sm text-stone-600">
              <div className="flex justify-between"><span>Organic Milk x 2</span><span>₹136</span></div>
              <div className="flex justify-between"><span>Brown Rice x 1</span><span>₹89</span></div>
              <div className="flex justify-between"><span>Whole Wheat Bread x 3</span><span>₹168</span></div>
              <div className="border-t border-stone-200 pt-3 flex justify-between"><span>Subtotal</span><span className="font-semibold text-stone-900">₹393</span></div>
              <div className="flex justify-between"><span>Discount</span><span className="font-semibold text-emerald-700">-₹80</span></div>
              <div className="flex justify-between"><span>Reward</span><span className="font-semibold text-amber-600">-₹50</span></div>
              <div className="flex justify-between"><span>Total</span><span className="text-lg font-black text-stone-900">₹363</span></div>
            </div>
            <Button variant="primary" className="mt-6 w-full">Place order</Button>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
}
