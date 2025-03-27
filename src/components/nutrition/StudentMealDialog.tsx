
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { UtensilsCrossed } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Meal, MealType, WeekDay } from "@/types/meal";
import StudentMealListWrapper from "./StudentMealListWrapper";
import StudentMealHeader from "./StudentMealHeader";
import StudentMealSearch from "./StudentMealSearch";
import StudentMealFilters from "./StudentMealFilters";
import StudentMealFooter from "./StudentMealFooter";
import StudentMealGroupedList from "./StudentMealGroupedList";
import { useMealSorting, mealTypeOrder, dayOrder } from "./useMealSorting";

interface StudentMealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (mealIds: number[]) => boolean;
  initialMeals: number[];
  meals: Meal[];
}

const StudentMealDialog: React.FC<StudentMealDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialMeals = [],
  meals = []
}) => {
  const [selectedMeals, setSelectedMeals] = useState<number[]>(initialMeals);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDay, setActiveDay] = useState<WeekDay | "all">("all");
  const [activeMealType, setActiveMealType] = useState<MealType | "all">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Reset selectedMeals when dialog is opened to ensure it has the latest initialMeals
  React.useEffect(() => {
    if (open) {
      setSelectedMeals(initialMeals);
      console.log("Dialog opened with initial meals:", initialMeals);
    }
  }, [open, initialMeals]);

  const days = Array.from(new Set(meals.map(meal => meal.day))) as WeekDay[];
  const mealTypes = Array.from(new Set(meals.map(meal => meal.type))) as MealType[];

  const sortedMealTypes = [...mealTypes].sort((a, b) => mealTypeOrder[a] - mealTypeOrder[b]);
  const sortedDays = [...days].sort((a, b) => dayOrder[a] - dayOrder[b]);

  const filteredMeals = useMealSorting({
    meals,
    searchQuery,
    activeDay,
    activeMealType,
    sortOrder
  });

  const toggleMeal = (id: number) => {
    setSelectedMeals(prev => 
      prev.includes(id) 
        ? prev.filter(mealId => mealId !== id) 
        : [...prev, id]
    );
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const handleSave = () => {
    const success = onSave(selectedMeals);
    if (success) {
      onOpenChange(false);
    }
    return success;
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[100vw] w-full h-[100vh] max-h-[100vh] p-0 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-primary/10 flex flex-col m-0 rounded-none">
        <DialogTitle className="sr-only">برنامه غذایی {studentName}</DialogTitle>
        <StudentMealHeader studentName={studentName} />
        <StudentMealSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <Collapsible open={showFilters} onOpenChange={setShowFilters} className="w-full">
          <CollapsibleContent className="flex-shrink-0 bg-muted/10 border-b">
            <div className="mb-4 p-3 rounded-xl flex flex-wrap gap-2 justify-between items-center bg-white border border-gray-100 shadow-sm">
              <StudentMealFilters 
                activeMealType={activeMealType}
                setActiveMealType={setActiveMealType}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
                sortOrder={sortOrder}
                toggleSortOrder={toggleSortOrder}
                mealTypes={sortedMealTypes}
                days={sortedDays}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="p-4">
              <StudentMealGroupedList 
                meals={filteredMeals} 
                selectedMeals={selectedMeals}
                toggleMeal={toggleMeal}
                activeMealType={activeMealType}
                activeDay={activeDay}
                sortOrder={sortOrder}
              />
            </div>
          </ScrollArea>
        </div>

        <StudentMealFooter 
          selectedMeals={selectedMeals} 
          handleSave={handleSave} 
          onOpenChange={onOpenChange}
          meals={meals}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StudentMealDialog;
