import React, { ReactNode } from 'react';

interface FormWrapperProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({ 
  title, 
  subtitle, 
  children 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
          <div className="p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              {subtitle && (
                <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};