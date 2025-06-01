
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Folder, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupplementCategory } from "@/types/supplement";

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
      <div className="text-center py-12" dir="rtl">
        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Folder className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          هیچ دسته‌بندی وجود ندارد
        </h3>
        <p className="text-gray-500">
          برای شروع، یک دسته‌بندی جدید ایجاد کنید
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" dir="rtl">
      {/* Filter Button */}
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => setSelectedCategory(null)}
        className="rounded-lg"
      >
        <Filter className="w-4 h-4 ml-2" />
        همه دسته‌ها
      </Button>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`group bg-white rounded-lg p-4 border-2 transition-all cursor-pointer hover:shadow-md ${
                selectedCategory === category.name
                  ? activeTab === 'supplement'
                    ? 'border-green-400 bg-green-50'
                    : 'border-purple-400 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedCategory(
                selectedCategory === category.name ? null : category.name
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${
                  selectedCategory === category.name
                    ? activeTab === 'supplement'
                      ? 'bg-green-100'
                      : 'bg-purple-100'
                    : 'bg-gray-100'
                }`}>
                  <Folder className={`w-4 h-4 ${
                    selectedCategory === category.name
                      ? activeTab === 'supplement'
                        ? 'text-green-600'
                        : 'text-purple-600'
                      : 'text-gray-600'
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
                    <Edit2 className="w-3 h-3" />
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
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <h3 className="font-medium text-gray-800 text-right">
                {category.name}
              </h3>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
