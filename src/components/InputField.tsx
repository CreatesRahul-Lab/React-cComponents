import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'number';
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  loading?: boolean;
  darkMode?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
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
  showPasswordToggle = false,
  loading = false,
  darkMode = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    const syntheticEvent = {
      target: { value: '' },
      currentTarget: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    setInternalValue('');
    onChange?.(syntheticEvent);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const actualType = type === 'password' && showPassword ? 'text' : type;
  const hasError = invalid || !!errorMessage;
  const currentValue = onChange ? value : internalValue;

  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-2 h-9',
    md: 'text-base px-4 py-2.5 h-11',
    lg: 'text-lg px-5 py-3 h-12',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Base classes with improved styling
  const baseClasses = `
    w-full
    border
    rounded-lg
    transition-all
    duration-300
    ease-in-out
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    font-medium
    placeholder:font-normal
    ${sizeClasses[size]}
    ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-text'}
    ${loading ? 'input-field-loading' : ''}
  `;

  // Enhanced variant classes with better visual design
  const variantClasses = {
    filled: `
      ${darkMode 
        ? 'bg-gray-800/80 border-gray-700/50 backdrop-blur-sm' 
        : 'bg-gray-50/80 border-gray-200/50 backdrop-blur-sm'
      }
      ${hasError 
        ? 'border-red-400 focus:ring-red-400/50 focus:border-red-500 bg-red-50/50 dark:bg-red-900/20' 
        : darkMode 
          ? 'focus:ring-blue-400/50 focus:border-blue-400 hover:border-gray-600' 
          : 'focus:ring-blue-500/50 focus:border-blue-500 hover:border-gray-300'
      }
      ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}
      shadow-sm hover:shadow-md focus:shadow-lg
    `,
    outlined: `
      ${darkMode 
        ? 'bg-gray-900/50 border-gray-600/70 backdrop-blur-sm' 
        : 'bg-white/90 border-gray-300/70 backdrop-blur-sm'
      }
      ${hasError 
        ? 'border-red-400 focus:ring-red-400/50 focus:border-red-500 bg-red-50/30 dark:bg-red-900/10' 
        : darkMode 
          ? 'focus:ring-blue-400/50 focus:border-blue-400 hover:border-gray-500' 
          : 'focus:ring-blue-500/50 focus:border-blue-500 hover:border-gray-400'
      }
      ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}
      shadow-sm hover:shadow-md focus:shadow-lg
    `,
    ghost: `
      bg-transparent
      border-transparent
      ${hasError 
        ? 'border-red-400 focus:ring-red-400/50 focus:border-red-500 hover:bg-red-50/50 dark:hover:bg-red-900/20' 
        : darkMode 
          ? 'focus:ring-blue-400/50 focus:border-blue-400/50 hover:border-gray-600/50' 
          : 'focus:ring-blue-500/50 focus:border-blue-500/50 hover:border-gray-300/50'
      }
      ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}
      hover:${darkMode ? 'bg-gray-800/30' : 'bg-gray-50/50'}
      focus:${darkMode ? 'bg-gray-800/50' : 'bg-white/80'}
    `,
  };

  const labelClasses = `
    block
    font-semibold
    mb-2
    transition-colors
    duration-200
    ${labelSizeClasses[size]}
    ${hasError 
      ? 'text-red-600 dark:text-red-400' 
      : darkMode 
        ? 'text-gray-200' 
        : 'text-gray-700'
    }
  `;

  const helperTextClasses = `
    mt-2
    text-sm
    font-medium
    transition-colors
    duration-200
    ${hasError 
      ? 'text-red-600 dark:text-red-400' 
      : darkMode 
        ? 'text-gray-400' 
        : 'text-gray-600'
    }
  `;

  return (
    <div className="w-full">
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          type={actualType}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseClasses} ${variantClasses[variant]} ${
            (showClearButton && currentValue) || (showPasswordToggle && type === 'password') 
              ? 'pr-12' 
              : ''
          }`}
        />
        
        {/* Right side icons */}
        {((showClearButton && currentValue && !disabled) || 
          (showPasswordToggle && type === 'password') || 
          loading) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
            {loading && (
              <div className={`
                animate-spin 
                rounded-full 
                border-2 
                border-gray-300/50 
                border-t-blue-500 
                dark:border-gray-600/50 
                dark:border-t-blue-400
                ${iconSizeClasses[size]}
              `}></div>
            )}
            
            {showClearButton && currentValue && !disabled && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className={`
                  p-1
                  rounded-full
                  transition-all
                  duration-200
                  hover:scale-110
                  ${darkMode 
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/50'
                  }
                `}
              >
                <XMarkIcon className={iconSizeClasses[size]} />
              </button>
            )}
            
            {showPasswordToggle && type === 'password' && !loading && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={`
                  p-1
                  rounded-full
                  transition-all
                  duration-200
                  hover:scale-110
                  ${darkMode 
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/50'
                  }
                `}
              >
                {showPassword ? (
                  <EyeSlashIcon className={iconSizeClasses[size]} />
                ) : (
                  <EyeIcon className={iconSizeClasses[size]} />
                )}
              </button>
            )}
          </div>
        )}
      </div>
      
      {(helperText || errorMessage) && (
        <p className={helperTextClasses}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;
