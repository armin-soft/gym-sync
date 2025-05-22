
import React from 'react';
import { Supplement } from '@/types/supplement';
import { SupplementEmptyState } from './list/SupplementEmptyState';
import { SupplementGridView } from './list/SupplementGridView';

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
      <SupplementEmptyState 
        activeTab={activeTab}
        onAddSupplement={onAddSupplement}
      />
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
