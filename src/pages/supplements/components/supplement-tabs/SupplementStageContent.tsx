
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupplementCategory } from "@/types/supplement";
import { CategoryCard } from "./CategoryCard";
import { SupplementCard } from "./SupplementCard";

interface SupplementStageContentProps {
  type: 'supplement' | 'vitamin';
  displayCategories: any[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  getCategoryCount: (categoryId: string | number) => number;
  filteredSupplements: any[];
  viewMode: "grid" | "list";
  onEditSupplement: (supplement: any) => void;
  onDeleteSupplement: (id: number) => void;
  onAddSupplement: () => void;
  searchQuery: string;
  handleClearSearch: () => void;
}

export const SupplementStageContent: React.FC<SupplementStageContentProps> = ({
  type,
  displayCategories,
  selectedCategory,
  onSelectCategory,
  onEditCategory,
  onDeleteCategory,
  getCategoryCount,
  filteredSupplements,
  viewMode,
  onEditSupplement,
  onDeleteSupplement,
  onAddSupplement,
  searchQuery,
  handleClearSearch,
}) => {
  return (
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
  );
};
