
import { useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";
import { safeJSONSave, notifyDataChange } from "@/utils/database";

/**
 * Hook to handle persisting student data to localStorage
 */
export const useStudentPersistence = (
  students: Student[],
  supplements: any[],
  isInitialized: boolean
) => {
  const { toast } = useToast();

  // Improved save to localStorage with proper error handling
  useEffect(() => {
    if (!isInitialized || students.length === 0) return;
    
    const saveTimeout = setTimeout(() => {
      try {
        console.log(`Saving ${students.length} students to localStorage`);
        safeJSONSave('students', students);
      } catch (error) {
        console.error('Error saving students to localStorage:', error);
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره اطلاعات پیش آمده است. لطفا مجدد تلاش کنید."
        });
      }
    }, 300); // Debounce saves by 300ms
    
    return () => clearTimeout(saveTimeout);
  }, [students, isInitialized, toast]);

  // Save supplements to localStorage whenever they change with error handling
  useEffect(() => {
    if (!isInitialized || supplements.length === 0) return;
    
    const saveTimeout = setTimeout(() => {
      try {
        console.log(`Saving ${supplements.length} supplements to localStorage`);
        safeJSONSave('supplements', supplements);
      } catch (error) {
        console.error('Error saving supplements to localStorage:', error);
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره اطلاعات مکمل‌ها پیش آمده است. لطفا مجدد تلاش کنید."
        });
      }
    }, 300); // Debounce saves by 300ms
    
    return () => clearTimeout(saveTimeout);
  }, [supplements, isInitialized, toast]);

  return { notifyDataChange };
};
