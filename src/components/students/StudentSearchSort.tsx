
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListFilter, Search, UserRound, Scale, Ruler, ArrowUp, ArrowDown, Dumbbell, FolderTree, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Exercise, ExerciseCategory } from "@/types/exercise";

interface StudentSearchSortProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortField: "name" | "weight" | "height";
  sortOrder: "asc" | "desc";
  toggleSort: (field: "name" | "weight" | "height") => void;
  selectedExerciseType?: string;
  setSelectedExerciseType?: (type: string | null) => void;
  selectedCategory?: number | null;
  setSelectedCategory?: (categoryId: number | null) => void;
  exerciseTypes?: string[];
  categories?: ExerciseCategory[];
  showExerciseFilters?: boolean;
}

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
  showExerciseFilters = false
}: StudentSearchSortProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(selectedExerciseType || null);
  const [filteredCategories, setFilteredCategories] = useState<ExerciseCategory[]>([]);

  useEffect(() => {
    if (selectedType && categories) {
      setFilteredCategories(categories.filter(cat => cat.type === selectedType));
    } else {
      setFilteredCategories([]);
    }
  }, [selectedType, categories]);

  useEffect(() => {
    setSelectedType(selectedExerciseType || null);
  }, [selectedExerciseType]);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    if (setSelectedExerciseType) {
      setSelectedExerciseType(type);
    }
    if (setSelectedCategory) {
      setSelectedCategory(null);
    }
  };

  const handleCategorySelect = (categoryId: number) => {
    if (setSelectedCategory) {
      setSelectedCategory(categoryId);
    }
  };

  const handleClearFilters = () => {
    setSelectedType(null);
    if (setSelectedExerciseType) {
      setSelectedExerciseType(null);
    }
    if (setSelectedCategory) {
      setSelectedCategory(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="grid sm:grid-cols-[1fr_auto] gap-4"
    >
      <Card className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border-indigo-100/30 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-md hover:bg-white/70 dark:hover:bg-slate-900/70 overflow-hidden">
        <div className="relative p-3">
          <div className="absolute right-5 top-1/2 -translate-y-1/2 size-8 flex items-center justify-center rounded-full bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400">
            <Search className="h-4 w-4" />
          </div>
          <Input
            placeholder="جستجو بر اساس نام یا شماره موبایل..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="pl-4 pr-14 py-6 bg-transparent border-none focus-visible:ring-1 focus-visible:ring-indigo-500/20 placeholder:text-slate-400"
          />
        </div>
      </Card>
      
      <div className="flex gap-2">
        {showExerciseFilters && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto gap-2 h-[3.25rem] border-indigo-100 dark:border-indigo-900 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
              >
                <Filter className="h-4 w-4" />
                فیلتر تمرین‌ها
                {(selectedType || selectedCategory) && (
                  <Badge className="ml-1 bg-indigo-500">فعال</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 max-h-[400px] overflow-y-auto border-indigo-100 dark:border-indigo-900 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg">
              <DropdownMenuLabel className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-indigo-500" />
                نوع تمرین
              </DropdownMenuLabel>
              
              <DropdownMenuGroup>
                {exerciseTypes.length === 0 ? (
                  <DropdownMenuItem disabled className="text-muted-foreground opacity-50">
                    هیچ نوع تمرینی یافت نشد
                  </DropdownMenuItem>
                ) : (
                  exerciseTypes.map((type) => (
                    <DropdownMenuItem 
                      key={type}
                      onClick={() => handleTypeSelect(type)}
                      className={`gap-2 ${selectedType === type ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
                    >
                      <Dumbbell className="h-4 w-4" />
                      <span>{type}</span>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuGroup>
              
              {selectedType && filteredCategories.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <FolderTree className="h-4 w-4 text-indigo-500" />
                    دسته‌بندی‌ تمرین
                  </DropdownMenuLabel>
                  
                  <DropdownMenuGroup>
                    {filteredCategories.map((category) => (
                      <DropdownMenuItem 
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`gap-2 ${selectedCategory === category.id ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
                      >
                        <FolderTree className="h-4 w-4" />
                        <span>{category.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </>
              )}
              
              {(selectedType || selectedCategory) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleClearFilters}
                    className="gap-2 text-red-600 dark:text-red-400 font-medium"
                  >
                    <Filter className="h-4 w-4" />
                    پاک کردن فیلترها
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto gap-2 h-[3.25rem] border-indigo-100 dark:border-indigo-900 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400"
            >
              <ListFilter className="h-4 w-4" />
              مرتب‌سازی
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 border-indigo-100 dark:border-indigo-900 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg">
            <DropdownMenuItem 
              onClick={() => toggleSort("name")}
              className={`gap-2 ${sortField === "name" ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
            >
              <UserRound className="h-4 w-4" />
              <span>بر اساس نام</span>
              {sortField === "name" && (
                <div className="mr-auto size-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
                  {sortOrder === "asc" ? <ArrowUp className="h-3 w-3 text-indigo-700 dark:text-indigo-300" /> : <ArrowDown className="h-3 w-3 text-indigo-700 dark:text-indigo-300" />}
                </div>
              )}
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => toggleSort("weight")}
              className={`gap-2 ${sortField === "weight" ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
            >
              <Scale className="h-4 w-4" />
              <span>بر اساس وزن</span>
              {sortField === "weight" && (
                <div className="mr-auto size-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
                  {sortOrder === "asc" ? <ArrowUp className="h-3 w-3 text-indigo-700 dark:text-indigo-300" /> : <ArrowDown className="h-3 w-3 text-indigo-700 dark:text-indigo-300" />}
                </div>
              )}
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => toggleSort("height")}
              className={`gap-2 ${sortField === "height" ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-medium' : ''}`}
            >
              <Ruler className="h-4 w-4" />
              <span>بر اساس قد</span>
              {sortField === "height" && (
                <div className="mr-auto size-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
                  {sortOrder === "asc" ? <ArrowUp className="h-3 w-3 text-indigo-700 dark:text-indigo-300" /> : <ArrowDown className="h-3 w-3 text-indigo-700 dark:text-indigo-300" />}
                </div>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
};
