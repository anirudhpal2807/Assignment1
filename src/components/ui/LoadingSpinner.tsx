import React, { memo } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  color?: string;
}

export const LoadingSpinner = memo<LoadingSpinnerProps>(({ 
  size = 20, 
  className = '',
  color = 'text-gray-400'
}) => {
  return (
    <Loader2 
      size={size} 
      className={`animate-spin ${color} ${className}`}
      style={{
        animation: 'spin 1s linear infinite'
      }}
    />
  );
});