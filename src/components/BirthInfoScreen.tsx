import { useState, useMemo } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { BirthInfo } from '../types/saju';
import { BIRTH_TIMES, YEARS, MONTHS, getDaysInMonth } from '../constants/birthTimes';

interface BirthInfoScreenProps {
  onSubmit: (info: BirthInfo) => void;
  onBack: () => void;
}

export default function BirthInfoScreen({ onSubmit, onBack }: BirthInfoScreenProps) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [calendarType, setCalendarType] = useState<'solar' | 'lunar'>('solar');
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [birthTimeIndex, setBirthTimeIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const maxDay = useMemo(() => getDaysInMonth(year, month), [year, month]);
  const days = useMemo(() => Array.from({ length: maxDay }, (_, i) => i + 1), [maxDay]);

  // 일자가 월의 최대일을 초과하면 조정
  if (day > maxDay) {
    setDay(maxDay);
  }

  const handleSubmit = () => {
    if (day > maxDay) {
      setError(`${year}년 ${month}월은 ${maxDay}일까지입니다.`);
      return;
    }

    setError(null);
    onSubmit({
      name,
      gender,
      calendarType,
      year,
      month,
      day,
      birthTime: BIRTH_TIMES[birthTimeIndex].value,
    });
  };

  const selectClass =
    'bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-cream focus:outline-none focus:border-gold-500/50 transition-colors appearance-none cursor-pointer';

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 py-8 animate-fade-in">
      {/* 뒤로가기 */}
      <div className="w-full max-w-lg mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-cream/50 hover:text-cream/80 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>API 키 변경</span>
        </button>
      </div>

      {/* 타이틀 */}
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-2xl font-serif text-gold-400">생년월일시 입력</h2>
        <p className="text-sm text-cream/40">태어난 날의 정보를 입력해 주세요</p>
      </div>

      {/* 입력 폼 */}
      <div className="w-full max-w-lg bg-white/[0.03] backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6 space-y-5">
        {/* 이름 */}
        <div className="space-y-1.5">
          <label className="text-xs text-cream/50">이름 (선택)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold-500/50 transition-colors"
          />
        </div>

        {/* 성별 */}
        <div className="space-y-1.5">
          <label className="text-xs text-cream/50">성별</label>
          <div className="flex gap-3">
            {([['male', '남성 ♂'], ['female', '여성 ♀']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setGender(val)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  gender === val
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                    : 'bg-white/5 text-cream/50 border border-white/10 hover:border-white/20'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 달력 유형 */}
        <div className="space-y-1.5">
          <label className="text-xs text-cream/50">달력 유형</label>
          <div className="flex gap-3">
            {([['solar', '양력 (陽曆)'], ['lunar', '음력 (陰曆)']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setCalendarType(val)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  calendarType === val
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                    : 'bg-white/5 text-cream/50 border border-white/10 hover:border-white/20'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 생년월일 */}
        <div className="space-y-1.5">
          <label className="text-xs text-cream/50">생년월일</label>
          <div className="grid grid-cols-3 gap-3">
            <div className="relative">
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className={selectClass + ' w-full'}
                aria-label="출생 년도"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y} className="bg-darkbg-800 text-cream">
                    {y}년
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className={selectClass + ' w-full'}
                aria-label="출생 월"
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m} className="bg-darkbg-800 text-cream">
                    {m}월
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className={selectClass + ' w-full'}
                aria-label="출생 일"
              >
                {days.map((d) => (
                  <option key={d} value={d} className="bg-darkbg-800 text-cream">
                    {d}일
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 태어난 시간 */}
        <div className="space-y-1.5">
          <label className="text-xs text-cream/50">태어난 시간 (시진)</label>
          <select
            value={birthTimeIndex}
            onChange={(e) => setBirthTimeIndex(Number(e.target.value))}
            className={selectClass + ' w-full'}
            aria-label="태어난 시간"
          >
            {BIRTH_TIMES.map((bt, idx) => (
              <option key={idx} value={idx} className="bg-darkbg-800 text-cream">
                {bt.value === null
                  ? `${bt.label} (${bt.timeRange})`
                  : `${bt.label} (${bt.hanja}) ${bt.timeRange}`}
              </option>
            ))}
          </select>
        </div>

        {/* 에러 */}
        {error && (
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-darkbg-900 font-semibold text-sm hover:from-gold-500 hover:to-gold-400 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Sparkles size={16} />
          운세 보기
        </button>
      </div>
    </div>
  );
}
