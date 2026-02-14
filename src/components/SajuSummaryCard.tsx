import type { SajuInfo, BirthInfo } from '../types/saju';
import FiveElementsChart from './FiveElementsChart';

interface SajuSummaryCardProps {
  saju: SajuInfo;
  birthInfo: BirthInfo;
}

function PillarDisplay({ label, hanja, stem, branch, korean }: {
  label: string;
  hanja: string;
  stem: string;
  branch: string;
  korean: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] text-cream/40">{label}</span>
      <span className="text-[10px] text-gold-400/60">{hanja}</span>
      <div className="flex flex-col items-center bg-white/5 rounded-lg px-3 py-2 border border-gold-500/20">
        <span className="text-xl font-serif text-gold-400">{stem}</span>
        <div className="w-6 h-px bg-gold-500/30 my-1" />
        <span className="text-xl font-serif text-cream">{branch}</span>
      </div>
      <span className="text-xs text-cream/60">{korean}</span>
    </div>
  );
}

export default function SajuSummaryCard({ saju, birthInfo }: SajuSummaryCardProps) {
  const genderText = birthInfo.gender === 'male' ? '남' : '여';
  const calendarText = birthInfo.calendarType === 'solar' ? '양력' : '음력';
  const nameDisplay = birthInfo.name.trim() || '미입력';

  return (
    <div className="bg-white/[0.03] backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6 space-y-6 animate-fade-in">
      {/* 사용자 정보 */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif text-gold-400">
          {nameDisplay}님의 사주팔자
        </h2>
        <p className="text-sm text-cream/50">
          {calendarText} {birthInfo.year}년 {birthInfo.month}월 {birthInfo.day}일
          {birthInfo.birthTime ? ` ${birthInfo.birthTime}` : ' (시간 미상)'}
          {' · '}{genderText}
        </p>
      </div>

      {/* 사주 기둥 */}
      <div className="flex justify-center gap-4 sm:gap-6">
        {saju.timePillar && (
          <PillarDisplay
            label="시주"
            hanja="時柱"
            stem={saju.timePillar.heavenlyStem}
            branch={saju.timePillar.earthlyBranch}
            korean={saju.timePillar.korean}
          />
        )}
        <PillarDisplay
          label="일주"
          hanja="日柱"
          stem={saju.dayPillar.heavenlyStem}
          branch={saju.dayPillar.earthlyBranch}
          korean={saju.dayPillar.korean}
        />
        <PillarDisplay
          label="월주"
          hanja="月柱"
          stem={saju.monthPillar.heavenlyStem}
          branch={saju.monthPillar.earthlyBranch}
          korean={saju.monthPillar.korean}
        />
        <PillarDisplay
          label="년주"
          hanja="年柱"
          stem={saju.yearPillar.heavenlyStem}
          branch={saju.yearPillar.earthlyBranch}
          korean={saju.yearPillar.korean}
        />
      </div>

      {/* 일간, 오행 강약 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        <div className="bg-white/5 rounded-lg p-3">
          <span className="text-[10px] text-cream/40 block">일간(日干)</span>
          <span className="text-lg font-serif text-gold-400">{saju.dayMaster}</span>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <span className="text-[10px] text-cream/40 block">강한 오행</span>
          <span className="text-lg font-serif text-green-400">{saju.dominantElement}</span>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <span className="text-[10px] text-cream/40 block">약한 오행</span>
          <span className="text-lg font-serif text-red-400">{saju.weakElement}</span>
        </div>
      </div>

      {/* 성격 요약 */}
      <div className="bg-white/5 rounded-lg p-4">
        <span className="text-xs text-gold-400/70 block mb-2">성격 분석</span>
        <p className="text-sm text-cream/80 leading-relaxed">{saju.personality}</p>
      </div>

      {/* 오행 차트 */}
      <FiveElementsChart elements={saju.fiveElements} />
    </div>
  );
}
