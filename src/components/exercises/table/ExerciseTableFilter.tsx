
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ExerciseCategory } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseTableFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategoryId: number | null;
  onCategoryChange: (id: number | null) => void;
  categories: ExerciseCategory[];
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  isMobile?: boolean;
}

export const ExerciseTableFilter: React.FC<ExerciseTableFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategoryId,
  onCategoryChange,
  categories,
  onClearFilters,
  hasActiveFilters,
  isMobile
}) => {
  return (
    <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
      <div className="relative flex-1">
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>
        <Input
          placeholder="جستجوی حرکت..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-9 sm:pr-10 text-sm h-8 sm:h-9 md:h-10"
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-1.5 sm:gap-2 w-full sm:w-auto h-8 sm:h-9 md:h-10 text-xs sm:text-sm whitespace-nowrap">
            <Filter className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
            فیلتر دسته‌بندی
            {selectedCategoryId && <span className="px-1 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs mr-1">{toPersianNumbers(1)}</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isMobile ? "center" : "end"} className="w-[200px] sm:w-56">
          <DropdownMenuItem 
            onClick={() => onCategoryChange(null)}
            className={!selectedCategoryId ? "bg-indigo-50 text-indigo-700 font-medium" : ""}
          >
            همه دسته‌بندی‌ها
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          
          {categories.map(category => (
            <DropdownMenuItem
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={selectedCategoryId === category.id ? "bg-indigo-50 text-indigo-700 font-medium" : ""}
            >
              {category.name}
            </DropdownMenuItem>
          ))}
          
          {hasActiveFilters && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onClearFilters} className="text-red-600">
                پاک کردن فیلترها
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ExerciseTableFilter;
