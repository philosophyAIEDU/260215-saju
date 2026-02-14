import { useState, useEffect } from 'react';
import { Eye, EyeOff, KeyRound, Sparkles, ExternalLink } from 'lucide-react';
import { loadApiKey, saveApiKey } from '../utils/storage';
import { validateApiKey } from '../utils/api';
import ErrorMessage from './ErrorMessage';

interface ApiKeyScreenProps {
  onComplete: (apiKey: string) => void;
}

export default function ApiKeyScreen({ onComplete }: ApiKeyScreenProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadApiKey();
    if (saved) setApiKey(saved);
  }, []);

  const handleSubmit = async () => {
    const trimmed = apiKey.trim();
    if (!trimmed) {
      setError('API 키를 입력해 주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    const valid = await validateApiKey(trimmed);
    setLoading(false);

    if (valid) {
      saveApiKey(trimmed);
      onComplete(trimmed);
    } else {
      setError('유효하지 않은 API 키입니다. 키를 확인하고 다시 시도해 주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 animate-fade-in">
      {/* 타이틀 */}
      <div className="text-center mb-10 space-y-3">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary-400 opacity-60" />
          <Sparkles className="w-5 h-5 text-primary-400 opacity-60" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary-700 tracking-wider">
          사주명리
        </h1>
        <p className="text-xl sm:text-2xl font-serif text-primary-400 tracking-widest">
          四柱命理
        </p>
        <p className="text-sm text-ink-500 mt-4 max-w-xs mx-auto leading-relaxed">
          태어난 시간에 담긴 운명의 비밀,<br />
          AI가 풀어드리는 사주팔자 운세
        </p>
      </div>

      {/* API 키 입력 카드 */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-sm border border-primary-200 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-ink-600">
          <KeyRound size={16} className="text-primary-500" />
          <span>Gemini API 키 입력</span>
        </div>

        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => { setApiKey(e.target.value); setError(null); }}
            onKeyDown={(e) => e.key === 'Enter' && !loading && handleSubmit()}
            placeholder="API 키를 입력하세요"
            className="w-full bg-surface-50 border border-surface-300 rounded-xl px-4 py-3 pr-10 text-sm text-ink-800 placeholder-ink-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30 transition-colors"
            aria-label="Gemini API 키"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 transition-colors"
            aria-label={showKey ? 'API 키 숨기기' : 'API 키 보기'}
          >
            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && <ErrorMessage message={error} />}

        <button
          onClick={handleSubmit}
          disabled={loading || !apiKey.trim()}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-sm hover:from-primary-500 hover:to-primary-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              키 확인 중...
            </span>
          ) : (
            '시작하기'
          )}
        </button>

        <div className="space-y-2 pt-1">
          <p className="text-[11px] text-ink-400 text-center">
            API 키는 브라우저에만 저장되며, 외부로 전송되지 않습니다.
          </p>
          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 text-xs text-primary-500 hover:text-primary-700 transition-colors"
          >
            Gemini API 키 발급받기
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
