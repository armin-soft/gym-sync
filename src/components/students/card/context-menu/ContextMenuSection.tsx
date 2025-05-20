
import React from "react";

interface ContextMenuSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ContextMenuSection: React.FC<ContextMenuSectionProps> = ({ 
  title, 
  children 
}) => {
  return (
    <div className="py-1 px-1">
      <div className="px-2 py-1">
        <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {title}
        </h4>
      </div>
      <div className="space-y-0.5">
        {children}
      </div>
    </div>
  );
};
