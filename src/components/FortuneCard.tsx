import { useState } from 'react';
import { ChevronDown, ChevronUp, Compass, Palette, Hash } from 'lucide-react';
import type { FortuneCategory } from '../types/saju';
import ScoreCircle from './ScoreCircle';
import MonthlyFortune from './MonthlyFortune';

interface FortuneCardProps {
  category: FortuneCategory;
  index: number;
}

export default function FortuneCard({ category, index }: FortuneCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isMonthly = category.id === 'monthly';

  return (
    <div
      className="bg-white/70 backdrop-blur-sm border border-primary-200 rounded-2xl overflow-hidden animate-fade-in-up shadow-sm"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-center gap-4 hover:bg-white/50 transition-colors text-left"
        aria-expanded={expanded}
        aria-label={`${category.title} 운세 상세 보기`}
      >
        <span className="text-2xl">{category.emoji}</span>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-serif text-ink-800">{category.title}</h3>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {category.keywords.map((kw) => (
              <span
                key={kw}
                className="text-[11px] px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 border border-primary-200"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="relative shrink-0">
          <ScoreCircle score={category.score} size={64} />
        </div>

        <span className="text-ink-400 shrink-0">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          expanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 space-y-4">
          <div className="h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />

          <div className="text-sm text-ink-700 leading-relaxed whitespace-pre-line">
            {category.detail}
          </div>

          {isMonthly && category.monthly && (
            <MonthlyFortune monthly={category.monthly} />
          )}

          {!isMonthly && (category.luckyColor || category.luckyNumber || category.luckyDirection) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {category.luckyColor && (
                <div className="flex items-center gap-1.5 text-xs text-ink-500 bg-surface-100 rounded-lg px-3 py-1.5 border border-surface-300">
                  <Palette size={13} className="text-primary-500" />
                  <span>행운색: <span className="text-ink-800">{category.luckyColor}</span></span>
                </div>
              )}
              {category.luckyNumber !== undefined && (
                <div className="flex items-center gap-1.5 text-xs text-ink-500 bg-surface-100 rounded-lg px-3 py-1.5 border border-surface-300">
                  <Hash size={13} className="text-primary-500" />
                  <span>행운수: <span className="text-ink-800">{category.luckyNumber}</span></span>
                </div>
              )}
              {category.luckyDirection && (
                <div className="flex items-center gap-1.5 text-xs text-ink-500 bg-surface-100 rounded-lg px-3 py-1.5 border border-surface-300">
                  <Compass size={13} className="text-primary-500" />
                  <span>행운방위: <span className="text-ink-800">{category.luckyDirection}</span></span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
