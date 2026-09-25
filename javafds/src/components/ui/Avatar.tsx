import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type AvatarProps = {
  children?: ReactNode;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export default function Avatar({ children, src, size = 'md', className }: AvatarProps) {
  const sizeClass = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
  };

  if (src) {
    return <img src={src} alt="avatar" className={cn('rounded-full object-cover', sizeClass[size], className)} />;
  }

  return (
    <div className={cn('flex items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700', sizeClass[size], className)}>
      {children}
    </div>
  );
}
