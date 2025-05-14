import React, { ReactNode } from 'react';

interface FormWrapperProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({ 
  title, 
  subtitle, 
  children,
  className = ''
}) => {
  return (
    <div className={`min-h-screen border border-gray-700 flex items-center justify-center p-4 bg-gray-900  text-black ${className}`}>
      <div className="w-full max-w-md">
        <div className="bg-white text-black rounded-xl shadow-sm border border-gray-700 overflow-hidden">
          <div className="p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold  text-black">{title}</h1>
              {subtitle && (
                <p className="mt-2 text-sm  text-black">{subtitle}</p>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};