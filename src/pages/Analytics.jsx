import { useGroceryContext } from '../context/GroceryContext';
import { CATEGORIES, calculateTotalSpent } from '../utils/helpers';
import { useCurrency } from '../hooks/useCurrency';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Analytics() {
  const { items } = useGroceryContext();
  const { formatCurrency } = useCurrency();

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Filter items for current month
  const currentMonthItems = items.filter(item => {
    const itemDate = new Date(item.createdAt);
    return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
  });

  // Calculate total spent
  const totalSpent = calculateTotalSpent(currentMonthItems);

  // Group by category
  const categoryData = CATEGORIES.map(cat => {
    const amount = calculateTotalSpent(currentMonthItems.filter(item => item.category === cat.id));
    return { name: cat.label, value: amount, id: cat.id };
  }).filter(data => data.value > 0);

  // Map our custom colors to hex for Recharts
  const COLORS = {
    grains: '#d97706',     // amber-600
    dairy: '#2563eb',      // blue-600
    vegetables: '#059669', // emerald-600
    snacks: '#e11d48',     // rose-600
    household: '#9333ea',  // purple-600
    personal: '#0d9488',   // teal-600
    others: '#475569',     // slate-600
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200 p-3 rounded-xl shadow-lg">
          <p className="font-semibold text-slate-800 mb-1">{payload[0].name}</p>
          <p className="text-primary-600 font-bold">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Analytics</h1>
        <p className="text-slate-500 mt-1">This month's spending breakdown.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 min-h-[400px] flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Spending by Category</h3>
          
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
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.id] || COLORS.others} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center text for donut chart */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm text-slate-500 font-medium">Total Spent</span>
                <span className="text-xl font-bold text-slate-800">{formatCurrency(totalSpent)}</span>
              </div>
            </div>
          ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="text-slate-500">No data available for this month.</p>
            </div>
          )}
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Top Categories</h3>
          
          {categoryData.length > 0 ? (
            <div className="space-y-4">
              {categoryData.sort((a, b) => b.value - a.value).map((cat) => {
                const percentage = ((cat.value / totalSpent) * 100).toFixed(0);
                return (
                  <div key={cat.id} className="p-4 rounded-xl bg-slate-50/50 border border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-slate-700">{cat.name}</span>
                      <span className="font-bold text-slate-800">{formatCurrency(cat.value)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ width: `${percentage}%`, backgroundColor: COLORS[cat.id] }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-500 w-8">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-8">Add items to see category breakdown.</p>
          )}
        </div>
      </div>
    </div>
  );
}
