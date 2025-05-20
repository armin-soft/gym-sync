
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Utensils } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Meal, MealType, WeekDay } from "@/types/meal";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentDietSelectorProps {
  meals: Meal[];
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  currentDay?: number;
}

const weekDayMap: Record<number, WeekDay> = {
  1: "شنبه",
  2: "یکشنبه",
  3: "دوشنبه",
  4: "سه شنبه",
  5: "چهارشنبه",
  6: "پنج شنبه",
  7: "جمعه"
};

const StudentDietSelector: React.FC<StudentDietSelectorProps> = ({
  meals,
  selectedMeals,
  setSelectedMeals,
  currentDay
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const currentDayName = currentDay ? weekDayMap[currentDay] : undefined;

  const toggleMeal = (mealId: number) => {
    if (selectedMeals.includes(mealId)) {
      setSelectedMeals(prev => prev.filter(id => id !== mealId));
    } else {
      setSelectedMeals(prev => [...prev, mealId]);
    }
  };

  // Filter meals by search query and prioritize meals for the current day
  const filteredMeals = meals.filter(meal => {
    const matchesSearch = searchQuery.trim() === "" || 
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (meal.category && meal.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (meal.type && meal.type.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });
  
  // Sort meals to prioritize meals tagged for the current day
  const sortedMeals = [...filteredMeals].sort((a, b) => {
    // If meal is tagged for current day, prioritize it
    if (a.day === currentDayName && b.day !== currentDayName) return -1;
    if (a.day !== currentDayName && b.day === currentDayName) return 1;
    
    // If both or neither are tagged for current day, sort by meal type
    const mealTypeOrder = {
      "صبحانه": 1,
      "میان وعده صبح": 2,
      "ناهار": 3, 
      "میان وعده عصر": 4,
      "شام": 5,
      "میان وعده": 6
    };
    
    return (mealTypeOrder[a.type] || 99) - (mealTypeOrder[b.type] || 99);
  });

  // Group meals by type for better organization
  const mealsByType: Record<MealType, Meal[]> = {
    "صبحانه": [],
    "میان وعده صبح": [],
    "ناهار": [],
    "میان وعده عصر": [],
    "شام": [],
    "میان وعده": []
  };

  sortedMeals.forEach(meal => {
    if (meal.type) {
      mealsByType[meal.type].push(meal);
    } else {
      mealsByType["میان وعده"].push(meal);
    }
  });

  return (
    <div className="space-y-4" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Utensils className="h-4 w-4 text-green-500" />
              غذاهای انتخاب شده ({toPersianNumbers(selectedMeals.length)})
            </h4>
            
            <ScrollArea className="h-[300px] pr-4">
              {selectedMeals.length === 0 ? (
                <div className="text-center p-6 text-muted-foreground">
                  هنوز غذایی برای روز {currentDayName} انتخاب نشده است.
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedMeals.map(mealId => {
                    const mealInfo = meals.find(m => m.id === mealId);
                    if (!mealInfo) return null;
                    
                    return (
                      <div key={mealId} className="border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{mealInfo.name}</div>
                            <div className="flex gap-2 mt-1">
                              {mealInfo.type && (
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                  {mealInfo.type}
                                </Badge>
                              )}
                              {mealInfo.day && (
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                  {mealInfo.day}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                            onClick={() => toggleMeal(mealId)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {mealInfo.description && (
                          <div className="mt-2 text-sm text-slate-600">
                            {mealInfo.description}
                          </div>
                        )}
                        
                        {(mealInfo.calories || mealInfo.protein || mealInfo.carbs || mealInfo.fat) && (
                          <div className="flex gap-2 mt-2 text-xs text-slate-500">
                            {mealInfo.calories && <span>{toPersianNumbers(mealInfo.calories)} کالری</span>}
                            {mealInfo.protein && <span>{toPersianNumbers(mealInfo.protein)} پروتئین</span>}
                            {mealInfo.carbs && <span>{toPersianNumbers(mealInfo.carbs)} کربوهیدرات</span>}
                            {mealInfo.fat && <span>{toPersianNumbers(mealInfo.fat)} چربی</span>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">لیست غذاها</h4>
            <Input
              placeholder="جستجوی غذا..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-3"
            />
            
            <ScrollArea className="h-[300px] pr-4">
              {Object.entries(mealsByType).map(([type, typeMeals]) => {
                if (typeMeals.length === 0) return null;
                
                return (
                  <div key={type} className="mb-4">
                    <h5 className="text-sm font-medium mb-2 text-slate-600">{type}</h5>
                    <div className="space-y-2">
                      {typeMeals.map(meal => {
                        const isCurrentDayMeal = meal.day === currentDayName;
                        
                        return (
                          <div 
                            key={meal.id} 
                            className={cn(
                              "border rounded-md p-2 flex items-center justify-between cursor-pointer hover:bg-slate-50",
                              selectedMeals.includes(meal.id) ? 'border-green-500 bg-green-50' : '',
                              isCurrentDayMeal ? 'border-blue-200' : ''
                            )}
                            onClick={() => toggleMeal(meal.id)}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                checked={selectedMeals.includes(meal.id)}
                                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                              />
                              <div>
                                <div className="font-medium">
                                  {meal.name}
                                  {isCurrentDayMeal && (
                                    <span className="text-xs text-blue-700 mr-2 bg-blue-50 px-1.5 py-0.5 rounded-full">
                                      {meal.day}
                                    </span>
                                  )}
                                </div>
                                {meal.day && meal.day !== currentDayName && (
                                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 mt-1">
                                    {meal.day}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleMeal(meal.id);
                              }}
                            >
                              {selectedMeals.includes(meal.id) ? (
                                <Minus className="h-4 w-4" />
                              ) : (
                                <Plus className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              
              {Object.values(mealsByType).every(meals => meals.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-gray-500">هیچ غذایی با این جستجو یافت نشد</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDietSelector;
