
import React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  selectedCategory: string | null;
  clearCategory: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedCategory,
  clearCategory
}) => {
  if (!selectedCategory) return null;
  
  return (
    <div className="flex items-center gap-2 mb-4 flex-wrap justify-end" dir="rtl">
      <span className="text-xs text-muted-foreground">فیلترهای فعال:</span>
      {selectedCategory && (
        <Badge variant="secondary" className="gap-1 text-xs group">
          <span>{selectedCategory}</span>
          <X 
            className="h-3 w-3 cursor-pointer opacity-70 group-hover:opacity-100" 
            onClick={clearCategory}
          />
        </Badge>
      )}
    </div>
  );
};

export default ActiveFilters;
