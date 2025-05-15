
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExerciseSearchFilters } from "@/components/exercises/search-filters";
import { ExerciseTabContent } from "@/components/exercises/ExerciseTabContent";
import { ExerciseDayTabs } from "@/components/exercises/ExerciseDayTabs";
import { ExerciseCategory, Exercise } from "@/types/exercise";
import SpeechExerciseInput from "./SpeechExerciseInput";
import { ExerciseWithSets } from "@/hooks/exercise-selection";
import { useToast } from "@/hooks/use-toast";

interface ExerciseDialogContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExerciseType: string;
  setSelectedExerciseType: (type: string) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: string[];
  categories: ExerciseCategory[];
  filteredCategories: ExerciseCategory[];
  handleClearSearch: () => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredExercises: Exercise[];
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
  exerciseSetsDay1: Record<number, number>;
  exerciseSetsDay2: Record<number, number>;
  exerciseSetsDay3: Record<number, number>;
  exerciseSetsDay4: Record<number, number>;
  handleSetsChangeDay1: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay2: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay3: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay4: (exerciseId: number, sets: number) => void;
  exerciseRepsDay1: Record<number, string>;
  exerciseRepsDay2: Record<number, string>;
  exerciseRepsDay3: Record<number, string>;
  exerciseRepsDay4: Record<number, string>;
  handleRepsChangeDay1: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay2: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay3: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay4: (exerciseId: number, reps: string) => void;
  handleSaveExercises?: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
}

