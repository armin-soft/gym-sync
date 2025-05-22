
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Student } from "@/components/students/StudentTypes";
import ProgramDietHeader from "./diet/ProgramDietHeader";
import DaySelector from "./diet/DaySelector";
import EmptyDayState from "./diet/EmptyDayState";
import DayContent from "./diet/DayContent";
import { weekDays } from "./diet/constants";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ProgramDietTabProps {
  student: Student;
  meals: any[];
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean;
  currentDay?: number;
  setCurrentDay?: React.Dispatch<React.SetStateAction<number>>;
}

const ProgramDietTab: React.FC<ProgramDietTabProps> = ({
  student,
  meals,
  onSaveDiet,
  currentDay: propCurrentDay,
  setCurrentDay: propSetCurrentDay
}) => {
  const { toast } = useToast();
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [currentDay, setCurrentDay] = useState<number | null>(propCurrentDay !== undefined ? propCurrentDay : 1);
  const [isSaving, setIsSaving] = useState(false);
  
  // Use external day state if provided
  useEffect(() => {
    if (propCurrentDay !== undefined) {
      setCurrentDay(propCurrentDay);
    }
  }, [propCurrentDay]);
  
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

  // Use the day from props if provided, otherwise use the local state
  const effectiveCurrentDay = propCurrentDay !== undefined ? propCurrentDay : currentDay;
  const effectiveSetCurrentDay = propSetCurrentDay || setCurrentDay;

  return (
    <div className="flex flex-col h-full space-y-4 rtl" dir="rtl">
      <ProgramDietHeader 
        handleSave={handleSave} 
        isSaving={isSaving} 
        currentDay={effectiveCurrentDay}
      />
      
      <Card className="flex-1 overflow-auto">
        <CardContent className={cn(
          "p-4 h-full flex flex-col",
          "text-center" // Center the content
        )}>
          <div className="mx-auto w-full max-w-3xl">
            <DaySelector 
              weekDays={weekDays} 
              currentDay={effectiveCurrentDay} 
              setCurrentDay={effectiveSetCurrentDay}
              centered={true}
            />
          </div>
          
          {effectiveCurrentDay !== null ? (
            <DayContent 
              currentDay={effectiveCurrentDay}
              weekDays={weekDays}
              selectedMeals={selectedMeals}
              setSelectedMeals={setSelectedMeals}
              meals={meals}
              centered={true}
            />
          ) : (
            <EmptyDayState />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramDietTab;
