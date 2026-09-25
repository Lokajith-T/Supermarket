import { Minus, Plus, ShieldCheck, ShoppingCart, Star, Truck } from 'lucide-react';
import { useParams } from '@tanstack/react-router';
import CustomerLayout from '@/components/layout/CustomerLayout';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { products } from '@/data/mockData';

export default function ProductDetailPage() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const product = products.find((item) => item.id === id) ?? products[0];

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-6 text-sm text-stone-500">
          Home / Products / <span className="font-semibold text-stone-800">{product.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[30px] border border-stone-200 bg-white p-3 shadow-soft">
              <img src={product.image} alt={product.name} className="h-[420px] w-full rounded-[22px] object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[product.image, product.image, product.image].map((src, index) => (
                <div key={index} className="overflow-hidden rounded-2xl border border-stone-200 bg-white p-2">
                  <img src={src} alt={`${product.name}-${index}`} className="h-24 w-full rounded-xl object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-stone-500">
              <span>{product.brand}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {product.rating}</span>
            </div>
            <h1 className="text-4xl font-black text-stone-900">{product.name}</h1>
            <p className="mt-4 text-stone-600">{product.description}</p>

            <div className="mt-6 flex items-center gap-3">
              <div className="text-4xl font-black text-emerald-700">₹{product.price}</div>
              {product.discount && <span className="text-sm font-semibold text-orange-600">Save {product.discount}%</span>}
              <div className="text-stone-500">/{product.unit}</div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Badge variant={product.status === 'IN STOCK' ? 'success' : product.status === 'LOW STOCK' ? 'warning' : 'danger'}>{product.status}</Badge>
              <span className="text-sm text-stone-500">SKU: {product.sku}</span>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center rounded-full border border-stone-200 bg-white p-1">
                <button className="rounded-full p-2 text-stone-600"><Minus className="h-4 w-4" /></button>
                <span className="min-w-10 text-center text-sm font-semibold">1</span>
                <button className="rounded-full p-2 text-stone-600"><Plus className="h-4 w-4" /></button>
              </div>
              <Button variant="primary" className="flex-1">Add to cart</Button>
              <Button variant="secondary" className="flex-1">Notify me</Button>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3 text-sm">
                <div className="mb-1 flex items-center gap-2 text-stone-500"><Truck className="h-4 w-4" /> Delivery</div>
                <div className="font-semibold text-stone-900">Same day</div>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3 text-sm">
                <div className="mb-1 flex items-center gap-2 text-stone-500"><ShieldCheck className="h-4 w-4" /> Quality</div>
                <div className="font-semibold text-stone-900">Fresh checked</div>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3 text-sm">
                <div className="mb-1 flex items-center gap-2 text-stone-500"><ShoppingCart className="h-4 w-4" /> Return</div>
                <div className="font-semibold text-stone-900">Easy return</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <h3 className="text-2xl font-black text-stone-900">Product details</h3>
            <div className="mt-4 space-y-4 text-stone-600">
              <p>Farm-fresh quality, natural nutrients, and carefully sourced ingredients for everyday wellness.</p>
              <p>Best used for breakfast, nutrition, and home meal preparation. Packaged for safety and freshness.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-stone-50 p-3"><div className="text-xs uppercase tracking-[0.16em] text-stone-500">Origin</div><div className="mt-1 font-semibold text-stone-900">Regional farms</div></div>
                <div className="rounded-2xl bg-stone-50 p-3"><div className="text-xs uppercase tracking-[0.16em] text-stone-500">Storage</div><div className="mt-1 font-semibold text-stone-900">Cool and dry</div></div>
                <div className="rounded-2xl bg-stone-50 p-3"><div className="text-xs uppercase tracking-[0.16em] text-stone-500">Best before</div><div className="mt-1 font-semibold text-stone-900">7 days</div></div>
                <div className="rounded-2xl bg-stone-50 p-3"><div className="text-xs uppercase tracking-[0.16em] text-stone-500">Category</div><div className="mt-1 font-semibold text-stone-900">{product.category}</div></div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-black text-stone-900">Nutrition</h3>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <div className="flex justify-between rounded-xl bg-stone-50 px-3 py-2"><span>Energy</span><span className="font-semibold text-stone-900">120 kcal</span></div>
              <div className="flex justify-between rounded-xl bg-stone-50 px-3 py-2"><span>Protein</span><span className="font-semibold text-stone-900">6g</span></div>
              <div className="flex justify-between rounded-xl bg-stone-50 px-3 py-2"><span>Carbs</span><span className="font-semibold text-stone-900">17g</span></div>
              <div className="flex justify-between rounded-xl bg-stone-50 px-3 py-2"><span>Fat</span><span className="font-semibold text-stone-900">4g</span></div>
            </div>
          </Card>
        </div>

        <div className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-2xl font-black text-stone-900">Related products</h3>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {products.slice(0, 3).map((item) => (
              <Card key={item.id} className="overflow-hidden p-0">
                <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <div className="font-bold text-stone-900">{item.name}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-black text-emerald-700">₹{item.price}</span>
                    <Button variant="primary">Add</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
