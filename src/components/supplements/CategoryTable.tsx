
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2, Info } from "lucide-react";
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
    <Card className="bg-white shadow-md rounded-xl overflow-hidden border-0">
      <div className="p-4 sm:p-6 flex items-center justify-between bg-gradient-to-r from-slate-50 to-purple-50/30 border-b">
        <div className="flex items-center">
          <div className="flex items-center justify-center p-2 rounded-lg bg-gradient-to-br from-purple-100/80 to-purple-50/40 ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">دسته‌بندی‌ها</h3>
            <p className="text-sm text-gray-500">مدیریت دسته‌بندی‌های موجود</p>
          </div>
        </div>
        <Button 
          variant="default" 
          className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 transition-colors duration-300 text-white shadow-sm"
          size="sm"
          onClick={onAdd}
        >
          <Plus className="ml-1 h-4 w-4" />
          افزودن دسته
        </Button>
      </div>

      <div className="p-4 sm:p-6">
        {categories.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
              <Info className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-1">هنوز دسته‌بندی وجود ندارد</h3>
            <p className="text-sm text-gray-500 mb-4 max-w-md">
              برای شروع، یک دسته‌بندی جدید ایجاد کنید تا بتوانید مکمل‌ها و ویتامین‌های خود را سازماندهی کنید.
            </p>
            <Button 
              variant="outline"
              size="sm" 
              onClick={onAdd}
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Plus className="ml-1 h-4 w-4" />
              افزودن اولین دسته
            </Button>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.div 
                  key={category.id} 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  transition={{ duration: 0.2 }}
                >
                  <Badge 
                    variant="outline"
                    onClick={() => onSelectCategory(category.name)}
                    className={cn(
                      "py-2 px-3 cursor-pointer transition-all text-sm gap-2 flex items-center hover:bg-purple-50 border-purple-200",
                      selectedCategory === category.name ? "bg-purple-100 border-purple-300 text-purple-700 hover:bg-purple-100" : ""
                    )}
                  >
                    <span>{category.name}</span>
                    {selectedCategory === category.name && (
                      <div className="flex gap-1">
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
                                className="h-5 w-5 p-0 mr-1 text-purple-600 hover:bg-purple-200/50 hover:text-purple-700"
                              >
                                <Edit className="h-3 w-3" />
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
                                className="h-5 w-5 p-0 text-red-500 hover:bg-red-100/50 hover:text-red-600"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>حذف</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </Card>
  );
};
