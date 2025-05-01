
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FilterButtonProps {
  searchQuery: string;
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: string[];
  filteredCategories: any[];
  handleClearSearch: () => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  activeFilterCount: number;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ 
  searchQuery,
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  filteredCategories,
  handleClearSearch,
  toggleSortOrder,
  sortOrder,
  activeFilterCount
}) => {
  return (
    <Card className="p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={`h-8 px-2 text-sm hover:bg-indigo-50 ${activeFilterCount > 0 ? "text-indigo-600" : ""}`}
          >
            <Filter className="h-4 w-4 mr-1" />
            <span>فیلترها</span>
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-indigo-600 hover:bg-indigo-700">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60" sideOffset={8}>
          <DropdownMenuLabel>فیلتر حرکات</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs">نوع حرکت</DropdownMenuLabel>
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
          </DropdownMenuGroup>
          
          {selectedExerciseType && filteredCategories.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">دسته‌بندی</DropdownMenuLabel>
                {filteredCategories.map(category => (
                  <DropdownMenuItem 
                    key={category.id}
                    className={cn(selectedCategoryId === category.id ? "bg-indigo-50 text-indigo-700 font-medium" : "")}
                    onClick={() => setSelectedCategoryId(category.id)}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs">مرتب‌سازی</DropdownMenuLabel>
            <DropdownMenuItem 
              className={sortOrder === "asc" ? "bg-indigo-50 text-indigo-700 font-medium" : ""}
              onClick={() => toggleSortOrder()}
            >
              به ترتیب الفبا (صعودی)
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={sortOrder === "desc" ? "bg-indigo-50 text-indigo-700 font-medium" : ""}
              onClick={() => toggleSortOrder()}
            >
              به ترتیب الفبا (نزولی)
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          {activeFilterCount > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600 hover:text-red-700 hover:bg-red-50 justify-center font-medium"
                onClick={handleClearSearch}
              >
                پاک کردن همه فیلترها
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
};
