
import { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const useSupplementState = (
  student: Student, 
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}) => boolean,
  externalCurrentDay?: number,
  externalSetCurrentDay?: React.Dispatch<React.SetStateAction<number>>
) => {
  const [selectedSupplements, setSelectedSupplements] = useState<number[]>([]);
  const [selectedVitamins, setSelectedVitamins] = useState<number[]>([]);
  const [currentDay, setCurrentDay] = useState<number | null>(externalCurrentDay !== undefined ? externalCurrentDay : 1);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Use external day state if provided
  useEffect(() => {
    if (externalCurrentDay !== undefined) {
      setCurrentDay(externalCurrentDay);
    }
  }, [externalCurrentDay]);

  // Load supplements and vitamins for the selected day
  useEffect(() => {
    if (currentDay === null) return;

    const supplementDayKey = `supplementsDay${currentDay}` as keyof Student;
    const vitaminDayKey = `vitaminsDay${currentDay}` as keyof Student;
    
    if (student[supplementDayKey]) {
      setSelectedSupplements(student[supplementDayKey] as number[]);
    } else if (student.supplements) {
      setSelectedSupplements(student.supplements);
    } else {
      setSelectedSupplements([]);
    }
    
    if (student[vitaminDayKey]) {
      setSelectedVitamins(student[vitaminDayKey] as number[]);
    } else if (student.vitamins) {
      setSelectedVitamins(student.vitamins);
    } else {
      setSelectedVitamins([]);
    }
  }, [student, currentDay]);

  const handleSave = () => {
    if (currentDay === null) return;
    
    setIsSaving(true);
    try {
      const success = onSaveSupplements({
        supplements: selectedSupplements,
        vitamins: selectedVitamins,
        day: currentDay
      });
      
      if (success) {
        toast({
          title: "ذخیره موفق",
          description: `برنامه مکمل و ویتامین روز ${toPersianNumbers(currentDay)} با موفقیت ذخیره شد`
        });
      } else {
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره‌سازی برنامه مکمل و ویتامین پیش آمد."
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Define week days for selector
  const weekDays = [
    { day: 1, name: "روز اول" },
    { day: 2, name: "روز دوم" },
    { day: 3, name: "روز سوم" },
    { day: 4, name: "روز چهارم" },
    { day: 5, name: "روز پنجم" },
    { day: 6, name: "روز ششم" },
    { day: 7, name: "روز هفتم" },
  ];

  return {
    selectedSupplements,
    setSelectedSupplements,
    selectedVitamins,
    setSelectedVitamins,
    currentDay,
    setCurrentDay: externalSetCurrentDay || setCurrentDay,
    isSaving,
    handleSave,
    weekDays
  };
};
