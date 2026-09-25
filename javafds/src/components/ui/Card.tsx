import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return <div className={cn('card-surface p-5', className)}>{children}</div>;
}
