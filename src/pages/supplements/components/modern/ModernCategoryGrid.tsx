
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Folder, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupplementCategory } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ModernCategoryGridProps {
  categories: SupplementCategory[];
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (id: number) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  activeTab: "supplement" | "vitamin";
}

export const ModernCategoryGrid: React.FC<ModernCategoryGridProps> = ({
  categories,
  onEditCategory,
  onDeleteCategory,
  selectedCategory,
  setSelectedCategory,
  activeTab,
}) => {
  if (categories.length === 0) {
    return (
      <div className="text-center py-16" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 ${
            activeTab === 'supplement' ? 'bg-green-100' : 'bg-purple-100'
          }`}>
            <Folder className={`w-12 h-12 ${
              activeTab === 'supplement' ? 'text-green-500' : 'text-purple-500'
            }`} />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            هیچ دسته‌بندی وجود ندارد
          </h3>
          <p className="text-gray-500 text-lg">
            برای شروع، یک دسته‌بندی جدید ایجاد کنید
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Filter Button */}
      <div className="flex items-center gap-3">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className={`rounded-xl px-6 py-3 transition-all duration-300 ${
            selectedCategory === null
              ? activeTab === 'supplement'
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
              : 'hover:bg-gray-50'
          }`}
        >
          <Filter className="w-4 h-4 ml-2" />
          همه دسته‌ها
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              className={`group relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                selectedCategory === category.name
                  ? activeTab === 'supplement'
                    ? 'border-green-400 bg-green-50'
                    : 'border-purple-400 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedCategory(
                selectedCategory === category.name ? null : category.name
              )}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  selectedCategory === category.name
                    ? activeTab === 'supplement'
                      ? 'bg-green-200'
                      : 'bg-purple-200'
                    : activeTab === 'supplement'
                      ? 'bg-green-100'
                      : 'bg-purple-100'
                }`}>
                  <Folder className={`w-5 h-5 ${
                    selectedCategory === category.name
                      ? activeTab === 'supplement'
                        ? 'text-green-700'
                        : 'text-purple-700'
                      : activeTab === 'supplement'
                        ? 'text-green-600'
                        : 'text-purple-600'
                  }`} />
                </div>
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditCategory(category);
                    }}
                    className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCategory(category.id);
                    }}
                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-800 text-right">
                {category.name}
              </h3>
              
              {selectedCategory === category.name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-sm text-gray-600"
                >
                  دسته‌بندی انتخاب شده
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
