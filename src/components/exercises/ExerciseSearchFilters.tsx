
import React from "react";
import { Check, ChevronDown, Filter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface ExerciseSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExerciseType: string;
  setSelectedExerciseType: (type: string) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: any[];
  categories: any[];
  filteredCategories: any[];
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
  categories,
  filteredCategories,
  handleClearSearch,
  toggleSortOrder,
  sortOrder,
}) => {
  const hasFilters = searchQuery || selectedExerciseType || selectedCategoryId;
  const activeFilterCount = [
    searchQuery ? 1 : 0,
    selectedExerciseType ? 1 : 0,
    selectedCategoryId ? 1 : 0,
  ].reduce((a, b) => a + b, 0);
  
  const deviceInfo = useDeviceInfo();

  // Determine responsive classes based on device type
  const getBgClass = () => {
    if (deviceInfo.isMobile) {
      return "sticky top-0 z-30 bg-gradient-to-b from-background via-background to-transparent backdrop-blur-md pb-3 px-1 pt-2";
    }
    return "sticky top-0 z-30 bg-gradient-to-b from-background via-background to-transparent backdrop-blur-sm pb-6 px-1";
  };

  return (
    <div className={getBgClass()}>
      <div className={cn(
        "flex flex-col gap-2",
        deviceInfo.isTablet ? "md:flex-row md:gap-3" : 
        deviceInfo.isMobile ? "gap-2" : "md:flex-row md:gap-3"
      )}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی تمرین..."
            className="pr-3 pl-9 h-10 text-sm bg-background/80 backdrop-blur-sm border-border/50 focus-visible:ring-primary/20"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">پاک کردن جستجو</span>
            </Button>
          )}
        </div>

        <div className={cn(
          "flex gap-2",
          deviceInfo.isTablet ? "md:gap-3" : 
          deviceInfo.isMobile ? "gap-2" : "md:gap-3"
        )}>
          <Select
            value={selectedExerciseType || "all-types"}
            onValueChange={(value) => {
              setSelectedExerciseType(value === "all-types" ? "" : value);
              setSelectedCategoryId(null);
            }}
          >
            <SelectTrigger
              className={cn(
                "h-10 text-sm bg-background/80 backdrop-blur-sm border-border/50",
                deviceInfo.isMobile ? "min-w-[110px]" : "min-w-[160px]"
              )}
            >
              <SelectValue placeholder="نوع تمرین" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectGroup>
                <SelectLabel>نوع تمرین</SelectLabel>
                <SelectItem value="all-types">همه انواع</SelectItem>
                {exerciseTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={selectedCategoryId?.toString() || "all-categories"}
            onValueChange={(value) =>
              setSelectedCategoryId(value === "all-categories" ? null : parseInt(value))
            }
            disabled={filteredCategories.length === 0}
          >
            <SelectTrigger
              className={cn(
                "h-10 text-sm bg-background/80 backdrop-blur-sm border-border/50",
                filteredCategories.length === 0 &&
                  "opacity-50 cursor-not-allowed",
                deviceInfo.isMobile ? "min-w-[110px]" : "min-w-[160px]"
              )}
            >
              <SelectValue placeholder="دسته‌بندی" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectGroup>
                <SelectLabel>دسته‌بندی</SelectLabel>
                <SelectItem value="all-categories">همه دسته‌بندی‌ها</SelectItem>
                {filteredCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className={cn(
                  "h-10 w-10 bg-background/80 backdrop-blur-sm border-border/50",
                  activeFilterCount > 0 && "border-primary/30 bg-primary/5"
                )}
              >
                <Filter className="h-4 w-4" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-3" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">فیلترها</h4>
                  {hasFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs hover:bg-destructive/10 hover:text-destructive transition-colors"
                      onClick={handleClearSearch}
                    >
                      <X className="h-3 w-3 mr-1" />
                      پاک کردن همه
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  {searchQuery && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">جستجو:</span>
                      <Badge variant="secondary" className="gap-1 hover:bg-secondary/80">
                        {searchQuery}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setSearchQuery("")} 
                        />
                      </Badge>
                    </div>
                  )}
                  
                  {selectedExerciseType && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">نوع تمرین:</span>
                      <Badge variant="secondary" className="gap-1 hover:bg-secondary/80">
                        {selectedExerciseType}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setSelectedExerciseType("")} 
                        />
                      </Badge>
                    </div>
                  )}
                  
                  {selectedCategoryId && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">دسته‌بندی:</span>
                      <Badge variant="secondary" className="gap-1 hover:bg-secondary/80">
                        {categories.find((c) => c.id === selectedCategoryId)?.name}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setSelectedCategoryId(null)} 
                        />
                      </Badge>
                    </div>
                  )}
                  
                  {!hasFilters && (
                    <div className="text-center text-muted-foreground text-sm py-3">
                      فیلتری انتخاب نشده است
                    </div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {hasFilters && (
        <motion.div 
          className="mt-2 flex items-center flex-wrap gap-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeFilterCount > 0 && (
            <span className="text-xs text-muted-foreground">
              فیلترهای فعال:
            </span>
          )}
          
          {searchQuery && (
            <Badge variant="outline" className="text-xs px-2 py-1 bg-background/50 gap-1.5">
              جستجو: {searchQuery}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSearchQuery("")} 
              />
            </Badge>
          )}
          
          {selectedExerciseType && (
            <Badge variant="outline" className="text-xs px-2 py-1 bg-background/50 gap-1.5">
              نوع تمرین: {selectedExerciseType}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSelectedExerciseType("")} 
              />
            </Badge>
          )}
          
          {selectedCategoryId && (
            <Badge variant="outline" className="text-xs px-2 py-1 bg-background/50 gap-1.5">
              دسته‌بندی: {categories.find((c) => c.id === selectedCategoryId)?.name}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSelectedCategoryId(null)} 
              />
            </Badge>
          )}
          
          <Button
            variant="link"
            size="sm"
            className="h-6 text-xs text-primary px-0"
            onClick={handleClearSearch}
          >
            پاک کردن همه
          </Button>
        </motion.div>
      )}
    </div>
  );
};
