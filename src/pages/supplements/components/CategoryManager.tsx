
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SupplementCategory } from "@/types/supplement";
import { Plus, Folder, Edit2, Trash2, Grid } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryManagerProps {
  categories: SupplementCategory[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (categoryId: number) => void;
  activeTab: "supplement" | "vitamin";
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  activeTab,
}) => {
  if (categories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 lg:p-12 text-center"
        dir="rtl"
      >
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Folder className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
            هیچ دسته‌بندی وجود ندارد
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            برای شروع، اولین دسته‌بندی {activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'} خود را ایجاد کنید
          </p>
          <Button
            onClick={onAddCategory}
            className={cn(
              "flex items-center gap-2 text-white shadow-lg px-6 py-3 rounded-xl text-base font-medium",
              activeTab === 'supplement'
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            )}
          >
            <Plus className="w-5 h-5" />
            ایجاد دسته‌بندی جدید
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="text-right">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2 flex items-center gap-2 sm:gap-3">
            <Grid className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
            دسته‌بندی‌ها
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            دسته‌بندی مورد نظر را انتخاب کنید تا محصولات آن نمایش داده شود
          </p>
        </div>
        
        <Button
          onClick={onAddCategory}
          variant="outline"
          className="flex items-center gap-2 border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          دسته‌بندی جدید
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        <AnimatePresence>
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={cn(
                "group relative p-4 sm:p-5 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all",
                selectedCategory === category.name
                  ? activeTab === 'supplement'
                    ? "border-emerald-300 bg-emerald-50 shadow-lg"
                    : "border-blue-300 bg-blue-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              )}
              onClick={() => onSelectCategory(
                selectedCategory === category.name ? null : category.name
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={cn(
                  "w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center",
                  selectedCategory === category.name
                    ? activeTab === 'supplement'
                      ? "bg-emerald-500 text-white"
                      : "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600"
                )}>
                  <Folder className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                
                <div className="flex-1 text-right">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">
                    {category.name}
                  </h4>
                  <Badge 
                    variant="secondary" 
                    className="text-xs px-2 py-1"
                  >
                    {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 left-2 flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditCategory(category);
                  }}
                  className="h-8 w-8 p-0 hover:bg-blue-100 text-blue-600"
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCategory(category.id);
                  }}
                  className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
