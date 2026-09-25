import { useState, useEffect } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import Card from '@/components/ui/Card';
import { database } from '@/firebase';
import { ref, onValue } from 'firebase/database';
import { Product } from '@/types';

export default function CustomerDashboardPage() {
  const [firebaseProducts, setFirebaseProducts] = useState<Product[]>([]);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const productsRef = ref(database, 'products');
    const unsub = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const prodArray: Product[] = Object.keys(data).map(key => {
          const item = data[key];
          return {
            id: key,
            name: item.name,
            brand: 'Local',
            description: item.name,
            price: item.price,
            unit: item.packSize ? `${item.packSize}` : item.unit || 'Piece',
            category: item.categoryId || 'Unknown',
            stock: item.quantity || 0,
            rating: 4.5,
            image: item.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
            status: item.quantity <= 0 ? 'OUT OF STOCK' : (item.quantity <= (item.minStock || 5) ? 'LOW STOCK' : 'IN STOCK'),
            sku: item.sku || 'N/A'
          };
        });
        setFirebaseProducts(prodArray);
      } else {
        setFirebaseProducts([]);
      }
    });

    const ordersRef = ref(database, 'orders');
    const unsubOrders = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const count = Object.keys(data).filter(key => data[key].status !== 'Completed' && data[key].status !== 'Cancelled').length;
        setOrderCount(count);
      } else {
        setOrderCount(0);
      }
    });

    return () => {
      unsub();
      unsubOrders();
    };
  }, []);
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">Customer</div>
          <h1 className="text-4xl font-black text-stone-900">Welcome back</h1>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-emerald-50 to-lime-50">
            <div className="text-sm text-stone-500">Saved basket</div>
            <div className="mt-3 text-3xl font-black text-stone-900">₹1,240</div>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50">
            <div className="text-sm text-stone-500">Loyalty points</div>
            <div className="mt-3 text-3xl font-black text-stone-900">7,850</div>
          </Card>
          <Card className="bg-gradient-to-br from-stone-100 to-stone-50">
            <div className="text-sm text-stone-500">Open orders</div>
            <div className="mt-3 text-3xl font-black text-stone-900">{orderCount < 10 ? `0${orderCount}` : orderCount}</div>
          </Card>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {firebaseProducts.slice(0, 8).map((product) => (
            <Card key={product.id} className="overflow-hidden p-0">
              <img src={product.image} alt={product.name} className="h-40 w-full object-cover" />
              <div className="p-4">
                <div className="font-bold text-stone-900">{product.name}</div>
                <div className="mt-2 text-lg font-black text-emerald-700">₹{product.price}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
}
