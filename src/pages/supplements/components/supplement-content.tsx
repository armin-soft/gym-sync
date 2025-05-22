
import React, { useState } from 'react';
import { Supplement } from '@/types/supplement';
import { SupplementList } from '@/components/supplements/SupplementList';

interface SupplementContentProps {
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  activeTab: 'supplement' | 'vitamin';
}

export const SupplementContent: React.FC<SupplementContentProps> = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <SupplementList 
      {...props}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};
