
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  noPadding?: boolean;
  className?: string;
}

export const PageContainer = ({ children, fullWidth = false, noPadding = false, className = '' }: PageContainerProps) => {
  return (
    <div 
      className={`
        h-full w-full overflow-hidden
        ${fullWidth ? '' : 'max-w-[1800px] mx-auto'}
        ${noPadding ? '' : 'p-4 md:p-6'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
