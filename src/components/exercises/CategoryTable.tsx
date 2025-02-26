
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

interface CategoryTableProps {
  categories: ExerciseCategory[];
  onAdd: () => void;
  onEdit: (category: ExerciseCategory) => void;
  onDelete: (category: ExerciseCategory) => void;
}

export function CategoryTable({ categories, onAdd, onEdit, onDelete }: CategoryTableProps) {
  return (
    <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-white to-blue-50/30 rounded-2xl">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FolderTree className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">دسته‌بندی تمرین</h3>
              <p className="text-sm text-gray-500 mt-1">مدیریت دسته‌بندی‌های تمرینی</p>
            </div>
          </div>
          <Button 
            onClick={onAdd}
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-blue-200 shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
            size="sm"
          >
            <Plus className="w-5 h-5 ml-2" />
            افزودن دسته‌بندی
          </Button>
        </div>

        <div className="grid gap-4">
          {categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-blue-50/50 rounded-2xl border-2 border-dashed border-blue-200">
              <div className="p-4 bg-blue-100 rounded-full mb-4">
                <FolderTree className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-blue-600 font-medium">هیچ دسته‌بندی ثبت نشده است</p>
              <p className="text-blue-400 text-sm mt-1">برای شروع، یک دسته‌بندی جدید اضافه کنید</p>
            </div>
          ) : (
            categories.map((category) => (
              <div 
                key={category.id}
                className="group bg-white p-4 rounded-xl border border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <ChevronDown className="w-5 h-5 text-blue-500 group-hover:rotate-180 transition-transform duration-300" />
                    </div>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl text-sm font-medium shadow-sm group-hover:shadow-md transition-shadow">
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => onEdit(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                      onClick={() => onDelete(category)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}
