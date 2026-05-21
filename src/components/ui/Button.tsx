import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  fullWidth = false,
  ...props
}: ButtonProps) {
  const variantClassName =
    variant === 'primary'
      ? 'bg-accent text-white hover:bg-accent-600'
      : variant === 'secondary'
        ? 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
        : 'bg-transparent text-slate-600 hover:bg-slate-100';

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold transition duration-200 ease-out ${fullWidth ? 'w-full' : ''} ${variantClassName} ${className}`}
    >
      {children}
    </button>
  );
}
