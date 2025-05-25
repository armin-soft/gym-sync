
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2, Layers, Sparkles, Database } from "lucide-react";
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
    <Card className="overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/30 dark:border-slate-700/30 shadow-2xl rounded-3xl">
      {/* Modern Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-emerald-50 to-blue-50 dark:from-slate-800 dark:via-emerald-900/20 dark:to-blue-900/20"></div>
        <div className="relative p-6 md:p-8 border-b border-slate-200/30 dark:border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">دسته‌بندی‌ها</h3>
                <div className="flex items-center gap-3">
                  <p className="text-slate-600 dark:text-slate-300">مدیریت هوشمند دسته‌بندی‌ها</p>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white border-0 shadow-lg">
                    {toPersianNumbers(categories.length)} دسته
                  </Badge>
                </div>
              </div>
            </div>
            <Button 
              onClick={onAdd}
              className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-2xl px-6 py-3 gap-2"
            >
              <Plus className="w-5 h-5" />
              افزودن دسته جدید
              <Sparkles className="w-4 h-4 animate-pulse" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8">
        {categories.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-3xl flex items-center justify-center">
                <Layers className="h-12 w-12 text-slate-400 dark:text-slate-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">
              هنوز دسته‌بندی‌ای ایجاد نشده
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
              برای شروع کار با سیستم مدیریت مکمل‌ها، ابتدا دسته‌بندی‌های مورد نیاز خود را ایجاد کنید
            </p>
            <Button 
              onClick={onAdd}
              className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-2xl px-8 py-4 gap-3"
            >
              <Plus className="w-5 h-5" />
              ایجاد اولین دسته‌بندی
              <Sparkles className="w-4 h-4 animate-pulse" />
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {categories.map((category, index) => (
                <motion.div 
                  key={category.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card 
                    onClick={() => onSelectCategory(category.name)}
                    className={cn(
                      "relative p-6 cursor-pointer transition-all duration-500 border-2 rounded-2xl overflow-hidden",
                      "hover:shadow-2xl transform",
                      selectedCategory === category.name 
                        ? "bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/30 dark:to-blue-900/30 border-emerald-400 dark:border-emerald-500 shadow-xl scale-105" 
                        : "bg-white/90 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-emerald-300 dark:hover:border-emerald-600"
                    )}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {category.name}
                        </h4>
                        <div className={cn(
                          "w-3 h-3 rounded-full transition-all duration-300",
                          selectedCategory === category.name 
                            ? "bg-emerald-500 shadow-lg" 
                            : "bg-slate-300 dark:bg-slate-600 group-hover:bg-emerald-400"
                        )}></div>
                      </div>
                      
                      {selectedCategory === category.name && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex gap-2 pt-4 border-t border-emerald-200 dark:border-emerald-700"
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(category);
                                  }}
                                  className="h-8 w-8 p-0 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-xl"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-slate-800 text-white border-slate-700">
                                <p>ویرایش دسته‌بندی</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(category);
                                  }}
                                  className="h-8 w-8 p-0 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-slate-800 text-white border-slate-700">
                                <p>حذف دسته‌بندی</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </Card>
  );
};
