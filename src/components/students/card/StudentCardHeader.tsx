
import React from "react";
import { StudentCardAvatar } from "./StudentCardAvatar";
import { StudentCardMenu } from "./StudentCardMenu";
import { Student } from "../StudentTypes";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentCardHeaderProps {
  student: Student;
  onEdit?: () => void;
  onDelete: () => void;
  onAddExercise: () => void;
  onAddDiet: () => void;
  onAddSupplement: () => void;
  isProfileComplete: boolean;
}

export const StudentCardHeader: React.FC<StudentCardHeaderProps> = ({
  student,
  onEdit,
  onDelete,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  isProfileComplete
}) => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex space-x-4 space-x-reverse text-right">
        <StudentCardAvatar image={student.image} name={student.name} />
        <div>
          <h3 className="font-bold text-base leading-tight text-gray-900 dark:text-gray-100">{student.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 ltr:text-left rtl:text-right">
            {toPersianNumbers(student.phone)}
          </p>
        </div>
      </div>
      
      <StudentCardMenu 
        student={student}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddExercise={onAddExercise}
        onAddDiet={onAddDiet}
        onAddSupplement={onAddSupplement}
        isProfileComplete={isProfileComplete}
      />
    </div>
  );
};
