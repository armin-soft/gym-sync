
import React from "react";
import { Meal, MealType, WeekDay } from "@/types/meal";
import StudentMealItem from "./StudentMealItem";
import { getMealTypeColor, getMealTypeIcon } from "./StudentMealFilters";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentMealGroupedListProps {
  filteredMeals: Meal[];
  selectedMeals: number[];
  toggleMeal: (id: number) => void;
  activeDay: WeekDay | "all";
  activeMealType: MealType | "all";
  sortedDays: WeekDay[];
  sortedMealTypes: MealType[];
  dayOrder: Record<WeekDay, number>;
}

const StudentMealGroupedList: React.FC<StudentMealGroupedListProps> = ({
  filteredMeals,
  selectedMeals,
  toggleMeal,
  activeDay,
  activeMealType,
  sortedDays,
  sortedMealTypes,
  dayOrder
}) => {
  if (filteredMeals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-4">
        <div className="w-16 h-16 bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-full flex items-center justify-center mb-4 shadow-sm">
          <UtensilsCrossed className="h-8 w-8 text-green-500 dark:text-green-400" />
        </div>
        <h3 className="font-medium text-lg text-foreground">هیچ وعده غذایی یافت نشد</h3>
        <p className="text-muted-foreground text-sm mt-2">برای افزودن وعده غذایی به صفحه مدیریت غذا مراجعه کنید</p>
      </div>
    );
  }

  // Helper to render meals for specific type and day
  const renderMealsByTypeAndDay = (day: WeekDay, type: MealType) => {
    const typeMeals = filteredMeals.filter(meal => meal.day === day && meal.type === type);
    if (typeMeals.length === 0) return null;
    
    const typeColor = getMealTypeColor(type);
    return (
      <div key={`${day}-${type}`} className="space-y-2">
        <h4 className={`text-sm font-medium flex items-center gap-1.5 ${typeColor.split(' ')[0]}`}>
          {getMealTypeIcon(type)}
          {type}
          <span className="text-xs bg-background/50 px-2 py-0.5 rounded-full">
            {toPersianNumbers(typeMeals.length)} مورد
          </span>
        </h4>
        <div className="flex flex-col space-y-3">
          {typeMeals.map(meal => (
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
  };

  // Helper to render all meals for a day
  const renderMealsByDay = (day: WeekDay) => {
    const dayMeals = filteredMeals.filter(meal => meal.day === day);
    if (dayMeals.length === 0) return null;
    
    if (activeMealType !== "all") {
      return (
        <div key={day} className="space-y-4">
          <h3 className="text-lg font-medium text-foreground/90 pb-2 border-b">{day}</h3>
          <div className="flex flex-col space-y-3">
            {dayMeals.map(meal => (
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
    }
    
    return (
      <div key={day} className="space-y-4">
        <h3 className="text-lg font-medium text-foreground/90 pb-2 border-b">{day}</h3>
        <div className="space-y-4">
          {sortedMealTypes.map(type => renderMealsByTypeAndDay(day, type))}
        </div>
      </div>
    );
  };

  // Helper to render meals by type
  const renderMealsByType = (type: MealType) => {
    const typeMeals = filteredMeals.filter(meal => meal.type === type);
    if (typeMeals.length === 0) return null;
    
    const typeColor = getMealTypeColor(type);
    return (
      <div key={type} className="space-y-2">
        <h4 className={`text-sm font-medium flex items-center gap-1.5 ${typeColor.split(' ')[0]}`}>
          {getMealTypeIcon(type)}
          {type}
          <span className="text-xs bg-background/50 px-2 py-0.5 rounded-full">
            {toPersianNumbers(typeMeals.length)} مورد
          </span>
        </h4>
        <div className="flex flex-col space-y-3">
          {typeMeals.map(meal => (
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
  };

  // Determine which view to render based on the active filters
  if (activeMealType === "all" && activeDay === "all") {
    return (
      <div className="space-y-6">
        {sortedDays.map(day => renderMealsByDay(day))}
      </div>
    );
  } else if (activeMealType !== "all" && activeDay === "all") {
    return (
      <div className="space-y-6">
        {sortedDays.map(day => renderMealsByDay(day))}
      </div>
    );
  } else if (activeDay !== "all" && activeMealType === "all") {
    return (
      <div className="space-y-6">
        {sortedMealTypes.map(type => renderMealsByType(type))}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col space-y-3">
        {filteredMeals.map(meal => (
          <StudentMealItem 
            key={meal.id}
            meal={meal}
            isSelected={selectedMeals.includes(meal.id)}
            onToggle={toggleMeal}
          />
        ))}
      </div>
    );
  }
};

export default StudentMealGroupedList;
