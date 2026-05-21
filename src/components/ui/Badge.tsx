import type { ReactNode } from 'react';

type BadgeTone = 'blue' | 'green' | 'yellow' | 'red' | 'slate';

const toneClasses: Record<BadgeTone, string> = {
  blue: 'bg-accent-50 text-accent ring-accent/15',
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  yellow: 'bg-amber-50 text-amber-700 ring-amber-200',
  red: 'bg-rose-50 text-rose-700 ring-rose-200',
  slate: 'bg-slate-100 text-slate-600 ring-slate-200',
};

export function Badge({ tone, children }: { tone: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
