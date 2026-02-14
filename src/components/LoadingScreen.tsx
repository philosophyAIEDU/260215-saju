import { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  '운명의 별을 읽고 있습니다...',
  '천간과 지지를 배합하고 있습니다...',
  '오행의 균형을 살피고 있습니다...',
  '십신의 배치를 분석하고 있습니다...',
  '대운의 흐름을 읽고 있습니다...',
  '세운과의 관계를 풀이하고 있습니다...',
];

export default function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 animate-fade-in">
      {/* 태극 회전 애니메이션 */}
      <div className="relative w-28 h-28 animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* 외곽 원 */}
          <circle cx="50" cy="50" r="48" fill="none" stroke="#d4a843" strokeWidth="1.5" opacity="0.6" />
          {/* 태극 문양 */}
          <path
            d="M50 2 A48 48 0 0 1 50 98 A24 24 0 0 1 50 50 A24 24 0 0 0 50 2"
            fill="#f5f0e8"
            opacity="0.9"
          />
          <path
            d="M50 2 A48 48 0 0 0 50 98 A24 24 0 0 0 50 50 A24 24 0 0 1 50 2"
            fill="#1a1a3e"
            opacity="0.9"
          />
          {/* 음양 점 */}
          <circle cx="50" cy="26" r="6" fill="#1a1a3e" />
          <circle cx="50" cy="74" r="6" fill="#f5f0e8" />
          {/* 금색 테두리 */}
          <circle cx="50" cy="50" r="48" fill="none" stroke="#d4a843" strokeWidth="2" />
        </svg>
      </div>

      {/* 로딩 텍스트 */}
      <div className="text-center space-y-3">
        <p className="text-gold-400 font-serif text-lg transition-all duration-500">
          {LOADING_MESSAGES[msgIndex]}
        </p>
        <div className="flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 bg-gold-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <p className="text-cream/40 text-xs">잠시만 기다려 주세요. 약 10~20초 소요됩니다.</p>
    </div>
  );
}
