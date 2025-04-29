
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExerciseTabContent } from "./ExerciseTabContent";
import ExerciseViewControls from "./ExerciseViewControls";
import { Exercise } from "@/types/exercise";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, CalendarCheck2, CalendarClock, CalendarRange } from "lucide-react";

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
  handleRepsChangeDay4
}) => {
  // Icons for each day tab
  const dayIcons = {
    day1: CalendarDays,
    day2: CalendarCheck2,
    day3: CalendarClock,
    day4: CalendarRange
  };
  
  // Tab content variants for animation
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex-1 flex flex-col overflow-hidden px-4 pb-2"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <TabsList className="flex bg-muted/60 p-1 rounded-xl">
          {Object.entries(dayIcons).map(([day, Icon]) => {
            const dayNumber = day.replace("day", "");
            const selectedExercises = {
              day1: selectedExercisesDay1,
              day2: selectedExercisesDay2,
              day3: selectedExercisesDay3,
              day4: selectedExercisesDay4
            }[day];
            
            return (
              <TabsTrigger 
                key={day}
                value={day} 
                className="flex-1 min-w-[80px] relative rounded-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1.5">
                  <Icon className={cn(
                    "h-4 w-4 transition-colors", 
                    activeTab === day ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span>روز {dayNumber}</span>
                </div>
                <div className={cn(
                  "absolute -top-2 -right-1 px-1.5 py-0.5 text-2xs rounded-full bg-primary text-white font-medium transition-all scale-0",
                  selectedExercises?.length > 0 && "scale-100"
                )}>
                  {selectedExercises?.length}
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
        
        <ExerciseViewControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
        />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="flex-1 overflow-auto"
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <TabsContent
            value="day1"
            className="flex-1 overflow-auto mt-0 p-0 border-none data-[state=active]:h-full"
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
            className="flex-1 overflow-auto mt-0 p-0 border-none data-[state=active]:h-full"
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
            className="flex-1 overflow-auto mt-0 p-0 border-none data-[state=active]:h-full"
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
            className="flex-1 overflow-auto mt-0 p-0 border-none data-[state=active]:h-full"
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
        </motion.div>
      </AnimatePresence>
    </Tabs>
  );
};

export default ExerciseDayTabs;
