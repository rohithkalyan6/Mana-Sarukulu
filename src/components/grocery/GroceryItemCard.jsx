import { Check, Trash2, Edit2 } from 'lucide-react';
import { useGroceryContext } from '../../context/GroceryContext';
import { useCurrency } from '../../hooks/useCurrency';
import { getCategoryColor, CATEGORIES } from '../../utils/helpers';
import clsx from 'clsx';

export default function GroceryItemCard({ item }) {
  const { togglePurchased, deleteGroceryItem } = useGroceryContext();
  const { formatCurrency } = useCurrency();

  const totalItemPrice = item.price * item.quantity;
  const categoryLabel = CATEGORIES.find(c => c.id === item.category)?.label || item.category;

  return (
    <div className={clsx(
      "glass-card p-4 transition-all duration-300 relative overflow-hidden group",
      item.purchased ? "opacity-75" : ""
    )}>
      {/* Accent border left */}
      <div className={clsx(
        "absolute left-0 top-0 bottom-0 w-1",
        item.purchased ? "bg-emerald-500" : "bg-primary-400"
      )} />

      <div className="flex items-start justify-between ml-2">
        <div className="flex items-start gap-3">
          <button 
            onClick={() => togglePurchased(item.id)}
            className={clsx(
              "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-0.5",
              item.purchased 
                ? "bg-emerald-500 border-emerald-500 text-white" 
                : "border-slate-300 text-transparent hover:border-primary-500 hover:text-primary-500/30"
            )}
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          
          <div>
            <h4 className={clsx(
              "font-semibold text-slate-800",
              item.purchased && "line-through text-slate-500"
            )}>
              {item.itemName}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-medium text-slate-500">
                {item.quantity} {item.unit || 'pcs'} x {formatCurrency(item.price)}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className={clsx("text-[10px] px-2 py-0.5 rounded-full font-medium", getCategoryColor(item.category))}>
                {categoryLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className={clsx(
            "font-bold",
            item.purchased ? "text-slate-500" : "text-slate-800"
          )}>
            {formatCurrency(totalItemPrice)}
          </span>
          <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => deleteGroceryItem(item.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
