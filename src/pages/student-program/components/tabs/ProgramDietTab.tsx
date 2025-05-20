
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Student } from "@/components/students/StudentTypes";
import ProgramDietHeader from "./diet/ProgramDietHeader";
import DaySelector from "./diet/DaySelector";
import EmptyDayState from "./diet/EmptyDayState";
import DayContent from "./diet/DayContent";
import { weekDays } from "./diet/constants";
import { useDietState } from "./diet/useDietState";
import { cn } from "@/lib/utils";

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
  const {
    selectedMeals,
    setSelectedMeals,
    currentDay,
    setCurrentDay,
    isSaving,
    handleSave
  } = useDietState(student, onSaveDiet, propCurrentDay, propSetCurrentDay);

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
