import React, { memo, useCallback } from 'react';
import { Check, Minus } from 'lucide-react';

interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Checkbox = memo<CheckboxProps>(({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  className = ''
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(e.target.checked);
    }
  }, [onChange, disabled]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onChange && !disabled) {
        onChange(!checked);
      }
    }
  }, [onChange, disabled, checked]);

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
        tabIndex={-1}
      />
      <div
        className={`
          w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1
          ${checked || indeterminate 
            ? 'bg-blue-600 border-blue-600 text-white' 
            : 'border-gray-300 hover:border-gray-400 bg-white'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={() => !disabled && onChange?.(!checked)}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-disabled={disabled}
      >
        {indeterminate ? (
          <Minus size={12} className="text-white" />
        ) : checked ? (
          <Check size={12} className="text-white" />
        ) : null}
      </div>
    </div>
  );
});