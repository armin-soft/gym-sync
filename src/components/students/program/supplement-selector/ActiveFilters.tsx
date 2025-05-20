
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ActiveFiltersProps {
  selectedCategory: string | null;
  clearCategory: () => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedCategory,
  clearCategory
}) => {
  if (!selectedCategory) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Badge 
        variant="outline"
        className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200"
      >
        {selectedCategory}
        <button
          onClick={clearCategory}
          className="h-3.5 w-3.5 rounded-full bg-blue-200 text-blue-700 hover:bg-blue-300 inline-flex items-center justify-center"
        >
          <span className="sr-only">Remove</span>
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.877075 0.877075L5.12292 5.12292M0.877075 5.12292L5.12292 0.877075" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </Badge>
    </div>
  );
};

export default ActiveFilters;
