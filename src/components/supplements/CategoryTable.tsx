
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2, Info, Sparkles } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { SupplementCategory } from "@/types/supplement";
import { cn } from "@/lib/utils";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface CategoryTableProps {
  categories: SupplementCategory[];
  onAdd: () => void;
  onEdit: (category: SupplementCategory) => void;
  onDelete: (category: SupplementCategory) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryTable = ({
  categories,
  onAdd,
  onEdit,
  onDelete,
  selectedCategory,
  onSelectCategory,
}: CategoryTableProps) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <div className="overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 flex items-center justify-between bg-gradient-to-r from-slate-50/80 to-purple-50/50 dark:from-slate-700/80 dark:to-purple-900/20 border-b border-purple-100/50 dark:border-purple-800/30">
        <div className="flex items-center">
          <div className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-purple-100/80 to-purple-50/40 dark:from-purple-900/40 dark:to-purple-800/20 ml-3 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-500 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">دسته‌بندی‌ها</h3>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">مدیریت دسته‌بندی‌های موجود</p>
              <Badge variant="outline" className="text-xs bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-300">
                {toPersianNumbers(categories.length)} دسته
              </Badge>
            </div>
          </div>
        </div>
        <Button 
          variant="default" 
          className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
          size="sm"
          onClick={onAdd}
        >
          <Plus className="ml-1 h-4 w-4" />
          افزودن دسته
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {categories.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/20 flex items-center justify-center mb-4 relative">
              <Info className="h-8 w-8 text-purple-500 dark:text-purple-400" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent animate-pulse"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">هنوز دسته‌بندی وجود ندارد</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
              برای شروع، یک دسته‌بندی جدید ایجاد کنید تا بتوانید مکمل‌ها و ویتامین‌های خود را به صورت حرفه‌ای سازماندهی کنید.
            </p>
            <Button 
              variant="outline"
              size="sm" 
              onClick={onAdd}
              className="border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-900/20 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Plus className="ml-1 h-4 w-4" />
              افزودن اولین دسته
            </Button>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <motion.div 
                  key={category.id} 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  layout
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Badge 
                    variant="outline"
                    onClick={() => onSelectCategory(category.name)}
                    className={cn(
                      "py-3 px-4 cursor-pointer transition-all duration-300 text-sm gap-2 flex items-center relative overflow-hidden",
                      "hover:shadow-lg transform hover:scale-105 border-2 rounded-xl",
                      selectedCategory === category.name 
                        ? "bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-800/20 border-purple-300 dark:border-purple-600 text-purple-800 dark:text-purple-200 shadow-lg scale-105" 
                        : "bg-white/80 dark:bg-slate-800/80 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50/80 dark:hover:bg-purple-900/20 hover:border-purple-200 dark:hover:border-purple-700"
                    )}
                  >
                    {selectedCategory === category.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 dark:from-purple-400/10 dark:to-violet-400/10"
                      />
                    )}
                    
                    <span className="font-medium relative z-10">{category.name}</span>
                    
                    {selectedCategory === category.name && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex gap-1 relative z-10"
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEdit(category);
                                }}
                                className="h-6 w-6 p-0 text-purple-600 dark:text-purple-400 hover:bg-purple-200/50 dark:hover:bg-purple-800/30 hover:text-purple-700 dark:hover:text-purple-300 rounded-lg transition-all duration-200"
                              >
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>ویرایش</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDelete(category);
                                }}
                                className="h-6 w-6 p-0 text-red-500 dark:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-300 rounded-lg transition-all duration-200"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>حذف</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </motion.div>
                    )}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
