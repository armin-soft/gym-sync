
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Student } from "@/components/students/StudentTypes";
import { Supplement } from "@/types/supplement";
import { toPersianNumbers } from "@/lib/utils/numbers";
import DaySelector from "./diet/DaySelector";
import ProgramDietHeader from "./diet/ProgramDietHeader";
import { useSupplementState } from "./supplements/useSupplementState";
import SupplementDayContent from "./supplements/SupplementDayContent";

interface ProgramSupplementTabProps {
  student: Student;
  supplements: Supplement[];
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}) => boolean;
  currentDay?: number;
  setCurrentDay?: React.Dispatch<React.SetStateAction<number>>;
}

const ProgramSupplementTab: React.FC<ProgramSupplementTabProps> = ({
  student,
  supplements,
  onSaveSupplements,
  currentDay: propCurrentDay,
  setCurrentDay: propSetCurrentDay
}) => {
  const {
    selectedSupplements,
    setSelectedSupplements,
    selectedVitamins,
    setSelectedVitamins,
    currentDay,
    setCurrentDay,
    isSaving,
    handleSave,
    weekDays
  } = useSupplementState(student, onSaveSupplements, propCurrentDay, propSetCurrentDay);

  // Use the day from props if provided, otherwise use the local state
  const effectiveCurrentDay = propCurrentDay !== undefined ? propCurrentDay : currentDay;
  const effectiveSetCurrentDay = propSetCurrentDay || setCurrentDay;

  return (
    <div className="flex flex-col h-full space-y-4 rtl" dir="rtl">
      <ProgramDietHeader 
        handleSave={handleSave} 
        isSaving={isSaving} 
        currentDay={effectiveCurrentDay}
        title="مکمل و ویتامین"
        buttonColor="from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
      />
      
      <Card className="flex-1 overflow-auto">
        <CardContent className="p-4 h-full flex flex-col">
          <DaySelector 
            weekDays={weekDays} 
            currentDay={effectiveCurrentDay} 
            setCurrentDay={effectiveSetCurrentDay}
          />
          
          {effectiveCurrentDay !== null && (
            <SupplementDayContent
              currentDay={effectiveCurrentDay}
              weekDays={weekDays}
              supplements={supplements}
              selectedSupplements={selectedSupplements}
              setSelectedSupplements={setSelectedSupplements}
              selectedVitamins={selectedVitamins}
              setSelectedVitamins={setSelectedVitamins}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramSupplementTab;
