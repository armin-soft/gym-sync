
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, Heart, Plus, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModernCategoryGrid } from "./ModernCategoryGrid";
import { ModernSupplementGrid } from "./ModernSupplementGrid";
import { Supplement, SupplementCategory } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernTabSystemProps {
  activeTab: "supplement" | "vitamin";
  onTabChange: (value: string) => void;
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

export const ModernTabSystem: React.FC<ModernTabSystemProps> = ({
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
}) => {
  const supplementCount = supplements.filter(s => s.type === 'supplement').length;
  const vitaminCount = supplements.filter(s => s.type === 'vitamin').length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20" dir="rtl">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6" dir="rtl">
      {/* Simple Tab Header */}
      <div className="bg-white rounded-xl p-1 shadow-sm border">
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => onTabChange('supplement')}
            className={`p-4 rounded-lg transition-all ${
              activeTab === 'supplement'
                ? 'bg-green-500 text-white shadow-sm'
                : 'hover:bg-gray-50 text-gray-600'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <Pill className="w-5 h-5" />
              <div className="text-right">
                <h3 className="font-bold">مکمل‌های غذایی</h3>
                <p className="text-sm opacity-80">
                  {toPersianNumbers(supplementCount)} مکمل
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onTabChange('vitamin')}
            className={`p-4 rounded-lg transition-all ${
              activeTab === 'vitamin'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'hover:bg-gray-50 text-gray-600'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-5 h-5" />
              <div className="text-right">
                <h3 className="font-bold">ویتامین‌ها</h3>
                <p className="text-sm opacity-80">
                  {toPersianNumbers(vitaminCount)} ویتامین
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Categories Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Folder className="w-5 h-5 text-gray-600" />
                دسته‌بندی‌ها
              </h2>
              <Button
                onClick={onAddCategory}
                className={`${
                  activeTab === 'supplement'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-purple-500 hover:bg-purple-600'
                } text-white rounded-lg`}
              >
                <Plus className="w-4 h-4 ml-2" />
                افزودن دسته‌بندی
              </Button>
            </div>

            <ModernCategoryGrid
              categories={categories}
              onEditCategory={onEditCategory}
              onDeleteCategory={onDeleteCategory}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              activeTab={activeTab}
            />
          </div>

          {/* Supplements Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <ModernSupplementGrid
              supplements={supplements}
              onEditSupplement={onEditSupplement}
              onDeleteSupplement={onDeleteSupplement}
              onAddSupplement={onAddSupplement}
              activeTab={activeTab}
              selectedCategory={selectedCategory}
              categories={categories}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
