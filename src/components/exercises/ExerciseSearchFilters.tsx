
import React, { useState, useEffect } from "react";
import { Check, ChevronDown, Filter, Search, X, SlidersHorizontal, LayoutGrid } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // فیلتر تاگ‌های فعال
  const renderActiveTags = () => {
    if (!hasFilters) return null;
    
    return (
      <AnimatePresence>
        <motion.div 
          className="mt-3 flex flex-wrap items-center gap-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {searchQuery && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Badge 
                variant="secondary" 
                className="px-2 py-1 flex items-center gap-1.5 bg-primary/10 text-primary hover:bg-primary/15 transition-all duration-300"
              >
                <span className="text-xs">جستجو: {searchQuery}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 rounded-full p-0 hover:bg-primary/20" 
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-2.5 w-2.5" />
                  <span className="sr-only">حذف جستجو</span>
                </Button>
              </Badge>
            </motion.div>
          )}
          
          {selectedExerciseType && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Badge 
                variant="secondary" 
                className="px-2 py-1 flex items-center gap-1.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/15 transition-all duration-300"
              >
                <span className="text-xs">نوع: {selectedExerciseType}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 rounded-full p-0 hover:bg-indigo-500/20" 
                  onClick={() => setSelectedExerciseType("")}
                >
                  <X className="h-2.5 w-2.5" />
                  <span className="sr-only">حذف نوع</span>
                </Button>
              </Badge>
            </motion.div>
          )}
          
          {selectedCategoryId && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Badge 
                variant="secondary" 
                className="px-2 py-1 flex items-center gap-1.5 bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-500/15 transition-all duration-300"
              >
                <span className="text-xs">دسته‌بندی: {categories.find((c) => c.id === selectedCategoryId)?.name}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 rounded-full p-0 hover:bg-violet-500/20" 
                  onClick={() => setSelectedCategoryId(null)}
                >
                  <X className="h-2.5 w-2.5" />
                  <span className="sr-only">حذف دسته‌بندی</span>
                </Button>
              </Badge>
            </motion.div>
          )}
          
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="h-6 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
              >
                <X className="h-3 w-3 mr-1" />
                پاک کردن همه
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  // تعیین کلاس‌های ریسپانسیو بر اساس نوع دستگاه
  const getBgClass = () => {
    if (deviceInfo.isMobile) {
      return "sticky top-0 z-30 bg-gradient-to-b from-background via-background to-transparent backdrop-blur-xl pb-3 px-1 pt-2";
    }
    return "sticky top-0 z-30 bg-gradient-to-b from-background via-background to-transparent backdrop-blur-xl pb-3 px-1 pt-2";
  };

  return (
    <div className={getBgClass()}>
      <div className={cn(
        "flex flex-col gap-2",
        deviceInfo.isTablet ? "md:flex-row md:gap-3" : 
        deviceInfo.isMobile ? "gap-2" : "md:flex-row md:gap-3"
      )}>
        <div className={cn(
          "relative flex-1 group/search",
          isSearchFocused && "z-10"
        )}>
          <div className={cn(
            "absolute inset-0 rounded-xl transition-all duration-300",
            isSearchFocused ? "bg-white/90 dark:bg-slate-800/90 shadow-lg ring-2 ring-primary/30 dark:ring-primary/20" : "bg-white/50 dark:bg-slate-800/50"
          )} />
          <Search className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300",
            isSearchFocused ? "text-primary" : "text-muted-foreground"
          )} />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="جستجوی تمرین..."
            className={cn(
              "pr-3 pl-9 h-11 text-sm bg-transparent border-none focus-visible:ring-0 relative z-10 transition-all duration-300",
              isSearchFocused ? "font-medium" : ""
            )}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full hover:bg-muted/80 z-10"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">پاک کردن جستجو</span>
            </Button>
          )}
          
          <motion.span 
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isSearchFocused || searchQuery ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className={cn(
          "flex gap-2",
          deviceInfo.isTablet ? "md:gap-3" : 
          deviceInfo.isMobile ? "gap-2" : "md:gap-3"
        )}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Select
                    value={selectedExerciseType || "all-types"}
                    onValueChange={(value) => {
                      setSelectedExerciseType(value === "all-types" ? "" : value);
                      setSelectedCategoryId(null);
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        "h-11 text-sm border rounded-xl transition-all duration-300",
                        selectedExerciseType 
                          ? "border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" 
                          : "bg-white/50 dark:bg-slate-800/50 border-muted hover:border-muted-foreground/50",
                        deviceInfo.isMobile ? "min-w-[110px]" : "min-w-[160px]"
                      )}
                    >
                      <SelectValue placeholder="نوع تمرین" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]" position="popper" side="bottom" sideOffset={5}>
                      <SelectGroup>
                        <SelectLabel className="text-xs font-medium text-muted-foreground">نوع تمرین</SelectLabel>
                        <SelectItem value="all-types" className="flex items-center">
                          <div className="flex items-center justify-between w-full">
                            <span>همه انواع</span>
                            {!selectedExerciseType && <Check className="h-4 w-4 opacity-70" />}
                          </div>
                        </SelectItem>
                        {exerciseTypes.map((type) => (
                          <SelectItem key={type} value={type} className="flex items-center">
                            <div className="flex items-center justify-between w-full">
                              <span>{type}</span>
                              {selectedExerciseType === type && <Check className="h-4 w-4 opacity-70" />}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {selectedExerciseType && (
                    <motion.div 
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                انتخاب نوع تمرین
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Select
                    value={selectedCategoryId?.toString() || "all-categories"}
                    onValueChange={(value) =>
                      setSelectedCategoryId(value === "all-categories" ? null : parseInt(value))
                    }
                    disabled={filteredCategories.length === 0}
                  >
                    <SelectTrigger
                      className={cn(
                        "h-11 text-sm border rounded-xl transition-all duration-300",
                        selectedCategoryId 
                          ? "border-violet-300 dark:border-violet-800 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400" 
                          : "bg-white/50 dark:bg-slate-800/50 border-muted hover:border-muted-foreground/50",
                        filteredCategories.length === 0 &&
                          "opacity-50 cursor-not-allowed",
                        deviceInfo.isMobile ? "min-w-[110px]" : "min-w-[160px]"
                      )}
                    >
                      <SelectValue placeholder="دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]" position="popper" side="bottom" sideOffset={5}>
                      <SelectGroup>
                        <SelectLabel className="text-xs font-medium text-muted-foreground">دسته‌بندی</SelectLabel>
                        <SelectItem value="all-categories" className="flex items-center">
                          <div className="flex items-center justify-between w-full">
                            <span>همه دسته‌بندی‌ها</span>
                            {!selectedCategoryId && <Check className="h-4 w-4 opacity-70" />}
                          </div>
                        </SelectItem>
                        {filteredCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()} className="flex items-center">
                            <div className="flex items-center justify-between w-full">
                              <span>{category.name}</span>
                              {selectedCategoryId === category.id && <Check className="h-4 w-4 opacity-70" />}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {selectedCategoryId && (
                    <motion.div 
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-violet-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                انتخاب دسته‌بندی
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
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
                            onChange={(e) => setSearchQuery(e.target.value)}
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={toggleSortOrder}
                  className="h-11 w-11 rounded-xl bg-white/50 dark:bg-slate-800/50 border-muted hover:border-muted-foreground/50 transition-all duration-300"
                >
                  <svg 
                    width="15" 
                    height="15" 
                    viewBox="0 0 15 15" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={cn("h-5 w-5 transform transition-transform", 
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
              </TooltipTrigger>
              <TooltipContent>
                {sortOrder === "asc" ? "مرتب‌سازی صعودی" : "مرتب‌سازی نزولی"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* نمایش تگ‌های فعال */}
      {renderActiveTags()}
    </div>
  );
};
