
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExerciseWithSets } from "@/types/exercise";

interface StudentExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  initialExercises: number[];
  initialExerciseSets?: { [key: number]: number };
  initialExerciseReps?: { [key: number]: string };
  initialExercisesDay1?: number[];
  initialExerciseSetsDay1?: { [key: number]: number };
  initialExerciseRepsDay1?: { [key: number]: string };
  initialExercisesDay2?: number[];
  initialExerciseSetsDay2?: { [key: number]: number };
  initialExerciseRepsDay2?: { [key: number]: string };
  initialExercisesDay3?: number[];
  initialExerciseSetsDay3?: { [key: number]: number };
  initialExerciseRepsDay3?: { [key: number]: string };
  initialExercisesDay4?: number[];
  initialExerciseSetsDay4?: { [key: number]: number };
  initialExerciseRepsDay4?: { [key: number]: string };
  initialExercisesDay5?: number[];
  initialExerciseSetsDay5?: { [key: number]: number };
  initialExerciseRepsDay5?: { [key: number]: string };
}

const StudentExerciseDialog: React.FC<StudentExerciseDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises
}) => {
  const handleSave = () => {
    // Basic implementation - convert initialExercises to ExerciseWithSets format
    const exercisesWithSets: ExerciseWithSets[] = initialExercises.map(id => ({
      id,
      sets: 3,
      reps: "10"
    }));
    onSave(exercisesWithSets, 1);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-right">
            برنامه تمرینی - {studentName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-4 text-center text-right">
          <p className="text-gray-600 mb-4">
            تنظیم برنامه تمرینی برای {studentName}
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              انصراف
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              ذخیره
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentExerciseDialog;
