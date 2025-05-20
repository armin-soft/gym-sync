
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import StudentDietSelector from "../StudentDietSelector";

interface StudentProgramDietContentProps {
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  meals: any[];
  currentDietDay?: number;
  setCurrentDietDay?: React.Dispatch<React.SetStateAction<number>>;
}

const StudentProgramDietContent: React.FC<StudentProgramDietContentProps> = ({
  selectedMeals,
  setSelectedMeals,
  meals,
  currentDietDay,
  setCurrentDietDay
}) => {
  return (
    <TabsContent value="diet" className="m-0 h-full">
      <div className="mb-4 h-full flex flex-col">
        <h3 className="font-semibold text-lg mb-4">
          برنامه غذایی {currentDietDay ? `روز ${currentDietDay}` : ''}
        </h3>
        <div className="flex-1 overflow-auto">
          <StudentDietSelector 
            meals={meals}
            selectedMeals={selectedMeals}
            setSelectedMeals={setSelectedMeals}
            currentDay={currentDietDay}
          />
        </div>
      </div>
    </TabsContent>
  );
};

export default StudentProgramDietContent;
