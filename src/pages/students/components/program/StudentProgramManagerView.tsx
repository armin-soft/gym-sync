
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";

interface StudentProgramManagerViewProps {
  student: Student;
  exercises: any[];
  meals: any[];
  supplements: any[];
  onSaveExercises: (exercisesData: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number, dayNumber?: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
  onClose: () => void;
}

const StudentProgramManagerView: React.FC<StudentProgramManagerViewProps> = ({
  student,
  onClose
}) => {
  return (
    <div className="p-4">
      <h2>مدیریت برنامه {student.name}</h2>
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">
        بازگشت
      </button>
    </div>
  );
};

export default StudentProgramManagerView;
