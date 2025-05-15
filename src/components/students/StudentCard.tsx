
import React from "react";
import { Student } from "@/components/students/StudentTypes";

interface StudentCardProps {
  student: Student;
  onEdit: () => void;
  onDelete: () => void;
  setStudents: React.Dispatch<React.SetStateAction<Student[]>> | (() => void);
  students: Student[];
  onAddExercise?: () => void;
  onAddDiet?: () => void;
  onAddSupplement?: () => void;
  isProfileComplete?: boolean;
}

// Create a simple StudentCard component that can be enhanced later
export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onEdit,
  onDelete,
  setStudents,
  students,
  onAddExercise,
  onAddDiet,
  onAddSupplement,
  isProfileComplete = true
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-full flex flex-col">
      <div className="p-4 flex-1">
        <h3 className="text-lg font-medium">{student.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{student.phone}</p>
        
        {student.height && student.weight && (
          <div className="mt-2 text-sm">
            <span>قد: {student.height} سانتی‌متر</span>
            <span className="mx-2">|</span>
            <span>وزن: {student.weight} کیلوگرم</span>
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex justify-between">
        <button 
          className="text-blue-600 hover:text-blue-800 text-sm"
          onClick={onEdit}
        >
          ویرایش
        </button>
        <button 
          className="text-red-600 hover:text-red-800 text-sm"
          onClick={onDelete}
        >
          حذف
        </button>
      </div>
      
      {onAddExercise && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex justify-between">
          <button 
            className="text-green-600 hover:text-green-800 text-sm"
            onClick={onAddExercise}
          >
            افزودن تمرین
          </button>
          {onAddDiet && (
            <button 
              className="text-orange-600 hover:text-orange-800 text-sm"
              onClick={onAddDiet}
            >
              افزودن غذا
            </button>
          )}
        </div>
      )}
      
      {onAddSupplement && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex justify-center">
          <button 
            className="text-purple-600 hover:text-purple-800 text-sm"
            onClick={onAddSupplement}
          >
            افزودن مکمل
          </button>
        </div>
      )}
    </div>
  );
};
