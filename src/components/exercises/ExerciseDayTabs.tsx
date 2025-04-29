import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExerciseTabContent } from "./ExerciseTabContent";
import ExerciseViewControls from "./ExerciseViewControls";
import { Exercise } from "@/types/exercise";
import { cn } from "@/lib/utils";

interface ExerciseDayTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedExercisesDay1: number[];
  selectedExercisesDay2: number[];
  selectedExercisesDay3: number[];
  selectedExercisesDay4: number[];
  toggleExerciseDay1: (id: number) => void;
  toggleExerciseDay2: (id: number) => void;
  toggleExerciseDay3: (id: number) => void;
  toggleExerciseDay4: (id: number) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredExercises: Exercise[];
  categories: any[];
  handleClearSearch: () => void;
  handleSaveExercises: (exercisesWithSets: any[], dayNumber?: number) => boolean;
  selectedCategoryId: number | null;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  exerciseSetsDay1?: Record<number, number>;
  exerciseSetsDay2?: Record<number, number>;
  exerciseSetsDay3?: Record<number, number>;
  exerciseSetsDay4?: Record<number, number>;
  handleSetsChangeDay1?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay2?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay3?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay4?: (exerciseId: number, sets: number) => void;
  exerciseRepsDay1?: Record<number, string>;  // Add reps record
  exerciseRepsDay2?: Record<number, string>;
  exerciseRepsDay3?: Record<number, string>;
  exerciseRepsDay4?: Record<number, string>;
  handleRepsChangeDay1?: (exerciseId: number, reps: string) => void;  // Add reps handler
  handleRepsChangeDay2?: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay3?: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay4?: (exerciseId: number, reps: string) => void;
}

const ExerciseDayTabs: React.FC<ExerciseDayTabsProps> = ({
  activeTab,
  setActiveTab,
  selectedExercisesDay1,
  selectedExercisesDay2,
  selectedExercisesDay3,
  selectedExercisesDay4,
  toggleExerciseDay1,
  toggleExerciseDay2,
  toggleExerciseDay3,
  toggleExerciseDay4,
  viewMode,
  setViewMode,
  filteredExercises,
  categories,
  handleClearSearch,
  selectedCategoryId,
  toggleSortOrder,
  sortOrder,
  exerciseSetsDay1 = {},
  exerciseSetsDay2 = {},
  exerciseSetsDay3 = {},
  exerciseSetsDay4 = {},
  handleSetsChangeDay1,
  handleSetsChangeDay2,
  handleSetsChangeDay3,
  handleSetsChangeDay4,
  exerciseRepsDay1 = {},
  exerciseRepsDay2 = {},
  exerciseRepsDay3 = {},
  exerciseRepsDay4 = {},
  handleRepsChangeDay1,
  handleRepsChangeDay2,
  handleRepsChangeDay3,
  handleRepsChangeDay4
}) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex-1 flex flex-col overflow-hidden px-4 pb-2"
    >
      <div className="flex items-center justify-between mb-2">
        <TabsList className="flex bg-muted">
          <TabsTrigger value="day1" className="flex-1 min-w-[70px]">
            روز اول
            <span className={cn(
                "ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium",
                selectedExercisesDay1.length > 0 ? "opacity-100" : "opacity-0"
              )}
            >
              {selectedExercisesDay1.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="day2" className="flex-1 min-w-[70px]">
            روز دوم
            <span className={cn(
                "ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium",
                selectedExercisesDay2.length > 0 ? "opacity-100" : "opacity-0"
              )}
            >
              {selectedExercisesDay2.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="day3" className="flex-1 min-w-[70px]">
            روز سوم
            <span className={cn(
                "ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium",
                selectedExercisesDay3.length > 0 ? "opacity-100" : "opacity-0"
              )}
            >
              {selectedExercisesDay3.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="day4" className="flex-1 min-w-[70px]">
            روز چهارم
            <span className={cn(
                "ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium",
                selectedExercisesDay4.length > 0 ? "opacity-100" : "opacity-0"
              )}
            >
              {selectedExercisesDay4.length}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <ExerciseViewControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
        />
      </div>
      
      <TabsContent
        value="day1"
        className="flex-1 overflow-auto mt-0 p-0 border-none"
      >
        <ExerciseTabContent
          filteredExercises={filteredExercises}
          viewMode={viewMode}
          selectedExercises={selectedExercisesDay1}
          toggleExercise={toggleExerciseDay1}
          categories={categories}
          handleClearSearch={handleClearSearch}
          exerciseSets={exerciseSetsDay1}
          onSetsChange={handleSetsChangeDay1}
          repsInfo={exerciseRepsDay1}
          onRepsChange={handleRepsChangeDay1}
        />
      </TabsContent>
      
      <TabsContent
        value="day2"
        className="flex-1 overflow-auto mt-0 p-0 border-none"
      >
        <ExerciseTabContent
          filteredExercises={filteredExercises}
          viewMode={viewMode}
          selectedExercises={selectedExercisesDay2}
          toggleExercise={toggleExerciseDay2}
          categories={categories}
          handleClearSearch={handleClearSearch}
          exerciseSets={exerciseSetsDay2}
          onSetsChange={handleSetsChangeDay2}
          repsInfo={exerciseRepsDay2}
          onRepsChange={handleRepsChangeDay2}
        />
      </TabsContent>
      
      <TabsContent
        value="day3"
        className="flex-1 overflow-auto mt-0 p-0 border-none"
      >
        <ExerciseTabContent
          filteredExercises={filteredExercises}
          viewMode={viewMode}
          selectedExercises={selectedExercisesDay3}
          toggleExercise={toggleExerciseDay3}
          categories={categories}
          handleClearSearch={handleClearSearch}
          exerciseSets={exerciseSetsDay3}
          onSetsChange={handleSetsChangeDay3}
          repsInfo={exerciseRepsDay3}
          onRepsChange={handleRepsChangeDay3}
        />
      </TabsContent>
      
      <TabsContent
        value="day4"
        className="flex-1 overflow-auto mt-0 p-0 border-none"
      >
        <ExerciseTabContent
          filteredExercises={filteredExercises}
          viewMode={viewMode}
          selectedExercises={selectedExercisesDay4}
          toggleExercise={toggleExerciseDay4}
          categories={categories}
          handleClearSearch={handleClearSearch}
          exerciseSets={exerciseSetsDay4}
          onSetsChange={handleSetsChangeDay4}
          repsInfo={exerciseRepsDay4}
          onRepsChange={handleRepsChangeDay4}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ExerciseDayTabs;
