import { BellRing, CheckCheck, Gift, PackageCheck, Sparkles, Tag } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import Button from '@/components/ui/Button';
import { notifications } from '@/data/mockData';

const iconMap = {
  'Back in stock': PackageCheck,
  'Order update': BellRing,
  'Points earned': Gift,
  'Reward unlocked': Sparkles,
  'New offer': Tag,
  'New product': PackageCheck,
  Announcement: CheckCheck,
};

export default function NotificationsPage() {
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">Inbox</div>
            <h1 className="text-4xl font-black text-stone-900">Notifications</h1>
          </div>
          <Button variant="secondary">Mark all as read</Button>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = iconMap[notification.type] ?? BellRing;
            return (
              <div key={notification.id} className={notification.read ? 'rounded-[24px] border border-stone-200 bg-white p-4' : 'rounded-[24px] border border-emerald-200 bg-emerald-50 p-4'}>
                <div className="flex items-start gap-4">
                  <div className={notification.read ? 'flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-100 text-stone-700' : 'flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white'}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-bold text-stone-900">{notification.title}</div>
                      {!notification.read && <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />}
                    </div>
                    <div className="mt-1 text-sm text-stone-600">{notification.description}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-xs text-stone-500">{notification.time}</div>
                      <div className="text-[10px] uppercase tracking-[0.12em] text-stone-500">{notification.type}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CustomerLayout>
  );
}
