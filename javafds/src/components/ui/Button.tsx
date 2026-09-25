import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

export default function Button({ children, variant = 'primary', className, onClick, type = 'button', disabled }: ButtonProps) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'rounded-xl px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800',
    danger: 'inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-200',
  };

  return (
    <button type={type} className={cn(variants[variant], className, disabled ? 'opacity-50 cursor-not-allowed' : '')} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
