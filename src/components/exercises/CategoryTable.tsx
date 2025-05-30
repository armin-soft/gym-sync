
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, Trash2, ChevronDown, Plus, FolderTree, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExerciseCategory } from "@/types/exercise";
import { useState } from "react";
import { motion } from "framer-motion";

interface CategoryTableProps {
  categories: ExerciseCategory[];
  onAdd: () => void;
  onEdit: (category: ExerciseCategory) => void;
  onDelete: (category: ExerciseCategory) => void;
}

export function CategoryTable({ categories, onAdd, onEdit, onDelete }: CategoryTableProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  return (
    <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-white to-blue-50/30 rounded-2xl h-full flex flex-col">
      <div className="p-4 sm:p-6 lg:p-8 border-b">
        <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-xl">
              <FolderTree className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">دسته بندی تمرین</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">مدیریت دسته بندی های تمرینی</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* View Mode Controls */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8 p-0",
                  viewMode === "grid" ? "bg-white shadow-sm" : ""
                )}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8 p-0",
                  viewMode === "list" ? "bg-white shadow-sm" : ""
                )}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              onClick={onAdd}
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-blue-200 shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
              size="sm"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              افزودن دسته بندی
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <ScrollArea className="h-full">
          {categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 sm:p-12 bg-blue-50/50 rounded-2xl border-2 border-dashed border-blue-200 h-full">
              <div className="p-3 sm:p-4 bg-blue-100 rounded-full mb-3 sm:mb-4">
                <FolderTree className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
              <p className="text-blue-600 font-medium">هیچ دسته بندی ثبت نشده است</p>
              <p className="text-blue-400 text-xs sm:text-sm mt-1">برای شروع، یک دسته بندی جدید اضافه کنید</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="p-4 bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] h-full">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors flex items-center justify-center">
                        <ChevronDown className="w-6 h-6 text-blue-500 group-hover:rotate-180 transition-transform duration-300" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{category.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{category.type}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => onEdit(category)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                          onClick={() => onDelete(category)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white p-3 sm:p-4 rounded-xl border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 group-hover:rotate-180 transition-transform duration-300" />
                      </div>
                      <div>
                        <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl text-xs sm:text-sm font-medium shadow-sm group-hover:shadow-md transition-shadow">
                          {category.name}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{category.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => onEdit(category)}
                      >
                        <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                        onClick={() => onDelete(category)}
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </Card>
  );
}
