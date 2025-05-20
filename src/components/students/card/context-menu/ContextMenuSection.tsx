
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
    <div>
      <div className="px-2 py-1">
        <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400">{title}</span>
      </div>
      {children}
    </div>
  );
};

export default ContextMenuSection;
