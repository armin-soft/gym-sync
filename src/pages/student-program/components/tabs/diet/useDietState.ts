
import { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const useDietState = (
  student: Student, 
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean,
  externalCurrentDay?: number,
  externalSetCurrentDay?: React.Dispatch<React.SetStateAction<number>>
) => {
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [currentDay, setCurrentDay] = useState<number | null>(externalCurrentDay !== undefined ? externalCurrentDay : 1);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Use external day state if provided
  useEffect(() => {
    if (externalCurrentDay !== undefined) {
      setCurrentDay(externalCurrentDay);
    }
  }, [externalCurrentDay]);

  // Load meals for the selected day
  useEffect(() => {
    if (currentDay === null) return;

    const dayKey = `mealsDay${currentDay}` as keyof Student;
    if (student[dayKey]) {
      setSelectedMeals(student[dayKey] as number[]);
    } else {
      setSelectedMeals([]);
    }
  }, [student, currentDay]);

  const handleSave = () => {
    if (currentDay === null) return;
    
    setIsSaving(true);
    try {
      const success = onSaveDiet(selectedMeals, currentDay);
      
      if (success) {
        toast({
          title: "ذخیره موفق",
          description: `برنامه غذایی روز ${toPersianNumbers(currentDay)} با موفقیت ذخیره شد`
        });
      } else {
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره‌سازی برنامه غذایی پیش آمد."
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  return {
    selectedMeals,
    setSelectedMeals,
    currentDay,
    setCurrentDay: externalSetCurrentDay || setCurrentDay,
    isSaving,
    handleSave
  };
};
