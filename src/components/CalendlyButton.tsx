import { useCalendly } from '@/hooks/use-calendly';

interface CalendlyButtonProps {
  url: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const CalendlyButton = ({ 
  url, 
  children, 
  className = '',
  variant = 'primary'
}: CalendlyButtonProps) => {
  const { openCalendly } = useCalendly({ url });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openCalendly();
  };

  const baseStyles = variant === 'primary' 
    ? 'btn-elegant' 
    : 'elegant-underline font-body text-sm tracking-[0.15em] uppercase font-light';

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${className}`}
      type="button"
    >
      {children}
    </button>
  );
};
