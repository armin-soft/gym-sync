
export interface StudentSearchSortProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortField: "name" | "weight" | "height";
  sortOrder: "asc" | "desc";
  toggleSort: (field: "name" | "weight" | "height") => void;
  selectedExerciseType?: string | null;
  setSelectedExerciseType?: (type: string | null) => void;
  selectedCategory?: number | null;
  setSelectedCategory?: (id: number | null) => void;
  exerciseTypes?: any[];
  categories?: any[];
  showExerciseFilters?: boolean;
}
