import { Wallet, TrendingDown, IndianRupee } from 'lucide-react';
import { useCurrency } from '../../hooks/useCurrency';
import ProgressBar from './ProgressBar';
import { useGroceryContext } from '../../context/GroceryContext';
import { calculateTotalSpent } from '../../utils/helpers';

export default function BudgetCard() {
  const { budget, items } = useGroceryContext();
  const { formatCurrency } = useCurrency();
  
  // Calculate total spent for the current month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const spent = calculateTotalSpent(items.filter(item => {
    const itemDate = new Date(item.createdAt);
    return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
  }));

  const remaining = Math.max(budget - spent, 0);

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-slate-500 font-medium mb-1">Total Budget</p>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            {formatCurrency(budget)}
          </h2>
        </div>
        <div className="bg-primary-100 p-3 rounded-2xl">
          <Wallet className="w-6 h-6 text-primary-600" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-rose-600 mb-2">
            <TrendingDown className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Spent</span>
          </div>
          <p className="text-xl font-bold text-slate-800">{formatCurrency(spent)}</p>
        </div>
        
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <IndianRupee className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Remaining</span>
          </div>
          <p className="text-xl font-bold text-slate-800">{formatCurrency(remaining)}</p>
        </div>
      </div>

      <ProgressBar spent={spent} total={budget} />
    </div>
  );
}
