
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
    <div className="p-1 sm:p-2 md:p-3 lg:p-4 space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50" dir="rtl">
      {/* اولین ردیف: جستجو و دکمه‌های عملیات */}
      <div className="flex flex-col gap-1 sm:gap-2 md:gap-3">
        {/* جستجو */}
        <div className="relative flex-1">
          <Search className="absolute right-1.5 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-gray-400" />
          <Input
            placeholder={`جستجو در ${type === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-6 sm:pr-8 md:pr-10 pl-2 sm:pl-3 md:pl-4 bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 focus:border-purple-500 text-right text-2xs sm:text-xs md:text-sm h-7 sm:h-8 md:h-9 lg:h-10"
            dir="rtl"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute left-1.5 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
            </button>
          )}
        </div>

        {/* دکمه‌های عملیات */}
        <div className="flex gap-0.5 sm:gap-1 md:gap-2 flex-wrap">
          {/* دکمه افزودن دسته‌بندی */}
          <Button
            onClick={onAddCategory}
            variant="outline"
            size="sm"
            className="gap-0.5 sm:gap-1 md:gap-1.5 bg-white/80 dark:bg-gray-900/80 hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700 text-2xs sm:text-xs md:text-sm px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 h-6 sm:h-7 md:h-8 lg:h-9"
          >
            <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
            <span className="hidden sm:inline">دسته‌بندی</span>
            <span className="sm:hidden">دسته</span>
          </Button>

          {/* دکمه افزودن مکمل/ویتامین */}
          <Button
            onClick={onAddSupplement}
            className="gap-0.5 sm:gap-1 md:gap-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg text-2xs sm:text-xs md:text-sm px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 h-6 sm:h-7 md:h-8 lg:h-9"
            size="sm"
          >
            <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
            <span className="hidden sm:inline">افزودن {type === 'supplement' ? 'مکمل' : 'ویتامین'}</span>
            <span className="sm:hidden">{type === 'supplement' ? 'مکمل' : 'ویتامین'}</span>
          </Button>
        </div>
      </div>

      {/* دومین ردیف: فیلترها و تنظیمات نمایش */}
      <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 justify-between items-start">
        {/* فیلترها */}
        <div className="flex flex-wrap gap-0.5 sm:gap-1 md:gap-2 flex-1 w-full">
          {/* انتخاب دسته‌بندی */}
          <div className="min-w-0 flex-1 min-w-[100px] sm:min-w-[120px] md:min-w-[150px] lg:min-w-[200px]">
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
            className={`gap-0.5 sm:gap-1 md:gap-1.5 text-2xs sm:text-xs md:text-sm px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 h-6 sm:h-7 md:h-8 lg:h-9 ${showAdvancedFilters ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700' : 'bg-white/80 dark:bg-gray-900/80'}`}
          >
            <Filter className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
            <span className="hidden sm:inline">فیلترها</span>
          </Button>
        </div>

        {/* تنظیمات نمایش */}
        <div className="flex gap-0.5 sm:gap-1 md:gap-2">
          {/* دکمه مرتب‌سازی */}
          <Button
            onClick={toggleSortOrder}
            variant="outline"
            size="sm"
            className="gap-0.5 sm:gap-1 md:gap-1.5 bg-white/80 dark:bg-gray-900/80 text-2xs sm:text-xs md:text-sm px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 h-6 sm:h-7 md:h-8 lg:h-9"
          >
            {sortOrder === 'asc' ? <SortAsc className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" /> : <SortDesc className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />}
            <span className="hidden sm:inline">مرتب‌سازی</span>
          </Button>

          {/* تغییر نمای نمایش */}
          <div className="flex bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-0.5 sm:p-1 md:p-1.5 lg:p-2 transition-colors ${viewMode === 'grid' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Grid3X3 className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-0.5 sm:p-1 md:p-1.5 lg:p-2 transition-colors ${viewMode === 'list' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <List className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
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
          className="p-1.5 sm:p-2 md:p-3 lg:p-4 bg-purple-50/50 dark:bg-purple-900/10 rounded-md sm:rounded-lg border border-purple-200/50 dark:border-purple-800/50"
          dir="rtl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
            <div className="space-y-0.5 sm:space-y-1 md:space-y-2">
              <label className="text-2xs sm:text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 text-right block">
                دوز مصرف
              </label>
              <Input 
                placeholder="جستجو بر اساس دوز..."
                className="text-right bg-white dark:bg-gray-900 text-2xs sm:text-xs md:text-sm h-6 sm:h-7 md:h-8 lg:h-9"
                dir="rtl"
              />
            </div>
            <div className="space-y-0.5 sm:space-y-1 md:space-y-2">
              <label className="text-2xs sm:text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 text-right block">
                زمان مصرف
              </label>
              <Input 
                placeholder="جستجو بر اساس زمان..."
                className="text-right bg-white dark:bg-gray-900 text-2xs sm:text-xs md:text-sm h-6 sm:h-7 md:h-8 lg:h-9"
                dir="rtl"
              />
            </div>
            <div className="space-y-0.5 sm:space-y-1 md:space-y-2">
              <label className="text-2xs sm:text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 text-right block">
                توضیحات
              </label>
              <Input 
                placeholder="جستجو در توضیحات..."
                className="text-right bg-white dark:bg-gray-900 text-2xs sm:text-xs md:text-sm h-6 sm:h-7 md:h-8 lg:h-9"
                dir="rtl"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
