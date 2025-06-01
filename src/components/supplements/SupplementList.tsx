
import React from 'react';
import { Supplement } from '@/types/supplement';
import { SupplementGridView } from './list/SupplementGridView';
import { EmptyState } from '@/components/ui/empty-state';

interface SupplementListProps {
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  activeTab: 'supplement' | 'vitamin';
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const SupplementList: React.FC<SupplementListProps> = ({
  supplements,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  activeTab,
  searchQuery = '',
  setSearchQuery = () => {},
}) => {
  // If there are no supplements, show the empty state
  if (supplements.length === 0) {
    return (
      <div className="py-20 flex items-center justify-center">
        <EmptyState
          icon="FlaskConical"
          title={`هیچ ${activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} وجود ندارد`}
          description="لطفاً ابتدا یک مکمل اضافه کنید"
          action={{
            label: `افزودن ${activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}`,
            onClick: onAddSupplement
          }}
        />
      </div>
    );
  }

  // Filter supplements based on search query
  const filteredSupplements = React.useMemo(() => {
    if (!searchQuery.trim()) return supplements;
    
    return supplements.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [supplements, searchQuery]);

  // Show grid view with the filtered supplements
  return (
    <SupplementGridView
      supplements={filteredSupplements}
      onEditSupplement={onEditSupplement}
      onDeleteSupplement={onDeleteSupplement}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onAddSupplement={onAddSupplement}
      activeTab={activeTab}
    />
  );
};
