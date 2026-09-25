import { useEffect, useState } from 'react';
import { BellRing, CheckCheck, Gift, PackageCheck, Sparkles, Tag } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import Button from '@/components/ui/Button';
import { notifications as mockNotifications } from '@/data/mockData';
import { database } from '@/firebase';
import { ref, onValue, update } from 'firebase/database';
import { NotificationItem } from '@/types';

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
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const notifRef = ref(database, 'notifications');
    const unsub = onValue(notifRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notifArray: NotificationItem[] = Object.keys(data).map(key => {
          const n = data[key];
          
          // Helper to format time
          let timeDisplay = n.time;
          if (timeDisplay) {
            try {
              const date = new Date(timeDisplay);
              if (!isNaN(date.getTime())) {
                const now = new Date();
                const diffMs = now.getTime() - date.getTime();
                const diffMins = Math.floor(diffMs / 60000);
                if (diffMins < 60) timeDisplay = `${diffMins} min ago`;
                else if (diffMins < 1440) timeDisplay = `${Math.floor(diffMins / 60)} hours ago`;
                else timeDisplay = date.toLocaleDateString();
              }
            } catch (e) {
              // keep existing time string
            }
          }

          return {
            id: key,
            title: n.title || '',
            description: n.description || '',
            type: n.type || 'Announcement',
            read: !!n.read,
            time: timeDisplay || 'Just now',
          };
        });
        
        // Sort by newest first (assuming keys are somewhat chronological or using time)
        notifArray.sort((a, b) => b.id.localeCompare(a.id));
        setNotifications([...notifArray, ...mockNotifications]);
      } else {
        setNotifications(mockNotifications);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const markAllAsRead = async () => {
    const updates: Record<string, any> = {};
    notifications.forEach(n => {
      if (!n.read && !n.id.startsWith('n')) { // Don't try to update mock data (ids start with 'n')
        updates[`/notifications/${n.id}/read`] = true;
      }
    });
    
    if (Object.keys(updates).length > 0) {
      try {
        await update(ref(database), updates);
      } catch (e) {
        console.error("Failed to mark read:", e);
      }
    }
  };

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">Inbox</div>
            <h1 className="text-4xl font-black text-stone-900">Notifications</h1>
          </div>
          <Button variant="secondary" onClick={markAllAsRead}>Mark all as read</Button>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="p-8 text-center text-stone-500">Loading notifications...</div>
          ) : (
            notifications.map((notification: any) => {
              const Icon = (iconMap as any)[notification.type] ?? BellRing;
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
            })
          )}
        </div>
      </div>
    </CustomerLayout>
  );
}
