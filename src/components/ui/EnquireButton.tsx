import { Send } from 'lucide-react';
import { useModals } from '../../context/ModalContext';

interface EnquireButtonProps {
  variant?: 'red' | 'yellow';
  label?: string;
  courseId?: string;
  className?: string;
  onClick?: () => void;
}

export function EnquireButton({
  variant = 'red',
  label = 'Enquire Now',
  courseId,
  className = '',
  onClick,
}: EnquireButtonProps) {
  const { openEnquiry } = useModals();

  return (
    <button
      type="button"
      className={`btn btn--${variant} ${className}`}
      onClick={() => {
        onClick?.();
        openEnquiry(courseId);
      }}
    >
      <Send aria-hidden="true" size={18} />
      {label}
    </button>
  );
}
