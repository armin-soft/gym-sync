
import React from "react";

interface ContextMenuSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ContextMenuSection: React.FC<ContextMenuSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-2">
      <div className="text-xs font-medium text-black-500 dark:text-gold-400 px-3 py-1">
        {title}
      </div>
      <div className="space-y-0.5 py-1">
        {children}
      </div>
    </div>
  );
};
