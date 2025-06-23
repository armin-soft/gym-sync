
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { ExerciseCategory } from "@/types/exercise";
import { cn } from "@/lib/utils";

interface ExerciseFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  categories: ExerciseCategory[];
  exerciseTypes: string[];
}

const ExerciseFilters: React.FC<ExerciseFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
  categories,
  exerciseTypes
}) => {
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedType("all");
  };

  const hasActiveFilters = searchTerm || selectedCategory !== "all" || selectedType !== "all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="جستجو در حرکات تمرینی..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 border-gray-200 focus:border-emerald-300 focus:ring-emerald-200"
              />
            </div>

            {/* Exercise Types Filter */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <Filter className="w-4 h-4" />
                انواع تمرین
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "transition-all duration-300",
                    selectedCategory === "all" 
                      ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg" 
                      : "border-gray-200 hover:bg-emerald-50 hover:border-emerald-200"
                  )}
                >
                  همه انواع
                </Button>
                {exerciseTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedCategory === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(type)}
                    className={cn(
                      "transition-all duration-300",
                      selectedCategory === type 
                        ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg" 
                        : "border-gray-200 hover:bg-emerald-50 hover:border-emerald-200"
                    )}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Categories Filter */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-white">دسته‌بندی‌ها</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("all")}
                  className={cn(
                    "transition-all duration-300",
                    selectedType === "all" 
                      ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg" 
                      : "border-gray-200 hover:bg-sky-50 hover:border-sky-200"
                  )}
                >
                  همه دسته‌ها
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedType === category.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(category.name)}
                    className={cn(
                      "transition-all duration-300",
                      selectedType === category.name 
                        ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg" 
                        : "border-gray-200 hover:bg-sky-50 hover:border-sky-200"
                    )}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex justify-end"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                >
                  <X className="w-4 h-4 ml-2" />
                  پاک کردن فیلترها
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExerciseFilters;
