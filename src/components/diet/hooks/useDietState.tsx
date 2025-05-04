
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Meal, MealType, WeekDay } from "@/types/meal";
import { useDietStorage, normalizeDay } from "./useDietStorage";
import { useMealValidation } from "./useMealValidation";
import { DietStateHook } from "./useDietTypes";

export const useDietState = (): DietStateHook => {
  const { toast } = useToast();
  const { meals, saveMeals } = useDietStorage();
  const { validateMeal } = useMealValidation(meals);
  
  // حالت دیالوگ
  const [open, setOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | undefined>();
  
  // جستجو و فیلتر حالت
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<WeekDay>("شنبه");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // تغییر ترتیب مرتب‌سازی
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };
  
  // مدیریت باز کردن دیالوگ
  const handleOpen = () => {
    setSelectedMeal(undefined);
    setOpen(true);
  };
  
  // مدیریت ویرایش وعده غذایی
  const handleEdit = (meal: Meal) => {
    setSelectedMeal(meal);
    setOpen(true);
  };
  
  // مدیریت حذف وعده غذایی
  const handleDelete = (id: number) => {
    const updatedMeals = meals.filter(meal => meal.id !== id);
    saveMeals(updatedMeals);
    toast({
      title: "حذف موفق",
      description: "وعده غذایی با موفقیت حذف شد",
    });
  };
  
  // مدیریت ذخیره وعده غذایی
  const handleSave = (data: Omit<Meal, "id">) => {
    // پیش‌پردازش داده‌ها - حذف فاصله‌های اضافی
    const cleanData = {
      ...data,
      name: data.name.trim(),
      description: data.description || "",
      // استاندارد کردن نام روز
      day: data.day ? normalizeDay(data.day) as WeekDay : data.day
    };
    
    console.log("Attempting to save meal:", cleanData);
    
    // اعتبارسنجی داده‌ها
    if (!validateMeal(cleanData, selectedMeal?.id)) {
      return false;
    }
    
    let newMeals: Meal[];
    
    if (selectedMeal) {
      // ویرایش وعده غذایی موجود
      newMeals = meals.map(m => 
        m.id === selectedMeal.id 
          ? { ...cleanData, id: m.id }
          : m
      );
      
      toast({
        title: "ویرایش موفق",
        description: "وعده غذایی با موفقیت ویرایش شد",
      });
    } else {
      // ایجاد وعده غذایی جدید
      const newMeal = {
        ...cleanData,
        id: Math.max(0, ...meals.map(m => m.id)) + 1
      };
      
      newMeals = [...meals, newMeal];
      
      toast({
        title: "افزودن موفق",
        description: "وعده غذایی جدید با موفقیت اضافه شد",
      });
    }
    
    const saveResult = saveMeals(newMeals);
    console.log("Saved meals:", newMeals);
    setOpen(false);
    return saveResult;
  };
  
  // فیلتر وعده‌های غذایی بر اساس جستجو
  const filteredMeals = meals.filter(meal => {
    const matchesSearch = 
      !searchQuery || 
      meal.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      meal.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });
  
  return {
    meals,
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
    filteredMeals,
    handleOpen,
    handleEdit,
    handleDelete,
    handleSave,
  };
};
