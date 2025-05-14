
import React from 'react';

interface SupplementContentProps {
  // در اینجا props مورد نیاز کامپوننت را تعریف کنید
  children?: React.ReactNode;
}

export const SupplementContent: React.FC<SupplementContentProps> = ({ children }) => {
  return (
    <div className="supplement-content">
      {children || <p className="text-center p-8">محتوای مکمل‌ها به زودی اضافه خواهد شد...</p>}
    </div>
  );
};
