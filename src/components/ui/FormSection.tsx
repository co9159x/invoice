import React, { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg animate-fadeIn">
      <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-500">
        <h3 className="text-lg leading-6 font-medium text-white">{title}</h3>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
};

export default FormSection;