
import React from 'react';

export interface SupplementTabsProps {
  children?: React.ReactNode;
}

export const SupplementTabs: React.FC<SupplementTabsProps> = ({ children }) => {
  return (
    <div className="supplement-tabs">
      {children || "Supplement Tabs Placeholder"}
    </div>
  );
};

export default SupplementTabs;
