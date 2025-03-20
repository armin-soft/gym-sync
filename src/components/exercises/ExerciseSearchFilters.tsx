
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter, SlidersHorizontal } from "lucide-react";
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
import { motion } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4 px-6"
    >
      <div className="flex flex-col md:flex-row gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="جستجوی تمرین..."
            className="pl-10 pr-10 h-10 border-gray-200 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-1 top-1 h-8 w-8 text-gray-400 hover:text-gray-700"
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
            <SelectTrigger className="w-[200px] border-gray-200 focus:ring-primary h-10 bg-gray-50/80">
              <SlidersHorizontal className="h-4 w-4 ml-2 text-gray-500" />
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
              <Button variant="outline" className="gap-2 whitespace-nowrap h-10 bg-gray-50/80 border-gray-200">
                <Filter className="h-4 w-4 text-gray-500" />
                دسته‌بندی
                {selectedCategoryId && (
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs mr-1">
                    ✓
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 max-h-[400px] overflow-y-auto">
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
    </motion.div>
  );
};

export default ExerciseSearchFilters;
