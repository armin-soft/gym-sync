
import { useState, useMemo } from "react";

export const useSupplementStageLogic = (
  supplements: any[],
  categories: any[],
  selectedCategory: string,
  onSelectCategory: (category: string) => void
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Filter supplements based on search and category
  const filteredSupplements = useMemo(() => {
    let filtered = supplements;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(supplement =>
        supplement?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      const selectedCat = categories.find(cat => 
        cat && cat.id !== undefined && cat.id.toString() === selectedCategory
      );
      if (selectedCat) {
        filtered = filtered.filter(supplement => 
          supplement?.categoryId === selectedCat.id
        );
      }
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      if (!a?.name || !b?.name) return 0;
      const comparison = a.name.localeCompare(b.name, 'fa');
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [supplements, searchQuery, selectedCategory, categories, sortOrder]);

  // Get count for each category
  const getCategoryCount = (categoryId: string | number) => {
    if (categoryId === 'all') {
      return supplements.length;
    }
    return supplements.filter(s => s?.categoryId === categoryId).length;
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSelectCategory('all');
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
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
