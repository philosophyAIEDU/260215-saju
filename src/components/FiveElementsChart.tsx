import { useEffect, useState } from 'react';
import type { FiveElements } from '../types/saju';

interface FiveElementsChartProps {
  elements: FiveElements;
}

const ELEMENT_CONFIG = [
  { key: 'wood' as const, label: '목(木)', color: '#22c55e' },
  { key: 'fire' as const, label: '화(火)', color: '#ef4444' },
  { key: 'earth' as const, label: '토(土)', color: '#eab308' },
  { key: 'metal' as const, label: '금(金)', color: '#a1a1aa' },
  { key: 'water' as const, label: '수(水)', color: '#3b82f6' },
];

export default function FiveElementsChart({ elements }: FiveElementsChartProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-serif text-gold-400 mb-3">오행(五行) 분포</h4>
      {ELEMENT_CONFIG.map(({ key, label, color }) => {
        const value = elements[key];
        return (
          <div key={key} className="flex items-center gap-3">
            <span className="text-xs text-cream/70 w-14 text-right shrink-0">{label}</span>
            <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: animated ? `${value}%` : '0%',
                  backgroundColor: color,
                  opacity: 0.8,
                }}
              />
            </div>
            <span className="text-xs text-cream/50 w-8 shrink-0">{value}%</span>
          </div>
        );
      })}
    </div>
  );
}
