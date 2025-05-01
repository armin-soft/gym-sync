
import React, { useState } from "react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { SearchInput } from "./SearchInput";
import { TypeSelector } from "./TypeSelector";
import { CategorySelector } from "./CategorySelector";
import { SortButton } from "./SortButton";
import { FilterButton } from "./FilterButton";
import { ActiveFilterTags } from "./ActiveFilterTags";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter, Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExerciseSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExerciseType: string;
  setSelectedExerciseType: (type: string) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: any[];
  categories: any[];
  filteredCategories: any[];
  handleClearSearch: () => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
}

export const ExerciseSearchFilters: React.FC<ExerciseSearchFiltersProps> = ({
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
  
  // State to control dropdown visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get the names for display
  const getSelectedTypeName = () => {
    return selectedExerciseType || "انتخاب نوع حرکت";
  };
  
  const getSelectedCategoryName = () => {
    if (!selectedCategoryId) return "انتخاب دسته‌بندی";
    const category = categories.find(cat => cat.id === selectedCategoryId);
    return category?.name || "انتخاب دسته‌بندی";
  };

  // Responsive background classes
  const getBgClass = () => {
    if (deviceInfo.isMobile) {
      return "sticky top-0 z-30 bg-gradient-to-b from-background via-background to-transparent backdrop-blur-xl pb-3 px-1 pt-2";
    }
    return "sticky top-0 z-30 bg-gradient-to-b from-background via-background to-transparent backdrop-blur-xl pb-3 px-1 pt-2";
  };

  return (
    <div className={getBgClass()}>
      <div className={`flex flex-col gap-2 ${deviceInfo.isTablet ? "md:flex-row md:gap-3" : deviceInfo.isMobile ? "gap-2" : "md:flex-row md:gap-3"}`}>
        {/* Hierarchical Menu Dropdown */}
        <Card className="p-2 flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Menu className="text-muted-foreground h-4 w-4" />
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
          
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-8 px-2 hover:bg-indigo-50 text-indigo-600"
              >
                {selectedExerciseType ? "تغییر" : "انتخاب"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>انتخاب نوع حرکت</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {exerciseTypes.map(type => (
                <DropdownMenuItem 
                  key={type}
                  className={cn(selectedExerciseType === type ? "bg-indigo-50 text-indigo-700 font-medium" : "")}
                  onClick={() => {
                    setSelectedExerciseType(type);
                    if (selectedExerciseType !== type) {
                      setSelectedCategoryId(null);
                    }
                  }}
                >
                  {type}
                </DropdownMenuItem>
              ))}
              
              {selectedExerciseType && filteredCategories.length > 0 && (
                <>
                  <DropdownMenuLabel className="mt-2">انتخاب دسته‌بندی</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {filteredCategories.map(category => (
                    <DropdownMenuItem 
                      key={category.id}
                      className={cn(selectedCategoryId === category.id ? "bg-indigo-50 text-indigo-700 font-medium" : "")}
                      onClick={() => {
                        setSelectedCategoryId(category.id);
                        setIsMenuOpen(false);
                      }}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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
