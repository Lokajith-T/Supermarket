import { useState, useEffect } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { database } from '@/firebase';
import { ref, onValue } from 'firebase/database';

const tabs = ['All', 'Pending', 'Processing', 'Completed', 'Cancelled'];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [orderHistory, setOrderHistory] = useState<any[]>([]);

  useEffect(() => {
    const ordersRef = ref(database, 'orders');
    const unsub = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.keys(data).map(key => ({
          ...data[key],
          date: data[key].createdAt,
          items: data[key].items?.length || 0,
          amount: data[key].totalAmount || 0,
        })).reverse();
        setOrderHistory(arr);
      } else {
        setOrderHistory([]);
      }
    });
    return () => unsub();
  }, []);

  const filteredOrders = activeTab === 'All' ? orderHistory : orderHistory.filter((order) => order.status === activeTab);

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">Orders</div>
          <h1 className="text-4xl font-black text-stone-900">Order history</h1>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={tab === activeTab ? 'rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white' : 'rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600'}>{tab}</button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm text-stone-500">{order.id}</div>
                <div className="mt-1 text-xl font-black text-stone-900">{new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
              </div>
              <div>
                <div className="text-sm text-stone-500">Items</div>
                <div className="font-semibold text-stone-900">{order.items}</div>
              </div>
              <div>
                <div className="text-sm text-stone-500">Amount</div>
                <div className="font-semibold text-stone-900">₹{order.amount}</div>
              </div>
              <div>
                <div className="text-sm text-stone-500">Status</div>
                <Badge variant={order.status === 'Completed' ? 'success' : order.status === 'Pending' ? 'warning' : order.status === 'Cancelled' ? 'danger' : 'neutral'}>{order.status}</Badge>
              </div>
              <Button variant="secondary">View Details</Button>
            </Card>
          ))}
        </div>
      </div>
    </CustomerLayout>
  );
}
