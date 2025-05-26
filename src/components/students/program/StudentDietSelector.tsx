
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Utensils, Plus, Minus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { motion, AnimatePresence } from "framer-motion";
import { Meal, MealType } from "@/types/meal";
import ProgramSpeechToText from "./components/ProgramSpeechToText";
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

const mealTypes = [
  "صبحانه",
  "میان وعده صبح",
  "ناهار",
  "میان وعده عصر",
  "شام",
  "میان وعده"
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
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("all");
  
  // Filter meals based on search and type - حذف تکراری‌ها
  const filteredMeals = React.useMemo(() => {
    // ابتدا فیلتر کردن بر اساس جستجو و نوع
    let filtered = meals.filter(meal => {
      const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           meal.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedTypeFilter === "all" || meal.type === selectedTypeFilter;
      const matchesMealType = !currentMealType || currentMealType === "all" || meal.type === currentMealType;
      
      return matchesSearch && matchesType && matchesMealType;
    });

    // حذف تکراری‌ها بر اساس ID
    const uniqueMeals = filtered.filter((meal, index, self) => 
      self.findIndex(m => m.id === meal.id) === index
    );

    return uniqueMeals;
  }, [meals, searchQuery, selectedTypeFilter, currentMealType]);

  const toggleMeal = (mealId: number) => {
    setSelectedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const handleSpeechSave = (transcript: string) => {
    // Parse the transcript to extract meal names
    const mealNames = transcript
      .split(/[،,\n]/)
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (mealNames.length === 0) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "هیچ غذایی در متن گفتاری یافت نشد"
      });
      return;
    }

    // Find matching meals
    const matchedMeals: number[] = [];
    
    mealNames.forEach(name => {
      const foundMeal = meals.find(meal => 
        meal.name.includes(name) || name.includes(meal.name)
      );
      
      if (foundMeal && !selectedMeals.includes(foundMeal.id)) {
        matchedMeals.push(foundMeal.id);
      }
    });

    if (matchedMeals.length > 0) {
      setSelectedMeals(prev => [...prev, ...matchedMeals]);
      toast({
        title: "افزودن موفق",
        description: `${toPersianNumbers(matchedMeals.length)} غذا از گفتار شما اضافه شد`
      });
    } else {
      toast({
        variant: "destructive",
        title: "هیچ غذایی یافت نشد",
        description: "لطفا نام غذاها را واضح‌تر بیان کنید"
      });
    }
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

      {/* Speech to Text for Meal Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ProgramSpeechToText
          onSave={handleSpeechSave}
          title="افزودن غذا با گفتار"
          placeholder="نام غذاهای مورد نظر را بگویید، مثل: برنج، مرغ، سالاد"
          className="mb-4"
        />
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
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

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedTypeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTypeFilter("all")}
          >
            همه
          </Button>
          {mealTypes.map(type => (
            <Button
              key={type}
              variant={selectedTypeFilter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTypeFilter(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Selected Meals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              غذاهای انتخاب شده ({toPersianNumbers(selectedMeals.length)})
            </h4>
            
            {selectedMeals.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedMeals.map(mealId => {
                  const meal = meals.find(m => m.id === mealId);
                  if (!meal) return null;
                  
                  return (
                    <div
                      key={mealId}
                      className="flex items-center justify-between p-2 bg-muted/30 rounded-lg"
                    >
                      <div className="flex-1 text-right">
                        <p className="font-medium">{meal.name}</p>
                        <Badge variant="secondary" className="text-xs">
                          {meal.type}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleMeal(mealId)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                هیچ غذایی انتخاب نشده
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Available Meals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">
              غذاهای موجود ({toPersianNumbers(filteredMeals.length)})
            </h4>
            
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {filteredMeals.map(meal => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-all",
                      selectedMeals.includes(meal.id)
                        ? "bg-primary/10 border-primary/30"
                        : "bg-background hover:bg-muted/50 border-border"
                    )}
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
                      onClick={() => toggleMeal(meal.id)}
                      className={cn(
                        "h-8 w-8 p-0",
                        selectedMeals.includes(meal.id)
                          ? "text-red-600 hover:text-red-700"
                          : "text-green-600 hover:text-green-700"
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
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentDietSelector;
