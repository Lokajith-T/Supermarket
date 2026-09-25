import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const orders = [
  { id: '#ORD1021', customer: 'Aisha Khan', date: 'Sep 20', total: '₹1,240', status: 'Processing' },
  { id: '#ORD1022', customer: 'Rahul Nair', date: 'Sep 21', total: '₹890', status: 'Pending' },
  { id: '#ORD1023', customer: 'Maya Patel', date: 'Sep 22', total: '₹1,540', status: 'Completed' },
  { id: '#ORD1024', customer: 'Neha Singh', date: 'Sep 22', total: '₹670', status: 'Cancelled' },
];

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-600">Operations</div>
          <h1 className="text-4xl font-black text-stone-900">Orders</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Total Orders', value: '1,286' },
            { label: 'Pending', value: '143' },
            { label: 'Processing', value: '266' },
            { label: 'Completed', value: '877' },
          ].map((card) => (
            <Card key={card.label}>
              <div className="text-sm text-stone-500">{card.label}</div>
              <div className="mt-3 text-3xl font-black text-stone-900">{card.value}</div>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-stone-50 text-xs uppercase tracking-[0.12em] text-stone-500">
                <tr>
                  <th className="p-4">Order</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-stone-200 text-sm">
                    <td className="p-4 font-semibold text-stone-900">{order.id}</td>
                    <td className="p-4 text-stone-600">{order.customer}</td>
                    <td className="p-4 text-stone-600">{order.date}</td>
                    <td className="p-4 font-semibold text-stone-900">{order.total}</td>
                    <td className="p-4"><Badge variant={order.status === 'Completed' ? 'success' : order.status === 'Pending' ? 'warning' : order.status === 'Cancelled' ? 'danger' : 'neutral'}>{order.status}</Badge></td>
                    <td className="p-4"><button className="rounded-xl border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-600">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
