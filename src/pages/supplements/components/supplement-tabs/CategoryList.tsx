
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SupplementCategory } from "@/types/supplement";
import { motion } from "framer-motion";
import { 
  Folder, 
  FolderOpen, 
  Edit2, 
  Trash2, 
  Hash,
  FlaskConical,
  Pill
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface CategoryListProps {
  categories: any[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  getCategoryCount: (categoryName: string) => number;
  type: 'supplement' | 'vitamin';
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onEditCategory,
  onDeleteCategory,
  getCategoryCount,
  type,
}) => {
  return (
    <div className="space-y-2 p-2" dir="rtl">
      {categories.map((category, index) => {
        const isSelected = selectedCategory === (category.id === 'all' ? 'all' : category.name);
        const count = getCategoryCount(category.id === 'all' ? 'all' : category.name);
        const isAllCategory = category.id === 'all';

        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "group relative rounded-lg border transition-all duration-200",
              isSelected
                ? "bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border-purple-300 dark:border-purple-700 shadow-md"
                : "bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:border-gray-300 dark:hover:border-gray-600"
            )}
          >
            <button
              onClick={() => onSelectCategory(category.id === 'all' ? 'all' : category.name)}
              className="w-full p-3 text-right flex items-center justify-between rounded-lg transition-all"
            >
              <div className="flex items-center gap-2">
                {isSelected ? (
                  <FolderOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                ) : (
                  <Folder className="h-4 w-4 text-gray-500" />
                )}
                {!isAllCategory && (
                  type === 'supplement' ? (
                    <FlaskConical className="h-3 w-3 text-purple-500" />
                  ) : (
                    <Pill className="h-3 w-3 text-blue-500" />
                  )
                )}
              </div>

              <div className="flex-1 text-right">
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-xs",
                      isSelected 
                        ? "bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200" 
                        : "bg-gray-200 dark:bg-gray-700"
                    )}
                  >
                    <Hash className="h-3 w-3 mr-1" />
                    {toPersianNumbers(count.toString())}
                  </Badge>
                  
                  <span className={cn(
                    "font-medium text-sm",
                    isSelected 
                      ? "text-purple-800 dark:text-purple-200" 
                      : "text-gray-700 dark:text-gray-300"
                  )}>
                    {category.name}
                  </span>
                </div>
              </div>
            </button>

            {/* دکمه‌های ویرایش و حذف (فقط برای دسته‌بندی‌های واقعی) */}
            {!isAllCategory && (
              <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditCategory(category);
                    }}
                    className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                  >
                    <Edit2 className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCategory(category);
                    }}
                    className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="h-3 w-3 text-red-600 dark:text-red-400" />
                  </Button>
                </div>
              </div>
            )}

            {/* نشانگر انتخاب */}
            {isSelected && (
              <motion.div
                layoutId={`category-indicator-${type}`}
                className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-lg"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
