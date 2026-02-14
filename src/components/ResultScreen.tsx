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
      {/* 사주 요약 카드 */}
      <SajuSummaryCard saju={result.saju} birthInfo={birthInfo} />

      {/* 운세 카테고리 카드 */}
      <div className="space-y-4">
        {result.categories.map((cat, idx) => (
          <FortuneCard key={cat.id} category={cat} index={idx} />
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-cream/70 text-sm hover:bg-white/10 transition-colors"
        >
          <RotateCcw size={15} />
          다시 보기
        </button>
        <button
          onClick={onChangeApiKey}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-cream/70 text-sm hover:bg-white/10 transition-colors"
        >
          <KeyRound size={15} />
          API 키 변경
        </button>
      </div>

      {/* 면책 조항 */}
      <p className="text-center text-[11px] text-cream/25 pt-4 pb-8 leading-relaxed">
        본 운세는 AI 기반 엔터테인먼트 콘텐츠이며,<br />
        전문 역학 상담을 대체하지 않습니다.
      </p>
    </div>
  );
}
