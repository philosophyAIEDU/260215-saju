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
          <Sparkles className="w-5 h-5 text-gold-400 opacity-60" />
          <Sparkles className="w-5 h-5 text-gold-400 opacity-60" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gold-400 tracking-wider">
          사주명리
        </h1>
        <p className="text-xl sm:text-2xl font-serif text-cream/60 tracking-widest">
          四柱命理
        </p>
        <p className="text-sm text-cream/40 mt-4 max-w-xs mx-auto leading-relaxed">
          태어난 시간에 담긴 운명의 비밀,<br />
          AI가 풀어드리는 사주팔자 운세
        </p>
      </div>

      {/* API 키 입력 카드 */}
      <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 text-sm text-cream/60">
          <KeyRound size={16} className="text-gold-400" />
          <span>Gemini API 키 입력</span>
        </div>

        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => { setApiKey(e.target.value); setError(null); }}
            onKeyDown={(e) => e.key === 'Enter' && !loading && handleSubmit()}
            placeholder="API 키를 입력하세요"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold-500/50 transition-colors"
            aria-label="Gemini API 키"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream/70 transition-colors"
            aria-label={showKey ? 'API 키 숨기기' : 'API 키 보기'}
          >
            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && <ErrorMessage message={error} />}

        <button
          onClick={handleSubmit}
          disabled={loading || !apiKey.trim()}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-darkbg-900 font-semibold text-sm hover:from-gold-500 hover:to-gold-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-darkbg-900/30 border-t-darkbg-900 rounded-full animate-spin" />
              키 확인 중...
            </span>
          ) : (
            '시작하기'
          )}
        </button>

        <div className="space-y-2 pt-1">
          <p className="text-[11px] text-cream/30 text-center">
            API 키는 브라우저에만 저장되며, 외부로 전송되지 않습니다.
          </p>
          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 text-xs text-gold-400/60 hover:text-gold-400 transition-colors"
          >
            Gemini API 키 발급받기
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
