
import React from "react";
import { motion } from "framer-motion";
import { CategoryManagement } from "./CategoryManagement";
import { SupplementGrid } from "./SupplementGrid";
import { Supplement, Category } from "../hooks/useSupplementManagement";

interface SupplementsContentProps {
  activeTab: 'supplement' | 'vitamin';
  supplements: Supplement[];
  categories: Category[];
  isLoading: boolean;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  onAddSupplement: () => void;
  onEditSupplement: (supplement: Supplement) => void;
  onDeleteSupplement: (id: number) => void;
  onAddCategory: () => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (id: number) => void;
}

export const SupplementsContent: React.FC<SupplementsContentProps> = ({
  activeTab,
  supplements,
  categories,
  isLoading,
  selectedCategory,
  setSelectedCategory,
  onAddSupplement,
  onEditSupplement,
  onDeleteSupplement,
  onAddCategory,
  onEditCategory,
  onDeleteCategory
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20" dir="rtl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8" dir="rtl">
      {/* Category Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <CategoryManagement
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onAddCategory={onAddCategory}
          onEditCategory={onEditCategory}
          onDeleteCategory={onDeleteCategory}
          type={activeTab}
        />
      </motion.div>

      {/* Supplements Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <SupplementGrid
          supplements={supplements}
          onAddSupplement={onAddSupplement}
          onEditSupplement={onEditSupplement}
          onDeleteSupplement={onDeleteSupplement}
          type={activeTab}
        />
      </motion.div>
    </div>
  );
};
