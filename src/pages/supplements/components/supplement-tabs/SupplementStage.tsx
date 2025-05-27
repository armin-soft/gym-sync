
import React from "react";
import { SupplementCategory } from "@/types/supplement";
import { SupplementStageHeader } from "./SupplementStageHeader";
import { SupplementStageContent } from "./SupplementStageContent";
import { SupplementStageFooter } from "./SupplementStageFooter";
import { useSupplementStageLogic } from "./hooks/useSupplementStageLogic";

interface SupplementStageProps {
  type: 'supplement' | 'vitamin';
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  supplements: any[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: any) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const SupplementStage: React.FC<SupplementStageProps> = ({
  type,
  categories = [],
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  supplements = [],
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  selectedCategory,
  onSelectCategory,
}) => {
  const {
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
  } = useSupplementStageLogic(supplements, categories, selectedCategory, onSelectCategory);

  // Create "all" category for display
  const allCategory = {
    id: 'all',
    name: 'همه موارد',
    type: type
  };

  const displayCategories = [allCategory, ...categories.filter(cat => cat && cat.id !== undefined)];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header with controls */}
      <SupplementStageHeader
        type={type}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
        showAdvancedFilters={showAdvancedFilters}
        setShowAdvancedFilters={setShowAdvancedFilters}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        categories={categories}
        onAddCategory={onAddCategory}
        onAddSupplement={onAddSupplement}
        handleClearSearch={handleClearSearch}
      />

      {/* Content Area */}
      <SupplementStageContent
        type={type}
        displayCategories={displayCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
        onEditCategory={onEditCategory}
        onDeleteCategory={onDeleteCategory}
        getCategoryCount={getCategoryCount}
        filteredSupplements={filteredSupplements}
        viewMode={viewMode}
        onEditSupplement={onEditSupplement}
        onDeleteSupplement={onDeleteSupplement}
        onAddSupplement={onAddSupplement}
        searchQuery={searchQuery}
        handleClearSearch={handleClearSearch}
      />

      {/* Results Summary */}
      <SupplementStageFooter
        filteredSupplements={filteredSupplements}
        supplements={supplements}
        selectedCategory={selectedCategory}
        categories={categories}
      />
    </div>
  );
};
