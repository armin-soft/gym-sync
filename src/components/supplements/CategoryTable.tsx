
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2, Plus, Beaker, AlignHorizontalJustifyStart } from "lucide-react";
import type { SupplementCategory } from "@/types/supplement";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryTableProps {
  categories: SupplementCategory[];
  onAdd: () => void;
  onEdit: (category: SupplementCategory) => void;
  onDelete: (category: SupplementCategory) => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export function CategoryTable({ categories, onAdd, onEdit, onDelete, selectedCategory, onSelectCategory }: CategoryTableProps) {
  return (
    <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-white to-purple-50/30 rounded-2xl">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-50 rounded-xl">
              <AlignHorizontalJustifyStart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">دسته بندی ها</h3>
              <p className="text-sm text-gray-500 mt-1">مدیریت دسته بندی مکمل ها و ویتامین ها</p>
            </div>
          </div>
          <Button 
            onClick={onAdd}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-purple-200 shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
            size="sm"
          >
            <Plus className="w-5 h-5 ml-2" />
            افزودن دسته بندی
          </Button>
        </div>

        <div className="grid gap-4">
          {categories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-purple-50 to-blue-50/30 rounded-2xl border-2 border-dashed border-purple-200"
            >
              <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-50 rounded-full mb-4">
                <Beaker className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-purple-600 font-medium">هیچ دسته بندی ثبت نشده است</p>
              <p className="text-purple-400 text-sm mt-1">برای شروع، یک دسته بندی جدید اضافه کنید</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className={`group bg-white p-4 rounded-xl border ${
                    selectedCategory === category.name 
                      ? "border-purple-300 shadow-lg ring-2 ring-purple-200 ring-opacity-50" 
                      : "border-purple-100 hover:border-purple-200 hover:shadow-lg"
                  } transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                  onClick={() => onSelectCategory && onSelectCategory(category.name)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg group-hover:from-purple-100 group-hover:to-blue-100 transition-colors">
                        <Beaker className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl text-sm font-medium shadow-sm group-hover:shadow-md transition-shadow">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(category);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(category);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </Card>
  );
}
