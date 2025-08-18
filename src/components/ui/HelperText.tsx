import React, { memo } from 'react';
import { Info } from 'lucide-react';

interface HelperTextProps {
  text: string;
  className?: string;
  showIcon?: boolean;
}

export const HelperText = memo<HelperTextProps>(({
  text,
  className = '',
  showIcon = false
}) => {
  if (!text) return null;

  return (
    <div className={`flex items-center space-x-2 mt-2 ${className}`}>
      {showIcon && (
        <Info size={14} className="text-gray-400 flex-shrink-0" />
      )}
      <p className="text-sm text-gray-500">
        {text}
      </p>
    </div>
  );
});