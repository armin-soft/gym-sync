
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SupplementCategory } from "@/types/supplement";
import { CategoryList } from "./CategoryList";
import { SupplementList } from "@/components/supplements/SupplementList";

interface SupplementStageContentProps {
  type: 'supplement' | 'vitamin';
  displayCategories: any[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  getCategoryCount: (categoryName: string) => number;
  filteredSupplements: any[];
  viewMode: 'grid' | 'list';
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
    <div className="flex-1 overflow-hidden" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full p-4">
        {/* سایدبار دسته‌بندی‌ها */}
        <div className="lg:col-span-1 bg-white/60 dark:bg-gray-900/60 rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-lg">
          <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-right">
              دسته‌بندی‌ها
            </h3>
          </div>
          <ScrollArea className="h-[calc(100%-60px)]" dir="rtl">
            <CategoryList
              categories={displayCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
              onEditCategory={onEditCategory}
              onDeleteCategory={onDeleteCategory}
              getCategoryCount={getCategoryCount}
              type={type}
            />
          </ScrollArea>
        </div>

        {/* محتوای اصلی - لیست مکمل‌ها/ویتامین‌ها */}
        <div className="lg:col-span-3 bg-white/60 dark:bg-gray-900/60 rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-lg">
          <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-right">
              {type === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}
              {selectedCategory !== 'all' && ` - ${selectedCategory}`}
            </h3>
          </div>
          <ScrollArea className="h-[calc(100%-60px)]" dir="rtl">
            <div className="p-4">
              <SupplementList
                supplements={filteredSupplements}
                onAddSupplement={onAddSupplement}
                onEditSupplement={onEditSupplement}
                onDeleteSupplement={onDeleteSupplement}
                activeTab={type}
                searchQuery={searchQuery}
                setSearchQuery={handleClearSearch}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
