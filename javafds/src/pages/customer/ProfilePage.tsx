import CustomerLayout from '@/components/layout/CustomerLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';

export default function ProfilePage() {
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">Profile</div>
          <h1 className="text-4xl font-black text-stone-900">My account</h1>
        </div>

        <Card className="mb-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar size="lg" className="bg-gradient-to-br from-emerald-600 to-lime-500 text-white">MR</Avatar>
            <div>
              <div className="text-2xl font-black text-stone-900">Mehul Rawat</div>
              <div className="text-sm text-stone-500">mehul.rawat@example.com</div>
              <div className="text-sm text-stone-500">+91 98765 43210</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">Edit Profile</Button>
            <Button variant="primary">Change Password</Button>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-black text-stone-900">Personal details</h2>
            <div className="mt-5 space-y-4 text-sm text-stone-600">
              <div className="grid gap-4 md:grid-cols-2">
                <div><div className="mb-1 text-xs uppercase tracking-[0.12em] text-stone-500">First name</div><div className="rounded-xl bg-stone-50 p-3 font-medium text-stone-900">Mehul</div></div>
                <div><div className="mb-1 text-xs uppercase tracking-[0.12em] text-stone-500">Last name</div><div className="rounded-xl bg-stone-50 p-3 font-medium text-stone-900">Rawat</div></div>
              </div>
              <div><div className="mb-1 text-xs uppercase tracking-[0.12em] text-stone-500">Date of birth</div><div className="rounded-xl bg-stone-50 p-3 font-medium text-stone-900">14 Jan 1993</div></div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-black text-stone-900">Contact details</h2>
            <div className="mt-5 space-y-4 text-sm text-stone-600">
              <div><div className="mb-1 text-xs uppercase tracking-[0.12em] text-stone-500">Email</div><div className="rounded-xl bg-stone-50 p-3 font-medium text-stone-900">mehul.rawat@example.com</div></div>
              <div><div className="mb-1 text-xs uppercase tracking-[0.12em] text-stone-500">Mobile</div><div className="rounded-xl bg-stone-50 p-3 font-medium text-stone-900">+91 98765 43210</div></div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-black text-stone-900">Password & security</h2>
            <div className="mt-5 space-y-4 text-sm text-stone-600">
              <div><div className="mb-1 text-xs uppercase tracking-[0.12em] text-stone-500">Password</div><div className="rounded-xl bg-stone-50 p-3 font-medium text-stone-900">••••••••</div></div>
              <div><div className="mb-1 text-xs uppercase tracking-[0.12em] text-stone-500">Two-factor auth</div><div className="rounded-xl bg-stone-50 p-3 font-medium text-stone-900">Enabled</div></div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-black text-stone-900">Preferences</h2>
            <div className="mt-5 space-y-4 text-sm text-stone-600">
              <div className="flex items-center justify-between rounded-xl bg-stone-50 p-3"><span>Push notifications</span><span className="font-semibold text-emerald-700">On</span></div>
              <div className="flex items-center justify-between rounded-xl bg-stone-50 p-3"><span>Order updates</span><span className="font-semibold text-emerald-700">On</span></div>
              <div className="flex items-center justify-between rounded-xl bg-stone-50 p-3"><span>Preferred language</span><span className="font-semibold text-stone-900">English</span></div>
            </div>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
}
