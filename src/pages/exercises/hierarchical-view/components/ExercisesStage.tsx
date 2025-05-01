
import React, { useState } from "react";
import { Dumbbell, Plus, Grid3X3, ListOrdered, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { ExerciseCategory } from "@/types/exercise";

interface ExercisesStageProps {
  exercises: any[];
  categories: ExerciseCategory[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onAddExercise: () => void;
  onEditExercise: (exercise: any) => void;
  onDeleteExercises: (ids: number[]) => void;
}

export const ExercisesStage: React.FC<ExercisesStageProps> = ({
  exercises,
  categories,
  viewMode,
  setViewMode,
  onAddExercise,
  onEditExercise,
  onDeleteExercises
}) => {
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);

  return (
    <motion.div 
      className="h-full flex flex-col gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">
            حرکات تمرینی ({exercises.length})
          </h3>
          
          {selectedExerciseIds.length > 0 && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                onDeleteExercises(selectedExerciseIds);
                setSelectedExerciseIds([]);
              }}
              className="mr-2"
            >
              <Trash2 className="h-4 w-4 ml-2" />
              حذف ({selectedExerciseIds.length})
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={onAddExercise}
            className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white"
          >
            <Plus className="h-4 w-4 ml-2" />
            افزودن حرکت
          </Button>
          
          <Tabs
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "grid" | "list")}
          >
            <TabsList className="bg-muted/30">
              <TabsTrigger value="grid" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                <Grid3X3 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                <ListOrdered className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <motion.div 
          className={`grid gap-3 ${
            viewMode === "grid" 
              ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" 
              : "grid-cols-1"
          }`}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {exercises.length > 0 ? (
            exercises.map((exercise) => {
              const isSelected = selectedExerciseIds.includes(exercise.id);
              
              return (
                <motion.div 
                  key={exercise.id} 
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                >
                  <ExerciseCard 
                    exercise={exercise}
                    category={categories.find(cat => cat.id === exercise.categoryId)}
                    isSelected={isSelected}
                    viewMode={viewMode}
                    onClick={() => {
                      setSelectedExerciseIds(prev => 
                        isSelected 
                          ? prev.filter(id => id !== exercise.id)
                          : [...prev, exercise.id]
                      );
                    }}
                    onEdit={() => onEditExercise(exercise)}
                    onDelete={() => onDeleteExercises([exercise.id])}
                  />
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-muted/20 rounded-lg border border-dashed border-muted">
              <Dumbbell className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
              <h3 className="font-medium text-lg mb-1">هیچ حرکتی یافت نشد</h3>
              <p className="text-muted-foreground text-sm mb-4">
                در این دسته‌بندی هنوز حرکتی تعریف نشده است.
              </p>
              <Button 
                onClick={onAddExercise}
                className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white"
              >
                <Plus className="h-4 w-4 ml-2" />
                افزودن حرکت جدید
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
