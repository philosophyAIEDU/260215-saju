import type { MonthlyFortune as MonthlyFortuneType } from '../types/saju';

interface MonthlyFortuneProps {
  monthly: MonthlyFortuneType[];
}

export default function MonthlyFortune({ monthly }: MonthlyFortuneProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {monthly.map((m) => (
        <div
          key={m.month}
          className="bg-surface-50 rounded-lg p-3 border border-surface-300 hover:border-primary-300 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-serif text-primary-600">{m.month}월</span>
            <span className="text-sm tracking-wider">{m.rating}</span>
          </div>
          <p className="text-xs text-ink-600 leading-relaxed">{m.summary}</p>
        </div>
      ))}
    </div>
  );
}
