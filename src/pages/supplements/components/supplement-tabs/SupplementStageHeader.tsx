
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Grid3X3, 
  List, 
  SortAsc, 
  SortDesc, 
  Filter,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import { SupplementCategory } from "@/types/supplement";
import { CategorySelector } from "@/components/nutrition/supplements/CategorySelector";

interface SupplementStageHeaderProps {
  type: 'supplement' | 'vitamin';
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  sortOrder: 'asc' | 'desc';
  toggleSortOrder: () => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (show: boolean) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onAddSupplement: () => void;
  handleClearSearch: () => void;
}

export const SupplementStageHeader: React.FC<SupplementStageHeaderProps> = ({
  type,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  sortOrder,
  toggleSortOrder,
  showAdvancedFilters,
  setShowAdvancedFilters,
  selectedCategory,
  onSelectCategory,
  categories,
  onAddCategory,
  onAddSupplement,
  handleClearSearch,
}) => {
  return (
    <div className="p-4 space-y-4 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50" dir="rtl">
      {/* اولین ردیف: جستجو و دکمه‌های عملیات */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* جستجو */}
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`جستجو در ${type === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 pl-4 bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 focus:border-purple-500 text-right"
            dir="rtl"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* دکمه‌های عملیات */}
        <div className="flex gap-2">
          {/* دکمه افزودن دسته‌بندی */}
          <Button
            onClick={onAddCategory}
            variant="outline"
            size="sm"
            className="gap-1.5 bg-white/80 dark:bg-gray-900/80 hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">دسته‌بندی</span>
          </Button>

          {/* دکمه افزودن مکمل/ویتامین */}
          <Button
            onClick={onAddSupplement}
            className="gap-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            افزودن {type === 'supplement' ? 'مکمل' : 'ویتامین'}
          </Button>
        </div>
      </div>

      {/* دومین ردیف: فیلترها و تنظیمات نمایش */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        {/* فیلترها */}
        <div className="flex flex-wrap gap-2 flex-1">
          {/* انتخاب دسته‌بندی */}
          <div className="min-w-[200px]">
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory === 'all' ? null : selectedCategory}
              onSelectCategory={(category) => onSelectCategory(category || 'all')}
              activeTab={type}
              onAddCategory={onAddCategory}
            />
          </div>

          {/* دکمه فیلترهای پیشرفته */}
          <Button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            variant="outline"
            size="sm"
            className={`gap-1.5 ${showAdvancedFilters ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700' : 'bg-white/80 dark:bg-gray-900/80'}`}
          >
            <Filter className="h-4 w-4" />
            فیلترها
          </Button>
        </div>

        {/* تنظیمات نمایش */}
        <div className="flex gap-2">
          {/* دکمه مرتب‌سازی */}
          <Button
            onClick={toggleSortOrder}
            variant="outline"
            size="sm"
            className="gap-1.5 bg-white/80 dark:bg-gray-900/80"
          >
            {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            <span className="hidden sm:inline">مرتب‌سازی</span>
          </Button>

          {/* تغییر نمای نمایش */}
          <div className="flex bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* فیلترهای پیشرفته */}
      {showAdvancedFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 bg-purple-50/50 dark:bg-purple-900/10 rounded-lg border border-purple-200/50 dark:border-purple-800/50"
          dir="rtl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 text-right block">
                دوز مصرف
              </label>
              <Input 
                placeholder="جستجو بر اساس دوز..."
                className="text-right bg-white dark:bg-gray-900"
                dir="rtl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 text-right block">
                زمان مصرف
              </label>
              <Input 
                placeholder="جستجو بر اساس زمان..."
                className="text-right bg-white dark:bg-gray-900"
                dir="rtl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 text-right block">
                توضیحات
              </label>
              <Input 
                placeholder="جستجو در توضیحات..."
                className="text-right bg-white dark:bg-gray-900"
                dir="rtl"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
