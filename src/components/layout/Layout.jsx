import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { ShoppingBasket } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-[#E2E8F0] sticky top-0 z-20 px-4 py-4 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#16A34A] p-1.5 rounded-lg">
            <ShoppingBasket className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-800 leading-tight">
              ManaSarukulu
            </span>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5">
              మన ఇంటి డిజిటల్ సరుకుల పుస్తకం
            </span>
          </div>
        </div>
      </header>

      <main className="md:pl-64 pb-20 md:pb-8 min-h-screen w-full bg-white">
        <div className="px-4 md:px-6 lg:px-8 max-w-[1600px] mx-auto animate-in fade-in duration-300">
          {children}
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
