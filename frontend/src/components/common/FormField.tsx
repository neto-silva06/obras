import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'select' | 'textarea';
  options?: { label: string; value: any }[];
  value: any;
  onChange: (value: any) => void;
  error?: string;
  required?: boolean;
}

export function FormField({
  label,
  name,
  type = 'text',
  options,
  value,
  onChange,
  error,
  required = false
}: FormFieldProps) {
  const baseClasses = "block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors";
  const errorClasses = error ? "border-red-500 text-red-600" : "border-gray-300 text-gray-900";

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} ${errorClasses}`}
        >
          <option value="">Selecione...</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} ${errorClasses}`}
          rows={3}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} ${errorClasses}`}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
