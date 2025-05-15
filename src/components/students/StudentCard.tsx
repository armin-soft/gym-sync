
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Student } from "./StudentTypes";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash2 } from "lucide-react";
import { ModernStudentSupplementDialog } from "@/components/nutrition/ModernStudentSupplementDialog"; // Update import
import { useStudentSupplements } from "@/hooks/students/useStudentSupplements";
import { useToast } from "@/hooks/use-toast";
import { useStudentMeals } from "@/hooks/students/useStudentMeals";
import { AddMealDialog } from "@/components/diet/AddMealDialog";
import { StudentExerciseDialog } from "@/components/exercises/StudentExerciseDialog";

interface StudentCardProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  students: Student[];
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onDelete,
  setStudents,
  students,
}) => {
  const { toast } = useToast();
  const [showSupplementsDialog, setShowSupplementsDialog] = React.useState(false);
  const [showMealsDialog, setShowMealsDialog] = React.useState(false);
  const [showExercisesDialog, setShowExercisesDialog] = React.useState(false);
  
  const { handleSaveMeals } = useStudentMeals(students, setStudents);
  const { handleSaveSupplements, supplements } = useStudentSupplements(students, setStudents);
  
  return (
    <>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{student.name}</h3>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button variant="outline" size="icon" onClick={onEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" 
                  onClick={onDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              {student.age && <p>سن: {student.age}</p>}
              {student.phone && <p>شماره تماس: {student.phone}</p>}
              {student.goal && <p>هدف: {student.goal}</p>}
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">پیشرفت برنامه</span>
                <span className="text-sm text-muted-foreground">{student.progress}%</span>
              </div>
              <Progress value={student.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowExercisesDialog(true)}
                className="text-xs"
              >
                تمرین‌ها
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowMealsDialog(true)}
                className="text-xs"
              >
                تغذیه
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowSupplementsDialog(true)}
                className="text-xs"
              >
                مکمل‌ها
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Modern Supplement Dialog */}
      <ModernStudentSupplementDialog
        open={showSupplementsDialog}
        onOpenChange={setShowSupplementsDialog}
        studentName={student.name}
        initialSupplements={student.supplements || []}
        initialVitamins={student.vitamins || []}
        onSave={(data) => handleSaveSupplements(data, student.id)}
        supplements={supplements}
      />

      <AddMealDialog 
        open={showMealsDialog}
        onOpenChange={setShowMealsDialog}
        onSave={(meals) => handleSaveMeals(meals, student.id)}
        studentName={student.name}
        initialMeals={student.meals || []}
      />
      
      <StudentExerciseDialog
        open={showExercisesDialog}
        onOpenChange={setShowExercisesDialog}
        student={student}
        onSave={(type, exercises) => {
          // TODO: Handle this properly with the student exercise hook when created
          toast({
            description: "تمرینات ذخیره شد"
          });
          return true;
        }}
      />
    </>
  );
};
