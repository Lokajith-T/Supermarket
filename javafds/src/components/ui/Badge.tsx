import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type BadgeProps = {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'neutral';
  className?: string;
};

export default function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]';
  const variants = {
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    neutral: 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-200',
  };

  return <span className={cn(base, variants[variant], className)}>{children}</span>;
}
