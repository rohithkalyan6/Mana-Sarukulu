import { useState } from 'react';
import { useGroceryContext } from '../context/GroceryContext';
import GroceryForm from '../components/grocery/GroceryForm';
import GroceryItemCard from '../components/grocery/GroceryItemCard';
import { CATEGORIES } from '../utils/helpers';
import { Filter, Search, Plus } from 'lucide-react';
import clsx from 'clsx';

export default function GroceryList() {
  const { items } = useGroceryContext();
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'purchased'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showMobileForm, setShowMobileForm] = useState(false);

  const filteredItems = items.filter(item => {
    if (filter === 'pending' && item.purchased) return false;
    if (filter === 'purchased' && !item.purchased) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 md:space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Grocery List</h1>
          <p className="text-slate-500 mt-1">Manage your shopping items.</p>
        </div>
        <button 
          onClick={() => setShowMobileForm(true)}
          className="md:hidden btn-primary flex items-center justify-center gap-2 px-5 py-3"
        >
          <Plus className="w-5 h-5" />
          <span>Add Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col - List */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-200">
              {['all', 'pending', 'purchased'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={clsx(
                    "flex-1 px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors",
                    filter === status 
                      ? "bg-primary-50 text-primary-700" 
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white border border-slate-200 text-slate-600 text-sm rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* List items */}
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-500">No items match your criteria.</p>
              </div>
            ) : (
              filteredItems.map(item => (
                <GroceryItemCard key={item.id} item={item} />
              ))
            )}
          </div>
        </div>

        {/* Right Col - Form */}
        <div className="hidden lg:block lg:col-span-4 order-1 lg:order-2">
          <div className="sticky top-8">
            <GroceryForm />
          </div>
        </div>
      </div>

      {/* Mobile Form Modal */}
      {showMobileForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 md:hidden">
          <div className="w-full max-w-md animate-in slide-in-from-bottom duration-300">
            <GroceryForm onClose={() => setShowMobileForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
