
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ChevronDown, Plus } from "lucide-react";
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
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 hover:bg-muted/50">
          <TableHead className="font-bold">نام دسته‌بندی</TableHead>
          <TableHead className="w-[100px] text-center font-bold">
            <div className="flex items-center justify-between">
              <span>عملیات</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                onClick={onAdd}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.length === 0 ? (
          <TableRow>
            <TableCell 
              colSpan={2} 
              className="text-center h-32 text-muted-foreground animate-fade-in"
            >
              هیچ دسته‌بندی ثبت نشده است
            </TableCell>
          </TableRow>
        ) : (
          categories.map((category) => (
            <TableRow 
              key={category.id}
              className="group hover:bg-muted/50 transition-colors duration-200"
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <ChevronDown className="w-4 h-4 text-blue-500" />
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                    {category.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => onEdit(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
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
  );
}
