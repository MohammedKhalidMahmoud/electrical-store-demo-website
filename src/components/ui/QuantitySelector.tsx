import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-11 w-11 items-center justify-center text-slate-600 transition hover:bg-slate-50"
        aria-label="تقليل الكمية"
      >
        <Minus size={16} />
      </button>
      <div className="min-w-12 px-3 text-center text-sm font-bold text-slate-900">{value}</div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-11 w-11 items-center justify-center text-slate-600 transition hover:bg-slate-50"
        aria-label="زيادة الكمية"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
