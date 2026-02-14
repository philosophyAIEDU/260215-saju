import { useState, useCallback } from 'react';
import type { BirthInfo, SajuResult } from '../types/saju';
import { fetchSajuReading } from '../utils/api';

interface UseGeminiReturn {
  result: SajuResult | null;
  loading: boolean;
  error: string | null;
  fetchReading: (apiKey: string, birthInfo: BirthInfo) => Promise<void>;
  clearResult: () => void;
}

export function useGemini(): UseGeminiReturn {
  const [result, setResult] = useState<SajuResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReading = useCallback(async (apiKey: string, birthInfo: BirthInfo) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchSajuReading(apiKey, birthInfo);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, fetchReading, clearResult };
}
