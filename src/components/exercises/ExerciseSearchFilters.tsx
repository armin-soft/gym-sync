
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ExerciseCategory } from "@/types/exercise";

interface ExerciseSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: string[];
  categories: ExerciseCategory[];
  filteredCategories: ExerciseCategory[];
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
  filteredCategories,
  handleClearSearch,
  toggleSortOrder,
  sortOrder
}) => {
  return (
    <div className="mt-4 px-6">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="جستجوی تمرین..."
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-1 top-1 h-8 w-8 text-muted-foreground hover:text-gray-700"
              onClick={() => setSearchQuery("")}
              title="پاک کردن جستجو"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {exerciseTypes.length > 0 && (
          <Select
            value={selectedExerciseType || "all"}
            onValueChange={(value) => {
              setSelectedExerciseType(value === "all" ? null : value);
              setSelectedCategoryId(null);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="نوع تمرین" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه انواع</SelectItem>
              {exerciseTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {selectedExerciseType && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 whitespace-nowrap">
                <Filter className="h-4 w-4" />
                دسته‌بندی
                {selectedCategoryId && (
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs mr-1">
                    ✓
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 max-h-[400px] overflow-y-auto">
              <DropdownMenuItem 
                onClick={() => setSelectedCategoryId(null)}
                className={!selectedCategoryId ? "bg-primary/10 text-primary font-medium" : ""}
              >
                همه دسته‌بندی‌ها
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              {filteredCategories.length > 0 ? (
                filteredCategories.map(category => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={selectedCategoryId === category.id ? "bg-primary/10 text-primary font-medium" : ""}
                  >
                    {category.name}
                    {category.type && (
                      <span className="mr-auto text-xs text-gray-500">{category.type}</span>
                    )}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled className="text-gray-400">
                  دسته‌بندی‌ای یافت نشد
                </DropdownMenuItem>
              )}
              
              {(searchQuery || selectedCategoryId || selectedExerciseType) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleClearSearch} 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    پاک کردن فیلترها
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
