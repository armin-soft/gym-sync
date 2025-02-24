
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
import { Exercise } from "@/types/exercise";

interface ExerciseTableProps {
  exercises: Exercise[];
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: number) => void;
}

export function ExerciseTable({ exercises, onEdit, onDelete }: ExerciseTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="text-base font-bold">نوع حرکت</TableHead>
          <TableHead className="text-base font-bold">نام حرکت</TableHead>
          <TableHead className="text-base font-bold w-28">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exercises.length === 0 ? (
          <TableRow>
            <TableCell 
              colSpan={3} 
              className="text-center py-10 text-muted-foreground animate-fade-in"
            >
              هیچ حرکتی ثبت نشده است
            </TableCell>
          </TableRow>
        ) : (
          exercises.map((exercise) => (
            <TableRow 
              key={exercise.id}
              className="group hover:bg-muted/50 transition-colors duration-200"
            >
              <TableCell className="font-medium">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  exercise.category === "دلتوئید خلفی" 
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}>
                  {exercise.category}
                </span>
              </TableCell>
              <TableCell className="text-base">{exercise.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => onEdit(exercise)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => onDelete(exercise.id)}
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
