import { NavLink } from 'react-router-dom';
import { Home, ListTodo, History, LayoutGrid, Settings } from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/categories', label: 'Categories', icon: LayoutGrid },
  { path: '/history', label: 'History', icon: History },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 pb-safe z-30 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around px-2 py-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center gap-1 p-2 rounded-xl transition-all',
                isActive ? 'text-primary-600' : 'text-slate-500 hover:text-slate-800'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={clsx(
                  "p-1.5 rounded-xl transition-all duration-300",
                  isActive ? "bg-primary-100/50 scale-110" : ""
                )}>
                  <item.icon className={clsx("w-5 h-5", isActive && "fill-primary-100/30")} />
                </div>
                <span className={clsx("text-[10px] font-medium", isActive && "font-semibold")}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
