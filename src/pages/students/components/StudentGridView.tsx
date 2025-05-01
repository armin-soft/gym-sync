
import { motion } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { StudentCard } from "@/components/students/StudentCard";

interface StudentGridViewProps {
  students: Student[];
  isProfileComplete: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddExercise: (student: Student) => void;
  onAddDiet: (student: Student) => void;
  onAddSupplement: (student: Student) => void;
}

export const StudentGridView: React.FC<StudentGridViewProps> = ({
  students,
  isProfileComplete,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 p-2 sm:p-4">
      {students.map(student => (
        <StudentCard 
          key={student.id}
          student={student}
          onEdit={() => onEdit(student)}
          onDelete={() => onDelete(student.id)}
          onAddExercise={() => onAddExercise(student)}
          onAddDiet={() => onAddDiet(student)}
          onAddSupplement={() => onAddSupplement(student)}
          isProfileComplete={isProfileComplete}
        />
      ))}
    </div>
  );
};
