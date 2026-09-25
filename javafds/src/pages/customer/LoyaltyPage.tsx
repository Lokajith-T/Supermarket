import { Gift, TrendingUp } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { loyaltyTransactions } from '@/data/mockData';

export default function LoyaltyPage() {
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">Loyalty</div>
          <h1 className="text-4xl font-black text-stone-900">Your Loyalty Journey</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="bg-gradient-to-r from-emerald-600 to-lime-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-emerald-100">Current points</div>
                <div className="mt-4 text-5xl font-black">7,850</div>
              </div>
              <div className="rounded-2xl bg-white/15 p-3"><Gift className="h-8 w-8" /></div>
            </div>
            <div className="mt-6 h-2.5 w-full overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[78%] rounded-full bg-white" />
            </div>
            <div className="mt-3 text-sm text-emerald-50">2,150 points away from your next reward.</div>
          </Card>

          <Card>
            <div className="text-xs uppercase tracking-[0.2em] text-orange-600">Reward</div>
            <div className="mt-3 text-3xl font-black text-stone-900">5% OFF</div>
            <div className="mt-2 text-sm text-stone-600">Unlocked at 10,000 points</div>
            <div className="mt-5 rounded-2xl bg-orange-50 p-3 text-sm text-orange-700">Locked — 2,150 points remaining</div>
          </Card>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Card>
            <div className="text-sm text-stone-500">Points earned</div>
            <div className="mt-3 text-3xl font-black text-stone-900">12,540</div>
          </Card>
          <Card>
            <div className="text-sm text-stone-500">Points redeemed</div>
            <div className="mt-3 text-3xl font-black text-stone-900">4,690</div>
          </Card>
          <Card>
            <div className="text-sm text-stone-500">Available rewards</div>
            <div className="mt-3 text-3xl font-black text-stone-900">03</div>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <h2 className="text-xl font-black text-stone-900">Reward ladder</h2>
            <div className="mt-5 space-y-3">
              {[
                { points: '10,000', discount: '5% OFF', active: true },
                { points: '20,000', discount: '7% OFF', active: false },
                { points: '30,000', discount: '10% OFF', active: false },
              ].map((rule) => (
                <div key={rule.points} className="flex items-center justify-between rounded-2xl border border-stone-200 p-3">
                  <div><div className="font-semibold text-stone-900">{rule.points} points</div><div className="text-sm text-stone-500">{rule.discount}</div></div>
                  <Badge variant={rule.active ? 'success' : 'neutral'}>{rule.active ? 'Unlocked' : 'Locked'}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-black text-stone-900">Activity</h2>
            <div className="mt-5 space-y-4">
              {loyaltyTransactions.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-stone-200 pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <div className={item.type === 'earned' ? 'font-bold text-emerald-700' : 'font-bold text-orange-700'}>{item.type === 'earned' ? `+${item.points}` : `${item.points}`} points</div>
                    <div className="text-sm text-stone-500">{item.label}</div>
                  </div>
                  <div className="text-xs text-stone-500">{new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
}
