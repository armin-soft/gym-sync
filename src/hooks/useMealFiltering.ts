
import { useState, useEffect, useMemo } from 'react';

export function useMealFiltering(meals: any[], categories: any[]) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter meals based on search query and selected category
  const filteredMeals = useMemo(() => {
    let filtered = [...meals];

    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(meal => 
        meal.name.toLowerCase().includes(lowerQuery) || 
        (meal.description && meal.description.toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by category
    if (selectedCategoryId !== null) {
      filtered = filtered.filter(meal => meal.categoryId === selectedCategoryId);
    }

    // Sort by name
    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    return filtered;
  }, [meals, searchQuery, selectedCategoryId, sortOrder]);

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    return categories;
  }, [categories]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategoryId(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    sortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredMeals,
    filteredCategories,
    handleClearSearch
  };
}
