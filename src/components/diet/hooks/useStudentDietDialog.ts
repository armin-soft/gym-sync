
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Meal {
  id: number;
  name: string;
  description?: string;
  type: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export const useStudentDietDialog = (
  initialMeals: number[] = [],
  onSave: (mealIds: number[]) => boolean
) => {
  const [selectedMeals, setSelectedMeals] = useState<number[]>(initialMeals);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mealsLoaded, setMealsLoaded] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedMealType, setSelectedMealType] = useState<string>("all");
  const [mealTypes, setMealTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  // Load meals from localStorage
  useEffect(() => {
    try {
      const savedMeals = localStorage.getItem("meals");
      if (savedMeals) {
        const parsedMeals = JSON.parse(savedMeals);
        setMeals(parsedMeals);
        setFilteredMeals(parsedMeals);
        
        // Extract meal types
        const types = Array.from(new Set(parsedMeals.map((meal: Meal) => meal.type)));
        setMealTypes(types);
      }
      setMealsLoaded(true);
    } catch (error) {
      console.error("Error loading meals:", error);
      toast({
        variant: "destructive",
        title: "خطا در بارگذاری",
        description: "مشکلی در بارگذاری غذاها پیش آمد."
      });
    }
  }, [toast]);

  // Filter meals based on search query and meal type
  useEffect(() => {
    let filtered = meals;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(meal =>
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (meal.description && meal.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply meal type filter
    if (selectedMealType !== "all") {
      filtered = filtered.filter(meal => meal.type === selectedMealType);
    }
    
    // Apply sort
    filtered = [...filtered].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    
    setFilteredMeals(filtered);
  }, [searchQuery, selectedMealType, sortOrder, meals]);

  const toggleMeal = (mealId: number) => {
    setSelectedMeals(prev =>
      prev.includes(mealId)
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const isMealSelected = (mealId: number) => selectedMeals.includes(mealId);

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
  };

  const handleSave = () => {
    const success = onSave(selectedMeals);
    if (success) {
      toast({
        title: "برنامه غذایی ذخیره شد",
        description: `${selectedMeals.length} غذا با موفقیت به برنامه غذایی شاگرد اضافه شد.`
      });
    }
    return success;
  };

  return {
    selectedMeals,
    toggleMeal,
    isMealSelected,
    filteredMeals,
    meals,
    handleSave,
    searchQuery,
    setSearchQuery,
    mealsLoaded,
    sortOrder,
    toggleSortOrder,
    selectedMealType,
    setSelectedMealType,
    mealTypes,
    showFilters,
    setShowFilters,
  };
};
