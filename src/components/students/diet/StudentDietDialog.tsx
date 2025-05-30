
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Utensils, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Meal, MealType, WeekDay } from "@/types/meal";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface StudentDietDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
  availableMeals: Meal[];
  selectedMeals: number[];
  onMealsChange: (mealIds: number[]) => void;
}

const weekDays: WeekDay[] = [
  'شنبه',
  'یکشنبه', 
  'دوشنبه',
  'سه شنبه',
  'چهار شنبه',
  'پنج شنبه',
  'جمعه'
];

const mealTypes: MealType[] = [
  "صبحانه",
  "میان وعده صبح", 
  "ناهار",
  "میان وعده عصر",
  "شام",
  "میان وعده"
];

const dayOrder: Record<WeekDay, number> = {
  'شنبه': 0,
  'یکشنبه': 1,
  'دوشنبه': 2,
  'سه شنبه': 3,
  'چهار شنبه': 4,
  'پنج شنبه': 5,
  'جمعه': 6
};

export const StudentDietDialog = ({
  open,
  onOpenChange,
  studentId,
  studentName,
  availableMeals,
  selectedMeals,
  onMealsChange
}: StudentDietDialogProps) => {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState<WeekDay | 'all'>('all');
  const [selectedMealType, setSelectedMealType] = useState<MealType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDayChange = (day: WeekDay | 'all') => {
    setSelectedDay(day);
  };

  const handleMealTypeChange = (mealType: MealType | 'all') => {
    setSelectedMealType(mealType);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleMealSelection = (mealId: number) => {
    if (selectedMeals.includes(mealId)) {
      onMealsChange(selectedMeals.filter(id => id !== mealId));
    } else {
      onMealsChange([...selectedMeals, mealId]);
    }
  };

  const filteredMeals = React.useMemo(() => {
    let result = availableMeals;

    if (selectedDay !== 'all') {
      result = result.filter(meal => meal.day === selectedDay);
    }

    if (selectedMealType !== 'all') {
      result = result.filter(meal => meal.type === selectedMealType);
    }

    if (searchQuery) {
      const lowerSearchQuery = searchQuery.toLowerCase();
      result = result.filter(meal =>
        meal.name.toLowerCase().includes(lowerSearchQuery) ||
        (meal.description && meal.description.toLowerCase().includes(lowerSearchQuery))
      );
    }

    return result;
  }, [availableMeals, selectedDay, selectedMealType, searchQuery]);

  const groupedMeals = React.useMemo(() => {
    const grouped: Record<WeekDay, Record<MealType, Meal[]>> = {
      'شنبه': {
        "صبحانه": [],
        "میان وعده صبح": [],
        "ناهار": [],
        "میان وعده عصر": [],
        "شام": [],
        "میان وعده": []
      },
      'یکشنبه': {
        "صبحانه": [],
        "میان وعده صبح": [],
        "ناهار": [],
        "میان وعده عصر": [],
        "شام": [],
        "میان وعده": []
      },
      'دوشنبه': {
        "صبحانه": [],
        "میان وعده صبح": [],
        "ناهار": [],
        "میان وعده عصر": [],
        "شام": [],
        "میان وعده": []
      },
      'سه شنبه': {
        "صبحانه": [],
        "میان وعده صبح": [],
        "ناهار": [],
        "میان وعده عصر": [],
        "شام": [],
        "میان وعده": []
      },
      'چهار شنبه': {
        "صبحانه": [],
        "میان وعده صبح": [],
        "ناهار": [],
        "میان وعده عصر": [],
        "شام": [],
        "میان وعده": []
      },
      'پنج شنبه': {
        "صبحانه": [],
        "میان وعده صبح": [],
        "ناهار": [],
        "میان وعده عصر": [],
        "شام": [],
        "میان وعده": []
      },
      'جمعه': {
        "صبحانه": [],
        "میان وعده صبح": [],
        "ناهار": [],
        "میان وعده عصر": [],
        "شام": [],
        "میان وعده": []
      }
    };

    filteredMeals.forEach(meal => {
      if (meal.day && meal.type) {
        grouped[meal.day][meal.type].push(meal);
      }
    });

    return grouped;
  }, [filteredMeals]);

  const totalSelectedMeals = selectedMeals.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            برنامه غذایی {studentName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filters */}
          <div className="md:col-span-1 space-y-4">
            <Card className="p-4">
              <h4 className="mb-2 font-semibold text-gray-700">
                روز
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedDay === 'all' ? 'secondary' : 'outline'}
                  onClick={() => handleDayChange('all')}
                  className="cursor-pointer"
                >
                  همه
                </Badge>
                {weekDays.map(day => (
                  <Badge
                    key={day}
                    variant={selectedDay === day ? 'secondary' : 'outline'}
                    onClick={() => handleDayChange(day)}
                    className="cursor-pointer"
                  >
                    {day}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="mb-2 font-semibold text-gray-700">
                وعده غذایی
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedMealType === 'all' ? 'secondary' : 'outline'}
                  onClick={() => handleMealTypeChange('all')}
                  className="cursor-pointer"
                >
                  همه
                </Badge>
                {mealTypes.map(type => (
                  <Badge
                    key={type}
                    variant={selectedMealType === type ? 'secondary' : 'outline'}
                    onClick={() => handleMealTypeChange(type)}
                    className="cursor-pointer"
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="mb-2 font-semibold text-gray-700">
                جستجو
              </h4>
              <input
                type="text"
                placeholder="جستجو در نام و توضیحات"
                className="w-full px-3 py-2 border rounded-md"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Card>
          </div>

          {/* Meal List */}
          <div className="md:col-span-3">
            <Card className="h-[60vh] flex flex-col">
              <div className="p-4 flex items-center justify-between">
                <h4 className="font-semibold text-gray-700">
                  وعده های غذایی ({toPersianNumbers(filteredMeals.length)})
                </h4>
                <span className="text-sm text-gray-500">
                  {toPersianNumbers(totalSelectedMeals)} وعده انتخاب شده
                </span>
              </div>
              <ScrollArea className="flex-1 p-4">
                {filteredMeals.length === 0 ? (
                  <div className="text-center text-gray-500">
                    هیچ وعده غذایی یافت نشد.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(groupedMeals).sort((a, b) => dayOrder[a[0] as WeekDay] - dayOrder[b[0] as WeekDay]).map(([day, mealTypeGroups]) => (
                      <div key={day}>
                        <h5 className="font-semibold text-gray-700 mb-2">
                          {day}
                        </h5>
                        {Object.entries(mealTypeGroups).map(([mealType, meals]) => (
                          <div key={mealType} className="space-y-1">
                            {meals.map(meal => (
                              <motion.div
                                key={meal.id}
                                className="flex items-center justify-between p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                                onClick={() => toggleMealSelection(meal.id)}
                                whileHover={{ scale: 1.02 }}
                              >
                                <div>
                                  <h6 className="font-medium text-gray-800">{meal.name}</h6>
                                  <p className="text-sm text-gray-500">{meal.description}</p>
                                </div>
                                <input
                                  type="checkbox"
                                  checked={selectedMeals.includes(meal.id)}
                                  onChange={() => { }}
                                  className="h-5 w-5 rounded text-blue-500 focus:ring-blue-500"
                                />
                              </motion.div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </Card>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={() => onOpenChange(false)}>
            بستن
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
