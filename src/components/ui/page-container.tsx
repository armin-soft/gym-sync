
import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <div className={`container mx-auto px-4 pb-12 space-y-6 ${className}`}>
      {children}
    </div>
  );
};
