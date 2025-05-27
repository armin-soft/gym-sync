
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Grid, List, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SupplementCategory } from "@/types/supplement";
import { CategoryCard } from "./CategoryCard";
import { SupplementCard } from "./SupplementCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface SupplementStageProps {
  type: 'supplement' | 'vitamin';
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  supplements: any[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: any) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const SupplementStage: React.FC<SupplementStageProps> = ({
  type,
  categories = [],
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  supplements = [],
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  selectedCategory,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Create "all" category for display
  const allCategory = {
    id: 'all',
    name: 'همه موارد',
    type: type
  };

  const displayCategories = [allCategory, ...categories.filter(cat => cat && cat.id !== undefined)];

  // Filter supplements based on search and category
  const filteredSupplements = useMemo(() => {
    let filtered = supplements;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(supplement =>
        supplement?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      const selectedCat = categories.find(cat => 
        cat && cat.id !== undefined && cat.id.toString() === selectedCategory
      );
      if (selectedCat) {
        filtered = filtered.filter(supplement => 
          supplement?.categoryId === selectedCat.id
        );
      }
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      if (!a?.name || !b?.name) return 0;
      const comparison = a.name.localeCompare(b.name, 'fa');
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [supplements, searchQuery, selectedCategory, categories, sortOrder]);

  // Get count for each category
  const getCategoryCount = (categoryId: string | number) => {
    if (categoryId === 'all') {
      return supplements.length;
    }
    return supplements.filter(s => s?.categoryId === categoryId).length;
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSelectCategory('all');
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header with controls */}
      <div className="p-4 border-b border-indigo-100/50 dark:border-indigo-900/30 bg-gradient-to-r from-indigo-50/30 to-violet-50/30 dark:from-indigo-950/20 dark:to-violet-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={onAddCategory}
              size="sm"
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md"
            >
              <Plus className="h-4 w-4 mr-1" />
              دسته‌بندی جدید
            </Button>
            
            <Button
              onClick={onAddSupplement}
              size="sm"
              variant="outline"
              className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            >
              <Plus className="h-4 w-4 mr-1" />
              {type === 'supplement' ? 'مکمل جدید' : 'ویتامین جدید'}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-gray-900 p-1">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                className={`h-7 px-2 ${viewMode === "grid" ? "bg-indigo-600 text-white" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                className={`h-7 px-2 ${viewMode === "list" ? "bg-indigo-600 text-white" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Sort Button */}
            <Button
              size="sm"
              variant="outline"
              onClick={toggleSortOrder}
              className="border-indigo-200 dark:border-indigo-800"
            >
              <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
              {sortOrder === 'asc' ? 'الف-ی' : 'ی-الف'}
            </Button>

            {/* Filter Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-indigo-200 dark:border-indigo-800"
                >
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  فیلتر
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
                  فیلترهای پیشرفته
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleClearSearch}>
                  پاک کردن همه فیلترها
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`جستجو در ${type === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 pl-4 text-right border-indigo-200 dark:border-indigo-800"
          />
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="flex flex-wrap gap-2 mt-3">
            {searchQuery && (
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                جستجو: {searchQuery}
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-1 hover:text-indigo-900"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                دسته: {categories.find(c => c && c.id !== undefined && c.id.toString() === selectedCategory)?.name}
                <button
                  onClick={() => onSelectCategory('all')}
                  className="ml-1 hover:text-indigo-900"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 h-full">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1 border-l border-indigo-100/50 dark:border-indigo-900/30 bg-gradient-to-b from-white/50 to-indigo-50/30 dark:from-gray-950/50 dark:to-indigo-950/20 overflow-y-auto">
            <div className="p-3">
              <h3 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3 px-2">
                دسته‌بندی‌ها
              </h3>
              <div className="space-y-2">
                {displayCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    isSelected={selectedCategory === category.id.toString()}
                    onClick={() => onSelectCategory(category.id.toString())}
                    onEdit={category.id !== 'all' ? () => onEditCategory(category as SupplementCategory) : undefined}
                    onDelete={category.id !== 'all' ? () => onDeleteCategory(category as SupplementCategory) : undefined}
                    count={getCategoryCount(category.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Supplements Grid/List */}
          <div className="lg:col-span-3 overflow-y-auto">
            <div className="p-4">
              {filteredSupplements.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-10 w-10 text-indigo-400 dark:text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {searchQuery ? 'موردی یافت نشد' : `هیچ ${type === 'supplement' ? 'مکملی' : 'ویتامینی'} وجود ندارد`}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md">
                    {searchQuery 
                      ? 'با تغییر کلمات جستجو یا فیلترها دوباره تلاش کنید'
                      : `برای شروع، یک ${type === 'supplement' ? 'مکمل' : 'ویتامین'} جدید اضافه کنید`
                    }
                  </p>
                  {searchQuery ? (
                    <Button onClick={handleClearSearch} variant="outline">
                      پاک کردن فیلترها
                    </Button>
                  ) : (
                    <Button onClick={onAddSupplement} className="bg-gradient-to-r from-indigo-600 to-violet-600">
                      <Plus className="h-4 w-4 mr-1" />
                      {type === 'supplement' ? 'اولین مکمل' : 'اولین ویتامین'}
                    </Button>
                  )}
                </motion.div>
              ) : (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                        : "space-y-3"
                    }
                  >
                    {filteredSupplements.map((supplement, index) => (
                      <motion.div
                        key={supplement?.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <SupplementCard
                          supplement={supplement}
                          onEdit={() => onEditSupplement(supplement)}
                          onDelete={() => onDeleteSupplement(supplement?.id)}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      {filteredSupplements.length > 0 && (
        <div className="border-t border-indigo-100/50 dark:border-indigo-900/30 bg-white/50 dark:bg-gray-950/50 px-4 py-2">
          <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
            <span>
              {filteredSupplements.length} از {supplements.length} مورد نمایش داده شده
            </span>
            <span>
              {selectedCategory !== 'all' && 
                `دسته: ${categories.find(c => c && c.id !== undefined && c.id.toString() === selectedCategory)?.name || ''}`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
