
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Meal, MealType, WeekDay } from "@/types/meal";
import { useDietStorage, normalizeDay } from "./useDietStorage";
import { useMealValidation } from "./useMealValidation";
import { DietStateHook } from "./useDietTypes";

export const useDietState = (): DietStateHook => {
  const { toast } = useToast();
  const { meals, saveMeals } = useDietStorage(); // فقط از localStorage می‌خوانیم
  const { validateMeal } = useMealValidation(meals);
  
  // حالت دیالوگ
  const [open, setOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | undefined>();
  
  // جستجو و فیلتر حالت
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<WeekDay>("شنبه");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // دیباگ برای بررسی وضعیت - فقط داده‌های database
  useEffect(() => {
    console.log("=== useDietState DEBUG - ONLY DATABASE DATA ===");
    console.log("Meals from localStorage database:", meals);
    console.log("Meals count from database:", meals.length);
    console.log("No sample data is being used");
    console.log("=== END useDietState DEBUG ===");
  }, [meals]);
  
  // تغییر ترتیب مرتب‌سازی
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };
  
  // مدیریت باز کردن دیالوگ
  const handleOpen = () => {
    console.log("Opening dialog for new meal - will save to database");
    setSelectedMeal(undefined);
    setOpen(true);
  };
  
  // مدیریت ویرایش وعده غذایی
  const handleEdit = (meal: Meal) => {
    console.log("====== EDIT MEAL FROM DATABASE ======");
    console.log("Editing meal with ID:", meal.id);
    console.log("Meal details from database:", meal);
    setSelectedMeal(meal);
    setOpen(true);
    console.log("====== END EDIT MEAL ======");
  };
  
  // مدیریت حذف وعده غذایی
  const handleDelete = (id: number) => {
    console.log("Deleting meal from database with ID:", id);
    const updatedMeals = meals.filter(meal => meal.id !== id);
    saveMeals(updatedMeals);
    toast({
      title: "حذف موفق",
      description: "وعده غذایی از دیتابیس محلی با موفقیت حذف شد",
    });
  };
  
  // مدیریت ذخیره وعده غذایی
  const handleSave = (data: Omit<Meal, "id">, mealId?: number): boolean => {
    console.log("====== SAVE MEAL TO DATABASE ======");
    console.log("Save called with mealId:", mealId);
    console.log("Current selectedMeal:", selectedMeal?.id);
    
    // پیش‌پردازش داده‌ها - حذف فاصله‌های اضافی
    const cleanData = {
      ...data,
      name: data.name.trim(),
      description: data.description?.trim() || "",
      category: data.category?.trim() || "",
      // استاندارد کردن نام روز
      day: data.day ? normalizeDay(data.day) as WeekDay : data.day
    };
    
    console.log("Clean data for saving to database:", cleanData);
    
    // بررسی تکراری بودن وعده غذایی در همان روز و همان نوع وعده
    // استفاده از mealId برای مشخص کردن غذای در حال ویرایش
    if (!validateMeal(cleanData, mealId)) {
      console.log("Validation failed - duplicate meal detected in database");
      console.log("====== END SAVE MEAL (FAILED) ======");
      return false;
    }
    
    let newMeals: Meal[];
    
    if (mealId !== undefined) {
      // ویرایش وعده غذایی موجود در database
      console.log(`Updating meal in database with ID: ${mealId}`);
      newMeals = meals.map(m => 
        m.id === mealId 
          ? { ...cleanData, id: m.id }
          : m
      );
      
      toast({
        title: "ویرایش موفق",
        description: "وعده غذایی در دیتابیس محلی با موفقیت ویرایش شد",
      });
    } else {
      // ایجاد وعده غذایی جدید در database
      const newMeal = {
        ...cleanData,
        id: Math.max(0, ...meals.map(m => m.id)) + 1
      };
      
      console.log(`Creating new meal in database with ID: ${newMeal.id}`);
      newMeals = [...meals, newMeal];
      
      toast({
        title: "افزودن موفق",
        description: "وعده غذایی جدید در دیتابیس محلی با موفقیت اضافه شد",
      });
    }
    
    const saveResult = saveMeals(newMeals);
    console.log("Save to database completed successfully");
    console.log("====== END SAVE MEAL (SUCCESS) ======");
    setOpen(false);
    return saveResult;
  };
  
  // فیلتر وعده‌های غذایی بر اساس جستجو - فقط از داده‌های database
  const filteredMeals = meals.filter(meal => {
    const matchesSearch = 
      !searchQuery || 
      meal.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      meal.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });
  
  console.log("Filtered meals from database:", filteredMeals.length);
  
  return {
    meals, // فقط از localStorage
    setMeals: saveMeals,
    open,
    setOpen,
    selectedMeal,
    setSelectedMeal,
    searchQuery,
    setSearchQuery,
    selectedDay,
    setSelectedDay,
    sortOrder,
    setSortOrder,
    toggleSortOrder,
    filteredMeals, // فیلتر شده از همان داده‌های database
    handleOpen,
    handleEdit,
    handleDelete,
    handleSave,
  };
};
