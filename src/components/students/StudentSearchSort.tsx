
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StudentSearchSortProps } from "./search-sort/StudentSearchSortTypes";
import { cn } from "@/lib/utils";

export const StudentSearchSort = ({
  searchQuery,
  setSearchQuery,
  sortField,
  sortOrder,
  toggleSort,
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategory,
  setSelectedCategory,
  exerciseTypes = [],
  categories = [],
  showExerciseFilters = false,
}: StudentSearchSortProps) => {
  const hasFilters = selectedExerciseType || selectedCategory !== null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-8"
    >
      <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-gray-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 p-1.5">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              <Search className="h-4.5 w-4.5" />
            </div>
            <Input
              placeholder="جستجو بر اساس نام یا شماره موبایل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-11 py-6 bg-transparent border-none focus-visible:ring-1 focus-visible:ring-indigo-500/20 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-800 dark:text-gray-200"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2 ms-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "h-full md:w-auto gap-2 py-2.5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-gray-900",
                    sortField && "border-indigo-500 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20"
                  )}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="font-medium">مرتب‌سازی</span>
                  {sortField && (
                    <span className="flex items-center gap-1 text-xs bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                      {sortField === "name" ? "نام" : sortField === "weight" ? "وزن" : "قد"}
                      <span className="size-3.5 flex items-center justify-center">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                <DropdownMenuItem 
                  onClick={() => toggleSort("name")}
                  className={`gap-2 ${sortField === "name" ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
                >
                  <span>بر اساس نام</span>
                  {sortField === "name" && (
                    <div className="ml-auto size-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </div>
                  )}
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={() => toggleSort("weight")}
                  className={`gap-2 ${sortField === "weight" ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
                >
                  <span>بر اساس وزن</span>
                  {sortField === "weight" && (
                    <div className="ml-auto size-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </div>
                  )}
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={() => toggleSort("height")}
                  className={`gap-2 ${sortField === "height" ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
                >
                  <span>بر اساس قد</span>
                  {sortField === "height" && (
                    <div className="ml-auto size-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </div>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {showExerciseFilters && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "h-full md:w-auto gap-2 py-2.5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-gray-900",
                      hasFilters && "border-indigo-500 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20"
                    )}
                  >
                    <Filter className="h-4 w-4" />
                    <span className="font-medium">فیلتر</span>
                    {hasFilters && (
                      <span className="flex items-center justify-center size-5 text-xs bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full">
                        {(selectedExerciseType ? 1 : 0) + (selectedCategory !== null ? 1 : 0)}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                  {exerciseTypes.length > 0 && (
                    <>
                      <div className="px-2 py-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">نوع تمرین</div>
                      {exerciseTypes.map((type: any) => (
                        <DropdownMenuItem 
                          key={type.id}
                          onClick={() => setSelectedExerciseType(selectedExerciseType === type.name ? null : type.name)}
                          className={`gap-2 ${selectedExerciseType === type.name ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
                        >
                          <span>{type.name}</span>
                          {selectedExerciseType === type.name && (
                            <div className="ml-auto size-4 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
                              ✓
                            </div>
                          )}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  {categories.length > 0 && (
                    <>
                      <div className="px-2 py-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">دسته بندی</div>
                      {categories.map((category: any) => (
                        <DropdownMenuItem 
                          key={category.id}
                          onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                          className={`gap-2 ${selectedCategory === category.id ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
                        >
                          <span>{category.name}</span>
                          {selectedCategory === category.id && (
                            <div className="ml-auto size-4 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
                              ✓
                            </div>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                  
                  {hasFilters && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => {
                          setSelectedExerciseType(null);
                          setSelectedCategory(null);
                        }}
                        className="gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <X className="h-4 w-4" />
                        <span>حذف همه فیلترها</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
