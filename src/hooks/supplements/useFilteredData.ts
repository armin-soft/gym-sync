
import { useMemo } from "react";
import type { Supplement, SupplementCategory } from "@/types/supplement";
import type { SupplementType } from "./types";

export const useFilteredData = (
  supplements: Supplement[],
  categories: SupplementCategory[],
  activeTab: SupplementType,
  selectedCategory: string
) => {
  // Filter supplements by type and selected category
  const filteredSupplements = useMemo(() => {
    let filtered = supplements.filter((s) => s.type === activeTab);
    
    if (selectedCategory) {
      filtered = filtered.filter((s) => s.category === selectedCategory);
    }
    
    return filtered;
  }, [supplements, activeTab, selectedCategory]);

  // Categories related to the active tab
  const relevantCategories = useMemo(() => {
    return categories.filter(c => c.type === activeTab);
  }, [categories, activeTab]);

  return {
    filteredSupplements,
    relevantCategories
  };
};
