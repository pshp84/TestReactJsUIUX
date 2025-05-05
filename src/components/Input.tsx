import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-300"
        >
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full px-3 py-2 bg-gray-800 text-white border rounded-lg transition-colors outline-none 
          ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
            : 'border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };