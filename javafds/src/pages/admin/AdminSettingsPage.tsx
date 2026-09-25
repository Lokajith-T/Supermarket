import AdminLayout from '@/components/layout/AdminLayout';
import Card from '@/components/ui/Card';

const sections = [
  { title: 'General', fields: ['Store name', 'Timezone', 'Currency'] },
  { title: 'Store information', fields: ['Address', 'Contact', 'Working hours'] },
  { title: 'Notifications', fields: ['Email alerts', 'SMS alerts', 'Push alerts'] },
  { title: 'Loyalty', fields: ['Point rules', 'Reward tiers', 'Redemption policy'] },
  { title: 'Appearance', fields: ['Brand colors', 'Dark mode', 'Logo style'] },
  { title: 'Security', fields: ['2FA', 'Session timeout', 'Audit retention'] },
];

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-600">System</div>
          <h1 className="text-4xl font-black text-stone-900">Settings</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.title}>
              <h2 className="text-xl font-black text-stone-900">{section.title}</h2>
              <div className="mt-5 space-y-3">
                {section.fields.map((field) => (
                  <div key={field} className="rounded-2xl bg-stone-50 px-3 py-2 text-sm text-stone-600">{field}</div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
