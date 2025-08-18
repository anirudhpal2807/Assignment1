import React, { memo } from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
  showIcon?: boolean;
}

export const ErrorMessage = memo<ErrorMessageProps>(({
  message,
  className = '',
  showIcon = true
}) => {
  if (!message) return null;

  return (
    <div className={`flex items-center space-x-2 mt-2 animate-fade-in ${className}`}>
      {showIcon && (
        <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
      )}
      <p className="text-sm text-red-600 font-medium">
        {message}
      </p>
    </div>
  );
});