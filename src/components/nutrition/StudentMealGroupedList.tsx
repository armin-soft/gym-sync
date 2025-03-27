
import React from "react";
import { Meal, MealType, WeekDay } from "@/types/meal";
import { Separator } from "@/components/ui/separator";
import StudentMealItem from "./StudentMealItem";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getMealTypeColor, getMealTypeIcon } from "./StudentMealFilters";
import { Apple, Salad } from "lucide-react";
import { mealTypeOrder, dayOrder } from "./useMealSorting";

interface StudentMealGroupedListProps {
  meals: Meal[];
  selectedMeals: number[];
  toggleMeal: (id: number) => void;
  activeMealType: MealType | "all";
  activeDay: WeekDay | "all";
  sortOrder: "asc" | "desc";
}

const StudentMealGroupedList: React.FC<StudentMealGroupedListProps> = ({
  meals,
  selectedMeals,
  toggleMeal,
  activeDay,
  activeMealType,
  sortOrder
}) => {
  if (meals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Salad className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <p className="text-center mb-3">هیچ وعده غذایی یافت نشد</p>
        <p className="text-sm text-muted-foreground/70 text-center max-w-xs">
          لطفاً معیارهای جستجو را تغییر دهید یا وعده های غذایی جدید ایجاد کنید
        </p>
      </div>
    );
  }

  // Get unique days from meals
  const sortedDays = [...new Set(meals.map(meal => meal.day))]
    .sort((a, b) => dayOrder[a] - dayOrder[b]);

  // Get unique meal types from meals
  const sortedMealTypes = [...new Set(meals.map(meal => meal.type))]
    .sort((a, b) => mealTypeOrder[a] - mealTypeOrder[b]);

  // Group meals by day with proper initialization for all weekdays in sorted order
  const mealsByDay: Record<WeekDay, Meal[]> = {} as Record<WeekDay, Meal[]>;
  
  // Fill with meals
  sortedDays.forEach(day => {
    mealsByDay[day] = meals.filter(meal => meal.day === day);
  });

  // Show all meals if all days is selected
  if (activeDay !== "all") {
    return (
      <div className="py-2">
        {sortedMealTypes.map(type => {
          const mealsOfType = meals.filter(meal => meal.type === type);
          
          if (mealsOfType.length === 0) return null;
          
          return (
            <div key={type} className="mb-4">
              <div className="px-6 mb-2 flex items-center gap-2">
                <div className={`p-1.5 rounded ${getMealTypeColor(type)}`}>
                  {getMealTypeIcon(type)}
                </div>
                <h3 className="text-base font-medium">{type} ({toPersianNumbers(mealsOfType.length)})</h3>
              </div>
              
              <div className="space-y-1">
                {mealsOfType.map(meal => (
                  <StudentMealItem 
                    key={meal.id} 
                    meal={meal} 
                    isSelected={selectedMeals.includes(meal.id)} 
                    onToggle={toggleMeal} 
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Show meals grouped by days
  return (
    <div className="py-2">
      {sortedDays.map(day => {
        if (mealsByDay[day].length === 0) return null;
        
        return (
          <div key={day} className="mb-6">
            <div className="sticky top-0 z-10 px-4 py-2 backdrop-blur-md bg-background/90 border-b">
              <h3 className="text-base font-semibold text-primary">{day} ({toPersianNumbers(mealsByDay[day].length)})</h3>
            </div>
            
            <div className="mt-2">
              {sortedMealTypes.map(type => {
                const mealsOfTypeAndDay = mealsByDay[day].filter(meal => meal.type === type);
                
                if (mealsOfTypeAndDay.length === 0) return null;
                
                return (
                  <div key={`${day}-${type}`} className="mb-4">
                    <div className="px-6 mb-2 flex items-center gap-2">
                      <div className={`p-1.5 rounded ${getMealTypeColor(type)}`}>
                        {getMealTypeIcon(type)}
                      </div>
                      <h4 className="text-sm font-medium">{type} ({toPersianNumbers(mealsOfTypeAndDay.length)})</h4>
                    </div>
                    
                    <div className="space-y-1">
                      {mealsOfTypeAndDay.map(meal => (
                        <StudentMealItem 
                          key={meal.id} 
                          meal={meal} 
                          isSelected={selectedMeals.includes(meal.id)} 
                          onToggle={toggleMeal} 
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
              
              <Separator className="my-3" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StudentMealGroupedList;
