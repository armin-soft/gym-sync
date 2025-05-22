
import { useState, useEffect, useCallback } from "react";
import { Meal, MealType, WeekDay } from "@/types/meal";
import { useToastNotification } from "@/hooks/use-toast-notification";

const LOCAL_STORAGE_KEY = "meals";

export const useDietState = () => {
  const { showSuccess, showError } = useToastNotification();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<MealType | "all">("all");
  const [selectedDay, setSelectedDay] = useState<WeekDay | "all">("all");

  // Load meals from localStorage
  useEffect(() => {
    const loadMeals = async () => {
      try {
        setIsLoading(true);
        const savedMeals = localStorage.getItem(LOCAL_STORAGE_KEY);
        
        if (savedMeals) {
          setMeals(JSON.parse(savedMeals));
        }
      } catch (error) {
        console.error("Failed to load meals:", error);
        showError("خطا در بارگیری", "مشکلی در بارگیری برنامه‌های غذایی پیش آمد");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMeals();
  }, []);

  // Save meals to localStorage
  const saveMeals = useCallback(
    async (updatedMeals: Meal[]) => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMeals));
        setMeals(updatedMeals);
      } catch (error) {
        console.error("Failed to save meals:", error);
        showError("خطا در ذخیره‌سازی", "مشکلی در ذخیره‌سازی برنامه‌های غذایی پیش آمد");
      }
    },
    []
  );

  // Add new meal
  const addMeal = useCallback(
    async (meal: Omit<Meal, "id">) => {
      const newMeal: Meal = {
        ...meal,
        id: Date.now(),
      };
      
      const updatedMeals = [...meals, newMeal];
      await saveMeals(updatedMeals);
      showSuccess("اضافه شد", "وعده غذایی با موفقیت اضافه شد");
      return newMeal;
    },
    [meals, saveMeals, showSuccess]
  );

  // Update existing meal
  const updateMeal = useCallback(
    async (id: number, updates: Partial<Omit<Meal, "id">>) => {
      const mealIndex = meals.findIndex((m) => m.id === id);
      
      if (mealIndex === -1) {
        showError("خطا", "وعده غذایی مورد نظر پیدا نشد");
        return null;
      }
      
      const updatedMeal = { ...meals[mealIndex], ...updates };
      const updatedMeals = [...meals];
      updatedMeals[mealIndex] = updatedMeal;
      
      await saveMeals(updatedMeals);
      showSuccess("به‌روزرسانی شد", "وعده غذایی با موفقیت به‌روزرسانی شد");
      return updatedMeal;
    },
    [meals, saveMeals, showSuccess, showError]
  );

  // Delete meal
  const deleteMeal = useCallback(
    async (id: number) => {
      const updatedMeals = meals.filter((meal) => meal.id !== id);
      await saveMeals(updatedMeals);
      showSuccess("حذف شد", "وعده غذایی با موفقیت حذف شد");
    },
    [meals, saveMeals, showSuccess]
  );

  // Filter meals based on search query, selected type and day
  const filteredMeals = useCallback(() => {
    return meals.filter((meal) => {
      const matchesSearch =
        searchQuery === "" ||
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (meal.description &&
          meal.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType =
        selectedType === "all" || meal.type === selectedType;
      
      const matchesDay =
        selectedDay === "all" || meal.weekDay === selectedDay;
      
      return matchesSearch && matchesType && matchesDay;
    });
  }, [meals, searchQuery, selectedType, selectedDay]);

  // Open dialog for adding new meal
  const openAddDialog = useCallback(() => {
    setSelectedMeal(null);
    setDialogOpen(true);
  }, []);

  // Open dialog for editing meal
  const openEditDialog = useCallback((meal: Meal) => {
    setSelectedMeal(meal);
    setDialogOpen(true);
  }, []);

  // Close dialog
  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    setSelectedMeal(null);
  }, []);

  // Handle saving meal (add or update)
  const handleSaveMeal = useCallback(
    async (mealData: Omit<Meal, "id">) => {
      if (selectedMeal) {
        await updateMeal(selectedMeal.id, mealData);
      } else {
        await addMeal(mealData);
      }
      closeDialog();
    },
    [selectedMeal, addMeal, updateMeal, closeDialog]
  );

  return {
    meals,
    filteredMeals: filteredMeals(),
    isLoading,
    selectedMeal,
    dialogOpen,
    searchQuery,
    selectedType,
    selectedDay,
    setSearchQuery,
    setSelectedType,
    setSelectedDay,
    openAddDialog,
    openEditDialog,
    closeDialog,
    handleSaveMeal,
    deleteMeal,
  };
};

export default useDietState;
