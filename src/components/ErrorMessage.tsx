import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-red-900/20 border border-red-800/40">
      <AlertTriangle className="w-10 h-10 text-red-400" />
      <p className="text-red-300 text-center text-sm leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 rounded-lg bg-red-800/40 text-red-200 text-sm hover:bg-red-800/60 transition-colors"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
