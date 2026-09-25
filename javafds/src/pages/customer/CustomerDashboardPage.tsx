import { useState, useEffect } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { database } from '@/firebase';
import { ref, onValue } from 'firebase/database';
import { Product } from '@/types';

interface StockRequest {
  id: string;
  productName: string;
  quantity: number;
  message: string;
  status: string;
  createdAt: string;
}

export default function CustomerDashboardPage() {
  const [firebaseProducts, setFirebaseProducts] = useState<Product[]>([]);
  const [orderCount, setOrderCount] = useState(0);
  const [stockRequests, setStockRequests] = useState<StockRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

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

    // Fetch stock requests directly from Firebase
    const reqRef = ref(database, 'stockRequests');
    const unsubReq = onValue(reqRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reqArray: StockRequest[] = Object.keys(data).map(key => ({
          id: key,
          productName: data[key].productName,
          quantity: data[key].quantity,
          message: data[key].message || '',
          status: data[key].status,
          createdAt: data[key].createdAt,
        }));
        // Sort by newest first
        reqArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setStockRequests(reqArray);
      } else {
        setStockRequests([]);
      }
      setLoadingRequests(false);
    });

    return () => {
      unsub();
      unsubOrders();
      unsubReq();
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

        <div className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-stone-900">My Product Requests</h2>
          </div>
          <Card className="overflow-hidden p-0 border-stone-200 shadow-sm">
            {loadingRequests ? (
              <div className="p-8 text-center text-stone-500">Loading requests...</div>
            ) : stockRequests.length === 0 ? (
              <div className="p-8 text-center text-stone-500">You haven't made any product requests yet.</div>
            ) : (
              <div className="divide-y divide-stone-100">
                {stockRequests.map(req => (
                  <div key={req.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50 transition-colors">
                    <div>
                      <h3 className="font-bold text-stone-900">{req.productName}</h3>
                      <div className="mt-1 text-sm text-stone-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span>Quantity: {req.quantity}</span>
                        <span>•</span>
                        <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                      </div>
                      {req.message && (
                        <p className="mt-2 text-sm text-stone-600 italic">"{req.message}"</p>
                      )}
                    </div>
                    <div>
                      <Badge variant={req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'danger' : 'warning'}>
                        {req.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="mt-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-stone-900">Recommended for you</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
      </div>
    </CustomerLayout>
  );
}
