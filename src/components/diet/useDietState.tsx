
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Meal, MealType, WeekDay } from "@/types/meal";

export const useDietState = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<WeekDay>("شنبه");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Load meals from localStorage on initial render
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

  // Save meals to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('meals', JSON.stringify(meals));
    } catch (error) {
      console.error('Error saving meals to localStorage:', error);
    }
  }, [meals]);

  // Open dialog to add new meal
  const handleOpen = useCallback(() => {
    setSelectedMeal(null);
    setOpen(true);
  }, []);

  // Open dialog to edit existing meal
  const handleEdit = useCallback((meal: Meal) => {
    setSelectedMeal(meal);
    setOpen(true);
  }, []);

  // Save new or edited meal
  const handleSave = useCallback((data: Omit<Meal, "id">) => {
    if (selectedMeal) {
      // Editing existing meal
      setMeals(meals.map(meal => meal.id === selectedMeal.id ? { ...meal, ...data } : meal));
      toast({
        title: "ویرایش موفق",
        description: "وعده غذایی با موفقیت ویرایش شد",
        className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none"
      });
    } else {
      // Adding new meal
      const newId = Math.max(0, ...meals.map(meal => typeof meal.id === 'number' ? meal.id : 0)) + 1;
      const newMeal: Meal = { id: newId, ...data };
      setMeals([...meals, newMeal]);
      toast({
        title: "افزودن موفق",
        description: "وعده غذایی جدید با موفقیت اضافه شد",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
      });
    }
    return true;
  }, [meals, selectedMeal, toast]);

  // Delete meal
  const handleDelete = useCallback((id: number) => {
    setMeals(meals.filter(meal => meal.id !== id));
    toast({
      title: "حذف موفق",
      description: "وعده غذایی با موفقیت حذف شد",
      className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-none"
    });
  }, [meals, toast]);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  // Filter meals by search query
  const filteredMeals = meals
    .filter(meal => 
      meal.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      meal.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return {
    open,
    setOpen,
    meals,
    selectedMeal,
    searchQuery,
    setSearchQuery,
    selectedDay,
    setSelectedDay,
    viewMode,
    setViewMode,
    sortOrder,
    filteredMeals,
    handleOpen,
    handleEdit,
    handleSave,
    handleDelete,
    toggleSortOrder
  };
};
