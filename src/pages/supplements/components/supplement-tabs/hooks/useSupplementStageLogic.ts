
import { useState, useMemo } from "react";

export const useSupplementStageLogic = (
  supplements: any[],
  categories: any[],
  selectedCategory: string,
  onSelectCategory: (category: string) => void
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Filter supplements based on search and category
  const filteredSupplements = useMemo(() => {
    let filtered = [...supplements];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.dosage && item.dosage.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.timing && item.timing.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, 'fa');
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [supplements, searchQuery, selectedCategory, sortOrder]);

  // Get count of supplements in each category
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === 'all') {
      return supplements.length;
    }
    return supplements.filter(item => item.category === categoryName).length;
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    sortOrder,
    toggleSortOrder,
    showAdvancedFilters,
    setShowAdvancedFilters,
    filteredSupplements,
    getCategoryCount,
    handleClearSearch,
  };
};
