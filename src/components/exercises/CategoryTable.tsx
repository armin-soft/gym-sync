
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
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
  onEdit: (category: ExerciseCategory) => void;
  onDelete: (category: ExerciseCategory) => void;
}

export function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="text-base font-bold">نام دسته‌بندی</TableHead>
          <TableHead className="text-base font-bold w-28">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.length === 0 ? (
          <TableRow>
            <TableCell 
              colSpan={2} 
              className="text-center py-10 text-muted-foreground animate-fade-in"
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
              <TableCell className="font-medium">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  category.name === "دلتوئید خلفی" 
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}>
                  {category.name}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => onEdit(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
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
