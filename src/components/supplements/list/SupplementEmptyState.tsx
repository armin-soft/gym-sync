
import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';

interface SupplementEmptyStateProps {
  activeTab: 'supplement' | 'vitamin';
  onAddSupplement: () => void;
}

export const SupplementEmptyState: React.FC<SupplementEmptyStateProps> = ({ activeTab, onAddSupplement }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-4">
      <EmptyState 
        icon={activeTab === 'supplement' ? "Flask" : "Pill"}
        title={`هیچ ${activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} یافت نشد`}
        description={`برای افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید، روی دکمه زیر کلیک کنید`}
        action={{
          label: `افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'} جدید`,
          onClick: onAddSupplement
        }}
      />
    </div>
  );
};
