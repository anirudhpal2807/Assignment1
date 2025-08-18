import React, { useState, memo, useCallback, useMemo } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { InputFieldProps } from '../../types/schema';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { HelperText } from '../ui/HelperText';
import { useDebounce } from '../../hooks/useDebounce';

export const InputField = memo<InputFieldProps>(({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  showPasswordToggle = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Debounce value for performance
  const debouncedValue = useDebounce(value, 300);

  const actualType = type === 'password' && showPassword ? 'text' : type;

  const sizeClasses = useMemo(() => ({
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  }), []);

  const variantClasses = useMemo(() => ({
    filled: 'bg-gray-100 border-transparent focus:bg-white focus:border-blue-500',
    outlined: 'bg-white border-gray-300 focus:border-blue-500',
    ghost: 'bg-transparent border-transparent focus:bg-white focus:border-blue-500'
  }), []);

  const inputClasses = useMemo(() => {
    let classes = `w-full rounded-md border-2 transition-all duration-200 outline-none ${sizeClasses[size]}`;
    
    // Handle disabled state first
    if (disabled) {
      classes += ' opacity-60 cursor-not-allowed bg-gray-100 border-gray-200 text-gray-500';
    } else {
      // Apply variant classes only if not disabled
      classes += ` ${variantClasses[variant]}`;
      
      // Handle error/invalid state
      if (invalid || errorMessage) {
        classes += ' border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200';
      } else {
        classes += ' focus:ring-2 focus:ring-blue-200';
      }
      
      // Handle focus state
      if (isFocused && !invalid && !errorMessage) {
        classes += ' ring-2 ring-blue-200';
      }
    }
    
    // Add padding for buttons
    if ((showClearButton && value) || (showPasswordToggle && type === 'password')) {
      classes += ' pr-12';
    }
    
    return classes;
  }, [size, variant, invalid, errorMessage, disabled, showClearButton, value, showPasswordToggle, type, isFocused, sizeClasses, variantClasses]);

  const handleClear = useCallback(() => {
    if (onChange && !disabled) {
      setIsLoading(true);
      const event = {
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
      setTimeout(() => setIsLoading(false), 100);
    }
  }, [onChange, disabled]);

  const togglePasswordVisibility = useCallback(() => {
    if (!disabled) {
      setShowPassword(prev => !prev);
    }
  }, [disabled]);

  const handleFocus = useCallback(() => {
    if (!disabled) {
      setIsFocused(true);
    }
  }, [disabled]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(e);
    }
  }, [onChange, disabled]);

  // Dynamic placeholder based on state
  const dynamicPlaceholder = useMemo(() => {
    if (disabled) return 'This field is disabled';
    if (isLoading) return 'Processing...';
    if (type === 'email' && !value) return placeholder || 'Enter your email address';
    if (type === 'password' && !value) return placeholder || 'Enter your password';
    return placeholder || 'Enter text...';
  }, [disabled, isLoading, type, value, placeholder]);

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-medium mb-2 ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
          {label}
          {(invalid || errorMessage) && !disabled && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          type={actualType}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={dynamicPlaceholder}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={invalid || !!errorMessage}
          aria-describedby={
            errorMessage ? 'error-message' : helperText ? 'helper-text' : undefined
          }
        />
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <LoadingSpinner size={16} />
          </div>
        )}
        
        {!isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {showClearButton && value && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Clear input"
                tabIndex={0}
              >
                <X size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
            
            {showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={disabled}
                className={`p-1 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
                }`}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={disabled ? -1 : 0}
              >
                {showPassword ? (
                  <EyeOff size={16} className={disabled ? 'text-gray-300' : 'text-gray-400 hover:text-gray-600'} />
                ) : (
                  <Eye size={16} className={disabled ? 'text-gray-300' : 'text-gray-400 hover:text-gray-600'} />
                )}
              </button>
            )}
          </div>
        )}
      </div>
      
      <ErrorMessage message={errorMessage || ''} />
      <HelperText text={helperText || ''} />
      
      {/* Character count for long inputs */}
      {value && value.length > 50 && !disabled && (
        <p className="mt-1 text-xs text-gray-400">
          {value.length} characters
        </p>
      )}
    </div>
  );
});