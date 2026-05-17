import { ShoppingBasket, ChevronRight } from 'lucide-react';
import { useCurrency } from '../../hooks/useCurrency';
import { format } from 'date-fns';

export default function RecentShopping({ items }) {
  const { formatCurrency } = useCurrency();
  // Group by date for "Recent Shopping sessions" feel
  const groupedByDate = items.reduce((acc, item) => {
    const dateStr = format(new Date(item.createdAt), 'MMM d, yyyy');
    if (!acc[dateStr]) acc[dateStr] = { items: 0, total: 0 };
    acc[dateStr].items += 1;
    acc[dateStr].total += item.price * (Number.isNaN(Number(item.quantity)) ? 1 : Number(item.quantity) || 1);
    return acc;
  }, {});

  const recentSessions = Object.entries(groupedByDate).slice(0, 2); // Show top 2

  return (
    <div className="glass-card p-5 md:p-6 h-full flex flex-col">
      <h3 className="text-[15px] font-bold text-slate-800 mb-6">Recent Shopping (This Month)</h3>
      
      {recentSessions.length > 0 ? (
        <div className="space-y-3 flex-1">
          {recentSessions.map(([date, data], idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-[#E2E8F0] rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center border border-[#DCFCE7]">
                  <ShoppingBasket className="w-5 h-5 text-[#16A34A]" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800 group-hover:text-[#16A34A] transition-colors">{date}</p>
                  <p className="text-xs font-semibold text-slate-500">{data.items} items</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-sm text-slate-800">{formatCurrency(data.total)}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-slate-500 font-medium text-sm">No recent shopping sessions.</p>
        </div>
      )}
    </div>
  );
}
