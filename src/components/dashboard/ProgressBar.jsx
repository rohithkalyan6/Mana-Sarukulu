import clsx from 'clsx';

export default function ProgressBar({ spent, total }) {
  const percentage = total > 0 ? Math.min((spent / total) * 100, 100) : 0;
  
  let colorClass = 'bg-primary-500';
  if (percentage >= 90) colorClass = 'bg-rose-500';
  else if (percentage >= 75) colorClass = 'bg-amber-500';

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-medium mb-2">
        <span className="text-slate-500">Monthly Usage</span>
        <span className={clsx(
          percentage >= 90 ? 'text-rose-600' : 'text-primary-600'
        )}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={clsx("h-full rounded-full transition-all duration-1000 ease-out", colorClass)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
