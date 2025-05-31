
import React from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { SupplementGridView } from "@/components/supplements/list/SupplementGridView";
import { CategoryManagement } from "@/components/supplements/categories/CategoryManagement";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";

interface SupplementTabContentProps {
  type: "supplement" | "vitamin";
  isLoading: boolean;
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (id: number) => void;
  supplements: Supplement[];
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const SupplementTabContent: React.FC<SupplementTabContentProps> = ({
  type,
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
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter supplements by type and search
  const filteredSupplements = supplements.filter(supplement => {
    const matchesType = supplement.type === type;
    const matchesSearch = !searchQuery || 
      supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplement.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || supplement.category === selectedCategory;
    
    return matchesType && matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center" dir="rtl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-6" dir="rtl">
      {/* Categories Management */}
      <Card className="bg-gradient-to-l from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-lg">
        <div className="p-6">
          <CategoryManagement
            categories={categories}
            onAddCategory={onAddCategory}
            onEditCategory={onEditCategory}
            onDeleteCategory={onDeleteCategory}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            type={type}
          />
        </div>
      </Card>

      {/* Supplements Grid */}
      <Card className="flex-1 bg-gradient-to-l from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-lg overflow-hidden">
        <div className="p-6 h-full">
          {categories.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <EmptyState
                icon="Folder"
                title={`هیچ دسته‌بندی برای ${type === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'} وجود ندارد`}
                description="لطفاً ابتدا یک دسته‌بندی ایجاد کنید"
                action={{
                  label: "افزودن دسته‌بندی",
                  onClick: onAddCategory
                }}
              />
            </div>
          ) : (
            <SupplementGridView
              supplements={filteredSupplements}
              onEditSupplement={onEditSupplement}
              onDeleteSupplement={onDeleteSupplement}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onAddSupplement={onAddSupplement}
              activeTab={type}
            />
          )}
        </div>
      </Card>
    </div>
  );
};
