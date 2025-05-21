import React from 'react';

interface TextAreaProps {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  rows?: number;
  [x: string]: any; // For any additional props
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  rows = 3,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`mt-1 ${error ? 'animate-shake' : ''}`}>
        <textarea
          id={id}
          name={name}
          rows={rows}
          className={`block w-full rounded-md sm:text-sm shadow-sm transition-all duration-200
            ${error 
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
          value={value}
          onChange={onChange}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;