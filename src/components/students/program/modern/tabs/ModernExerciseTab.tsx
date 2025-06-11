
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dumbbell, 
  Plus, 
  Calendar,
  Target,
  Timer,
  TrendingUp,
  CheckCircle,
  Search,
  Filter,
  RotateCcw
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useToast } from "@/hooks/use-toast";

interface ModernExerciseTabProps {
  student: Student;
  exercises: any[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}

const ModernExerciseTab: React.FC<ModernExerciseTabProps> = ({
  student,
  exercises,
  onSaveExercises,
  selectedDay,
  setSelectedDay
}) => {
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithSets[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  // Load exercises for the selected day
  useEffect(() => {
    const dayKey = `exercisesDay${selectedDay}`;
    const setsKey = `exerciseSetsDay${selectedDay}`;
    const repsKey = `exerciseRepsDay${selectedDay}`;
    
    if (student[dayKey]) {
      const loadedExercises: ExerciseWithSets[] = student[dayKey].map(id => ({
        id,
        sets: student[setsKey]?.[id] || 3,
        reps: student[repsKey]?.[id] || "12"
      }));
      setSelectedExercises(loadedExercises);
    } else {
      setSelectedExercises([]);
    }
  }, [student, selectedDay]);

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExercise = (exerciseId: number) => {
    setSelectedExercises(prev => {
      const exists = prev.find(ex => ex.id === exerciseId);
      if (exists) {
        return prev.filter(ex => ex.id !== exerciseId);
      } else {
        return [...prev, { id: exerciseId, sets: 3, reps: "12" }];
      }
    });
  };

  const updateExercise = (exerciseId: number, field: 'sets' | 'reps', value: number | string) => {
    setSelectedExercises(prev => 
      prev.map(ex => 
        ex.id === exerciseId 
          ? { ...ex, [field]: value }
          : ex
      )
    );
  };

  const handleSave = () => {
    const success = onSaveExercises(selectedExercises, selectedDay);
    if (success) {
      toast({
        title: "ذخیره موفق",
        description: `تمرینات روز ${toPersianNumbers(selectedDay)} ذخیره شد`,
      });
    }
  };

  const days = Array.from({ length: 7 }, (_, i) => i + 1);
  const categories = Array.from(new Set(exercises.map(ex => ex.category))).filter(Boolean);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Day Selector */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200/50 dark:border-purple-700/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300">انتخاب روز</h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">روز مورد نظر برای تمرین را انتخاب کنید</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50 text-purple-700 dark:text-purple-300">
              {toPersianNumbers(selectedExercises.length)} تمرین انتخاب شده
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-3">
            {days.map(day => (
              <motion.button
                key={day}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(day)}
                className={`p-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                  selectedDay === day
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg mb-1">{toPersianNumbers(day)}</div>
                  <div className="text-xs opacity-75">روز</div>
                </div>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="جستجوی تمرین..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:border-purple-500 dark:focus:border-purple-400"
              >
                <option value="all">همه دسته‌ها</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="border-gray-200 dark:border-gray-700"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercises List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredExercises.map((exercise, index) => {
            const isSelected = selectedExercises.find(ex => ex.id === exercise.id);
            const selectedExercise = selectedExercises.find(ex => ex.id === exercise.id);
            
            return (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected 
                    ? 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-300 dark:border-purple-600 shadow-lg' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={!!isSelected}
                        onCheckedChange={() => toggleExercise(exercise.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Dumbbell className={`w-4 h-4 ${isSelected ? 'text-purple-600' : 'text-gray-400'}`} />
                          <h4 className="font-bold text-sm">{exercise.name}</h4>
                        </div>
                        
                        {exercise.category && (
                          <Badge variant="outline" className="text-xs mb-3">
                            {exercise.category}
                          </Badge>
                        )}

                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3 mt-4 pt-4 border-t border-purple-200 dark:border-purple-700"
                          >
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                                  ست
                                </label>
                                <div className="relative">
                                  <Target className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                                  <Input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={selectedExercise?.sets || 3}
                                    onChange={(e) => updateExercise(exercise.id, 'sets', parseInt(e.target.value))}
                                    className="pr-8 text-sm"
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                                  تکرار
                                </label>
                                <div className="relative">
                                  <Timer className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                                  <Input
                                    value={selectedExercise?.reps || "12"}
                                    onChange={(e) => updateExercise(exercise.id, 'reps', e.target.value)}
                                    className="pr-8 text-sm"
                                    placeholder="12 یا 8-12"
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredExercises.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Dumbbell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">تمرینی یافت نشد</h3>
          <p className="text-gray-500 dark:text-gray-500">معیارهای جستجو را تغییر دهید</p>
        </motion.div>
      )}

      {/* Save Button */}
      {selectedExercises.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <Button
            onClick={handleSave}
            size="lg"
            className="gap-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-full px-8 py-4"
          >
            <CheckCircle className="w-5 h-5" />
            ذخیره {toPersianNumbers(selectedExercises.length)} تمرین
            <TrendingUp className="w-5 h-5" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ModernExerciseTab;
