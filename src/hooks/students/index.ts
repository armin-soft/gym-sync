
import { useState, useEffect, useCallback } from "react";
import { useStudentManagement } from "./useStudentManagement";
import { useStudentExercises } from "./useStudentExercises";
import { useStudentDiet } from "./useStudentDiet";
import { useStudentSupplements } from "./useStudentSupplements";

export const useStudents = () => {
  const {
    students,
    exercises,
    meals,
    supplements,
    setStudents,
    handleDelete,
    handleSave,
    generateMockData
  } = useStudentManagement();

  const { handleSaveExercises } = useStudentExercises({ students, setStudents });
  const { handleSaveDiet } = useStudentDiet({ students, setStudents });
  const { handleSaveSupplements } = useStudentSupplements({ students, setStudents });

  return {
    students,
    exercises,
    meals,
    supplements,
    setStudents,
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    generateMockData
  };
};
