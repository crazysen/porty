interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div
      role="alert"
      className={`fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-xl px-6 py-3 text-sm font-medium shadow-lg ${
        type === 'success'
          ? 'bg-emerald-500/90 text-white'
          : 'bg-red-500/90 text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="rounded p-0.5 hover:bg-white/20"
          aria-label="Dismiss notification"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
