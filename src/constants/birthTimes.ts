export interface BirthTimeOption {
  value: string | null;
  label: string;
  hanja: string;
  timeRange: string;
}

export const BIRTH_TIMES: BirthTimeOption[] = [
  { value: null, label: '모름', hanja: '未詳', timeRange: '시간 미상' },
  { value: '자시', label: '자시', hanja: '子時', timeRange: '23:00~01:00' },
  { value: '축시', label: '축시', hanja: '丑時', timeRange: '01:00~03:00' },
  { value: '인시', label: '인시', hanja: '寅時', timeRange: '03:00~05:00' },
  { value: '묘시', label: '묘시', hanja: '卯時', timeRange: '05:00~07:00' },
  { value: '진시', label: '진시', hanja: '辰時', timeRange: '07:00~09:00' },
  { value: '사시', label: '사시', hanja: '巳時', timeRange: '09:00~11:00' },
  { value: '오시', label: '오시', hanja: '午時', timeRange: '11:00~13:00' },
  { value: '미시', label: '미시', hanja: '未時', timeRange: '13:00~15:00' },
  { value: '신시', label: '신시', hanja: '申時', timeRange: '15:00~17:00' },
  { value: '유시', label: '유시', hanja: '酉時', timeRange: '17:00~19:00' },
  { value: '술시', label: '술시', hanja: '戌時', timeRange: '19:00~21:00' },
  { value: '해시', label: '해시', hanja: '亥時', timeRange: '21:00~23:00' },
];

export const YEARS = Array.from({ length: 71 }, (_, i) => 2010 - i);
export const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}
