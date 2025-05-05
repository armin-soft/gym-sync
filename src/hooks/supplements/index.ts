
import { useLocalStorage } from "./useLocalStorage";
import { useCategoryManagement } from "./useCategoryManagement";
import { useSupplementManagement } from "./useSupplementManagement";
import { useFilteredData } from "./useFilteredData";
import type { UseSupplementsManagerReturn, SupplementType } from "./types";

export const useSupplementsManager = (initialTab: SupplementType = 'supplement'): UseSupplementsManagerReturn => {
  // Load data from localStorage and manage state
  const {
    supplements,
    setSupplements,
    categories,
    setCategories,
    activeTab,
    selectedCategory,
    isLoading,
    setActiveTab,
    setSelectedCategory,
  } = useLocalStorage(initialTab);

  // Filter data for display
  const { filteredSupplements, relevantCategories } = useFilteredData(
    supplements,
    categories,
    activeTab,
    selectedCategory
  );

  // Category management operations
  const categoryActions = useCategoryManagement(
    supplements,
    setSupplements,
    categories,
    setCategories,
    activeTab
  );

  // Supplement management operations
  const supplementActions = useSupplementManagement(
    supplements,
    setSupplements,
    activeTab
  );

  return {
    // State
    supplements,
    categories,
    activeTab,
    selectedCategory,
    isLoading,
    filteredSupplements,
    relevantCategories,
    
    // Tab actions
    setActiveTab,
    setSelectedCategory,
    
    // Category actions
    ...categoryActions,
    
    // Supplement actions
    ...supplementActions
  };
};

export * from "./types";
