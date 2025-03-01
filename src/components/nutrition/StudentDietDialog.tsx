
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
import { Search, Save, X } from "lucide-react";
import { type Meal, type WeekDay } from "@/types/meal";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentDietDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (mealIds: number[]) => void;
  initialMeals: number[];
}

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
  const [currentDay, setCurrentDay] = useState<WeekDay | "همه">("همه");

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

  // Filter meals based on search query and day
  useEffect(() => {
    let filtered = meals;
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (meal) =>
          meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          meal.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (currentDay !== "همه") {
      filtered = filtered.filter((meal) => meal.day === currentDay);
    }

    setFilteredMeals(filtered);
  }, [searchQuery, meals, currentDay]);

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

  const weekDays: WeekDay[] = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"];
  const mealTypes = ["صبحانه", "میان وعده صبح", "ناهار", "میان وعده عصر", "شام"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] h-[750px] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-lg">🍽️</span>
            </div>
            <span>برنامه غذایی برای {studentName}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="relative mb-4 flex-shrink-0">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="جستجو در برنامه‌های غذایی..."
            className="pl-3 pr-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mb-4 flex-shrink-0 overflow-x-auto">
          <div className="flex space-x-2 space-x-reverse">
            <Button
              variant={currentDay === "همه" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentDay("همه")}
              className="flex-shrink-0"
            >
              همه روزها
            </Button>
            {weekDays.map((day) => (
              <Button
                key={day}
                variant={currentDay === day ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentDay(day)}
                className="flex-shrink-0"
              >
                {day}
              </Button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-grow overflow-y-auto pr-4">
          {filteredMeals.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center p-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="font-medium text-lg">برنامه غذایی یافت نشد</h3>
              <p className="text-muted-foreground text-sm mt-2">
                برنامه غذایی مورد نظر شما موجود نیست یا هنوز هیچ برنامه غذایی ثبت نشده است
              </p>
            </div>
          ) : (
            <>
              {mealTypes.map((type) => {
                const mealsOfType = filteredMeals.filter((meal) => meal.type === type);
                if (mealsOfType.length === 0) return null;
                
                return (
                  <div key={type} className="mb-6">
                    <h3 className="font-medium text-base mb-3 bg-green-50 p-2 rounded-md text-green-700">
                      {type}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mealsOfType.map((meal) => (
                        <div
                          key={meal.id}
                          className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center gap-3 ${
                            selectedMeals.includes(meal.id)
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                          onClick={() => toggleMeal(meal.id)}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
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
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-sm truncate">
                                {meal.name}
                              </h4>
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                {meal.day}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-xs truncate">
                              {meal.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </ScrollArea>

        <div className="border-t pt-4 mt-4 flex justify-between items-center flex-shrink-0">
          <div className="text-sm font-medium">
            تعداد انتخاب شده:{" "}
            <span className="text-green-600">
              {toPersianNumbers(selectedMeals.length)}
            </span>
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
