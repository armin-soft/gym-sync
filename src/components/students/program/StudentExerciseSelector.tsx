import React from "react";
import { ExerciseWithSets } from "@/types/exercise";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Zap, Target, TrendingUp } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import ExerciseTypeCategory from "./selectors/ExerciseTypeCategory";
import SelectedExercisesList from "./selectors/SelectedExercisesList";
import ExerciseListDisplay from "./selectors/ExerciseListDisplay";
import { useExerciseSelector } from "./hooks/useExerciseSelector";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ProgramSpeechToText from "./components/ProgramSpeechToText";
import { useToast } from "@/hooks/use-toast";

interface StudentExerciseSelectorProps {
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  dayNumber: number;
  exercises: any[]; 
  dayLabel?: string;
  noScroll?: boolean;
  isDayMandatory?: boolean;
  isDayOptional?: boolean;
}

const StudentExerciseSelector: React.FC<StudentExerciseSelectorProps> = ({
  selectedExercises,
  setSelectedExercises,
  dayNumber,
  exercises,
  dayLabel,
  noScroll = false,
  isDayMandatory,
  isDayOptional,
}) => {
  const { toast } = useToast();
  const { categories, exerciseTypes, isLoading } = useExerciseData();
  
  const {
    selectedType,
    setSelectedType,
    selectedCategoryId,
    setSelectedCategoryId,
    viewMode,
    setViewMode,
    filteredCategories,
    filteredExercises,
    toggleExercise,
    handleSetsChange,
    handleRepsChange,
    clearFilters
  } = useExerciseSelector({
    exercises,
    categories,
    exerciseTypes,
    selectedExercises,
    setSelectedExercises,
    dayNumber
  });

  const getDayLabel = () => {
    if (dayLabel) return dayLabel;
    
    switch (dayNumber) {
      case 1: return "روز اول";
      case 2: return "روز دوم";
      case 3: return "روز سوم";
      case 4: return "روز چهارم";
      case 5: return "روز پنجم";
      case 6: return "روز ششم";
      default: return `روز ${toPersianNumbers(dayNumber)}`;
    }
  };

  const handleSpeechSave = (transcript: string) => {
    // Parse the transcript to extract exercise names
    const exerciseNames = transcript
      .split(/[،,\n]/)
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (exerciseNames.length === 0) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "هیچ تمرینی در متن گفتاری یافت نشد"
      });
      return;
    }

    // Find matching exercises
    const matchedExercises: ExerciseWithSets[] = [];
    
    exerciseNames.forEach(name => {
      const foundExercise = exercises.find(ex => 
        ex.name.includes(name) || name.includes(ex.name)
      );
      
      if (foundExercise && !selectedExercises.find(sel => sel.id === foundExercise.id)) {
        matchedExercises.push({
          id: foundExercise.id,
          sets: 3,
          reps: "12",
          day: dayNumber
        });
      }
    });

    if (matchedExercises.length > 0) {
      setSelectedExercises(prev => [...prev, ...matchedExercises]);
      toast({
        title: "افزودن موفق",
        description: `${toPersianNumbers(matchedExercises.length)} تمرین از گفتار شما اضافه شد`
      });
    } else {
      toast({
        variant: "destructive",
        title: "هیچ تمرینی یافت نشد",
        description: "لطفا نام تمرین‌ها را واضح‌تر بیان کنید"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-right" dir="rtl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl animate-pulse"></div>
          <p className="text-gray-500 dark:text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "space-y-6 text-right p-6",
      noScroll ? "h-full flex flex-col" : ""
    )} dir="rtl">
      {/* Header Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">تمرینات انتخاب شده</p>
              <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{toPersianNumbers(selectedExercises.length)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200/50 dark:border-emerald-700/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">کل تمرینات</p>
              <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{toPersianNumbers(exercises.length)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-700/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">{getDayLabel()}</p>
              <p className="text-xl font-bold text-purple-700 dark:text-purple-300">فعال</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Speech to Text for Exercise Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ProgramSpeechToText
          onSave={handleSpeechSave}
          title="افزودن تمرین با گفتار"
          placeholder="نام تمرین‌های مورد نظر را بگویید، مثل: پرس سینه، اسکات، ددلیفت"
          className="mb-4"
        />
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-right"
        dir="rtl"
      >
        <ExerciseTypeCategory
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          exerciseTypes={exerciseTypes}
          filteredCategories={filteredCategories}
          filteredExercises={filteredExercises}
          clearFilters={clearFilters}
        />
      </motion.div>
      
      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-6 text-right",
        noScroll ? "flex-1 overflow-hidden" : ""
      )} dir="rtl">
        {/* Selected Exercises */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                    تمرین‌های انتخاب شده
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    برای {getDayLabel()} • {toPersianNumbers(selectedExercises.length)} تمرین
                  </p>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                {selectedExercises.length > 0 ? (
                  <SelectedExercisesList
                    selectedExercises={selectedExercises}
                    exercises={exercises}
                    dayLabel={getDayLabel()}
                    toggleExercise={toggleExercise}
                    handleSetsChange={handleSetsChange}
                    handleRepsChange={handleRepsChange}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-2xl flex items-center justify-center mb-4">
                      <Dumbbell className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">هیچ تمرینی انتخاب نشده</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">از لیست سمت راست تمرین انتخاب کنید</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Exercise List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                    لیست تمرین‌ها
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {toPersianNumbers(filteredExercises.length)} تمرین موجود
                  </p>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                {filteredExercises.length > 0 ? (
                  <ExerciseListDisplay
                    filteredExercises={filteredExercises}
                    selectedExercises={selectedExercises}
                    selectedType={selectedType}
                    selectedCategoryId={selectedCategoryId}
                    toggleExercise={toggleExercise}
                    viewMode={viewMode}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-2xl flex items-center justify-center mb-4">
                      <Target className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">هیچ تمرینی یافت نشد</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">لطفا دسته‌بندی انتخاب کنید</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentExerciseSelector;
