export interface SajuPillar {
  heavenlyStem: string;
  earthlyBranch: string;
  korean: string;
}

export interface FiveElements {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

export interface SajuInfo {
  yearPillar: SajuPillar;
  monthPillar: SajuPillar;
  dayPillar: SajuPillar;
  timePillar?: SajuPillar;
  fiveElements: FiveElements;
  dominantElement: string;
  weakElement: string;
  dayMaster: string;
  personality: string;
}

export interface MonthlyFortune {
  month: number;
  summary: string;
  rating: string;
}

export interface FortuneCategory {
  id: string;
  title: string;
  emoji: string;
  score: number;
  keywords: string[];
  detail: string;
  luckyColor?: string;
  luckyNumber?: number;
  luckyDirection?: string;
  monthly?: MonthlyFortune[];
}

export interface SajuResult {
  saju: SajuInfo;
  categories: FortuneCategory[];
}

export interface BirthInfo {
  name: string;
  gender: 'male' | 'female';
  calendarType: 'solar' | 'lunar';
  year: number;
  month: number;
  day: number;
  birthTime: string | null;
}

export type AppScreen = 'apiKey' | 'birthInfo' | 'loading' | 'result';
