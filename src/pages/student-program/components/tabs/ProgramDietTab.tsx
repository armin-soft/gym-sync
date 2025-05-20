
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Student } from "@/components/students/StudentTypes";
import ProgramDietHeader from "./diet/ProgramDietHeader";
import DaySelector from "./diet/DaySelector";
import EmptyDayState from "./diet/EmptyDayState";
import DayContent from "./diet/DayContent";
import { weekDays } from "./diet/constants";
import { useDietState } from "./diet/useDietState";

interface ProgramDietTabProps {
  student: Student;
  meals: any[];
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean;
}

const ProgramDietTab: React.FC<ProgramDietTabProps> = ({
  student,
  meals,
  onSaveDiet
}) => {
  const {
    selectedMeals,
    setSelectedMeals,
    currentDay,
    setCurrentDay,
    isSaving,
    handleSave
  } = useDietState(student, onSaveDiet);

  return (
    <div className="flex flex-col h-full space-y-4 rtl" dir="rtl">
      <ProgramDietHeader 
        handleSave={handleSave} 
        isSaving={isSaving} 
      />
      
      <Card className="flex-1 overflow-auto">
        <CardContent className="p-4 h-full flex flex-col">
          <DaySelector 
            weekDays={weekDays} 
            currentDay={currentDay} 
            setCurrentDay={setCurrentDay} 
          />
          
          {currentDay !== null ? (
            <DayContent 
              currentDay={currentDay}
              weekDays={weekDays}
              selectedMeals={selectedMeals}
              setSelectedMeals={setSelectedMeals}
              meals={meals}
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
