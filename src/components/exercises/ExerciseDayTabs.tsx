
import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import TabHeader from "./day-tabs/TabHeader";
import TabContentWrapper from "./day-tabs/TabContentWrapper";
import { Exercise } from "@/types/exercise";
import { Button } from "@/components/ui/button";
import { ListFilter, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  exerciseRepsDay1?: Record<number, string>;  
  exerciseRepsDay2?: Record<number, string>;
  exerciseRepsDay3?: Record<number, string>;
  exerciseRepsDay4?: Record<number, string>;
  handleRepsChangeDay1?: (exerciseId: number, reps: string) => void;  
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
  handleRepsChangeDay4,
  handleSaveExercises
}) => {
  // Available day tabs
  const dayTabs = ["day1", "day2", "day3", "day4"];
  
  // State for the fullscreen dialog
  const [showFullDialog, setShowFullDialog] = useState(false);
  
  // Get selected exercises for current tab
  const getSelectedExercisesCount = () => {
    switch(activeTab) {
      case "day1": return selectedExercisesDay1.length;
      case "day2": return selectedExercisesDay2.length;
      case "day3": return selectedExercisesDay3.length;
      case "day4": return selectedExercisesDay4.length;
      default: return 0;
    }
  };
  
  // Get day name in Persian
  const getDayName = () => {
    switch(activeTab) {
      case "day1": return "روز اول";
      case "day2": return "روز دوم";
      case "day3": return "روز سوم";
      case "day4": return "روز چهارم";
      default: return "";
    }
  };
  
  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col overflow-hidden px-4 pb-2"
      >
        <TabHeader 
          activeTab={activeTab}
          dayTabs={dayTabs}
          selectedExercisesDay1={selectedExercisesDay1}
          selectedExercisesDay2={selectedExercisesDay2}
          selectedExercisesDay3={selectedExercisesDay3}
          selectedExercisesDay4={selectedExercisesDay4}
          viewMode={viewMode}
          setViewMode={setViewMode}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
        />
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 rounded-lg py-1 px-3 flex items-center gap-1"
            >
              <ListFilter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
                {getSelectedExercisesCount()} تمرین انتخاب شده
              </span>
            </motion.div>
          </div>
          
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1 text-xs bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30"
            onClick={() => setShowFullDialog(true)}
          >
            <Eye className="w-3.5 h-3.5" />
            نمایش تمرین‌ها
          </Button>
        </div>
        
        <TabContentWrapper
          activeTab={activeTab}
          filteredExercises={filteredExercises}
          categories={categories}
          viewMode={viewMode}
          handleClearSearch={handleClearSearch}
          selectedExercisesDay1={selectedExercisesDay1}
          selectedExercisesDay2={selectedExercisesDay2}
          selectedExercisesDay3={selectedExercisesDay3}
          selectedExercisesDay4={selectedExercisesDay4}
          toggleExerciseDay1={toggleExerciseDay1}
          toggleExerciseDay2={toggleExerciseDay2}
          toggleExerciseDay3={toggleExerciseDay3}
          toggleExerciseDay4={toggleExerciseDay4}
          exerciseSetsDay1={exerciseSetsDay1}
          exerciseSetsDay2={exerciseSetsDay2}
          exerciseSetsDay3={exerciseSetsDay3}
          exerciseSetsDay4={exerciseSetsDay4}
          handleSetsChangeDay1={handleSetsChangeDay1}
          handleSetsChangeDay2={handleSetsChangeDay2}
          handleSetsChangeDay3={handleSetsChangeDay3}
          handleSetsChangeDay4={handleSetsChangeDay4}
          exerciseRepsDay1={exerciseRepsDay1}
          exerciseRepsDay2={exerciseRepsDay2}
          exerciseRepsDay3={exerciseRepsDay3}
          exerciseRepsDay4={exerciseRepsDay4}
          handleRepsChangeDay1={handleRepsChangeDay1}
          handleRepsChangeDay2={handleRepsChangeDay2}
          handleRepsChangeDay3={handleRepsChangeDay3}
          handleRepsChangeDay4={handleRepsChangeDay4}
        />
      </Tabs>
      
      {/* Full Screen Dialog for better visibility */}
      <Dialog open={showFullDialog} onOpenChange={setShowFullDialog}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              نمایش تمرین‌های {getDayName()}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-auto p-4">
            <TabContentWrapper
              activeTab={activeTab}
              filteredExercises={filteredExercises}
              categories={categories}
              viewMode={viewMode}
              handleClearSearch={handleClearSearch}
              selectedExercisesDay1={selectedExercisesDay1}
              selectedExercisesDay2={selectedExercisesDay2}
              selectedExercisesDay3={selectedExercisesDay3}
              selectedExercisesDay4={selectedExercisesDay4}
              toggleExerciseDay1={toggleExerciseDay1}
              toggleExerciseDay2={toggleExerciseDay2}
              toggleExerciseDay3={toggleExerciseDay3}
              toggleExerciseDay4={toggleExerciseDay4}
              exerciseSetsDay1={exerciseSetsDay1}
              exerciseSetsDay2={exerciseSetsDay2}
              exerciseSetsDay3={exerciseSetsDay3}
              exerciseSetsDay4={exerciseSetsDay4}
              handleSetsChangeDay1={handleSetsChangeDay1}
              handleSetsChangeDay2={handleSetsChangeDay2}
              handleSetsChangeDay3={handleSetsChangeDay3}
              handleSetsChangeDay4={handleSetsChangeDay4}
              exerciseRepsDay1={exerciseRepsDay1}
              exerciseRepsDay2={exerciseRepsDay2}
              exerciseRepsDay3={exerciseRepsDay3}
              exerciseRepsDay4={exerciseRepsDay4}
              handleRepsChangeDay1={handleRepsChangeDay1}
              handleRepsChangeDay2={handleRepsChangeDay2}
              handleRepsChangeDay3={handleRepsChangeDay3}
              handleRepsChangeDay4={handleRepsChangeDay4}
            />
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 p-4 flex justify-between items-center">
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {getSelectedExercisesCount()} تمرین انتخاب شده
              </span>
            </div>
            <Button
              onClick={() => setShowFullDialog(false)}
              variant="outline"
              className="border-indigo-200 dark:border-indigo-800"
            >
              بستن
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExerciseDayTabs;
