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
      className="bg-white/[0.03] backdrop-blur-sm border border-gold-500/15 rounded-2xl overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
    >
      {/* 헤더 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-center gap-4 hover:bg-white/[0.02] transition-colors text-left"
        aria-expanded={expanded}
        aria-label={`${category.title} 운세 상세 보기`}
      >
        <span className="text-2xl">{category.emoji}</span>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-serif text-cream">{category.title}</h3>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {category.keywords.map((kw) => (
              <span
                key={kw}
                className="text-[11px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="relative shrink-0">
          <ScoreCircle score={category.score} size={64} />
        </div>

        <span className="text-cream/40 shrink-0">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {/* 상세 내용 */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          expanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 space-y-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

          {/* 상세 풀이 */}
          <div className="text-sm text-cream/80 leading-relaxed whitespace-pre-line">
            {category.detail}
          </div>

          {/* 월별운세 */}
          {isMonthly && category.monthly && (
            <MonthlyFortune monthly={category.monthly} />
          )}

          {/* 행운 요소 */}
          {!isMonthly && (category.luckyColor || category.luckyNumber || category.luckyDirection) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {category.luckyColor && (
                <div className="flex items-center gap-1.5 text-xs text-cream/60 bg-white/5 rounded-lg px-3 py-1.5">
                  <Palette size={13} className="text-gold-400" />
                  <span>행운색: <span className="text-cream/90">{category.luckyColor}</span></span>
                </div>
              )}
              {category.luckyNumber !== undefined && (
                <div className="flex items-center gap-1.5 text-xs text-cream/60 bg-white/5 rounded-lg px-3 py-1.5">
                  <Hash size={13} className="text-gold-400" />
                  <span>행운수: <span className="text-cream/90">{category.luckyNumber}</span></span>
                </div>
              )}
              {category.luckyDirection && (
                <div className="flex items-center gap-1.5 text-xs text-cream/60 bg-white/5 rounded-lg px-3 py-1.5">
                  <Compass size={13} className="text-gold-400" />
                  <span>행운방위: <span className="text-cream/90">{category.luckyDirection}</span></span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
