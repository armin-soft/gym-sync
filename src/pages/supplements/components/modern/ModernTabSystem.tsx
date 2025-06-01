
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, Heart, Plus, Sparkles } from "lucide-react";
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
      <div className="flex items-center justify-center py-32" dir="rtl">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8" dir="rtl">
      {/* Modern Tab Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl p-2 shadow-xl border border-white/20"
      >
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            onClick={() => onTabChange('supplement')}
            className={`relative p-6 rounded-2xl transition-all duration-500 ${
              activeTab === 'supplement'
                ? 'bg-gradient-to-l from-green-500 to-emerald-600 text-white shadow-lg'
                : 'hover:bg-gray-50 text-gray-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-4">
              <div className={`p-3 rounded-xl ${
                activeTab === 'supplement' ? 'bg-white/20' : 'bg-green-100'
              }`}>
                <Pill className={`w-6 h-6 ${
                  activeTab === 'supplement' ? 'text-white' : 'text-green-600'
                }`} />
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold">مکمل‌های غذایی</h3>
                <p className={`text-sm ${
                  activeTab === 'supplement' ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {toPersianNumbers(supplementCount)} مکمل موجود
                </p>
              </div>
            </div>
            {activeTab === 'supplement' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-l from-green-500 to-emerald-600 rounded-2xl -z-10"
              />
            )}
          </motion.button>

          <motion.button
            onClick={() => onTabChange('vitamin')}
            className={`relative p-6 rounded-2xl transition-all duration-500 ${
              activeTab === 'vitamin'
                ? 'bg-gradient-to-l from-purple-500 to-pink-600 text-white shadow-lg'
                : 'hover:bg-gray-50 text-gray-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-4">
              <div className={`p-3 rounded-xl ${
                activeTab === 'vitamin' ? 'bg-white/20' : 'bg-purple-100'
              }`}>
                <Heart className={`w-6 h-6 ${
                  activeTab === 'vitamin' ? 'text-white' : 'text-purple-600'
                }`} />
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold">ویتامین‌ها</h3>
                <p className={`text-sm ${
                  activeTab === 'vitamin' ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {toPersianNumbers(vitaminCount)} ویتامین موجود
                </p>
              </div>
            </div>
            {activeTab === 'vitamin' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-l from-purple-500 to-pink-600 rounded-2xl -z-10"
              />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Categories Section */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <div className={`p-3 rounded-xl ${
                  activeTab === 'supplement' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  <Sparkles className={`w-6 h-6 ${
                    activeTab === 'supplement' ? 'text-green-600' : 'text-purple-600'
                  }`} />
                </div>
                دسته‌بندی‌ها
              </h2>
              <Button
                onClick={onAddCategory}
                className={`${
                  activeTab === 'supplement'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                    : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
                } text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-3`}
              >
                <Plus className="w-5 h-5 ml-2" />
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
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
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
