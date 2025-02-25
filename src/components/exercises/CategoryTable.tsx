
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
    <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-blue-50/30">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-blue-500" />
            دسته‌بندی تمرین
          </h3>
          <Button 
            onClick={onAdd}
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white shadow-blue-200 shadow-lg transition-all duration-300 hover:scale-105"
            size="sm"
          >
            <Plus className="w-4 h-4 ml-2" />
            افزودن دسته‌بندی
          </Button>
        </div>

        <div className="relative overflow-x-auto rounded-lg border border-blue-100">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-50 to-transparent hover:bg-blue-50/50">
                <TableHead className="font-bold text-blue-800">نام دسته‌بندی</TableHead>
                <TableHead className="w-[100px] text-center font-bold text-blue-800">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={2} 
                    className="text-center h-32 text-muted-foreground animate-fade-in"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FolderTree className="w-8 h-8 text-blue-200" />
                      <p>هیچ دسته‌بندی ثبت نشده است</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow 
                    key={category.id}
                    className="group hover:bg-blue-50/50 transition-all duration-200"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ChevronDown className="w-4 h-4 text-blue-500 group-hover:rotate-180 transition-transform duration-300" />
                        <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full text-sm font-medium shadow-sm">
                          {category.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                          onClick={() => onEdit(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-red-100 hover:text-red-600 transition-colors"
                          onClick={() => onDelete(category)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
