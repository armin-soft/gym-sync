
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExerciseTabContent } from "./ExerciseTabContent";
import { motion } from "framer-motion";
import { Dumbbell, Plus, ChevronDown } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Badge } from "@/components/ui/badge";

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
  const getTriggerClass = (value: string) => {
    const baseStyles = "flex items-center justify-center gap-2 transition-all";
    
    switch (value) {
      case "day1":
        return `${baseStyles} data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600`;
      case "day2":
        return `${baseStyles} data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600`;
      case "day3":
        return `${baseStyles} data-[state=active]:bg-pink-50 data-[state=active]:text-pink-600 data-[state=active]:border-b-2 data-[state=active]:border-pink-600`;
      case "day4":
        return `${baseStyles} data-[state=active]:bg-amber-50 data-[state=active]:text-amber-600 data-[state=active]:border-b-2 data-[state=active]:border-amber-600`;
      default:
        return baseStyles;
    }
  };

  return (
    <Tabs 
      defaultValue="day1" 
      className="flex-1 flex flex-col overflow-hidden mt-4 px-6 pb-6"
      onValueChange={setActiveTab}
      value={activeTab}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TabsList className="grid grid-cols-4 gap-2 w-full bg-gray-100/80 p-1 rounded-xl">
          <TabsTrigger 
            value="day1" 
            className={getTriggerClass("day1")}
          >
            <Dumbbell className="h-3.5 w-3.5" />
            <span>روز اول</span>
            {selectedExercisesDay1.length > 0 && (
              <Badge className="ml-1 h-5 min-w-5 p-0 flex items-center justify-center text-xs bg-blue-500">
                {toPersianNumbers(selectedExercisesDay1.length)}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="day2"
            className={getTriggerClass("day2")}
          >
            <Dumbbell className="h-3.5 w-3.5" />
            <span>روز دوم</span>
            {selectedExercisesDay2.length > 0 && (
              <Badge className="ml-1 h-5 min-w-5 p-0 flex items-center justify-center text-xs bg-purple-500">
                {toPersianNumbers(selectedExercisesDay2.length)}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="day3"
            className={getTriggerClass("day3")}
          >
            <Dumbbell className="h-3.5 w-3.5" />
            <span>روز سوم</span>
            {selectedExercisesDay3.length > 0 && (
              <Badge className="ml-1 h-5 min-w-5 p-0 flex items-center justify-center text-xs bg-pink-500">
                {toPersianNumbers(selectedExercisesDay3.length)}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="day4"
            className={getTriggerClass("day4")}
          >
            <Dumbbell className="h-3.5 w-3.5" />
            <span>روز چهارم</span>
            {selectedExercisesDay4.length > 0 && (
              <Badge className="ml-1 h-5 min-w-5 p-0 flex items-center justify-center text-xs bg-amber-500">
                {toPersianNumbers(selectedExercisesDay4.length)}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
      </motion.div>

      <TabsContent value="day1" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col mt-0">
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

      <TabsContent value="day2" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col mt-0">
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

      <TabsContent value="day3" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col mt-0">
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

      <TabsContent value="day4" className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col mt-0">
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
