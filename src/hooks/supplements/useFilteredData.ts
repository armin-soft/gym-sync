
import { useMemo } from 'react';
import type { Supplement, SupplementCategory } from '@/types/supplement';
import type { SupplementType } from './types';

export const useFilteredData = (
  supplements: Supplement[],
  categories: SupplementCategory[],
  activeTab: SupplementType,
  selectedCategory: string
) => {
  
  // Filter supplements by active tab type and selected category
  const filteredSupplements = useMemo(() => {
    let filtered = supplements.filter(s => s.type === activeTab);
    
    if (selectedCategory) {
      filtered = filtered.filter(s => s.categoryId === selectedCategory);
    }
    
    // Sort by creation date, newest first
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt || '').getTime();
      const dateB = new Date(b.createdAt || '').getTime();
      return dateB - dateA;
    });
  }, [supplements, activeTab, selectedCategory]);

  // Get categories relevant to the current tab
  const relevantCategories = useMemo(() => {
    return categories.filter(cat => cat.type === activeTab);
  }, [categories, activeTab]);

  return {
    filteredSupplements,
    relevantCategories
  };
};
