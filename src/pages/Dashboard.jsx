import { useState } from 'react';
import { Plus, Wallet, ShoppingCart, PieChart, ShoppingBag } from 'lucide-react';
import { useGroceryContext } from '../context/GroceryContext';
import { useCurrency } from '../hooks/useCurrency';
import StatCard from '../components/dashboard/StatCard';
import ProgressSection from '../components/dashboard/ProgressSection';
import InlineGroceryForm from '../components/grocery/InlineGroceryForm';
import DashboardGroceryList from '../components/grocery/DashboardGroceryList';
import DashboardAnalytics from '../components/dashboard/DashboardAnalytics';
import RecentShopping from '../components/dashboard/RecentShopping';

export default function Dashboard() {
  const { items, budget } = useGroceryContext();
  const { formatCurrency } = useCurrency();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const now = new Date();
  const defaultMonthYear = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  
  const [selectedMonthYear, setSelectedMonthYear] = useState(defaultMonthYear);

  // Generate dynamic unique months from data, always including current month
  const availableMonths = [defaultMonthYear];
  items.forEach(item => {
    const itemDate = new Date(item.createdAt);
    const itemStr = `${monthNames[itemDate.getMonth()]} ${itemDate.getFullYear()}`;
    if (!availableMonths.includes(itemStr)) {
      availableMonths.push(itemStr);
    }
  });

  const currentMonthItems = items.filter(item => {
    const itemDate = new Date(item.createdAt);
    const itemStr = `${monthNames[itemDate.getMonth()]} ${itemDate.getFullYear()}`;
    return itemStr === selectedMonthYear;
  });

  const spent = currentMonthItems.reduce((acc, item) => acc + (item.price * (Number.isNaN(Number(item.quantity)) ? 1 : Number(item.quantity) || 1)), 0);
  const remaining = Math.max(budget - spent, 0);
  const purchasedCount = currentMonthItems.filter(i => i.purchased).length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pt-2 pb-10">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            Hello, Family! <span>👋</span>
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Plan your groceries and track expenses easily.</p>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={selectedMonthYear}
            onChange={(e) => setSelectedMonthYear(e.target.value)}
            className="bg-white border border-[#E2E8F0] text-sm font-bold text-slate-700 rounded-lg px-4 py-2 outline-none shadow-sm cursor-pointer appearance-none pr-8 relative"
            style={{ backgroundImage: "url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23475569%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right .7rem top 50%", backgroundSize: ".65rem auto" }}
          >
            {availableMonths.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <button 
            onClick={() => document.getElementById('add-item-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="btn-primary gap-1.5 px-5"
          >
            <Plus className="w-4 h-4" strokeWidth={3} />
            Add Item
          </button>
        </div>
      </div>

      {/* Top Row: 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Monthly Budget" 
          amount={formatCurrency(budget)} 
          icon={Wallet}
          theme="green"
          subtext="Edit Budget"
        />
        <StatCard 
          title="Total Spent" 
          amount={formatCurrency(spent)} 
          icon={ShoppingCart}
          theme="blue"
          subtext={budget > 0 ? `${((spent / budget) * 100).toFixed(1)}% of budget` : "No budget set"}
        />
        <StatCard 
          title="Remaining Budget" 
          amount={formatCurrency(remaining)} 
          icon={PieChart}
          theme="orange"
          subtext={budget > 0 ? `${((remaining / budget) * 100).toFixed(1)}% left` : "No budget set"}
        />
        <StatCard 
          title="Total Items" 
          amount={currentMonthItems.length.toString()} 
          icon={ShoppingBag}
          theme="purple"
          subtext={`${purchasedCount} Purchased`}
        />
      </div>

      {/* Second Row: Progress Bar */}
      <ProgressSection spent={spent} total={budget} />

      {/* Third Row: Inline Form */}
      <InlineGroceryForm />

      {/* Fourth Row: Grocery List Table */}
      <DashboardGroceryList passedItems={currentMonthItems} />

      {/* Fifth Row: Split Analytics & Recent Shopping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-[280px]">
        <RecentShopping items={currentMonthItems} />
        <DashboardAnalytics currentMonthItems={currentMonthItems} totalSpent={spent} />
      </div>
    </div>
  );
}
