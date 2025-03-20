
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExerciseTabContent } from "./ExerciseTabContent";

interface ExerciseDayTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedExercisesDay1: number[];
  selectedExercisesDay2: number[];
  selectedExercisesDay3: number[];
  selectedExercisesDay4: number[];
  toggleExerciseDay1: (exerciseId: number) => void;
  toggleExerciseDay2: (exerciseId: number) => void;
  toggleExerciseDay3: (exerciseId: number) => void;
  toggleExerciseDay4: (exerciseId: number) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredExercises: any[];
  categories: any[];
  handleClearSearch: () => void;
  handleSaveExercises: (exerciseIds: number[], dayNumber?: number) => boolean;
  selectedCategoryId: number | null;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
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
  handleSaveExercises,
  selectedCategoryId,
  toggleSortOrder,
  sortOrder,
}) => {
  return (
    <Tabs 
      defaultValue="day1" 
      className="flex-1 flex flex-col overflow-hidden mt-6 px-6 pb-6"
      onValueChange={setActiveTab}
      value={activeTab}
    >
      <TabsList className="grid grid-cols-4 gap-2 w-full">
        <TabsTrigger 
          value="day1" 
          className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
        >
          روز اول
        </TabsTrigger>
        <TabsTrigger 
          value="day2"
          className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
        >
          روز دوم
        </TabsTrigger>
        <TabsTrigger 
          value="day3"
          className="data-[state=active]:bg-pink-50 data-[state=active]:text-pink-600 data-[state=active]:border-b-2 data-[state=active]:border-pink-600"
        >
          روز سوم
        </TabsTrigger>
        <TabsTrigger 
          value="day4"
          className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-600 data-[state=active]:border-b-2 data-[state=active]:border-amber-600"
        >
          روز چهارم
        </TabsTrigger>
      </TabsList>

      <TabsContent value="day1" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
        <ExerciseTabContent 
          selectedExercises={selectedExercisesDay1} 
          toggleExercise={toggleExerciseDay1} 
          dayNumber={1}
          tabValue="day1"
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredExercises={filteredExercises}
          categories={categories}
          handleClearSearch={handleClearSearch}
          handleSaveExercises={handleSaveExercises}
          selectedCategoryId={selectedCategoryId}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
        />
      </TabsContent>

      <TabsContent value="day2" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
        <ExerciseTabContent 
          selectedExercises={selectedExercisesDay2} 
          toggleExercise={toggleExerciseDay2} 
          dayNumber={2}
          tabValue="day2"
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredExercises={filteredExercises}
          categories={categories}
          handleClearSearch={handleClearSearch}
          handleSaveExercises={handleSaveExercises}
          selectedCategoryId={selectedCategoryId}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
        />
      </TabsContent>

      <TabsContent value="day3" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
        <ExerciseTabContent 
          selectedExercises={selectedExercisesDay3} 
          toggleExercise={toggleExerciseDay3} 
          dayNumber={3}
          tabValue="day3"
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredExercises={filteredExercises}
          categories={categories}
          handleClearSearch={handleClearSearch}
          handleSaveExercises={handleSaveExercises}
          selectedCategoryId={selectedCategoryId}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
        />
      </TabsContent>

      <TabsContent value="day4" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col">
        <ExerciseTabContent 
          selectedExercises={selectedExercisesDay4} 
          toggleExercise={toggleExerciseDay4} 
          dayNumber={4}
          tabValue="day4"
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredExercises={filteredExercises}
          categories={categories}
          handleClearSearch={handleClearSearch}
          handleSaveExercises={handleSaveExercises}
          selectedCategoryId={selectedCategoryId}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ExerciseDayTabs;
