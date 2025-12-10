import React, { useState, forwardRef, InputHTMLAttributes } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  clearable?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      clearable = false,
      type = 'text',
      fullWidth = false,
      size = 'medium',
      className = '',
      value,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');

    const isPassword = type === 'password';
    const hasValue = (value || internalValue) !== '';

    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-5 py-3 text-lg',
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      const syntheticEvent = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      setInternalValue('');
      onChange?.(syntheticEvent);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={`${fullWidth ? 'w-full' : 'w-auto'}`}>
        {label && <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>}

        <div className="relative">
          <input
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            value={value !== undefined ? value : internalValue}
            onChange={handleChange}
            disabled={disabled}
            className={` ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} rounded-lg border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:ring-2 focus:outline-none ${disabled ? 'cursor-not-allowed bg-gray-100' : 'bg-white'} ${isPassword || clearable ? 'pr-10' : ''} transition-all ${className} `}
            {...props}
          />

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              disabled={disabled}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700 disabled:opacity-50"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}

          {/* Clear Button */}
          {clearable && !isPassword && hasValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
              tabIndex={-1}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
