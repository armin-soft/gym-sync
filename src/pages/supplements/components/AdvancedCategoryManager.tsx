
import React from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Tag, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { SupplementCategory } from "@/types/supplement";

interface AdvancedCategoryManagerProps {
  categories: SupplementCategory[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  activeTab: 'supplement' | 'vitamin';
}

export const AdvancedCategoryManager: React.FC<AdvancedCategoryManagerProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  activeTab,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Filter className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">دسته‌بندی‌ها</h3>
        </div>
        
        <Button
          onClick={onAddCategory}
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-xl"
        >
          <Plus className="w-4 h-4 ml-1" />
          دسته جدید
        </Button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {/* All Categories Option */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectCategory('all')}
          className={cn(
            "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 text-right",
            selectedCategory === 'all' || selectedCategory === ''
              ? "bg-white/30 text-white shadow-lg"
              : "bg-white/10 text-white/80 hover:bg-white/20"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Tag className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">همه دسته‌بندی‌ها</span>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-0">
            {toPersianNumbers(categories.length)}
          </Badge>
        </motion.button>

        {/* Individual Categories */}
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group relative"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCategory(category.name)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 text-right",
                selectedCategory === category.name
                  ? "bg-white/30 text-white shadow-lg"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  activeTab === 'supplement'
                    ? "bg-gradient-to-br from-purple-500 to-indigo-600"
                    : "bg-gradient-to-br from-blue-500 to-cyan-600"
                )}>
                  <Tag className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">{category.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {toPersianNumbers(0)} {/* You could add count logic here */}
                </Badge>
                
                {/* Action buttons - show on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditCategory(category);
                    }}
                    className="h-8 w-8 p-0 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCategory(category);
                    }}
                    className="h-8 w-8 p-0 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-lg"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </motion.button>
          </motion.div>
        ))}

        {categories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Tag className="w-6 h-6 text-white/60" />
            </div>
            <p className="text-white/80 text-sm">
              هیچ دسته‌بندی‌ای برای {activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'} وجود ندارد
            </p>
            <p className="text-white/60 text-xs mt-1">
              اولین دسته‌بندی خود را ایجاد کنید
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
