
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentExerciseSelector from "../StudentExerciseSelector";
import { ExerciseWithSets } from "@/types/exercise";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Save } from "lucide-react";

interface StudentProgramExerciseContentProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  exercises: any[]; // Add exercises prop
}

const StudentProgramExerciseContent: React.FC<StudentProgramExerciseContentProps> = ({
  currentDay,
  setCurrentDay,
  selectedExercises,
  setSelectedExercises,
  exercises, // Add exercises prop
}) => {
  const [dayLabels, setDayLabels] = useState<Record<number, string>>({
    1: "روز اول",
    2: "روز دوم",
    3: "روز سوم",
    4: "روز چهارم",
  });
  
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [tempDayLabel, setTempDayLabel] = useState("");
  
  const handleEditDayLabel = (day: number) => {
    setEditingDay(day);
    setTempDayLabel(dayLabels[day] || `روز ${toPersianNumbers(day)}`);
  };
  
  const handleSaveDayLabel = () => {
    if (editingDay !== null && tempDayLabel.trim()) {
      setDayLabels(prev => ({
        ...prev,
        [editingDay]: tempDayLabel.trim()
      }));
      setEditingDay(null);
    }
  };
  
  const getDayLabel = (day: number) => {
    return dayLabels[day] || `روز ${toPersianNumbers(day)}`;
  };

  return (
    <TabsContent value="exercise" className="m-0 h-full">
      <div className="mb-4 h-full flex flex-col rtl">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center border rounded-md">
            {[1, 2, 3, 4].map(day => (
              <div key={day} className="relative">
                {editingDay === day ? (
                  <div className="flex items-center px-2">
                    <Input
                      value={tempDayLabel}
                      onChange={(e) => setTempDayLabel(e.target.value)}
                      className="h-10 text-sm w-24"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleSaveDayLabel}
                      className="ml-1 h-8 w-8"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant={currentDay === day ? "default" : "ghost"}
                    className={cn(
                      "h-10 rounded-md px-5",
                      currentDay === day ? "bg-indigo-600 hover:bg-indigo-700" : ""
                    )}
                    onClick={() => setCurrentDay(day)}
                  >
                    {getDayLabel(day)}
                    <Edit2
                      className="h-3 w-3 ml-2 opacity-50 hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditDayLabel(day);
                      }}
                    />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <StudentExerciseSelector 
            selectedExercises={selectedExercises}
            setSelectedExercises={setSelectedExercises}
            dayNumber={currentDay}
            exercises={exercises} // Pass exercises down to the selector
            dayLabel={getDayLabel(currentDay)}
          />
        </div>
      </div>
    </TabsContent>
  );
};

export default StudentProgramExerciseContent;
