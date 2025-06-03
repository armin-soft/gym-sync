
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Grid3X3, List, ArrowUpDown } from "lucide-react";

interface ExerciseFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  categories: any[];
  exerciseTypes: string[];
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const ExerciseFilters: React.FC<ExerciseFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  categories,
  exerciseTypes,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search */}
            <div className="lg:col-span-4 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="جستجو در تمرینات..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pr-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            {/* Type Filter */}
            <div className="lg:col-span-2">
              <Select value={selectedType || "all-types"} onValueChange={(value) => onTypeChange(value === "all-types" ? null : value)}>
                <SelectTrigger className="border-gray-200 focus:border-emerald-500">
                  <SelectValue placeholder="نوع تمرین" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">همه انواع</SelectItem>
                  {exerciseTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-2">
              <Select value={selectedCategory || "all-categories"} onValueChange={(value) => onCategoryChange(value === "all-categories" ? null : value)}>
                <SelectTrigger className="border-gray-200 focus:border-emerald-500">
                  <SelectValue placeholder="دسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">همه دسته‌ها</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="lg:col-span-2">
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="border-gray-200 focus:border-emerald-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">نام</SelectItem>
                  <SelectItem value="category">دسته‌بندی</SelectItem>
                  <SelectItem value="recent">جدیدترین</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode */}
            <div className="lg:col-span-2 flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => onViewModeChange("grid")}
                className={viewMode === "grid" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => onViewModeChange("list")}
                className={viewMode === "list" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
