import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListTodo, History, LayoutGrid, BarChart2, Settings, ShoppingBasket } from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/list', label: 'Grocery List', icon: ListTodo },
  { path: '/history', label: 'Shopping History', icon: History },
  { path: '/categories', label: 'Categories', icon: LayoutGrid },
  { path: '/reports', label: 'Reports', icon: BarChart2 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-[#FAFBFC] border-r border-[#E2E8F0] z-20">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="bg-[#16A34A] p-2 rounded-xl">
          <ShoppingBasket className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 leading-tight">ManaSarukulu</h1>
          <p className="text-[11px] text-slate-500 font-medium">మన ఇంటి డిజిటల్ సరుకుల పుస్తకం</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'nav-item',
                isActive && 'active'
              )
            }
          >
            <item.icon className={clsx("w-5 h-5", window.location.pathname === item.path ? "text-[#16A34A]" : "text-slate-400")} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 mt-auto mb-4 mx-4">
        <div className="bg-[#F0FDF4] rounded-[16px] p-5 text-center border border-[#DCFCE7] shadow-sm">
          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-b from-[#FEF08A] to-[#FBBF24] rounded-full flex items-end justify-center pt-2 overflow-hidden border-2 border-white shadow-sm">
             <ShoppingBasket className="w-10 h-10 text-[#B45309] mb-1" />
          </div>
          <p className="text-[13px] font-bold text-slate-800 leading-snug">Plan Smart, Spend Less, <br/> Live Better.</p>
        </div>
      </div>
    </aside>
  );
}
