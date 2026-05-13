import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-secondary-700">{label}</label>}
      <input
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
          error ? 'border-red-500' : 'border-secondary-300 hover:border-secondary-400'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
