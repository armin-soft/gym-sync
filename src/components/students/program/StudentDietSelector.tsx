
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Utensils, Plus, Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion } from "framer-motion";
import { Meal, MealType } from "@/types/meal";
import { useToast } from "@/hooks/use-toast";

interface StudentDietSelectorProps {
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  meals: Meal[];
  currentDay: number;
  currentMealType?: string;
  dayLabel?: string;
}

const weekDays = [
  { id: 1, name: "شنبه" },
  { id: 2, name: "یکشنبه" },
  { id: 3, name: "دوشنبه" },
  { id: 4, name: "سه شنبه" },
  { id: 5, name: "چهارشنبه" },
  { id: 6, name: "پنج شنبه" },
  { id: 7, name: "جمعه" },
];

const StudentDietSelector: React.FC<StudentDietSelectorProps> = ({
  selectedMeals,
  setSelectedMeals,
  meals,
  currentDay,
  currentMealType,
  dayLabel
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter meals based on search and current meal type
  const filteredMeals = React.useMemo(() => {
    const filtered = meals.filter(meal => {
      const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           meal.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMealType = !currentMealType || currentMealType === "all" || meal.type === currentMealType;
      
      return matchesSearch && matchesMealType;
    });
    
    // Remove duplicates by filtering unique meal IDs
    const uniqueMeals = filtered.filter((meal, index, self) => 
      self.findIndex(m => m.id === meal.id) === index
    );
    
    return uniqueMeals;
  }, [meals, searchQuery, currentMealType]);

  const toggleMeal = (mealId: number) => {
    setSelectedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const getDayName = () => {
    const day = weekDays.find(d => d.id === currentDay);
    return day ? day.name : `روز ${toPersianNumbers(currentDay)}`;
  };

  return (
    <div className="space-y-6 text-right p-6" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          برنامه غذایی {getDayName()}
          {currentMealType && currentMealType !== "all" && (
            <span className="text-sm text-muted-foreground mr-2">
              - {currentMealType}
            </span>
          )}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {toPersianNumbers(selectedMeals.length)} غذا انتخاب شده
        </p>
      </motion.div>

      {/* Simple Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="جستجو در غذاها..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 text-right"
            dir="rtl"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Selected Meals */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Utensils className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                    غذاهای انتخاب شده
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {toPersianNumbers(selectedMeals.length)} غذا
                  </p>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                {selectedMeals.length > 0 ? (
                  <div className="space-y-2">
                    {selectedMeals.map(mealId => {
                      const meal = meals.find(m => m.id === mealId);
                      if (!meal) return null;
                      
                      return (
                        <div
                          key={mealId}
                          className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20"
                        >
                          <div className="flex-1 text-right">
                            <p className="font-medium">{meal.name}</p>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {meal.type}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleMeal(mealId)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-2xl flex items-center justify-center mb-4">
                      <Utensils className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">هیچ غذایی انتخاب نشده</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">از لیست سمت راست غذا انتخاب کنید</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Available Meals */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Utensils className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                    لیست غذاها
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {toPersianNumbers(filteredMeals.length)} غذا موجود
                  </p>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                <ScrollArea className="h-full">
                  <div className="space-y-2">
                    {filteredMeals.map(meal => (
                      <motion.div
                        key={meal.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer",
                          selectedMeals.includes(meal.id)
                            ? "bg-primary/10 border-primary/30"
                            : "bg-background hover:bg-muted/50 border-border hover:border-primary/20"
                        )}
                        onClick={() => toggleMeal(meal.id)}
                      >
                        <div className="flex-1 text-right">
                          <p className="font-medium">{meal.name}</p>
                          {meal.description && (
                            <p className="text-sm text-muted-foreground">{meal.description}</p>
                          )}
                          <div className="flex gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {meal.type}
                            </Badge>
                            {meal.day && (
                              <Badge variant="outline" className="text-xs">
                                {meal.day}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-8 w-8 p-0",
                            selectedMeals.includes(meal.id)
                              ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                              : "text-green-600 hover:text-green-700 hover:bg-green-50"
                          )}
                        >
                          {selectedMeals.includes(meal.id) ? (
                            <Minus className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDietSelector;
