import { useState } from 'react';
import { useGroceryContext } from '../context/GroceryContext';
import { useSettingsContext } from '../context/SettingsContext';
import { useCurrency } from '../hooks/useCurrency';
import { Wallet, Trash2, Download, Moon, Settings as SettingsIcon, AlertTriangle, RefreshCw } from 'lucide-react';

export default function Settings() {
  const { budget, setBudget, items, clearAllData, clearCurrentMonthData, resetApplication, loadStarterData } = useGroceryContext();
  const { currency, setCurrency, darkMode, setDarkMode } = useSettingsContext();
  const { formatCurrency } = useCurrency();
  
  const [budgetInput, setBudgetInput] = useState(budget);

  const handleSaveBudget = (e) => {
    e.preventDefault();
    setBudget(Number(budgetInput));
    alert('Budget updated successfully!');
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(items, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `manasarukulu_data_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto pt-2 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
            <SettingsIcon className="w-6 h-6 text-[#16A34A]" /> Settings
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage your app preferences and data.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preferences */}
        <div className="glass-card p-6 h-fit">
          <h3 className="text-[15px] font-bold text-slate-800 mb-5 border-b border-[#E2E8F0] pb-3">Preferences</h3>
          
          <form onSubmit={handleSaveBudget} className="space-y-5">
            <div>
              <label className="label-text">Monthly Budget</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  className="input-field py-2.5 flex-1"
                  min="0"
                />
                <button type="submit" className="btn-primary py-2.5 px-4 whitespace-nowrap">Save</button>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 font-medium">Current: {formatCurrency(budget)}</p>
            </div>

            <div>
              <label className="label-text">Currency Symbol</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="input-field py-2.5 bg-white appearance-none cursor-pointer"
              >
                <option value="INR">₹ Indian Rupee (INR)</option>
                <option value="USD">$ US Dollar (USD)</option>
                <option value="EUR">€ Euro (EUR)</option>
                <option value="GBP">£ British Pound (GBP)</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-bold text-sm text-slate-800">Dark Mode</p>
                <p className="text-xs text-slate-500 font-medium">Toggle application theme</p>
              </div>
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${darkMode ? 'bg-[#16A34A]' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </form>
        </div>

        {/* Data Management */}
        <div className="glass-card p-6 h-fit border-[#FEE2E2]">
          <h3 className="text-[15px] font-bold text-rose-600 mb-5 border-b border-rose-100 pb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Data Management
          </h3>
          
          <div className="space-y-4">
            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 transition-colors group"
            >
              <div className="text-left">
                <p className="font-bold text-sm text-slate-800">Export Grocery Data</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Download your items as JSON</p>
              </div>
              <div className="bg-[#EFF6FF] p-2 rounded-lg group-hover:bg-[#DBEAFE] transition-colors border border-[#DBEAFE]">
                <Download className="w-4 h-4 text-[#3B82F6]" />
              </div>
            </button>

            <button
              onClick={clearCurrentMonthData}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 transition-colors group"
            >
              <div className="text-left">
                <p className="font-bold text-sm text-slate-800">Clear Current Month</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Delete only this month's data</p>
              </div>
              <div className="bg-[#FFF7ED] p-2 rounded-lg group-hover:bg-[#FFEDD5] transition-colors border border-[#FFEDD5]">
                <Trash2 className="w-4 h-4 text-[#EA580C]" />
              </div>
            </button>

            <button
              onClick={clearAllData}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-colors group"
            >
              <div className="text-left">
                <p className="font-bold text-sm text-rose-700">Clear All History</p>
                <p className="text-xs text-rose-500 font-medium mt-0.5">Delete all grocery items permanently</p>
              </div>
              <div className="bg-rose-200 p-2 rounded-lg group-hover:bg-rose-300 transition-colors">
                <Trash2 className="w-4 h-4 text-rose-700" />
              </div>
            </button>

            <button
              onClick={loadStarterData}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] hover:bg-slate-50 transition-colors group mt-2"
            >
              <div className="text-left">
                <p className="font-bold text-sm text-slate-800">Restore Sample Data</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Load demo grocery history</p>
              </div>
              <div className="bg-[#F1F5F9] p-2 rounded-lg group-hover:bg-[#E2E8F0] transition-colors border border-[#E2E8F0]">
                <RefreshCw className="w-4 h-4 text-slate-600" />
              </div>
            </button>
            
            <button
              onClick={resetApplication}
              className="w-full mt-4 py-2.5 text-center text-xs font-bold text-slate-400 hover:text-rose-600 transition-colors uppercase tracking-wider"
            >
              Reset Entire Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
