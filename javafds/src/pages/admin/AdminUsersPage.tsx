import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const users = [
  { name: 'Aisha Khan', email: 'aisha@example.com', mobile: '+91 98765 12345', role: 'Customer', status: 'Active', joined: 'Jan 10, 2025' },
  { name: 'Rahul Nair', email: 'rahul@example.com', mobile: '+91 99876 54321', role: 'Cashier', status: 'Active', joined: 'Mar 02, 2025' },
  { name: 'Nina Shah', email: 'nina@example.com', mobile: '+91 98111 33445', role: 'Customer', status: 'Inactive', joined: 'Apr 17, 2025' },
];

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-600">Access</div>
          <h1 className="text-4xl font-black text-stone-900">Users</h1>
        </div>

        <div className="flex gap-3">
          <button className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Customers</button>
          <button className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600">Cashiers</button>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-stone-50 text-xs uppercase tracking-[0.12em] text-stone-500">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Mobile</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Joined</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email} className="border-t border-stone-200 text-sm">
                    <td className="p-4 font-semibold text-stone-900">{user.name}</td>
                    <td className="p-4 text-stone-600">{user.email}</td>
                    <td className="p-4 text-stone-600">{user.mobile}</td>
                    <td className="p-4 text-stone-600">{user.role}</td>
                    <td className="p-4"><Badge variant={user.status === 'Active' ? 'success' : 'danger'}>{user.status}</Badge></td>
                    <td className="p-4 text-stone-600">{user.joined}</td>
                    <td className="p-4"><div className="flex gap-2"><button className="rounded-xl border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-600">View</button><button className="rounded-xl border border-stone-200 bg-white px-2 py-1.5 text-xs font-medium text-stone-600">Activate</button></div></td>
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
