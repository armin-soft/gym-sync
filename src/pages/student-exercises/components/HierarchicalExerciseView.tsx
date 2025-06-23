
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Dumbbell, Target, Clock, Play, Eye, 
  CheckCircle, Circle, Star, TrendingUp, Calendar,
  ChevronRight, ChevronLeft, Grid, List, Filter
} from "lucide-react";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";

interface HierarchicalExerciseViewProps {
  exercises: any[];
  categories: ExerciseCategory[];
  showAssignedDetails?: boolean;
}

const HierarchicalExerciseView: React.FC<HierarchicalExerciseViewProps> = ({
  exercises,
  categories,
  showAssignedDetails = false
}) => {
  const { exerciseTypes } = useExerciseData();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [viewStage, setViewStage] = useState<"types" | "categories" | "exercises">("types");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get unique exercise types from categories
  const availableTypes = [...new Set(categories.map(cat => cat.type))];

  // Filter categories by selected type
  const filteredCategories = selectedType === "all" 
    ? categories 
    : categories.filter(cat => cat.type === selectedType);

  // Filter exercises by selected category
  const filteredExercises = selectedCategoryId 
    ? exercises.filter(ex => ex.categoryId === selectedCategoryId)
    : exercises;

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

  // Navigate back to previous stage
  const handleBack = () => {
    if (viewStage === "exercises") {
      setViewStage("categories");
    } else if (viewStage === "categories") {
      setViewStage("types");
      setSelectedType("all");
    }
  };

  // Handle type selection
  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setViewStage("categories");
  };

  // Handle category selection
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setViewStage("exercises");
  };

  // Stage indicators
  const renderStageIndicators = () => (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
          viewStage === "types" ? "bg-emerald-100 text-emerald-700" : "text-gray-500"
        )}>
          <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-sm flex items-center justify-center">
            {toPersianNumbers("1")}
          </span>
          <span className="text-sm font-medium">انواع تمرین</span>
        </div>
        
        <ChevronLeft className="w-4 h-4 text-gray-400" />
        
        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
          viewStage === "categories" ? "bg-sky-100 text-sky-700" : "text-gray-500"
        )}>
          <span className={cn(
            "w-6 h-6 rounded-full text-white text-sm flex items-center justify-center",
            viewStage === "categories" || viewStage === "exercises" ? "bg-sky-500" : "bg-gray-300"
          )}>
            {toPersianNumbers("2")}
          </span>
          <span className="text-sm font-medium">دسته‌بندی‌ها</span>
        </div>
        
        <ChevronLeft className="w-4 h-4 text-gray-400" />
        
        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
          viewStage === "exercises" ? "bg-purple-100 text-purple-700" : "text-gray-500"
        )}>
          <span className={cn(
            "w-6 h-6 rounded-full text-white text-sm flex items-center justify-center",
            viewStage === "exercises" ? "bg-purple-500" : "bg-gray-300"
          )}>
            {toPersianNumbers("3")}
          </span>
          <span className="text-sm font-medium">تمرینات</span>
        </div>
      </div>
      
      {viewStage === "exercises" && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="gap-2"
          >
            {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            {viewMode === "grid" ? "نمایش لیستی" : "نمایش شبکه‌ای"}
          </Button>
        </div>
      )}
    </div>
  );

  // Render exercise types stage
  const renderTypesStage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {availableTypes.map((type, index) => (
        <motion.div
          key={type}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 group border-0 bg-gradient-to-br from-white to-emerald-50/30"
            onClick={() => handleTypeSelect(type)}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{type}</h3>
              <p className="text-sm text-gray-600">
                {categories.filter(cat => cat.type === type).length} دسته‌بندی
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );

  // Render categories stage
  const renderCategoriesStage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleBack} className="gap-2">
          <ChevronRight className="w-4 h-4" />
          بازگشت به انواع تمرین
        </Button>
        <Badge className="bg-gradient-to-r from-sky-500 to-purple-500 text-white">
          {selectedType}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 group border-0 bg-gradient-to-br from-white to-sky-50/30"
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-sky-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">
                  {exercises.filter(ex => ex.categoryId === category.id).length} تمرین موجود
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // Render exercises stage
  const renderExercisesStage = () => {
    if (filteredExercises.length === 0) {
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
            تمرینی در این دسته‌بندی یافت نشد
          </h3>
          <p className="text-gray-500 mb-4">
            هیچ تمرینی برای این دسته‌بندی تعریف نشده است
          </p>
          <Button variant="outline" onClick={handleBack} className="gap-2">
            <ChevronRight className="w-4 h-4" />
            بازگشت به دسته‌بندی‌ها
          </Button>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack} className="gap-2">
            <ChevronRight className="w-4 h-4" />
            بازگشت به دسته‌بندی‌ها
          </Button>
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              {getCategoryName(selectedCategoryId!)}
            </Badge>
            <span className="text-sm text-gray-600">
              {toPersianNumbers(filteredExercises.length.toString())} تمرین
            </span>
          </div>
        </div>
        
        <div className={cn(
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        )}>
          {filteredExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6" dir="rtl">
      {renderStageIndicators()}
      
      <AnimatePresence mode="wait">
        {viewStage === "types" && renderTypesStage()}
        {viewStage === "categories" && renderCategoriesStage()}
        {viewStage === "exercises" && renderExercisesStage()}
      </AnimatePresence>
    </div>
  );
};

export default HierarchicalExerciseView;
