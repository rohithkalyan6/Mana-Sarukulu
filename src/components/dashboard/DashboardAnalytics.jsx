import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CATEGORIES, getCategoryDot } from '../../utils/helpers';
import { useCurrency } from '../../hooks/useCurrency';

export default function DashboardAnalytics({ currentMonthItems, totalSpent }) {
  const { formatCurrency } = useCurrency();
  
  const categoryData = CATEGORIES.map(cat => {
    const amount = currentMonthItems
      .filter(item => item.category === cat.id)
      .reduce((acc, item) => acc + (item.price * (Number.isNaN(Number(item.quantity)) ? 1 : Number(item.quantity) || 1)), 0);
    return { name: cat.label, value: amount, id: cat.id };
  }).filter(data => data.value > 0);

  return (
    <div className="glass-card p-5 md:p-6 h-full flex flex-col">
      <h3 className="text-[15px] font-bold text-slate-800 mb-6">Top Categories (This Month)</h3>
      
      {categoryData.length > 0 ? (
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 relative flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getCategoryDot(entry.id)} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex-1 space-y-3">
            {categoryData.sort((a, b) => b.value - a.value).slice(0, 4).map((cat) => {
              const percentage = ((cat.value / totalSpent) * 100).toFixed(1);
              return (
                <div key={cat.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getCategoryDot(cat.id) }} />
                    <span className="font-semibold text-[13px] text-slate-700">{cat.name}</span>
                  </div>
                  <div className="text-right flex items-center gap-1.5">
                    <span className="font-bold text-[13px] text-slate-800">{formatCurrency(cat.value)}</span>
                    <span className="text-[11px] font-semibold text-slate-400">({percentage}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-slate-500 font-medium text-sm">No spending data yet.</p>
        </div>
      )}
    </div>
  );
}
