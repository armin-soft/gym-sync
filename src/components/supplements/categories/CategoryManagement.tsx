
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Folder, Filter } from "lucide-react";
import { SupplementCategory } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface CategoryManagementProps {
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (id: number) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  type: "supplement" | "vitamin";
}

export const CategoryManagement: React.FC<CategoryManagementProps> = ({
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  selectedCategory,
  setSelectedCategory,
  type,
}) => {
  return (
    <div className="space-y-4" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg",
            type === 'supplement' 
              ? "bg-gradient-to-br from-purple-500 to-indigo-600" 
              : "bg-gradient-to-br from-blue-500 to-purple-600"
          )}>
            <Folder className="w-5 h-5 text-white" />
          </div>
          <div className="text-right">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              دسته‌بندی {type === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {toPersianNumbers(categories.length)} دسته‌بندی
            </p>
          </div>
        </div>
        
        <Button
          onClick={onAddCategory}
          size="sm"
          className={cn(
            "gap-2 text-white shadow-lg",
            type === 'supplement'
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          )}
        >
          <Plus className="w-4 h-4" />
          افزودن دسته‌بندی
        </Button>
      </div>

      {/* Categories List */}
      {categories.length > 0 && (
        <div className="space-y-3">
          {/* Filter Header */}
          <div className="flex items-center gap-2 text-right">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              فیلتر بر اساس دسته‌بندی:
            </span>
          </div>

          {/* All Categories Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "w-full justify-between text-right transition-all duration-200",
                selectedCategory === null && type === 'supplement' && "bg-gradient-to-r from-purple-600 to-indigo-600 text-white",
                selectedCategory === null && type === 'vitamin' && "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              )}
              dir="rtl"
            >
              <div className="flex items-center gap-2">
                <span>همه دسته‌بندی‌ها</span>
                {selectedCategory === null && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    فعال
                  </Badge>
                )}
              </div>
              <Folder className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Individual Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer",
                  selectedCategory === category.name
                    ? type === 'supplement'
                      ? "bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 border-purple-300 dark:border-purple-600 shadow-lg"
                      : "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-blue-300 dark:border-blue-600 shadow-lg"
                    : "bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:shadow-md"
                )}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )}
                dir="rtl"
              >
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                      {category.name}
                    </h4>
                    {selectedCategory === category.name && (
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "text-xs",
                          type === 'supplement' ? "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                        )}
                      >
                        انتخاب شده
                      </Badge>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditCategory(category);
                      }}
                      className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCategory(category.id);
                      }}
                      className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
