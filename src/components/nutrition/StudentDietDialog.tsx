
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Save, X, Apple } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentDietDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (mealIds: number[]) => void;
  initialMeals: number[];
}

interface Meal {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  day: string;
  type: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

// Default days of the week in Persian
const defaultDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه"
];

// Default meal types in Persian
const defaultMealTypes = [
  "صبحانه",
  "میان وعده صبح",
  "ناهار",
  "میان وعده عصر",
  "شام",
  "میان وعده شب"
];

export function StudentDietDialog({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialMeals = [],
}: StudentDietDialogProps) {
  const [selectedMeals, setSelectedMeals] = useState<number[]>(initialMeals);
  const [searchQuery, setSearchQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [currentDay, setCurrentDay] = useState<string | "all">("all");
  const [currentType, setCurrentType] = useState<string | "all">("all");
  const [days, setDays] = useState<string[]>(defaultDays);
  const [types, setTypes] = useState<string[]>(defaultMealTypes);

  // Load meals from localStorage
  useEffect(() => {
    try {
      const savedMeals = localStorage.getItem("meals");
      if (savedMeals) {
        const parsedMeals = JSON.parse(savedMeals);
        setMeals(Array.isArray(parsedMeals) ? parsedMeals : []);
      }
    } catch (error) {
      console.error("Error loading meals:", error);
      setMeals([]);
    }
  }, []);

  // Extract days and types from meals, or use defaults if none exist
  useEffect(() => {
    // Get unique days from meals, or use defaults if no meals have days
    const mealsWithDays = meals.filter(meal => meal.day);
    const uniqueDays = mealsWithDays.length > 0 
      ? Array.from(new Set(mealsWithDays.map(meal => meal.day)))
      : defaultDays;
    
    // Get unique types from meals, or use defaults if no meals have types
    const mealsWithTypes = meals.filter(meal => meal.type);
    const uniqueTypes = mealsWithTypes.length > 0
      ? Array.from(new Set(mealsWithTypes.map(meal => meal.type)))
      : defaultMealTypes;
    
    setDays(uniqueDays);
    setTypes(uniqueTypes);
  }, [meals]);

  // Filter meals based on search query, day, and type
  useEffect(() => {
    let filtered = meals;
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (meal) =>
          meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          meal.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (currentDay !== "all") {
      filtered = filtered.filter((meal) => meal.day === currentDay);
    }

    if (currentType !== "all") {
      filtered = filtered.filter((meal) => meal.type === currentType);
    }

    setFilteredMeals(filtered);
  }, [searchQuery, meals, currentDay, currentType]);

  const toggleMeal = (mealId: number) => {
    setSelectedMeals((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  const handleSave = () => {
    onSave(selectedMeals);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] h-[750px] flex flex-col overflow-hidden" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Apple className="h-5 w-5 text-green-600" />
            </div>
            <span>برنامه غذایی برای {studentName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="relative mb-4 flex-shrink-0">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="جستجو در برنامه های غذایی..."
            className="pl-3 pr-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4 flex-shrink-0">
          <div className="space-y-2">
            <p className="text-sm font-medium">روز هفته:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={currentDay === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentDay("all")}
                className="text-xs h-8"
              >
                همه روزها
              </Button>
              {days.map((day) => (
                <Button
                  key={day}
                  variant={currentDay === day ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentDay(day)}
                  className="text-xs h-8"
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">نوع وعده:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={currentType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentType("all")}
                className="text-xs h-8"
              >
                همه وعده‌ها
              </Button>
              {types.map((type) => (
                <Button
                  key={type}
                  variant={currentType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentType(type)}
                  className="text-xs h-8"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <ScrollArea className="flex-grow">
          {filteredMeals.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center p-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Apple className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-medium text-lg">هیچ وعده غذایی یافت نشد</h3>
              <p className="text-muted-foreground text-sm mt-2">
                وعده غذایی مورد نظر شما موجود نیست یا هنوز هیچ وعده غذایی ثبت نشده است
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-4">
              {filteredMeals.map((meal) => (
                <div
                  key={meal.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedMeals.includes(meal.id)
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => toggleMeal(meal.id)}
                >
                  <div className="flex gap-3 items-start">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center ${
                        selectedMeals.includes(meal.id)
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedMeals.includes(meal.id) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">{meal.name}</h4>
                        <div className="flex gap-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                            {meal.day}
                          </span>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                            {meal.type}
                          </span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                        {meal.description}
                      </p>
                      {(meal.calories || meal.protein || meal.carbs || meal.fat) && (
                        <div className="grid grid-cols-4 gap-1 mt-2">
                          {meal.calories && (
                            <div className="text-xs bg-gray-100 p-1 rounded text-center">
                              <span className="block font-medium">کالری</span>
                              <span>{toPersianNumbers(meal.calories)}</span>
                            </div>
                          )}
                          {meal.protein && (
                            <div className="text-xs bg-gray-100 p-1 rounded text-center">
                              <span className="block font-medium">پروتئین</span>
                              <span>{toPersianNumbers(meal.protein)}</span>
                            </div>
                          )}
                          {meal.carbs && (
                            <div className="text-xs bg-gray-100 p-1 rounded text-center">
                              <span className="block font-medium">کربوهیدرات</span>
                              <span>{toPersianNumbers(meal.carbs)}</span>
                            </div>
                          )}
                          {meal.fat && (
                            <div className="text-xs bg-gray-100 p-1 rounded text-center">
                              <span className="block font-medium">چربی</span>
                              <span>{toPersianNumbers(meal.fat)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="border-t pt-4 mt-4 flex justify-between items-center">
          <div className="text-sm font-medium">
            وعده‌های غذایی انتخاب شده:{" "}
            <span className="text-green-600">{toPersianNumbers(selectedMeals.length)}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              انصراف
            </Button>
            <Button
              onClick={handleSave}
              className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Save className="h-4 w-4" />
              ذخیره برنامه غذایی
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
