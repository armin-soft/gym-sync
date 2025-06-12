
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ExerciseDayTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedExercisesDay1: number[];
  selectedExercisesDay2: number[];
  selectedExercisesDay3: number[];
  selectedExercisesDay4: number[];
  selectedExercisesDay5: number[];
  toggleExerciseDay1: (id: number) => void;
  toggleExerciseDay2: (id: number) => void;
  toggleExerciseDay3: (id: number) => void;
  toggleExerciseDay4: (id: number) => void;
  toggleExerciseDay5: (id: number) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredExercises: any[];
  categories: any[];
  handleClearSearch: () => void;
  selectedCategoryId: number | null;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  exerciseSetsDay1: Record<number, number>;
  exerciseSetsDay2: Record<number, number>;
  exerciseSetsDay3: Record<number, number>;
  exerciseSetsDay4: Record<number, number>;
  exerciseSetsDay5: Record<number, number>;
  handleSetsChangeDay1: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay2: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay3: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay4: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay5: (exerciseId: number, sets: number) => void;
  exerciseRepsDay1: Record<number, string>;
  exerciseRepsDay2: Record<number, string>;
  exerciseRepsDay3: Record<number, string>;
  exerciseRepsDay4: Record<number, string>;
  exerciseRepsDay5: Record<number, string>;
  handleRepsChangeDay1: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay2: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay3: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay4: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay5: (exerciseId: number, reps: string) => void;
  handleSaveExercises: (exercisesWithSets: any[], dayNumber?: number) => boolean;
}

const ExerciseDayTabs: React.FC<ExerciseDayTabsProps> = ({
  activeTab,
  setActiveTab,
  selectedExercisesDay1,
  selectedExercisesDay2,
  selectedExercisesDay3,
  selectedExercisesDay4,
  selectedExercisesDay5
}) => {
  const getDayBadgeCount = (day: string) => {
    switch (day) {
      case "day1": return selectedExercisesDay1.length;
      case "day2": return selectedExercisesDay2.length;
      case "day3": return selectedExercisesDay3.length;
      case "day4": return selectedExercisesDay4.length;
      case "day5": return selectedExercisesDay5.length;
      default: return 0;
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        {["day1", "day2", "day3", "day4", "day5"].map((day, index) => (
          <TabsTrigger key={day} value={day} className="flex items-center gap-2">
            روز {index + 1}
            <Badge variant="secondary" className="text-xs">
              {getDayBadgeCount(day)}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>
      
      {["day1", "day2", "day3", "day4", "day5"].map((day) => (
        <TabsContent key={day} value={day}>
          <div className="p-4">
            <p>تمرینات روز {day.replace("day", "")}</p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ExerciseDayTabs;
