
import React from "react";
import { motion } from "framer-motion";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterButtonProps {
  searchQuery: string;
  selectedExerciseType: string;
  setSelectedExerciseType: (type: string) => void;
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
  const hasFilters = searchQuery || selectedExerciseType || selectedCategoryId;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className={cn(
                  "h-11 w-11 rounded-xl transition-all duration-300 relative",
                  activeFilterCount > 0 
                    ? "bg-primary/10 border-primary/40 text-primary hover:bg-primary/20 hover:border-primary/60" 
                    : "bg-white/50 dark:bg-slate-800/50 border-muted hover:border-muted-foreground/50"
                )}
              >
                {activeFilterCount > 0 ? (
                  <SlidersHorizontal className="h-5 w-5" />
                ) : (
                  <Filter className="h-5 w-5" />
                )}
                
                {activeFilterCount > 0 && (
                  <motion.div 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {activeFilterCount}
                  </motion.div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-4 rounded-xl border border-muted shadow-lg" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">فیلترهای جستجو</h4>
                  {hasFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs hover:bg-destructive/10 hover:text-destructive transition-colors"
                      onClick={handleClearSearch}
                    >
                      <X className="h-3 w-3 mr-1" />
                      پاک کردن همه
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs text-muted-foreground">جستجو</span>
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSelectedExerciseType(e.target.value)}
                      placeholder="عبارت جستجو..."
                      className="h-9 text-sm"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs text-muted-foreground">نوع تمرین</span>
                    <Select
                      value={selectedExerciseType || "all-types"}
                      onValueChange={(value) => {
                        setSelectedExerciseType(value === "all-types" ? "" : value);
                        setSelectedCategoryId(null);
                      }}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="انتخاب نوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-types">همه انواع</SelectItem>
                        {exerciseTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs text-muted-foreground">دسته‌بندی</span>
                    <Select
                      value={selectedCategoryId?.toString() || "all-categories"}
                      onValueChange={(value) =>
                        setSelectedCategoryId(value === "all-categories" ? null : parseInt(value))
                      }
                      disabled={filteredCategories.length === 0}
                    >
                      <SelectTrigger className="h-9 text-sm">
                        <SelectValue placeholder="انتخاب دسته‌بندی" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-categories">همه دسته‌بندی‌ها</SelectItem>
                        {filteredCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs text-muted-foreground">مرتب‌سازی</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full h-9 justify-between text-sm"
                      onClick={toggleSortOrder}
                    >
                      <span>{sortOrder === "asc" ? "صعودی" : "نزولی"}</span>
                      <svg 
                        width="15" 
                        height="15" 
                        viewBox="0 0 15 15" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className={cn("transform transition-transform", 
                          sortOrder === "asc" ? "rotate-0" : "rotate-180"
                        )}
                      >
                        <path 
                          d="M7.5 3C7.77614 3 8 3.22386 8 3.5L8 11.2929L10.1464 9.14645C10.3417 8.95118 10.6583 8.95118 10.8536 9.14645C11.0488 9.34171 11.0488 9.65829 10.8536 9.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L4.14645 9.85355C3.95118 9.65829 3.95118 9.34171 4.14645 9.14645C4.34171 8.95118 4.65829 8.95118 4.85355 9.14645L7 11.2929L7 3.5C7 3.22386 7.22386 3 7.5 3Z" 
                          fill="currentColor" 
                          fillRule="evenodd" 
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Button>
                  </div>
                  
                  {!hasFilters && (
                    <div className="text-center text-muted-foreground text-sm py-2">
                      فیلتری انتخاب نشده است
                    </div>
                  )}
                  
                  {hasFilters && (
                    <Button
                      className="w-full mt-2 bg-gradient-to-br from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700"
                      onClick={() => document.body.click()} // بستن پاپ‌آور
                    >
                      <Filter className="h-4 w-4 mr-1" /> 
                      اعمال فیلترها
                    </Button>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </TooltipTrigger>
        <TooltipContent>
          فیلترها و تنظیمات
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