const ExerciseDialogContent: React.FC<ExerciseDialogContentProps> = ({
  searchQuery,
  setSearchQuery,
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  categories,
  filteredCategories,
  handleClearSearch,
  toggleSortOrder,
  sortOrder,
  viewMode,
  setViewMode,
  filteredExercises,
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
  exerciseSetsDay1,
  exerciseSetsDay2,
  exerciseSetsDay3,
  exerciseSetsDay4,
  handleSetsChangeDay1,
  handleSetsChangeDay2,
  handleSetsChangeDay3,
  handleSetsChangeDay4,
  exerciseRepsDay1,
  exerciseRepsDay2,
  exerciseRepsDay3,
  exerciseRepsDay4,
  handleRepsChangeDay1,
  handleRepsChangeDay2,
  handleRepsChangeDay3,
  handleRepsChangeDay4,
  handleSaveExercises
}) => {
  const { toast } = useToast();
  const [quickAddExercise, setQuickAddExercise] = useState<Exercise | null>(null);
  
  // Handle adding custom exercise by speech
  const handleQuickExerciseAdd = (exerciseName: string) => {
    if (!exerciseName.trim()) return;
    
    // Create a temporary exercise object
    const newExercise: Exercise = {
      id: Date.now(), // Use timestamp as temporary ID
      name: exerciseName.trim(),
      categoryId: selectedCategoryId || 1
    };
    
    // Add this exercise to the current day's selection
    try {
      switch (activeTab) {
        case "day1":
          if (!selectedExercisesDay1.includes(newExercise.id)) {
            toggleExerciseDay1(newExercise.id);
            handleSetsChangeDay1(newExercise.id, 3); // Default 3 sets
          }
          break;
        case "day2":
          if (!selectedExercisesDay2.includes(newExercise.id)) {
            toggleExerciseDay2(newExercise.id);
            handleSetsChangeDay2(newExercise.id, 3);
          }
          break;
        case "day3":
          if (!selectedExercisesDay3.includes(newExercise.id)) {
            toggleExerciseDay3(newExercise.id);
            handleSetsChangeDay3(newExercise.id, 3);
          }
          break;
        case "day4":
          if (!selectedExercisesDay4.includes(newExercise.id)) {
            toggleExerciseDay4(newExercise.id);
            handleSetsChangeDay4(newExercise.id, 3);
          }
          break;
      }
      
      // Store this temporary exercise
      setQuickAddExercise(newExercise);
      
      // Show success message
      toast({
        title: "حرکت اضافه شد",
        description: `حرکت "${exerciseName}" به روز ${activeTab.replace('day', '')} اضافه شد`
      });
      
      // Save immediately if handleSaveExercises is provided
      if (handleSaveExercises) {
        // Get the current exercises with sets for the active day
        let exercisesWithSets: ExerciseWithSets[] = [];
        const dayNumber = parseInt(activeTab.replace('day', ''));
        
        switch (activeTab) {
          case "day1":
            exercisesWithSets = selectedExercisesDay1.map(id => ({
              id,
              name: id === newExercise.id ? newExercise.name : filteredExercises.find(e => e.id === id)?.name || "",
              sets: exerciseSetsDay1[id] || 3,
              reps: exerciseRepsDay1[id] || ""
            }));
            break;
          case "day2":
            exercisesWithSets = selectedExercisesDay2.map(id => ({
              id, 
              name: id === newExercise.id ? newExercise.name : filteredExercises.find(e => e.id === id)?.name || "",
              sets: exerciseSetsDay2[id] || 3,
              reps: exerciseRepsDay2[id] || ""
            }));
            break;
          case "day3":
            exercisesWithSets = selectedExercisesDay3.map(id => ({
              id,
              name: id === newExercise.id ? newExercise.name : filteredExercises.find(e => e.id === id)?.name || "",
              sets: exerciseSetsDay3[id] || 3,
              reps: exerciseRepsDay3[id] || ""
            }));
            break;
          case "day4":
            exercisesWithSets = selectedExercisesDay4.map(id => ({
              id,
              name: id === newExercise.id ? newExercise.name : filteredExercises.find(e => e.id === id)?.name || "",
              sets: exerciseSetsDay4[id] || 3,
              reps: exerciseRepsDay4[id] || ""
            }));
            break;
        }
        
        handleSaveExercises(exercisesWithSets, dayNumber);
      }
    } catch (error) {
      console.error("Error adding quick exercise:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در افزودن حرکت جدید"
      });
    }
  };

  // Determine which toggleExercise function to use based on active tab
  const getToggleFunction = () => {
    switch (activeTab) {
      case "day1": return toggleExerciseDay1;
      case "day2": return toggleExerciseDay2;
      case "day3": return toggleExerciseDay3;
      case "day4": return toggleExerciseDay4;
      default: return toggleExerciseDay1;
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex items-start md:items-center justify-between gap-2 px-4 py-2 border-b">
        <ExerciseDayTabs 
          activeTab={activeTab}
          onChange={setActiveTab}
          selectedExercisesDay1={selectedExercisesDay1}
          selectedExercisesDay2={selectedExercisesDay2}
          selectedExercisesDay3={selectedExercisesDay3}
          selectedExercisesDay4={selectedExercisesDay4}
        />
        
        <div className="flex items-center gap-2">
          <SpeechExerciseInput onAddExercise={handleQuickExerciseAdd} />
        </div>
      </div>

      <div className="p-4 border-b">
        <ExerciseSearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedExerciseType={selectedExerciseType}
          setSelectedExerciseType={setSelectedExerciseType}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          exerciseTypes={exerciseTypes}
          categories={categories}
          filteredCategories={filteredCategories}
          handleClearSearch={handleClearSearch}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>

      <TabsContent value="day1" className="flex-1 mt-0">
        <ExerciseTabContent
          exercises={filteredExercises}
          selectedExercises={selectedExercisesDay1}
          toggleExercise={toggleExerciseDay1}
          exerciseSets={exerciseSetsDay1}
          handleSetsChange={handleSetsChangeDay1}
          exerciseReps={exerciseRepsDay1}
          handleRepsChange={handleRepsChangeDay1}
          viewMode={viewMode}
          temporaryExercise={activeTab === "day1" ? quickAddExercise : null}
        />
      </TabsContent>

      <TabsContent value="day2" className="flex-1 mt-0">
        <ExerciseTabContent
          exercises={filteredExercises}
          selectedExercises={selectedExercisesDay2}
          toggleExercise={toggleExerciseDay2}
          exerciseSets={exerciseSetsDay2}
          handleSetsChange={handleSetsChangeDay2}
          exerciseReps={exerciseRepsDay2}
          handleRepsChange={handleRepsChangeDay2}
          viewMode={viewMode}
          temporaryExercise={activeTab === "day2" ? quickAddExercise : null}
        />
      </TabsContent>

      <TabsContent value="day3" className="flex-1 mt-0">
        <ExerciseTabContent
          exercises={filteredExercises}
          selectedExercises={selectedExercisesDay3}
          toggleExercise={toggleExerciseDay3}
          exerciseSets={exerciseSetsDay3}
          handleSetsChange={handleSetsChangeDay3}
          exerciseReps={exerciseRepsDay3}
          handleRepsChange={handleRepsChangeDay3}
          viewMode={viewMode}
          temporaryExercise={activeTab === "day3" ? quickAddExercise : null}
        />
      </TabsContent>

      <TabsContent value="day4" className="flex-1 mt-0">
        <ExerciseTabContent
          exercises={filteredExercises}
          selectedExercises={selectedExercisesDay4}
          toggleExercise={toggleExerciseDay4}
          exerciseSets={exerciseSetsDay4}
          handleSetsChange={handleSetsChangeDay4}
          exerciseReps={exerciseRepsDay4}
          handleRepsChange={handleRepsChangeDay4}
          viewMode={viewMode}
          temporaryExercise={activeTab === "day4" ? quickAddExercise : null}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ExerciseDialogContent;
