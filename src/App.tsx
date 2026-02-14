import { useState, useCallback } from 'react';
import type { AppScreen, BirthInfo } from './types/saju';
import { useGemini } from './hooks/useGemini';
import { clearApiKey } from './utils/storage';
import ApiKeyScreen from './components/ApiKeyScreen';
import BirthInfoScreen from './components/BirthInfoScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';
import ErrorMessage from './components/ErrorMessage';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('apiKey');
  const [apiKey, setApiKey] = useState('');
  const [birthInfo, setBirthInfo] = useState<BirthInfo | null>(null);
  const { result, loading, error, fetchReading, clearResult } = useGemini();

  const handleApiKeyComplete = useCallback((key: string) => {
    setApiKey(key);
    setScreen('birthInfo');
  }, []);

  const handleBirthInfoSubmit = useCallback(
    async (info: BirthInfo) => {
      setBirthInfo(info);
      setScreen('loading');
      await fetchReading(apiKey, info);
    },
    [apiKey, fetchReading]
  );

  const handleReset = useCallback(() => {
    clearResult();
    setScreen('birthInfo');
  }, [clearResult]);

  const handleChangeApiKey = useCallback(() => {
    clearResult();
    clearApiKey();
    setApiKey('');
    setScreen('apiKey');
  }, [clearResult]);

  const handleRetry = useCallback(() => {
    if (birthInfo) {
      setScreen('loading');
      fetchReading(apiKey, birthInfo);
    }
  }, [apiKey, birthInfo, fetchReading]);

  // 로딩 완료 후 화면 전환
  if (screen === 'loading' && !loading && result) {
    setScreen('result');
  }

  return (
    <main className="min-h-screen">
      {screen === 'apiKey' && (
        <ApiKeyScreen onComplete={handleApiKeyComplete} />
      )}

      {screen === 'birthInfo' && (
        <BirthInfoScreen
          onSubmit={handleBirthInfoSubmit}
          onBack={handleChangeApiKey}
        />
      )}

      {screen === 'loading' && !error && <LoadingScreen />}

      {screen === 'loading' && error && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 gap-6">
          <ErrorMessage message={error} onRetry={handleRetry} />
          <button
            onClick={handleReset}
            className="text-sm text-ink-500 hover:text-ink-700 transition-colors"
          >
            입력 화면으로 돌아가기
          </button>
        </div>
      )}

      {screen === 'result' && result && birthInfo && (
        <ResultScreen
          result={result}
          birthInfo={birthInfo}
          onReset={handleReset}
          onChangeApiKey={handleChangeApiKey}
        />
      )}
    </main>
  );
}
