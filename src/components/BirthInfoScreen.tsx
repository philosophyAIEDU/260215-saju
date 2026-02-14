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
    'bg-surface-50 border border-surface-300 rounded-xl px-3 py-2.5 text-sm text-ink-800 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-colors appearance-none cursor-pointer';

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 py-8 animate-fade-in">
      <div className="w-full max-w-lg mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-700 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>API 키 변경</span>
        </button>
      </div>

      <div className="text-center mb-8 space-y-2">
        <h2 className="text-2xl font-serif text-primary-700">생년월일시 입력</h2>
        <p className="text-sm text-ink-500">태어난 날의 정보를 입력해 주세요</p>
      </div>

      <div className="w-full max-w-lg bg-white/70 backdrop-blur-sm border border-primary-200 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="space-y-1.5">
          <label className="text-xs text-ink-600 font-medium">이름 (선택)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            className="w-full bg-surface-50 border border-surface-300 rounded-xl px-4 py-2.5 text-sm text-ink-800 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-ink-600 font-medium">성별</label>
          <div className="flex gap-3">
            {([['male', '남성 ♂'], ['female', '여성 ♀']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setGender(val)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  gender === val
                    ? 'bg-primary-100 text-primary-700 border border-primary-300 shadow-sm'
                    : 'bg-surface-100 text-ink-500 border border-surface-300 hover:border-surface-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-ink-600 font-medium">달력 유형</label>
          <div className="flex gap-3">
            {([['solar', '양력 (陽曆)'], ['lunar', '음력 (陰曆)']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setCalendarType(val)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  calendarType === val
                    ? 'bg-primary-100 text-primary-700 border border-primary-300 shadow-sm'
                    : 'bg-surface-100 text-ink-500 border border-surface-300 hover:border-surface-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-ink-600 font-medium">생년월일</label>
          <div className="grid grid-cols-3 gap-3">
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className={selectClass + ' w-full'}
              aria-label="출생 년도"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}년</option>
              ))}
            </select>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className={selectClass + ' w-full'}
              aria-label="출생 월"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>{m}월</option>
              ))}
            </select>
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className={selectClass + ' w-full'}
              aria-label="출생 일"
            >
              {days.map((d) => (
                <option key={d} value={d}>{d}일</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-ink-600 font-medium">태어난 시간 (시진)</label>
          <select
            value={birthTimeIndex}
            onChange={(e) => setBirthTimeIndex(Number(e.target.value))}
            className={selectClass + ' w-full'}
            aria-label="태어난 시간"
          >
            {BIRTH_TIMES.map((bt, idx) => (
              <option key={idx} value={idx}>
                {bt.value === null
                  ? `${bt.label} (${bt.timeRange})`
                  : `${bt.label} (${bt.hanja}) ${bt.timeRange}`}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-sm text-accent-red text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-sm hover:from-primary-500 hover:to-primary-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
        >
          <Sparkles size={16} />
          운세 보기
        </button>
      </div>
    </div>
  );
}
