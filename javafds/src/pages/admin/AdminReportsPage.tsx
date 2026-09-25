import AdminLayout from '@/components/layout/AdminLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const reports = [
  { title: 'Sales Report', description: 'Daily revenue and order performance', dateRange: 'Last 30 days' },
  { title: 'Inventory Report', description: 'Stock movement and replenishment summary', dateRange: 'This quarter' },
  { title: 'Orders Report', description: 'Order volume, fulfillment and returns', dateRange: 'Current month' },
  { title: 'Loyalty Report', description: 'Customer points and reward conversion', dateRange: 'Last 90 days' },
  { title: 'Restock Report', description: 'Demand and stockout forecasting', dateRange: 'Current week' },
];

export default function AdminReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-600">Insights</div>
          <h1 className="text-4xl font-black text-stone-900">Reports</h1>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reports.map((report) => (
            <Card key={report.title}>
              <div className="text-xl font-black text-stone-900">{report.title}</div>
              <div className="mt-2 text-sm text-stone-600">{report.description}</div>
              <div className="mt-4 text-xs uppercase tracking-[0.14em] text-stone-500">{report.dateRange}</div>
              <div className="mt-5 flex gap-2">
                <Button variant="secondary" className="flex-1">CSV</Button>
                <Button variant="primary" className="flex-1">PDF</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
