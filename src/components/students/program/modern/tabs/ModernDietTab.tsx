
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Student } from "@/components/students/StudentTypes";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Utensils, 
  Calendar,
  Clock,
  Apple,
  CheckCircle,
  Search,
  Filter,
  RotateCcw,
  Zap,
  Heart
} from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useToast } from "@/hooks/use-toast";

interface ModernDietTabProps {
  student: Student;
  meals: any[];
  onSaveDiet: (mealIds: number[], dayNumber?: number) => boolean;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}

const ModernDietTab: React.FC<ModernDietTabProps> = ({
  student,
  meals,
  onSaveDiet,
  selectedDay,
  setSelectedDay
}) => {
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("all");
  const { toast } = useToast();

  // Load meals for the selected day
  useEffect(() => {
    const dayKey = `mealsDay${selectedDay}`;
    if (student[dayKey]) {
      setSelectedMeals(student[dayKey]);
    } else if (student.meals) {
      setSelectedMeals(student.meals);
    } else {
      setSelectedMeals([]);
    }
  }, [student, selectedDay]);

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedMealType === "all" || meal.type === selectedMealType;
    return matchesSearch && matchesType;
  });

  const toggleMeal = (mealId: number) => {
    setSelectedMeals(prev => {
      if (prev.includes(mealId)) {
        return prev.filter(id => id !== mealId);
      } else {
        return [...prev, mealId];
      }
    });
  };

  const handleSave = () => {
    const success = onSaveDiet(selectedMeals, selectedDay);
    if (success) {
      toast({
        title: "ذخیره موفق",
        description: `برنامه غذایی روز ${toPersianNumbers(selectedDay)} ذخیره شد`,
      });
    }
  };

  const days = Array.from({ length: 7 }, (_, i) => i + 1);
  const mealTypes = Array.from(new Set(meals.map(meal => meal.type))).filter(Boolean);

  const getMealTypeIcon = (type: string) => {
    switch (type) {
      case 'صبحانه': return '🌅';
      case 'ناهار': return '☀️';
      case 'شام': return '🌙';
      case 'میان‌وعده': return '🍎';
      default: return '🍽️';
    }
  };

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'صبحانه': return 'from-amber-50 to-orange-50 border-amber-200 text-amber-700';
      case 'ناهار': return 'from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700';
      case 'شام': return 'from-indigo-50 to-purple-50 border-indigo-200 text-indigo-700';
      case 'میان‌وعده': return 'from-rose-50 to-pink-50 border-rose-200 text-rose-700';
      default: return 'from-gray-50 to-slate-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Day Selector */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-700/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-300">انتخاب روز</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">روز مورد نظر برای برنامه غذایی را انتخاب کنید</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50 text-emerald-700 dark:text-emerald-300">
              {toPersianNumbers(selectedMeals.length)} وعده انتخاب شده
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
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-gray-200 dark:border-gray-700'
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
                placeholder="جستجوی وعده غذایی..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-400"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedMealType}
                onChange={(e) => setSelectedMealType(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:border-emerald-500 dark:focus:border-emerald-400"
              >
                <option value="all">همه وعده‌ها</option>
                {mealTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedMealType("all");
                }}
                className="border-gray-200 dark:border-gray-700"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredMeals.map((meal, index) => {
            const isSelected = selectedMeals.includes(meal.id);
            
            return (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected 
                    ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-300 dark:border-emerald-600 shadow-lg' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleMeal(meal.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Utensils className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-gray-400'}`} />
                          <h4 className="font-bold text-sm">{meal.name}</h4>
                        </div>
                        
                        {meal.type && (
                          <Badge variant="outline" className={`text-xs mb-2 bg-gradient-to-r ${getMealTypeColor(meal.type)} dark:${getMealTypeColor(meal.type).replace('50', '900/20').replace('200', '700')}`}>
                            <span className="mr-1">{getMealTypeIcon(meal.type)}</span>
                            {meal.type}
                          </Badge>
                        )}

                        {meal.description && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {meal.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          {meal.calories && (
                            <div className="flex items-center gap-1">
                              <Zap className="w-3 h-3 text-orange-500" />
                              <span>{toPersianNumbers(meal.calories)} کالری</span>
                            </div>
                          )}
                          {meal.protein && (
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3 text-red-500" />
                              <span>{toPersianNumbers(meal.protein)}گ پروتئین</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredMeals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">وعده‌ای یافت نشد</h3>
          <p className="text-gray-500 dark:text-gray-500">معیارهای جستجو را تغییر دهید</p>
        </motion.div>
      )}

      {/* Save Button */}
      {selectedMeals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <Button
            onClick={handleSave}
            size="lg"
            className="gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-full px-8 py-4"
          >
            <CheckCircle className="w-5 h-5" />
            ذخیره {toPersianNumbers(selectedMeals.length)} وعده
            <Apple className="w-5 h-5" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ModernDietTab;
