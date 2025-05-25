
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, Sparkles, Plus, Search, Filter, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { SupplementCategory } from "@/types/supplement";
import { AdvancedSupplementGrid } from "./AdvancedSupplementGrid";
import { AdvancedCategoryManager } from "./AdvancedCategoryManager";

interface AdvancedSupplementTabsProps {
  activeTab: 'supplement' | 'vitamin';
  onTabChange: (value: string) => void;
  isLoading: boolean;
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  supplements: any[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: any) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  addCategory: (name: string) => void;
  updateCategory: (id: number, name: string) => void;
  deleteCategory: (category: SupplementCategory) => void;
}

export const AdvancedSupplementTabs: React.FC<AdvancedSupplementTabsProps> = ({
  activeTab,
  onTabChange,
  isLoading,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  supplements,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  selectedCategory,
  setSelectedCategory,
  addCategory,
  updateCategory,
  deleteCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48 sm:h-64">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-2 sm:space-y-3"
        >
          <div className="relative">
            <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 sm:border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 sm:border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin absolute top-1 left-1 sm:top-2 sm:left-2 animate-reverse"></div>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">در حال بارگذاری...</p>
        </motion.div>
      </div>
    );
  }

  // Filter supplements based on search
  const filteredSupplements = supplements.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || selectedCategory === '' || 
      item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddCategory = () => {
    // This will trigger the dialog in AdvancedCategoryManager
    onAddCategory();
  };

  const handleEditCategory = (category: SupplementCategory) => {
    // This will trigger the dialog in AdvancedCategoryManager
    onEditCategory(category);
  };

  const handleDeleteCategory = (category: SupplementCategory) => {
    deleteCategory(category);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full bg-white/40 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/60 shadow-lg overflow-hidden"
      dir="rtl"
    >
      {/* Compact Header */}
      <div className="bg-gradient-to-l from-purple-600 via-indigo-600 to-blue-600 p-2 sm:p-3">
        <div className="flex flex-col gap-2 sm:gap-3">
          {/* Tab Switcher */}
          <div className="flex bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-0.5 sm:p-1 border border-white/30">
            <button
              onClick={() => onTabChange('supplement')}
              className={cn(
                "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-all duration-300 font-medium text-xs sm:text-sm flex-1",
                activeTab === 'supplement'
                  ? "bg-white text-purple-700 shadow-lg transform scale-105"
                  : "text-white hover:bg-white/10"
              )}
            >
              <Pill className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">مکمل‌ها</span>
              <span className="xs:hidden">مکمل</span>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs scale-75 sm:scale-100">
                {toPersianNumbers(supplements.filter(s => s.type === 'supplement').length)}
              </Badge>
            </button>
            <button
              onClick={() => onTabChange('vitamin')}
              className={cn(
                "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-all duration-300 font-medium text-xs sm:text-sm flex-1",
                activeTab === 'vitamin'
                  ? "bg-white text-purple-700 shadow-lg transform scale-105"
                  : "text-white hover:bg-white/10"
              )}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">ویتامین‌ها</span>
              <span className="xs:hidden">ویتامین</span>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 text-xs scale-75 sm:scale-100">
                {toPersianNumbers(supplements.filter(s => s.type === 'vitamin').length)}
              </Badge>
            </button>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-white/60" />
              <Input
                type="search"
                placeholder={`جستجو در ${activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-8 sm:pr-10 pl-2 sm:pl-3 py-1.5 sm:py-2 bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-md sm:rounded-lg focus:bg-white/30 focus:border-white/50 text-xs sm:text-sm"
              />
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "text-white hover:bg-white/10 rounded-md sm:rounded-lg text-xs px-2 sm:px-3 py-1.5 sm:py-2 h-auto",
                  showFilters && "bg-white/20"
                )}
              >
                <Filter className="w-3 h-3 ml-1" />
                <span className="hidden sm:inline">فیلتر</span>
              </Button>
              
              <div className="flex bg-white/20 rounded-md sm:rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-1 sm:p-1.5 rounded transition-all",
                    viewMode === 'grid' ? "bg-white/20 text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  <Grid3X3 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-1 sm:p-1.5 rounded transition-all",
                    viewMode === 'list' ? "bg-white/20 text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  <List className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </button>
              </div>

              <Button
                onClick={onAddSupplement}
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-md sm:rounded-lg shadow-lg text-xs px-2 sm:px-3 py-1.5 sm:py-2 h-auto"
              >
                <Plus className="w-3 h-3 ml-1" />
                <span className="hidden sm:inline">افزودن</span>
              </Button>
            </div>
          </div>

          {/* Filters Section */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-2 border-t border-white/20"
              >
                <AdvancedCategoryManager
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  onAddCategory={handleAddCategory}
                  onEditCategory={handleEditCategory}
                  onDeleteCategory={handleDeleteCategory}
                  activeTab={activeTab}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <AdvancedSupplementGrid
          supplements={filteredSupplements}
          onEditSupplement={onEditSupplement}
          onDeleteSupplement={onDeleteSupplement}
          viewMode={viewMode}
          activeTab={activeTab}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Compact Footer Stats */}
      <div className="bg-gradient-to-l from-slate-50 to-purple-50/50 p-1.5 sm:p-2 border-t border-slate-200">
        <div className="flex items-center justify-between text-xs">
          <div className="text-slate-600">
            {toPersianNumbers(filteredSupplements.length)} مورد از {toPersianNumbers(supplements.length)} نمایش داده شده
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-slate-500">
            <span>دسته‌بندی‌ها: {toPersianNumbers(categories.length)}</span>
            <span>•</span>
            <span className="hidden sm:inline">نوع فعال: {activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}</span>
            <span className="sm:hidden">{activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
