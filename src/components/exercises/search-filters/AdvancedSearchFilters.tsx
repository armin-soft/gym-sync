
import React from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { SearchInput } from "./SearchInput";
import { SortButton } from "./SortButton";
import { FilterButton } from "./FilterButton";
import { ActiveFilterTags } from "./ActiveFilterTags";
import { Card } from "@/components/ui/card";
import { 
  Dumbbell, 
  ChevronRight, 
  FolderTree 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdvancedSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: any[];
  categories: any[];
  filteredCategories: any[];
  handleClearSearch: () => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
}

export const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  categories,
  filteredCategories,
  handleClearSearch,
  toggleSortOrder,
  sortOrder,
}) => {
  const hasFilters = searchQuery || selectedExerciseType || selectedCategoryId;
  const activeFilterCount = [
    searchQuery ? 1 : 0,
    selectedExerciseType ? 1 : 0,
    selectedCategoryId ? 1 : 0,
  ].reduce((a, b) => a + b, 0);
  
  const deviceInfo = useDeviceInfo();

  // Responsive background classes
  const getBgClass = () => {
    if (deviceInfo.isMobile) {
      return "sticky top-0 z-30 bg-gradient-to-b from-background via-background to-transparent backdrop-blur-xl pb-3 px-1 pt-2";
    }
    return "sticky top-0 z-30 bg-gradient-to-b from-background via-background to-transparent backdrop-blur-xl pb-3 px-1 pt-2";
  };

  const getSelectedTypeName = () => {
    return selectedExerciseType || "انتخاب نوع حرکت";
  };
  
  const getSelectedCategoryName = () => {
    if (!selectedCategoryId) return "انتخاب دسته‌بندی";
    const category = filteredCategories.find(cat => cat.id === selectedCategoryId);
    return category?.name || "انتخاب دسته‌بندی";
  };

  return (
    <div className={getBgClass()}>
      <div className={`flex flex-col gap-2 ${deviceInfo.isTablet ? "md:flex-row md:gap-3" : deviceInfo.isMobile ? "gap-2" : "md:flex-row md:gap-3"}`}>
        {/* Hierarchical Selection Path */}
        <Card className="p-2 flex-1 flex items-center justify-between bg-gradient-to-r from-background to-muted/20">
          <div className="flex items-center gap-2">
            <Dumbbell className="text-primary h-4 w-4" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">مسیر انتخاب:</span>
              <span className="font-medium">
                {selectedExerciseType ? (
                  <>
                    {getSelectedTypeName()} 
                    {selectedCategoryId && (
                      <> <span className="text-muted-foreground mx-1">{'›'}</span> {getSelectedCategoryName()}</>
                    )}
                  </>
                ) : (
                  "انتخاب نوع حرکت"
                )}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <div className={cn(
              "flex items-center gap-1.5 text-xs bg-primary/10 text-primary font-medium px-2 py-1 rounded-md",
              !selectedExerciseType && "opacity-50"
            )}>
              <Dumbbell className="h-3 w-3" />
              <span>{getSelectedTypeName()}</span>
            </div>
            
            {selectedExerciseType && (
              <>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <div className={cn(
                  "flex items-center gap-1.5 text-xs bg-secondary/10 text-secondary font-medium px-2 py-1 rounded-md",
                  !selectedCategoryId && "opacity-50"
                )}>
                  <FolderTree className="h-3 w-3" />
                  <span>{getSelectedCategoryName()}</span>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Search Input */}
        <SearchInput 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        <div className={`flex gap-2 ${deviceInfo.isTablet ? "md:gap-3" : deviceInfo.isMobile ? "gap-2" : "md:gap-3"}`}>
          {/* Filter Button */}
          <FilterButton
            searchQuery={searchQuery}
            selectedExerciseType={selectedExerciseType}
            setSelectedExerciseType={setSelectedExerciseType}
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            exerciseTypes={exerciseTypes}
            filteredCategories={filteredCategories}
            handleClearSearch={handleClearSearch}
            toggleSortOrder={toggleSortOrder}
            sortOrder={sortOrder}
            activeFilterCount={activeFilterCount}
          />
          
          {/* Sort Button */}
          <SortButton 
            sortOrder={sortOrder}
            toggleSortOrder={toggleSortOrder}
          />
        </div>
      </div>
      
      {/* Active Filter Tags */}
      {hasFilters && (
        <ActiveFilterTags
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedExerciseType={selectedExerciseType}
          setSelectedExerciseType={setSelectedExerciseType}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          categories={categories}
          activeFilterCount={activeFilterCount}
          handleClearSearch={handleClearSearch}
        />
      )}
    </div>
  );
};
