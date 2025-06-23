
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Dumbbell, Target, Clock, Play, Eye, 
  CheckCircle, Circle, Star, TrendingUp 
} from "lucide-react";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";

interface ExerciseGridProps {
  exercises: any[];
  categories: ExerciseCategory[];
  showAssignedDetails?: boolean;
}

const ExerciseGrid: React.FC<ExerciseGridProps> = ({
  exercises,
  categories,
  showAssignedDetails = false
}) => {
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || "نامشخص";
  };

  const getCategoryColor = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || "emerald";
  };

  const getDayLabel = (day: number) => {
    const dayLabels = {
      1: "روز اول",
      2: "روز دوم", 
      3: "روز سوم",
      4: "روز چهارم",
      5: "روز پنجم",
      6: "روز ششم"
    };
    return dayLabels[day as keyof typeof dayLabels] || `روز ${toPersianNumbers(day.toString())}`;
  };

  if (exercises.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
          <Dumbbell className="w-12 h-12 text-gray-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-600 mb-2">
          {showAssignedDetails ? "هیچ تمرینی اختصاص نیافته" : "حرکتی یافت نشد"}
        </h3>
        <p className="text-gray-500">
          {showAssignedDetails 
            ? "مربی شما هنوز برنامه تمرینی برای شما تعریف نکرده است"
            : "فیلترهای خود را تغییر دهید یا جستجوی دیگری انجام دهید"
          }
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {exercises.map((exercise, index) => (
        <motion.div
          key={exercise.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="group"
        >
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105 h-full">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
                    {exercise.name}
                  </CardTitle>
                  <Badge 
                    className={cn(
                      "text-white text-xs px-2 py-1",
                      `bg-gradient-to-r from-${getCategoryColor(exercise.categoryId)}-500 to-${getCategoryColor(exercise.categoryId)}-600`
                    )}
                  >
                    {getCategoryName(exercise.categoryId)}
                  </Badge>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-lg">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {showAssignedDetails && (
                <div className="space-y-3">
                  {/* Day and Sets/Reps Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {getDayLabel(exercise.day)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3 text-sky-600" />
                        <span className="text-xs text-gray-600">
                          {toPersianNumbers(exercise.sets?.toString() || "3")} ست
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Circle className="w-3 h-3 text-purple-600" />
                        <span className="text-xs text-gray-600">
                          {exercise.reps || "8-12"} تکرار
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {exercise.progress !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">پیشرفت</span>
                        <span className="text-emerald-600 font-medium">
                          {toPersianNumbers(exercise.progress.toString())}%
                        </span>
                      </div>
                      <Progress value={exercise.progress} className="h-2" />
                    </div>
                  )}
                </div>
              )}

              {/* Exercise Description */}
              {exercise.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {exercise.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white"
                >
                  <Eye className="w-4 h-4 ml-2" />
                  مشاهده
                </Button>
                
                {showAssignedDetails && (
                  <Button
                    size="sm"
                    variant="outline"
                    className={cn(
                      "border-2 transition-all duration-300",
                      exercise.completed
                        ? "border-green-500 text-green-600 bg-green-50 hover:bg-green-100"
                        : "border-orange-500 text-orange-600 bg-orange-50 hover:bg-orange-100"
                    )}
                  >
                    {exercise.completed ? (
                      <>
                        <CheckCircle className="w-4 h-4 ml-2" />
                        تکمیل
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 ml-2" />
                        شروع
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExerciseGrid;
