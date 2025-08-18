import { useState, useCallback } from 'react';

export const useInputValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePassword = useCallback((password: string): boolean => {
    return password.length >= 8;
  }, []);

  const validateField = useCallback((name: string, value: string, type?: string): string => {
    if (!value.trim()) {
      return 'This field is required';
    }

    if (type === 'email' && !validateEmail(value)) {
      return 'Please enter a valid email address';
    }

    if (type === 'password' && !validatePassword(value)) {
      return 'Password must be at least 8 characters long';
    }

    return '';
  }, [validateEmail, validatePassword]);

  const setFieldError = useCallback((field: string, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    errors,
    validateField,
    setFieldError,
    clearFieldError,
    validateEmail,
    validatePassword
  };
};