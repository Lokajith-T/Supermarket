import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const logs = [
  { timestamp: '2026-09-24 09:14 AM', user: 'Admin', action: 'PRODUCT_UPDATED', entity: 'Rice 5kg', description: 'Price updated', ip: '192.168.1.12', status: 'Success' },
  { timestamp: '2026-09-24 08:51 AM', user: 'Aditi Raman', action: 'INVENTORY_ADJUSTED', entity: 'Milk 1L', description: 'Stock adjusted', ip: '192.168.1.30', status: 'Success' },
  { timestamp: '2026-09-24 08:25 AM', user: 'Naina', action: 'USER_LOGIN', entity: 'Cashier Portal', description: 'Signed in', ip: '192.168.1.44', status: 'Info' },
];

export default function AdminAuditLogsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-600">Compliance</div>
          <h1 className="text-4xl font-black text-stone-900">Audit Logs</h1>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-stone-50 text-xs uppercase tracking-[0.12em] text-stone-500">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Entity</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">IP</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.timestamp} className="border-t border-stone-200 text-sm">
                    <td className="p-4 text-stone-600">{log.timestamp}</td>
                    <td className="p-4 font-semibold text-stone-900">{log.user}</td>
                    <td className="p-4 text-stone-700">{log.action}</td>
                    <td className="p-4 text-stone-700">{log.entity}</td>
                    <td className="p-4 text-stone-600">{log.description}</td>
                    <td className="p-4 text-stone-600">{log.ip}</td>
                    <td className="p-4"><Badge variant={log.status === 'Success' ? 'success' : 'warning'}>{log.status}</Badge></td>
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
