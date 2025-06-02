
import React, { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";
import { DaySelector, DayContent, ProgramDietHeader } from "./diet";

interface ProgramDietTabProps {
  student: Student;
  meals: any[];
  onSaveDiet: (mealIds: number[]) => boolean;
}

export const ProgramDietTab: React.FC<ProgramDietTabProps> = ({
  student,
  meals,
  onSaveDiet
}) => {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize selected meals from student data
  useEffect(() => {
    if (student.meals) {
      setSelectedMeals(student.meals);
    } else {
      setSelectedMeals([]);
    }
  }, [student]);

  const handleSave = () => {
    setIsLoading(true);
    const success = onSaveDiet(selectedMeals);
    setIsLoading(false);
    return success;
  };

  // Define the week days
  const weekDays = [
    { id: 1, name: "شنبه" },
    { id: 2, name: "یکشنبه" },
    { id: 3, name: "دوشنبه" },
    { id: 4, name: "سه شنبه" },
    { id: 5, name: "چهارشنبه" },
    { id: 6, name: "پنج شنبه" },
    { id: 7, name: "جمعه" }
  ];

  return (
    <div className="space-y-4 p-1">
      <ProgramDietHeader 
        onSave={handleSave} 
        isLoading={isLoading}
      />
      
      <DaySelector 
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
      />
      
      <DayContent
        currentDay={currentDay}
        weekDays={weekDays}
        meals={meals}
        selectedMeals={selectedMeals}
        setSelectedMeals={setSelectedMeals}
      />
    </div>
  );
};

export default ProgramDietTab;
