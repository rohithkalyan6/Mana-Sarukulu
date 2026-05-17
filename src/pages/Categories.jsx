import { useGroceryContext } from '../context/GroceryContext';
import { useCurrency } from '../hooks/useCurrency';
import { CATEGORIES, getCategoryDot } from '../utils/helpers';
import { LayoutGrid } from 'lucide-react';

export default function Categories() {
  const { items } = useGroceryContext();
  const { formatCurrency } = useCurrency();

  const categoryTotals = CATEGORIES.map(cat => {
    const total = items
      .filter(item => item.category === cat.id)
      .reduce((acc, item) => acc + (item.price * (Number.isNaN(Number(item.quantity)) ? 1 : Number(item.quantity) || 1)), 0);
    const count = items.filter(item => item.category === cat.id).length;
    return { ...cat, total, count };
  });

  return (
    <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto pt-2 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Categories</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage and view category spending.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryTotals.map(cat => (
          <div key={cat.id} className="glass-card p-6 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm" style={{ backgroundColor: `${cat.dot}10`, borderColor: `${cat.dot}30` }}>
                   <LayoutGrid className="w-5 h-5" style={{ color: cat.dot }} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{cat.label}</h3>
                  <p className="text-xs font-semibold text-slate-500">{cat.count} items</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold mb-1">Total Spending</p>
              <p className="text-2xl font-extrabold text-slate-800">{formatCurrency(cat.total)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
