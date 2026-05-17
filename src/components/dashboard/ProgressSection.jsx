import clsx from 'clsx';
import { ShoppingBasket } from 'lucide-react';

export default function ProgressSection({ spent, total }) {
  const percentage = total > 0 ? Math.min((spent / total) * 100, 100) : 0;
  
  return (
    <div className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
      <div className="flex-1 w-full z-10">
        <h3 className="text-[15px] font-bold text-slate-800 mb-4">Monthly Progress</h3>
        
        <div className="flex items-center gap-4">
          <div className="h-3.5 flex-1 bg-[#F1F5F9] rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-[#16A34A] rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-[#16A34A] font-bold text-[15px] min-w-[3rem]">{percentage.toFixed(1)}%</span>
        </div>
        
        <p className="text-xs font-medium text-[#64748B] mt-2">
          You are doing great! Keep tracking your expenses.
        </p>
      </div>

      {/* Placeholder basket illustration */}
      <div className="hidden md:flex flex-col items-center justify-center relative w-32 h-20 z-0">
         <div className="w-16 h-12 bg-gradient-to-r from-amber-400 to-amber-500 rounded-b-xl relative shadow-sm border border-amber-600/20">
           {/* Basket handle */}
           <div className="absolute -top-4 left-2 right-2 h-6 border-4 border-amber-500 rounded-t-xl border-b-0" />
           {/* Veggies popping out */}
           <div className="absolute -top-3 left-1 w-4 h-4 bg-emerald-500 rounded-full border border-white" />
           <div className="absolute -top-5 left-4 w-4 h-4 bg-rose-500 rounded-full border border-white" />
           <div className="absolute -top-2 right-2 w-5 h-5 bg-orange-400 rounded-full border border-white" />
         </div>
      </div>
    </div>
  );
}
