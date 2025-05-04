
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { Meal, WeekDay } from "@/types/meal";

export const useDietState = () => {
  const { toast } = useToast();
  
  // Dialog state
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | undefined>();
  
  // View mode and sorting state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // Selected day state
  const [selectedDay, setSelectedDay] = useState<WeekDay>("شنبه");
  
  // Search query state
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Meals state
  const [meals, setMeals] = useState<Meal[]>(() => {
    try {
      const savedMeals = localStorage.getItem('meals');
      return savedMeals ? JSON.parse(savedMeals) : [];
    } catch (error) {
      console.error('Error loading meals:', error);
      return [];
    }
  });
  
  // Save meals to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('meals', JSON.stringify(meals));
    } catch (error) {
      console.error('Error saving meals:', error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره سازی",
        description: "مشکلی در ذخیره برنامه غذایی پیش آمده است"
      });
    }
  }, [meals, toast]);
  
  // Filter meals by search query
  const filteredMeals = meals.filter(meal => 
    meal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    meal.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };
  
  // Handle adding a new meal
  const handleOpen = () => {
    setSelectedMeal(undefined);
    setOpen(true);
  };
  
  // Handle editing a meal
  const handleEdit = (meal: Meal) => {
    setSelectedMeal(meal);
    setOpen(true);
  };
  
  // Handle saving a meal
  const handleSave = (data: Omit<Meal, "id">) => {
    let newMeals: Meal[];
    
    if (selectedMeal) {
      // Edit existing meal
      newMeals = meals.map(m => m.id === selectedMeal.id ? {
        ...data,
        id: m.id
      } : m);
      
      toast({
        title: "ویرایش موفق",
        description: "وعده غذایی با موفقیت ویرایش شد",
        className: "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none"
      });
    } else {
      // Add new meal
      const newMeal = {
        ...data,
        id: Math.max(0, ...meals.map(m => m.id)) + 1
      };
      
      newMeals = [...meals, newMeal];
      
      toast({
        title: "افزودن موفق",
        description: "وعده غذایی جدید با موفقیت اضافه شد",
        className: "bg-gradient-to-r from-green-500 to-green-600 text-white border-none"
      });
    }
    
    setMeals(newMeals);
    setOpen(false);
  };
  
  // Handle deleting a meal
  const handleDelete = (id: number) => {
    const updatedMeals = meals.filter(meal => meal.id !== id);
    setMeals(updatedMeals);
    
    toast({
      title: "حذف موفق",
      description: "وعده غذایی با موفقیت حذف شد",
      className: "bg-gradient-to-r from-red-500 to-red-600 text-white border-none"
    });
  };
  
  return {
    open,
    setOpen,
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
