import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export function Toast() {
  const { toast, hideToast } = useCart();

  if (!toast.visible) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 animate-toast-in rounded-2xl bg-ink-950 px-4 py-3 text-white shadow-2xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/10 p-2">
            <CheckCircle2 size={18} className="text-emerald-400" />
          </div>
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={hideToast}
          className="rounded-full p-1 text-slate-300 transition hover:bg-white/10 hover:text-white"
          aria-label="إغلاق الإشعار"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
