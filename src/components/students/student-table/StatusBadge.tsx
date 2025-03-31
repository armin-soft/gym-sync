
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/components/students/StudentTypes";

interface StatusBadgeProps {
  student: Student;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ student }) => {
  // Check if the student has any exercises, meals, or supplements
  const hasExercises = student.exercises?.length || 
                      student.exercisesDay1?.length || 
                      student.exercisesDay2?.length || 
                      student.exercisesDay3?.length || 
                      student.exercisesDay4?.length;
  
  const hasMeals = student.meals?.length;
  const hasSupplements = student.supplements?.length || student.vitamins?.length;
  
  if (hasExercises && hasMeals && hasSupplements) {
    return (
      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 rounded-full shadow-inner shadow-emerald-200/30 animate-pulse-slow">
        تکمیل
      </Badge>
    );
  } else if (hasExercises || hasMeals || hasSupplements) {
    return (
      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200 rounded-full shadow-inner shadow-amber-200/30">
        در حال انجام
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 rounded-full shadow-inner shadow-blue-200/30">
        جدید
      </Badge>
    );
  }
};
