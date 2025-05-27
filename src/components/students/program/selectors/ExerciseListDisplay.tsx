
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExerciseWithSets } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseListDisplayProps {
  filteredExercises: any[];
  selectedExercises: ExerciseWithSets[];
  selectedType: string | null;
  selectedCategoryId: number | null;
  toggleExercise: (exerciseId: number) => void;
  viewMode: "grid" | "list";
}

const ExerciseListDisplay: React.FC<ExerciseListDisplayProps> = ({
  filteredExercises,
  selectedExercises,
  selectedType,
  selectedCategoryId,
  toggleExercise,
  viewMode
}) => {
  if (!selectedType || !selectedCategoryId) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-2xl flex items-center justify-center mb-4">
          <Dumbbell className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="font-medium text-lg mb-2">انتخاب نوع و دسته‌بندی</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          لطفا ابتدا نوع تمرین و سپس دسته‌بندی مورد نظر را انتخاب کنید
        </p>
      </div>
    );
  }

  if (filteredExercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-red-200 to-orange-300 dark:from-red-600 dark:to-orange-700 rounded-2xl flex items-center justify-center mb-4">
          <Dumbbell className="w-8 h-8 text-red-400 dark:text-red-500" />
        </div>
        <h3 className="font-medium text-lg mb-2">تمرینی یافت نشد</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          در این دسته‌بندی هیچ تمرینی تعریف نشده است
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      "space-y-3",
      viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-3 space-y-0" : ""
    )}>
      {filteredExercises.map((exercise, index) => {
        const isSelected = selectedExercises.some(ex => ex.id === exercise.id);
        
        return (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={cn(
              "transition-all duration-200 cursor-pointer hover:shadow-md",
              isSelected 
                ? "border-green-500 bg-green-50/50 dark:bg-green-900/20" 
                : "border-gray-200 hover:border-gray-300"
            )}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      isSelected 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    )}>
                      <span className="font-bold text-sm">{toPersianNumbers(index + 1)}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-right">
                    <h5 className="font-medium text-gray-800 dark:text-gray-100 mb-1">
                      {exercise.name}
                    </h5>
                    {exercise.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {exercise.description}
                      </p>
                    )}
                    {exercise.targetMuscle && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {exercise.targetMuscle}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "gap-1",
                        isSelected 
                          ? "bg-green-500 hover:bg-green-600 text-white" 
                          : "hover:bg-green-50 hover:text-green-600 hover:border-green-300"
                      )}
                      onClick={() => toggleExercise(exercise.id)}
                    >
                      {isSelected ? (
                        <>
                          <Minus className="w-3 h-3" />
                          حذف
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          افزودن
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ExerciseListDisplay;
