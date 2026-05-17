import { useGroceryContext } from '../context/GroceryContext';
import { useCurrency } from '../hooks/useCurrency';
import { CalendarDays, ShoppingBag } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function History() {
  const { items } = useGroceryContext();
  const { formatCurrency } = useCurrency();

  // Group items by month/year (e.g. "May 2026")
  const groupedData = items.reduce((acc, item) => {
    const monthYear = item.month && item.year 
      ? `${item.month} ${item.year}` 
      : format(new Date(item.createdAt), 'MMMM yyyy');
    
    if (!acc[monthYear]) {
      acc[monthYear] = { items: [], total: 0 };
    }
    acc[monthYear].items.push(item);
    acc[monthYear].total += (item.price * (Number.isNaN(Number(item.quantity)) ? 1 : Number(item.quantity) || 1));
    return acc;
  }, {});

  const sortedMonths = Object.keys(groupedData); 

  return (
    <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto pt-2 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Shopping History</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Review your past grocery expenses.</p>
        </div>
      </div>

      {sortedMonths.length === 0 ? (
        <div className="glass-card p-16 flex flex-col items-center justify-center text-center mt-4 border-dashed border-2 border-[#E2E8F0]">
          <div className="bg-[#F0FDF4] p-5 rounded-full mb-4 border border-[#DCFCE7] shadow-sm">
            <ShoppingBag className="w-12 h-12 text-[#16A34A]" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No History Yet</h3>
          <p className="text-slate-500 font-medium max-w-sm">
            Your shopping history will appear here once you start adding items to your grocery list.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedMonths.map((monthStr) => {
            const data = groupedData[monthStr];
            return (
              <div key={monthStr} className="glass-card overflow-hidden">
                <div className="bg-[#FAFBFC] border-b border-[#E2E8F0] p-4 md:px-6 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2.5 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#E2E8F0]">
                      <CalendarDays className="w-5 h-5 text-[#16A34A]" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-[17px]">{monthStr}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Total Spent</p>
                    <p className="font-extrabold text-slate-800 text-lg">{formatCurrency(data.total)}</p>
                  </div>
                </div>
                
                <div className="p-4 md:p-6">
                  <p className="text-sm text-slate-500 font-bold mb-4">
                    {data.items.length} items purchased
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {data.items.slice(0, 6).map(item => (
                       <div key={item.id} className="flex justify-between items-center p-3 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#16A34A]/30 transition-colors shadow-sm">
                         <div className="truncate pr-4 flex flex-col justify-center">
                           <p className="font-bold text-[15px] text-slate-800 truncate leading-tight">{item.itemName}</p>
                           <p className="text-xs font-semibold text-slate-500 mt-0.5">{format(parseISO(item.createdAt), 'MMM d')}</p>
                         </div>
                         <span className="font-bold text-slate-800 whitespace-nowrap bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                           {formatCurrency(item.price * (Number.isNaN(Number(item.quantity)) ? 1 : Number(item.quantity) || 1))}
                         </span>
                       </div>
                     ))}
                  </div>
                  {data.items.length > 6 && (
                    <div className="mt-5 text-center">
                      <span className="text-xs font-bold text-[#16A34A] bg-[#F0FDF4] px-4 py-2 rounded-lg border border-[#DCFCE7] inline-block hover:bg-[#DCFCE7] transition-colors cursor-pointer">
                        + {data.items.length - 6} more items
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
