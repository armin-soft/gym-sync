
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
    <div className="flex-1 overflow-hidden min-h-0" dir="rtl">
      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-0.5 sm:gap-1 md:gap-2 lg:gap-3 h-full p-0.5 sm:p-1 md:p-2 lg:p-3">
        {/* سایدبار دسته‌بندی‌ها */}
        <div className="lg:col-span-1 bg-white/60 dark:bg-gray-900/60 rounded sm:rounded-md md:rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-sm md:shadow-md order-2 lg:order-1">
          <div className="p-1 sm:p-1.5 md:p-2 lg:p-3 border-b border-gray-200/50 dark:border-gray-700/50">
            <h3 className="font-semibold text-2xs sm:text-xs md:text-sm lg:text-base text-gray-800 dark:text-gray-200 text-right">
              دسته‌بندی‌ها
            </h3>
          </div>
          <ScrollArea className="h-16 sm:h-20 md:h-24 lg:h-[calc(100%-2rem)] xl:h-[calc(100%-2.5rem)]" dir="rtl">
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
        <div className="lg:col-span-3 bg-white/60 dark:bg-gray-900/60 rounded sm:rounded-md md:rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-sm md:shadow-md order-1 lg:order-2">
          <div className="p-1 sm:p-1.5 md:p-2 lg:p-3 border-b border-gray-200/50 dark:border-gray-700/50">
            <h3 className="font-semibold text-2xs sm:text-xs md:text-sm lg:text-base text-gray-800 dark:text-gray-200 text-right">
              {type === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}
              {selectedCategory !== 'all' && ` - ${selectedCategory}`}
            </h3>
          </div>
          <ScrollArea className="h-32 sm:h-36 md:h-40 lg:h-[calc(100%-2rem)] xl:h-[calc(100%-2.5rem)]" dir="rtl">
            <div className="p-1 sm:p-1.5 md:p-2 lg:p-3">
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
