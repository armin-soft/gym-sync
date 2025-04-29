
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MealDialog } from "@/components/diet/MealDialog";
import { DayMeals } from "@/components/diet/DayMeals";
import { useToast } from "@/components/ui/use-toast";
import { PageContainer } from "@/components/ui/page-container";
import { Meal, MealType, WeekDay } from "@/types/meal";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const weekDays: WeekDay[] = [
  'شنبه', 
  'یکشنبه', 
  'دوشنبه', 
  'سه‌شنبه', 
  'چهارشنبه', 
  'پنجشنبه', 
  'جمعه'
] as WeekDay[];

const mealTypes: MealType[] = [
  "صبحانه",
  "میان وعده صبح",
  "ناهار",
  "میان وعده عصر",
  "شام",
  "میان وعده"
] as MealType[];

const Index = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  useEffect(() => {
    try {
      const savedMeals = localStorage.getItem('meals');
      if (savedMeals) {
        setMeals(JSON.parse(savedMeals));
      }
    } catch (error) {
      console.error('Error loading meals from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('meals', JSON.stringify(meals));
    } catch (error) {
      console.error('Error saving meals to localStorage:', error);
    }
  }, [meals]);

  const handleOpen = useCallback(() => {
    setSelectedMeal(null);
    setOpen(true);
  }, []);

  const handleEdit = useCallback((meal: Meal) => {
    setSelectedMeal(meal);
    setOpen(true);
  }, []);

  const handleSave = useCallback((data: Omit<Meal, "id">) => {
    if (selectedMeal) {
      // Editing existing meal
      setMeals(meals.map(meal => meal.id === selectedMeal.id ? { ...meal, ...data } : meal));
      toast({
        title: "ویرایش موفق",
        description: "وعده غذایی با موفقیت ویرایش شد",
      });
    } else {
      // Adding new meal
      // Use a numeric ID instead of a string from uuid
      const newId = Math.max(0, ...meals.map(meal => typeof meal.id === 'number' ? meal.id : 0)) + 1;
      const newMeal: Meal = { id: newId, ...data };
      setMeals([...meals, newMeal]);
      toast({
        title: "افزودن موفق",
        description: "وعده غذایی با موفقیت اضافه شد",
      });
    }
    return true;
  }, [meals, selectedMeal, toast]);

  const handleDelete = useCallback((id: number) => {
    setMeals(meals.filter(meal => meal.id !== id));
    toast({
      title: "حذف موفق",
      description: "وعده غذایی با موفقیت حذف شد",
    });
  }, [meals, toast]);

  return (
    <PageContainer 
      withBackground 
      fullWidth 
      fullHeight 
      noPadding
      className="flex flex-col overflow-hidden"
    >
      <div className="h-full w-full overflow-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full w-full py-4 sm:py-6 space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-6"
        >
          <div className="flex flex-col space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4"
            >
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    برنامه های غذایی هفتگی
                  </span>
                </h2>
              </div>
              <Button 
                onClick={handleOpen} 
                size="sm"
                className="bg-gradient-to-l from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-primary/25 group"
              >
                <Plus className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110 group-hover:rotate-180 duration-300" />
                افزودن وعده غذایی
              </Button>
            </motion.div>
          </div>

          <Card className="overflow-hidden border-primary/10 shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-500 h-[calc(100vh-140px)]">
            <div className="h-full overflow-auto">
              <div className="p-2 xs:p-3 sm:p-4 md:p-6">
                <DayMeals
                  meals={meals}
                  mealTypes={mealTypes}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          </Card>

          <MealDialog
            open={open}
            onOpenChange={setOpen}
            onSave={handleSave}
            meal={selectedMeal}
            mealTypes={mealTypes}
            weekDays={weekDays}
          />
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Index;
