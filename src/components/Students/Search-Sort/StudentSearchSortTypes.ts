
export interface StudentSearchSortProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortField: "name" | "weight" | "height";
  sortOrder: "asc" | "desc";
  toggleSort: (field: "name" | "weight" | "height") => void;
}

// Add these two separate interfaces for the individual components
export interface StudentSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export interface StudentSortProps {
  sortField: "name" | "weight" | "height";
  sortOrder: "asc" | "desc";
  toggleSort: (field: "name" | "weight" | "height") => void;
}
