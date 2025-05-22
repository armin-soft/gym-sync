
import { useCallback } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";
import { safeJSONSave, safeJSONParse, notifyDataChange } from "@/utils/database";

/**
 * Hook for handling Student CRUD operations
 */
export const useStudentCRUD = (students: Student[], setStudents: React.Dispatch<React.SetStateAction<Student[]>>) => {
  const { toast } = useToast();

  // Optimized and improved delete function
  const handleDelete = useCallback((id: number) => {
    console.log(`Deleting student with ID: ${id}`);
    setStudents(prevStudents => {
      // Find student first to log what's being deleted
      const studentToDelete = prevStudents.find(s => s.id === id);
      if (studentToDelete) {
        console.log(`Deleting student: ${studentToDelete.name}`);
      } else {
        console.warn(`Student with ID ${id} not found for deletion`);
      }
      
      const newStudents = prevStudents.filter(student => student.id !== id);
      try {
        safeJSONSave('students', newStudents);
        console.log('Student deleted and saved successfully');
        
        // Notify the user
        toast({
          title: "حذف موفق",
          description: `شاگرد ${studentToDelete?.name || 'مورد نظر'} با موفقیت حذف شد`,
        });
      } catch (error) {
        console.error('Error saving students after deletion:', error);
        toast({
          variant: "destructive",
          title: "خطا در حذف",
          description: "مشکلی در حذف شاگرد پیش آمده است. لطفا مجدد تلاش کنید."
        });
      }
      return newStudents;
    });
  }, [toast, setStudents]);

  // Improved save function with better validation and error handling and image preservation
  const handleSave = useCallback((data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => {
    try {
      let updatedStudents: Student[];
      const timestamp = new Date().toISOString();
      
      if (selectedStudent) {
        console.log(`Updating student: ${selectedStudent.name} with ID: ${selectedStudent.id}`);
        
        // Preserve the existing image if a new one isn't provided
        const preservedImage = data.image || selectedStudent.image;
        
        updatedStudents = students.map(s => s.id === selectedStudent.id 
          ? { 
              ...selectedStudent, // Keep existing properties
              ...data, // Update with new data
              image: preservedImage, // Make sure we preserve the image
              exercises: selectedStudent.exercises || [], 
              exercisesDay1: selectedStudent.exercisesDay1 || [],
              exercisesDay2: selectedStudent.exercisesDay2 || [],
              exercisesDay3: selectedStudent.exercisesDay3 || [],
              exercisesDay4: selectedStudent.exercisesDay4 || [],
              meals: selectedStudent.meals || [], 
              supplements: selectedStudent.supplements || [], 
              vitamins: selectedStudent.vitamins || [],
              lastUpdate: timestamp
            } 
          : s
        );
        
        setStudents(updatedStudents);
        safeJSONSave('students', updatedStudents);
        
        toast({
          title: "ویرایش موفق",
          description: "اطلاعات شاگرد با موفقیت ویرایش شد"
        });
        console.log('Student updated successfully');
      } else {
        console.log('Creating new student');
        const newId = students.length > 0 
          ? Math.max(...students.map(s => s.id)) + 1 
          : 1;
          
        const newStudent = {
          ...data,
          id: newId,
          exercises: [],
          exercisesDay1: [],
          exercisesDay2: [],
          exercisesDay3: [],
          exercisesDay4: [],
          meals: [],
          supplements: [],
          vitamins: [],
          lastUpdate: timestamp
        };
        
        updatedStudents = [...students, newStudent];
        setStudents(updatedStudents);
        safeJSONSave('students', updatedStudents);
        
        toast({
          title: "افزودن موفق",
          description: "شاگرد جدید با موفقیت اضافه شد"
        });
        console.log('New student added successfully');
      }
      
      // Notify other tabs about the change
      notifyDataChange('students');
      
      return true;
    } catch (error) {
      console.error('Error saving student:', error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره اطلاعات شاگرد پیش آمده است. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  }, [students, toast, setStudents]);

  // Add function to refresh data from localStorage
  const refreshData = useCallback(() => {
    console.log('Manually refreshing student data...');
    try {
      const studentsData = safeJSONParse('students', []);
      if (Array.isArray(studentsData)) {
        setStudents(studentsData);
        console.log(`Refreshed data: found ${studentsData.length} students`);
      }
    } catch (error) {
      console.error('Error refreshing student data:', error);
    }
  }, [setStudents]);

  return {
    handleDelete,
    handleSave,
    refreshData
  };
};
