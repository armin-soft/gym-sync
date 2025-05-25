
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  FolderOpen, 
  Sparkles,
  Tag,
  Grid3x3,
  Filter
} from "lucide-react";
import { SupplementCategory } from "@/types/supplement";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface CategorySectionProps {
  activeTab: 'supplement' | 'vitamin';
  categories: SupplementCategory[];
  onAddCategory: () => void;
  onEditCategory: (category: SupplementCategory) => void;
  onDeleteCategory: (category: SupplementCategory) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  activeTab,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  selectedCategory,
  onSelectCategory,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  return (
    <div className="h-full flex flex-col" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "p-2.5 rounded-xl shadow-lg",
                activeTab === 'supplement' 
                  ? "bg-gradient-to-br from-purple-500 to-indigo-600" 
                  : "bg-gradient-to-br from-blue-500 to-purple-600"
              )}
            >
              <Tag className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">دسته‌بندی‌ها</h3>
              <p className="text-sm text-gray-500">
                مدیریت {activeTab === 'supplement' ? 'مکمل‌ها' : 'ویتامین‌ها'}
              </p>
            </div>
          </div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onAddCategory}
              size="sm"
              className={cn(
                "gap-2 text-white shadow-xl font-bold rounded-xl",
                activeTab === 'supplement' 
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700" 
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              )}
            >
              <Plus className="h-4 w-4" />
              افزودن
            </Button>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white rounded-xl blur-sm" />
          <Button
            variant="outline"
            onClick={() => onSelectCategory("")}
            className={cn(
              "relative w-full justify-between rounded-xl border-2 font-bold transition-all duration-300",
              selectedCategory === "" 
                ? "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-300 text-indigo-700 shadow-lg" 
                : "bg-white/80 border-gray-200 hover:bg-gray-50"
            )}
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>همه دسته‌بندی‌ها</span>
            </div>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              {toPersianNumbers(categories.length)}
            </Badge>
          </Button>
        </motion.div>
      </motion.div>

      {/* Categories List */}
      <ScrollArea className="flex-1">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <AnimatePresence>
            {categories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="mb-4 p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full"
                >
                  <FolderOpen className="h-12 w-12 text-gray-400" />
                </motion.div>
                <h4 className="text-lg font-bold text-gray-600 mb-2">
                  هیچ دسته‌بندی‌ای وجود ندارد
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  برای شروع، اولین دسته‌بندی خود را ایجاد کنید
                </p>
                <Button
                  onClick={onAddCategory}
                  variant="outline"
                  className="gap-2 border-dashed border-2 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                  ایجاد دسته‌بندی
                </Button>
              </motion.div>
            ) : (
              categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ x: -5 }}
                  className="group"
                >
                  <div
                    className={cn(
                      "relative p-4 rounded-xl cursor-pointer transition-all duration-300 border-2",
                      selectedCategory === category.name
                        ? "bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border-indigo-300 shadow-xl"
                        : "bg-white/70 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg"
                    )}
                    onClick={() => onSelectCategory(category.name)}
                  >
                    {/* Background decoration */}
                    {selectedCategory === category.name && (
                      <motion.div
                        layoutId="selectedBg"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-100/50 to-purple-100/50 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={cn(
                            "p-2 rounded-lg",
                            selectedCategory === category.name
                              ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                              : "bg-gradient-to-br from-gray-400 to-gray-500"
                          )}
                        >
                          <Grid3x3 className="h-4 w-4 text-white" />
                        </motion.div>
                        <div>
                          <h4 className="font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">
                            {category.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs",
                                activeTab === 'supplement' 
                                  ? "bg-purple-50 text-purple-700 border-purple-200" 
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                              )}
                            >
                              {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditCategory(category);
                            }}
                            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 rounded-lg"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteCategory(category);
                            }}
                            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 rounded-lg"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>

                    {/* Selection indicator */}
                    {selectedCategory === category.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 left-2"
                      >
                        <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-full h-full bg-white/30 rounded-full"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </ScrollArea>

      {/* Footer Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 pt-4 border-t border-gray-200"
      >
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Sparkles className="h-4 w-4" />
          <span>
            مجموع {toPersianNumbers(categories.length)} دسته‌بندی
          </span>
        </div>
      </motion.div>
    </div>
  );
};
