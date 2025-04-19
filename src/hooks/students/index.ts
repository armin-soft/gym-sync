
import { useStudentManagement } from './useStudentManagement';
import { useStudentExercises } from './useStudentExercises';
import { useStudentDiet } from './useStudentDiet';
import { useStudentSupplements } from './useStudentSupplements';
import { useStudentData } from '@/hooks/useStudentData';

export const useStudents = () => {
  const { students, setStudents } = useStudentData();
  
  const { 
    handleDelete, 
    handleSave 
  } = useStudentManagement(() => {});

  const { handleSaveExercises } = useStudentExercises(students, setStudents);
  const { handleSaveDiet } = useStudentDiet(students, setStudents);
  const { handleSaveSupplements } = useStudentSupplements(students, setStudents);

  return {
    students,
    exercises: [],
    meals: [],
    supplements: [],
    handleDelete,
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements
  };
};

export * from './useStudentManagement';
export * from './useStudentExercises';
export * from './useStudentDiet';
export * from './useStudentSupplements';
