import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MealDialog } from "@/components/diet/MealDialog";
import { DayMeals } from "@/components/diet/DayMeals";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { Meal, MealType, WeekDay } from "@/types/meal";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const weekDays = [
  'شنبه', 
  'یکشنبه', 
  'دوشنبه', 
  'سه‌شنبه', 
  'چهارشنبه', 
  'پنجشنبه', 
  'جمعه'
];

const mealTypes = [
  "صبحانه",
  "میان وعده صبح",
  "ناهار",
  "میان وعده عصر",
  "شام",
  "میان وعده"
];

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
      const newMeal: Meal = { id: uuidv4(), ...data };
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
    <div className="container py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">برنامه غذایی</h1>
        <Button onClick={handleOpen} className="bg-green-600 hover:bg-green-500 text-white">
          <Plus className="mr-2" />
          افزودن وعده غذایی
        </Button>
      </div>

      <Card className="p-4">
        {weekDays.map(day => (
          <DayMeals
            key={day}
            meals={meals.filter(meal => meal.day === day)}
            mealTypes={mealTypes as MealType[]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Card>

      <MealDialog
        open={open}
        onOpenChange={setOpen}
        onSave={handleSave}
        meal={selectedMeal}
        mealTypes={mealTypes as MealType[]}
        weekDays={weekDays as WeekDay[]}
      />
    </div>
  );
};

export default Index;
