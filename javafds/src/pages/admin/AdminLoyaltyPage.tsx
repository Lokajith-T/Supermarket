import AdminLayout from '@/components/layout/AdminLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const rules = [
  { value: '₹100 = 1 point', description: 'Standard earning rule', status: 'Active' },
  { value: '10,000 points → 5%', description: 'Customer reward tier', status: 'Active' },
  { value: '20,000 points → 7%', description: 'Premium tier', status: 'Inactive' },
  { value: '30,000 points → 10%', description: 'Elite tier', status: 'Active' },
];

export default function AdminLoyaltyPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-600">Rewards</div>
            <h1 className="text-4xl font-black text-stone-900">Loyalty Management</h1>
          </div>
          <Button variant="primary">Add Rule</Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {rules.map((rule) => (
            <Card key={rule.value}>
              <div className="flex items-center justify-between">
                <div className="text-lg font-black text-stone-900">{rule.value}</div>
                <Badge variant={rule.status === 'Active' ? 'success' : 'neutral'}>{rule.status}</Badge>
              </div>
              <div className="mt-3 text-sm text-stone-600">{rule.description}</div>
              <div className="mt-5 flex gap-2">
                <button className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-600">Edit</button>
                <button className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-600">Deactivate</button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
