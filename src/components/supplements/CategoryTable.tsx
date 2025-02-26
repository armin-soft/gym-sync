
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2, Plus, Beaker, AlignHorizontalJustifyStart } from "lucide-react";
import type { SupplementCategory } from "@/types/supplement";

interface CategoryTableProps {
  categories: SupplementCategory[];
  onAdd: () => void;
  onEdit: (category: SupplementCategory) => void;
  onDelete: (category: SupplementCategory) => void;
}

export function CategoryTable({ categories, onAdd, onEdit, onDelete }: CategoryTableProps) {
  return (
    <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-white to-purple-50/30 rounded-2xl">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-xl">
              <AlignHorizontalJustifyStart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">دسته‌بندی مکمل‌ها</h3>
              <p className="text-sm text-gray-500 mt-1">مدیریت دسته‌بندی‌های مکمل‌ها</p>
            </div>
          </div>
          <Button 
            onClick={onAdd}
            className="bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white shadow-purple-200 shadow-lg transition-all duration-300 hover:scale-105 rounded-xl"
            size="sm"
          >
            <Plus className="w-5 h-5 ml-2" />
            افزودن دسته‌بندی
          </Button>
        </div>

        <div className="grid gap-4">
          {categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-purple-50/50 rounded-2xl border-2 border-dashed border-purple-200">
              <div className="p-4 bg-purple-100 rounded-full mb-4">
                <Beaker className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-purple-600 font-medium">هیچ دسته‌بندی ثبت نشده است</p>
              <p className="text-purple-400 text-sm mt-1">برای شروع، یک دسته‌بندی جدید اضافه کنید</p>
            </div>
          ) : (
            categories.map((category) => (
              <div 
                key={category.id}
                className="group bg-white p-4 rounded-xl border border-purple-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                      <Beaker className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-xl text-sm font-medium shadow-sm group-hover:shadow-md transition-shadow">
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors"
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
