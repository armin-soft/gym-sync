
import { MutableRefObject } from "react";

export interface StudentSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export interface StudentSortProps {
  sortField: "name" | "weight" | "height";
  sortOrder: "asc" | "desc";
  toggleSort: (field: "name" | "weight" | "height") => void;
}

export interface StudentSearchSortProps extends StudentSearchProps, StudentSortProps {
  selectedExerciseType?: string;
  setSelectedExerciseType?: (type: string | null) => void;
  selectedCategory?: number | null;
  setSelectedCategory?: (categoryId: number | null) => void;
  exerciseTypes?: string[];
  categories?: any[];
  showExerciseFilters?: boolean;
}
