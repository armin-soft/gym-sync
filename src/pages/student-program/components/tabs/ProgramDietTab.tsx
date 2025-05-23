
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { DaySelector, DayContent, ProgramDietHeader } from "./diet";
import { useDietTabState } from "./diet/useDietTabState";

interface ProgramDietTabProps {
  student: Student;
  meals: any[];
  onSaveDiet: (mealIds: number[]) => boolean;
  onShowPdfPreview?: () => void; // Added this prop to fix the TypeScript error
}

export const ProgramDietTab: React.FC<ProgramDietTabProps> = ({
  student,
  meals,
  onSaveDiet,
  onShowPdfPreview
}) => {
  const {
    currentDay,
    setCurrentDay,
    selectedMeals,
    setSelectedMeals,
    handleSave,
    isLoading
  } = useDietTabState(student, onSaveDiet);

  return (
    <div className="space-y-4 p-1">
      <ProgramDietHeader 
        onSave={handleSave} 
        isLoading={isLoading}
        onShowPdfPreview={onShowPdfPreview}
      />
      
      <DaySelector 
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
      />
      
      <DayContent
        currentDay={currentDay}
        meals={meals}
        selectedMeals={selectedMeals}
        setSelectedMeals={setSelectedMeals}
      />
    </div>
  );
};

export default ProgramDietTab;
