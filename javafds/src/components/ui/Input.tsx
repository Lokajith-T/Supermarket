import { cn } from '@/utils/cn';

type InputProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  type?: string;
};

export default function Input({ value, onChange, placeholder, className, type = 'text' }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
      className={cn('input-shell', className)}
    />
  );
}
