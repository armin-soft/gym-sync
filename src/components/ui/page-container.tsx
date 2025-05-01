
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  noPadding?: boolean;
  className?: string;
  fullHeight?: boolean;
  withBackground?: boolean; // Added property
  fullScreen?: boolean;     // Added property
}

export const PageContainer = ({ 
  children, 
  fullWidth = false, 
  noPadding = false, 
  className = '',
  fullHeight = false,
  withBackground = false, // Added property with default
  fullScreen = false      // Added property with default
}: PageContainerProps) => {
  return (
    <div 
      className={`
        ${fullWidth ? '' : 'max-w-[1800px] mx-auto'}
        ${noPadding ? '' : 'p-4 md:p-6'}
        ${fullHeight ? 'h-full' : ''}
        ${withBackground ? 'bg-gradient-to-b from-background to-background/80' : ''}
        ${fullScreen ? 'w-screen h-screen overflow-hidden' : 'w-full'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
