
import { SearchBar } from "./SearchBar";
import { ViewModeToggle } from "./ViewModeToggle";
import { FiltersPanel } from "./FiltersPanel";

interface SearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  type: 'supplement' | 'vitamin';
  isMobile: boolean;
}

export const SearchAndFilters = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  type,
  isMobile
}: SearchAndFiltersProps) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-3 sm:mb-4 md:mb-6">
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          type={type}
        />
        
        <ViewModeToggle 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          showFilters={showFilters} 
          setShowFilters={setShowFilters}
          isMobile={isMobile}
        />
      </div>
      
      <FiltersPanel showFilters={showFilters} />
    </>
  );
};
