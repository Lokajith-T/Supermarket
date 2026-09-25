import { cn } from '@/utils/cn';

type SelectProps = {
  value?: string;
  onChange?: (value: string) => void;
  options: { label: string; value: string }[];
  className?: string;
};

export default function Select({ value, onChange, options, className }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      className={cn('input-shell', className)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
