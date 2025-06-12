
import { useStudentManagement } from './useStudentManagement';
import { useStudentExercises } from './useStudentExercises';
import { useStudentDiet } from './useStudentDiet';
import { useStudentSupplements } from './useStudentSupplements';

export const useStudents = () => {
  const { 
    students, 
    exercises, 
    meals, 
    supplements, 
    setStudents, 
    setSupplements,
    handleDelete, 
    handleSave,
    refreshData
  } = useStudentManagement();

  const { handleSaveExercises } = useStudentExercises(students, setStudents);
  const { handleSaveDiet } = useStudentDiet(students, setStudents);
  const { handleSaveSupplements } = useStudentSupplements(students, setStudents);

  return {
    students,
    exercises,
    meals,
    supplements,
    setStudents,
    setSupplements,
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    refreshData
  };
};

export * from './useStudentManagement';
export * from './useStudentExercises';
export * from './useStudentDiet';
export * from './useStudentSupplements';
export * from './core';

