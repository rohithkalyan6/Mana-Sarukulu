import clsx from 'clsx';

export default function StatCard({ title, amount, icon: Icon, theme, subtext, subtextColor }) {
  // Themes: 'green', 'blue', 'orange', 'purple'
  const themes = {
    green: {
      bg: 'bg-[#F0FDF4]',
      text: 'text-[#16A34A]',
      border: 'border-[#DCFCE7]',
      cardBorder: 'border-[#E2E8F0] hover:border-[#16A34A]'
    },
    blue: {
      bg: 'bg-[#EFF6FF]',
      text: 'text-[#3B82F6]',
      border: 'border-[#DBEAFE]',
      cardBorder: 'border-[#E2E8F0] hover:border-[#3B82F6]'
    },
    orange: {
      bg: 'bg-[#FFF7ED]',
      text: 'text-[#EA580C]',
      border: 'border-[#FFEDD5]',
      cardBorder: 'border-[#E2E8F0] hover:border-[#EA580C]'
    },
    purple: {
      bg: 'bg-[#FAF5FF]',
      text: 'text-[#9333EA]',
      border: 'border-[#F3E8FF]',
      cardBorder: 'border-[#E2E8F0] hover:border-[#9333EA]'
    }
  };

  const selectedTheme = themes[theme] || themes.green;

  return (
    <div className={clsx("glass-card p-5 md:p-6 transition-colors duration-200", selectedTheme.cardBorder)}>
      <div className="flex items-center gap-4">
        <div className={clsx("w-14 h-14 rounded-[14px] flex items-center justify-center border", selectedTheme.bg, selectedTheme.text, selectedTheme.border)}>
          <Icon className="w-6 h-6" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-slate-800 mb-1">{title}</p>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight leading-none mb-1.5">
            {amount}
          </h2>
          <p className={clsx("text-xs font-semibold", subtextColor || selectedTheme.text)}>
            {subtext}
          </p>
        </div>
      </div>
    </div>
  );
}
