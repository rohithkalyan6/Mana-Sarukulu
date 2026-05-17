import { useGroceryContext } from '../context/GroceryContext';
import { useCurrency } from '../hooks/useCurrency';
import { CATEGORIES } from '../utils/helpers';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BarChart2 } from 'lucide-react';

export default function Reports() {
  const { items } = useGroceryContext();
  const { formatCurrency } = useCurrency();

  const totalSpent = items.reduce((acc, item) => acc + (item.price * (Number.isNaN(Number(item.quantity)) ? 1 : Number(item.quantity) || 1)), 0);

  const categoryData = CATEGORIES.map(cat => {
    const amount = items
      .filter(item => item.category === cat.id)
      .reduce((acc, item) => acc + (item.price * (Number.isNaN(Number(item.quantity)) ? 1 : Number(item.quantity) || 1)), 0);
    return { name: cat.label, value: amount, id: cat.id, dot: cat.dot };
  }).filter(data => data.value > 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200 p-3 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)]">
          <p className="font-semibold text-slate-800 mb-1">{payload[0].name}</p>
          <p className="text-[#16A34A] font-bold">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto pt-2 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Spending Reports</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Detailed view of your overall spending.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 min-h-[400px] flex flex-col">
          <h3 className="text-[15px] font-bold text-slate-800 mb-6 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#16A34A]" /> Overall Category Breakdown
          </h3>
          
          {categoryData.length > 0 ? (
            <div className="flex-1 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.dot} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Total Spent</span>
                <span className="text-xl font-extrabold text-slate-800">{formatCurrency(totalSpent)}</span>
              </div>
            </div>
          ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="text-slate-500">No data available.</p>
            </div>
          )}
        </div>

        <div className="glass-card p-6">
          <h3 className="text-[15px] font-bold text-slate-800 mb-6">Top Spending Categories</h3>
          
          {categoryData.length > 0 ? (
            <div className="space-y-4">
              {categoryData.sort((a, b) => b.value - a.value).map((cat) => {
                const percentage = ((cat.value / totalSpent) * 100).toFixed(1);
                return (
                  <div key={cat.id} className="p-4 rounded-xl bg-[#FAFBFC] border border-[#E2E8F0]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-700 text-sm">{cat.name}</span>
                      <span className="font-extrabold text-slate-800">{formatCurrency(cat.value)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ width: `${percentage}%`, backgroundColor: cat.dot }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-500 w-10">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-8">Add items to see reports.</p>
          )}
        </div>
      </div>
    </div>
  );
}
