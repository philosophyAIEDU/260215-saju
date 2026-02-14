import { RotateCcw, KeyRound } from 'lucide-react';
import type { SajuResult, BirthInfo } from '../types/saju';
import SajuSummaryCard from './SajuSummaryCard';
import FortuneCard from './FortuneCard';

interface ResultScreenProps {
  result: SajuResult;
  birthInfo: BirthInfo;
  onReset: () => void;
  onChangeApiKey: () => void;
}

export default function ResultScreen({ result, birthInfo, onReset, onChangeApiKey }: ResultScreenProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <SajuSummaryCard saju={result.saju} birthInfo={birthInfo} />

      <div className="space-y-4">
        {result.categories.map((cat, idx) => (
          <FortuneCard key={cat.id} category={cat} index={idx} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/70 border border-surface-300 text-ink-600 text-sm hover:bg-white transition-colors shadow-sm"
        >
          <RotateCcw size={15} />
          다시 보기
        </button>
        <button
          onClick={onChangeApiKey}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/70 border border-surface-300 text-ink-600 text-sm hover:bg-white transition-colors shadow-sm"
        >
          <KeyRound size={15} />
          API 키 변경
        </button>
      </div>

      <p className="text-center text-[11px] text-ink-400 pt-4 pb-8 leading-relaxed">
        본 운세는 AI 기반 엔터테인먼트 콘텐츠이며,<br />
        전문 역학 상담을 대체하지 않습니다.
      </p>
    </div>
  );
}
