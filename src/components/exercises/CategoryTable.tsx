
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2, ChevronDown, Plus, FolderTree } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExerciseCategory } from "@/types/exercise";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryTableProps {
  categories: ExerciseCategory[];
  onAdd: () => void;
  onEdit: (category: ExerciseCategory) => void;
  onDelete: (category: ExerciseCategory) => void;
}

export function CategoryTable({ categories, onAdd, onEdit, onDelete }: CategoryTableProps) {
  return (
    <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-white to-blue-50/30 rounded-2xl">
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="flex flex-wrap items-center justify-between mb-3 sm:mb-4 lg:mb-6 gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-blue-100 rounded-xl">
              <FolderTree className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800">دسته بندی تمرین</h3>
              <p className="text-2xs sm:text-xs text-gray-500 mt-0.5">مدیریت دسته بندی های تمرینی</p>
            </div>
          </div>
          <Button 
            onClick={onAdd}
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-blue-200 shadow-md transition-all duration-300 hover:scale-105 rounded-xl h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
            size="sm"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
            افزودن دسته بندی
          </Button>
        </div>

        <ScrollArea className="w-full" style={{ maxHeight: "calc(100vh - 300px)" }}>
          <div className="grid gap-2 sm:gap-3">
            {categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-blue-50/50 rounded-xl border-2 border-dashed border-blue-200">
                <div className="p-2 sm:p-3 bg-blue-100 rounded-full mb-2 sm:mb-3">
                  <FolderTree className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                <p className="text-blue-600 font-medium text-sm sm:text-base">هیچ دسته بندی ثبت نشده است</p>
                <p className="text-blue-400 text-2xs sm:text-xs mt-1">برای شروع، یک دسته بندی جدید اضافه کنید</p>
              </div>
            ) : (
              categories.map((category) => (
                <div 
                  key={category.id}
                  className="group bg-white p-2 sm:p-3 rounded-xl border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 sm:p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 group-hover:rotate-180 transition-transform duration-300" />
                      </div>
                      <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl text-2xs sm:text-xs font-medium shadow-sm group-hover:shadow-md transition-shadow">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors p-0"
                        onClick={() => onEdit(category)}
                      >
                        <Edit className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors p-0"
                        onClick={() => onDelete(category)}
                      >
                        <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}
