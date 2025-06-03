
import React, { useState } from 'react';
import { Supplement } from '@/types/supplement';
import { SupplementGridView } from '@/components/supplements/list/SupplementGridView';

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
    <SupplementGridView 
      {...props}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};
